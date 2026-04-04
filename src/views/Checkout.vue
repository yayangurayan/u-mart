<template>
  <div class="max-w-3xl mx-auto pb-20">
    <div v-if="!tutor" class="text-center py-20">Memuat data tutor...</div>
    
    <div v-else>
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-800">
          <i class="ph-fill ph-shopping-cart text-[#008542]"></i> Checkout Layanan
        </h2>
        <p class="text-slate-500 mt-2">Selesaikan pembayaran untuk membuka akses Class Room (Fase 4 WDD).</p>
      </div>

      <!-- Payment Success Alert -->
      <div v-if="paymentSuccess" class="bg-green-50 border-l-4 border-[#008542] p-4 rounded-r-xl mb-8">
        <div class="flex items-center gap-3">
          <i class="ph-fill ph-check-circle text-2xl text-[#008542]"></i>
          <div>
            <h4 class="font-bold text-green-800">Pembayaran Berhasil!</h4>
            <p class="text-sm text-green-700">Mengarahkan Anda ke Class Room dalam 2 detik...</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div class="bg-slate-50 p-6 md:p-8 border-b border-slate-200 flex gap-6 items-center">
          <img :src="tutor.image" :alt="tutor.name" class="w-20 h-20 rounded-2xl bg-white shadow-sm" />
          <div>
            <h3 class="font-bold text-xl text-slate-800">{{ tutor.name }}</h3>
            <p class="text-[#00539C] font-medium">{{ tutor.skills[0].name }}</p>
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
              <label class="block text-sm font-bold text-slate-700 mb-2">Pilih Tanggal Tersedia</label>
              <select v-model="date" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#008542] outline-none">
                <option value="" disabled>Pilih Jadwal...</option>
                <!-- Menangani Error jika availableSchedules tidak ada di mock data lama -->
                <option v-for="(sch, i) in (tutor.availableSchedules || ['Segera Tentukan'])" :key="i" :value="sch">{{ sch }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-3">Pilih Add-ons</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label :class="['flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors', addonModul ? 'border-[#008542] bg-green-50' : 'border-slate-200 hover:border-[#008542]/50']">
                <input type="checkbox" v-model="addonModul" class="mt-1 w-5 h-5 accent-[#008542]" />
                <div>
                  <h4 class="font-bold text-slate-800 flex items-center gap-2"><i class="ph ph-file-pdf text-[#00539C]"></i> Modul Premium</h4>
                  <p class="text-sm font-bold text-[#008542] mt-2">+ Rp 25.000</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Midtrans/Xendit Simulation -->
          <div class="pt-6 border-t border-slate-100">
            <label class="block text-sm font-bold text-slate-700 mb-3">Metode Pembayaran</label>
            <div class="grid grid-cols-3 gap-3">
              <button @click="paymentMethod = 'qris'" :class="['py-3 rounded-xl border-2 font-bold text-sm transition-colors', paymentMethod === 'qris' ? 'border-[#FDB913] bg-yellow-50 text-slate-800' : 'border-slate-200 text-slate-500 hover:border-slate-300']">QRIS</button>
              <button @click="paymentMethod = 'tf'" :class="['py-3 rounded-xl border-2 font-bold text-sm transition-colors', paymentMethod === 'tf' ? 'border-[#008542] bg-green-50 text-[#008542]' : 'border-slate-200 text-slate-500 hover:border-slate-300']">Virtual Account</button>
              <button @click="paymentMethod = 'ewallet'" :class="['py-3 rounded-xl border-2 font-bold text-sm transition-colors', paymentMethod === 'ewallet' ? 'border-[#00539C] bg-blue-50 text-[#00539C]' : 'border-slate-200 text-slate-500 hover:border-slate-300']">E-Wallet</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Math Logic Berdasarkan WDD Bab 7.2 -->
      <div class="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <h3 class="font-bold text-xl mb-6 flex items-center gap-2"><i class="ph ph-receipt"></i> Rincian Tagihan</h3>
          <div class="space-y-4 mb-6 text-slate-300">
            <div class="flex justify-between"><span>Tarif Tutor ({{ hours }} Jam)</span><span>Rp {{ (tutor.rate * hours).toLocaleString('id-ID') }}</span></div>
            <div v-if="addonModul" class="flex justify-between text-green-300"><span>+ Modul Premium</span><span>Rp 25.000</span></div>
            <div class="flex justify-between border-t border-slate-700 pt-4 text-white"><span>Subtotal</span><span class="font-bold">Rp {{ subtotal.toLocaleString('id-ID') }}</span></div>
            <div class="flex justify-between text-sm text-slate-400"><span>Management Fee BPUB (5%)</span><span>Rp {{ bpubFee.toLocaleString('id-ID') }}</span></div>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-center border-t-2 border-slate-700 pt-6 gap-6">
            <div>
              <p class="text-slate-400 text-sm mb-1">Total Keseluruhan</p>
              <span class="font-extrabold text-3xl text-[#008542] bg-white px-4 py-1 rounded-lg">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
            </div>
            <Button @click="handlePayment" :disabled="paymentSuccess" customClass="w-full md:w-auto px-10 py-4 text-lg">
              {{ paymentSuccess ? 'Memproses...' : 'Bayar Sekarang' }}
            </Button>
          </div>
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
const paymentMethod = ref('qris');
const paymentSuccess = ref(false);

const subtotal = computed(() => {
  const basePrice = tutor.value ? tutor.value.rate * hours.value : 0;
  const modulPrice = addonModul.value ? 25000 : 0;
  return basePrice + modulPrice;
});

const bpubFee = computed(() => subtotal.value * 0.05);
const grandTotal = computed(() => subtotal.value + bpubFee.value);

const handlePayment = () => {
  if(!date.value) {
    alert("Silakan pilih tanggal sesi terlebih dahulu.");
    return;
  }
  
  paymentSuccess.value = true;
  
  orderStore.setOrder({
    tutor: tutor.value,
    hours: hours.value,
    date: date.value,
    notes: notes.value,
    addonModul: addonModul.value,
    totalPaid: grandTotal.value,
    status: 'Berjalan'
  });
  
  setTimeout(() => {
    router.push('/classroom');
  }, 2000);
};
</script>