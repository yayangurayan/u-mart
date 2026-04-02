<template>
  <div class="max-w-3xl mx-auto pb-20" v-if="tutor" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-800">
        <i class="ph-fill ph-shopping-cart text-[#008542]"></i> Checkout Layanan
      </h2>
      <p class="text-slate-500 mt-2">Selesaikan pemesanan Anda untuk membuka akses Class Room.</p>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div class="bg-slate-50 p-6 md:p-8 border-b border-slate-200 flex gap-6 items-center">
        <img :src="tutor.image" :alt="tutor.name" class="w-20 h-20 rounded-2xl bg-white shadow-sm" />
        <div>
          <h3 class="font-bold text-xl text-slate-800">{{ tutor.name }}</h3>
          <p class="text-[#00539C] font-medium">{{ tutor.skills[0].name }}</p>
          <div class="flex gap-2 mt-2">
            <span class="text-xs px-2.5 py-1 rounded-full font-medium border bg-white border-slate-200 text-slate-600">Rp {{ tutor.rate.toLocaleString() }}/jam</span>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Durasi Belajar (Jam)</label>
            <div class="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <button @click="hours = Math.max(1, hours - 1)" class="w-10 h-10 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 font-bold">-</button>
              <span class="flex-1 text-center font-bold text-lg">{{ hours }} Jam</span>
              <button @click="hours = Math.min(10, hours + 1)" class="w-10 h-10 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 font-bold">+</button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Tanggal Mulai Sesi</label>
            <input type="date" v-model="date" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008542] outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">Catatan Khusus (Opsional)</label>
          <textarea v-model="notes" rows="3" placeholder="Contoh: Saya ingin fokus pada bab jurnal penyesuaian..." class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008542] outline-none"></textarea>
        </div>

        <div>
          <label class="block text-sm font-bold text-slate-700 mb-3">Fitur Produk Tambahan (Add-ons)</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label :class="['flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors', addonModul ? 'border-[#008542] bg-green-50' : 'border-slate-200 hover:border-[#008542]/50']">
              <input type="checkbox" v-model="addonModul" class="mt-1 w-5 h-5 accent-[#008542]" />
              <div>
                <h4 class="font-bold text-slate-800 flex items-center gap-2"><i class="ph ph-file-pdf text-[#00539C]"></i> Modul Premium</h4>
                <p class="text-xs text-slate-500 mt-1">Materi cetak/digital komprehensif.</p>
                <p class="text-sm font-bold text-[#008542] mt-2">+ Rp 25.000</p>
              </div>
            </label>

            <label :class="['flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors', addonWeekend ? 'border-[#FDB913] bg-yellow-50' : 'border-slate-200 hover:border-[#FDB913]/50']">
              <input type="checkbox" v-model="addonWeekend" class="mt-1 w-5 h-5 accent-[#FDB913]" />
              <div>
                <h4 class="font-bold text-slate-800 flex items-center gap-2"><i class="ph ph-calendar text-[#FDB913]"></i> Sesi Akhir Pekan</h4>
                <p class="text-xs text-slate-500 mt-1">Pilih jadwal di hari Sabtu/Minggu.</p>
                <p class="text-sm font-bold text-[#FDB913] mt-2">+ Rp 15.000</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Math Logic Berdasarkan WDD Bab 7.2 -->
    <div class="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
      <div class="relative z-10">
        <h3 class="font-bold text-xl mb-6 flex items-center gap-2"><i class="ph ph-credit-card"></i> Rincian Pembayaran</h3>
        <div class="space-y-4 mb-6 text-slate-300">
          <div class="flex justify-between"><span>Tarif Tutor ({{ hours }} Jam)</span><span>Rp {{ (tutor.rate * hours).toLocaleString('id-ID') }}</span></div>
          <div v-if="addonModul" class="flex justify-between text-green-300"><span>+ Modul Premium</span><span>Rp 25.000</span></div>
          <div v-if="addonWeekend" class="flex justify-between text-yellow-300"><span>+ Sesi Akhir Pekan</span><span>Rp 15.000</span></div>
          <div class="flex justify-between border-t border-slate-700 pt-4 text-white"><span>Subtotal</span><span class="font-bold">Rp {{ subtotal.toLocaleString('id-ID') }}</span></div>
          <div class="flex justify-between text-sm text-slate-400"><span>Management Fee BPUB (5%)</span><span>Rp {{ bpubFee.toLocaleString('id-ID') }}</span></div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center border-t-2 border-slate-700 pt-6 gap-6">
          <div>
            <p class="text-slate-400 text-sm mb-1">Total Keseluruhan</p>
            <span class="font-extrabold text-3xl text-[#008542] bg-white px-4 py-1 rounded-lg">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
          </div>
          <Button @click="handlePayment" customClass="w-full md:w-auto px-10 py-4 text-lg">Konfirmasi & Bayar</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MOCK_TUTORS } from '../stores/dataStore.js';
import { useOrderStore } from '../stores/orderStore.js';
import Button from '../components/common/Button.vue';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const tutor = computed(() => MOCK_TUTORS.find(t => t.id === parseInt(route.params.id)));

const hours = ref(1);
const date = ref('');
const notes = ref('');
const addonModul = ref(false);
const addonWeekend = ref(false);

const subtotal = computed(() => {
  const basePrice = tutor.value ? tutor.value.rate * hours.value : 0;
  const modulPrice = addonModul.value ? 25000 : 0;
  const weekendPrice = addonWeekend.value ? 15000 : 0;
  return basePrice + modulPrice + weekendPrice;
});

const bpubFee = computed(() => subtotal.value * 0.05);
const grandTotal = computed(() => subtotal.value + bpubFee.value);

const handlePayment = () => {
  if(!date.value) {
    alert("Silakan pilih tanggal sesi terlebih dahulu.");
    return;
  }
  
  orderStore.setOrder({
    tutor: tutor.value,
    hours: hours.value,
    date: date.value,
    notes: notes.value,
    addonModul: addonModul.value,
    totalPaid: grandTotal.value
  });
  
  router.push('/classroom');
};
</script>