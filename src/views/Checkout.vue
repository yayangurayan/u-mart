<template>
  <div class="max-w-3xl mx-auto pb-20">
    <div v-if="!tutor" class="text-center py-20">Memuat data tutor...</div>
    
    <div v-else>
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-800">
          <i class="ph-fill ph-shopping-cart text-[#00A651]"></i> Checkout Layanan
        </h2>
        <p class="text-slate-500 mt-2 font-medium">Selesaikan pembayaran untuk membuka akses Class Room (Fase 4 WDD).</p>
      </div>

      <div v-if="paymentSuccess" class="bg-green-50 border-l-4 border-[#00A651] p-4 rounded-r-xl mb-8">
        <div class="flex items-center gap-3">
          <i class="ph-fill ph-check-circle text-2xl text-[#00A651]"></i>
          <div>
            <h4 class="font-bold text-green-800">Pembayaran Berhasil!</h4>
            <p class="text-sm text-green-700 font-medium">Mengarahkan Anda ke Class Room dalam 2 detik...</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div class="bg-slate-50 p-6 md:p-8 border-b border-slate-200 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <img :src="tutor.image" :alt="tutor.name" class="w-20 h-20 rounded-2xl bg-white shadow-sm border-2 border-white" />
          <div class="flex-1">
            <h3 class="font-bold text-xl text-slate-800">{{ tutor.name }}</h3>
            <p class="text-[#00539C] font-bold">{{ tutor.skills[0].name }}</p>
            <p class="text-xs text-slate-500 mt-1 font-medium"><i class="ph-fill ph-map-pin text-red-500"></i> Lokasi: {{ tutor.location }}</p>
          </div>
          <span class="text-sm px-4 py-2 rounded-xl font-bold bg-white border border-slate-200 text-[#00A651] shadow-sm">
            Rp {{ tutor.rate.toLocaleString() }}/jam
          </span>
        </div>

        <div class="p-6 md:p-8 space-y-8">
          
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 text-sm font-medium flex gap-3 items-start">
            <i class="ph-fill ph-info text-xl shrink-0"></i>
            <p><strong>Informasi Paket 30 Hari:</strong> Paket belajar ini berlaku selama 30 Hari sejak dibeli. Durasi untuk setiap kali pertemuan/sesi adalah 1 hingga 3 jam sesuai kesepakatan jadwal.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-extrabold text-slate-700 mb-2">Total Akumulasi Jam</label>
              <div class="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <button @click="hours = Math.max(1, hours - 1)" class="w-10 h-10 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 font-extrabold text-lg">-</button>
                <span class="flex-1 text-center font-extrabold text-lg text-[#00A651]">{{ hours }} Jam</span>
                <button @click="hours = Math.min(20, hours + 1)" class="w-10 h-10 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 font-extrabold text-lg">+</button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-extrabold text-slate-700 mb-2">Pilih Tanggal Pertama</label>
              <select v-model="date" class="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A651] outline-none font-bold text-slate-700">
                <option value="" disabled>Pilih Jadwal Tersedia...</option>
                <option v-for="(sch, i) in (tutor.availableSchedules || ['Bebas Tentukan Nanti'])" :key="i" :value="sch">{{ sch }}</option>
              </select>
            </div>
          </div>

          <!-- Pilihan Mode Belajar (Offline / Online) -->
          <div>
            <label class="block text-sm font-extrabold text-slate-700 mb-3">Mode Belajar (Sesuai Ketersediaan Tutor)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label v-if="tutor.learningMode.includes('Online')" :class="['flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors', learningMode === 'Online' ? 'border-[#00539C] bg-blue-50' : 'border-slate-200 hover:border-slate-300']">
                <input type="radio" value="Online" v-model="learningMode" class="w-5 h-5 accent-[#00539C]" />
                <div>
                  <h4 class="font-bold text-slate-800 flex items-center gap-2"><i class="ph-fill ph-video-camera text-[#00539C]"></i> Online (GMeet)</h4>
                </div>
              </label>
              <label v-if="tutor.learningMode.includes('Offline')" :class="['flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors', learningMode === 'Offline' ? 'border-[#00A651] bg-green-50' : 'border-slate-200 hover:border-slate-300']">
                <input type="radio" value="Offline" v-model="learningMode" class="w-5 h-5 accent-[#00A651]" />
                <div>
                  <h4 class="font-bold text-slate-800 flex items-center gap-2"><i class="ph-fill ph-map-pin text-[#00A651]"></i> Offline (Tatap Muka)</h4>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-extrabold text-slate-700 mb-2">Catatan Khusus (Opsional)</label>
            <textarea v-model="notes" rows="2" placeholder="Contoh: Jika offline, saya ingin di Perpus Unimed..." class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A651] outline-none font-medium"></textarea>
          </div>

          <div class="pt-6 border-t border-slate-200">
            <label class="block text-sm font-extrabold text-slate-700 mb-3">Metode Pembayaran</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button @click="paymentMethod = 'qris'" :class="['py-3 rounded-xl border-2 font-extrabold text-sm transition-colors', paymentMethod === 'qris' ? 'border-[#FDB913] bg-yellow-50 text-slate-800' : 'border-slate-200 text-slate-500 hover:bg-slate-50']">QRIS / E-Wallet</button>
              <button @click="paymentMethod = 'tf'" :class="['py-3 rounded-xl border-2 font-extrabold text-sm transition-colors', paymentMethod === 'tf' ? 'border-[#00A651] bg-green-50 text-[#00A651]' : 'border-slate-200 text-slate-500 hover:bg-slate-50']">Virtual Account</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Menghapus Addons Modul dari Rincian (Sesuai Permintaan) -->
      <div class="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <h3 class="font-bold text-xl mb-6 flex items-center gap-2"><i class="ph-fill ph-receipt text-[#FDB913]"></i> Rincian Tagihan</h3>
          <div class="space-y-4 mb-6 text-slate-300 font-medium">
            <div class="flex justify-between"><span>Tarif Tutor ({{ hours }} Jam)</span><span>Rp {{ (tutor.rate * hours).toLocaleString('id-ID') }}</span></div>
            <div class="flex justify-between border-t border-slate-700 pt-4 text-white"><span>Subtotal</span><span class="font-bold">Rp {{ subtotal.toLocaleString('id-ID') }}</span></div>
            <div class="flex justify-between text-sm text-slate-400"><span>Management Fee BPUB (5%)</span><span>Rp {{ bpubFee.toLocaleString('id-ID') }}</span></div>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-center border-t-2 border-slate-700 pt-6 gap-6">
            <div>
              <p class="text-slate-400 text-sm mb-1 font-bold">Total Keseluruhan</p>
              <span class="font-extrabold text-3xl text-[#00A651] bg-white px-4 py-1.5 rounded-xl border-2 border-slate-200 shadow-sm">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
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
const learningMode = ref(tutor.value?.learningMode[0] || 'Online');
const paymentMethod = ref('qris');
const paymentSuccess = ref(false);

const subtotal = computed(() => tutor.value ? tutor.value.rate * hours.value : 0);
const bpubFee = computed(() => subtotal.value * 0.05);
const grandTotal = computed(() => subtotal.value + bpubFee.value);

const handlePayment = () => {
  if(!date.value) return alert("Silakan pilih tanggal pertama sesi terlebih dahulu.");
  
  paymentSuccess.value = true;
  orderStore.setOrder({
    tutor: tutor.value,
    hours: hours.value,
    date: date.value,
    notes: notes.value,
    learningMode: learningMode.value,
    totalPaid: grandTotal.value,
    status: 'Berjalan'
  });
  
  setTimeout(() => router.push('/classroom'), 2000);
};
</script>