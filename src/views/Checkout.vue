<template>
  <div class="max-w-3xl mx-auto pb-20 animate-in fade-in">
    <div v-if="!tutor" class="text-center py-20 text-slate-500 dark:text-slate-400">{{ authStore.t('Memuat data tutor...', 'Loading tutor data...') }}</div>
    
    <div v-else>
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
          <i class="ph-fill ph-shopping-cart text-unimed-green"></i> {{ authStore.t('Checkout Layanan', 'Service Checkout') }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">{{ authStore.t('Selesaikan pembayaran untuk membuka akses Class Room.', 'Complete payment to unlock Class Room access.') }}</p>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 transition-colors duration-300">
        
        <!-- Tata Letak Mobile Diperbaiki: flex-col pada layar kecil -->
        <div class="bg-slate-50 dark:bg-slate-700/50 p-6 md:p-8 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <img :src="tutor.image" :alt="tutor.name" class="w-20 h-20 rounded-2xl bg-white shadow-sm border-2 border-white dark:border-slate-600" />
          <div class="flex-1">
            <h3 class="font-bold text-xl text-slate-800 dark:text-white">{{ tutor.name }}</h3>
            <p class="text-unimed-blue dark:text-blue-400 font-bold">{{ tutor.skills[0].name }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium"><i class="ph-fill ph-map-pin text-red-500"></i> {{ authStore.t('Lokasi', 'Location') }}: {{ tutor.location }}</p>
          </div>
          <span class="text-sm px-4 py-2 rounded-xl font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-unimed-green shadow-sm w-full sm:w-auto">
            Rp {{ tutor.rate.toLocaleString() }}/jam
          </span>
        </div>

        <div class="p-6 md:p-8 space-y-8">
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-blue-800 dark:text-blue-200 text-sm font-medium flex gap-3 items-start">
            <i class="ph-fill ph-info text-xl shrink-0"></i>
            <p><strong>{{ authStore.t('Informasi Paket:', 'Package Info:') }}</strong> {{ authStore.t('Paket belajar ini berlaku selama 30 Hari sejak dibeli. Durasi untuk setiap kali pertemuan/sesi adalah 1 hingga 3 jam sesuai kesepakatan jadwal.', 'This study package is valid for 30 Days after purchase. Session duration is 1-3 hours per meeting.') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="w-full">
              <label class="block text-sm font-extrabold text-slate-700 dark:text-slate-300 mb-2">{{ authStore.t('Total Akumulasi Jam', 'Total Accumulation Hours') }}</label>
              <div class="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-700 p-2 rounded-xl border border-slate-200 dark:border-slate-600 w-full">
                <button @click="hours = Math.max(1, hours - 1)" class="w-10 h-10 bg-white dark:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-500 font-extrabold text-lg dark:text-white">-</button>
                <span class="flex-1 text-center font-extrabold text-lg text-unimed-green">{{ hours }} {{ authStore.t('Jam', 'Hours') }}</span>
                <button @click="hours = Math.min(20, hours + 1)" class="w-10 h-10 bg-white dark:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-500 font-extrabold text-lg dark:text-white">+</button>
              </div>
            </div>
            <div class="w-full">
              <label class="block text-sm font-extrabold text-slate-700 dark:text-slate-300 mb-2">{{ authStore.t('Pilih Tanggal Pertama', 'Select First Date') }}</label>
              <select v-model="date" class="w-full p-3.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-unimed-green outline-none font-bold text-slate-700 dark:text-white">
                <option value="" disabled>{{ authStore.t('Pilih Jadwal Tersedia...', 'Select Available Schedule...') }}</option>
                <option v-for="(sch, i) in (tutor.availableSchedules || ['Bebas Tentukan Nanti'])" :key="i" :value="sch">{{ sch }}</option>
              </select>
            </div>
          </div>

          <div class="w-full">
            <label class="block text-sm font-extrabold text-slate-700 dark:text-slate-300 mb-3">{{ authStore.t('Mode Belajar', 'Learning Mode') }}</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <label v-if="tutor.learningMode.includes('Online')" :class="['flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors w-full', learningMode === 'Online' ? 'border-[#00539C] bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300']">
                <input type="radio" value="Online" v-model="learningMode" class="w-5 h-5 accent-[#00539C]" />
                <h4 class="font-bold text-slate-800 dark:text-white flex items-center gap-2"><i class="ph-fill ph-video-camera text-[#00539C]"></i> Online (GMeet)</h4>
              </label>
              <label v-if="tutor.learningMode.includes('Offline')" :class="['flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors w-full', learningMode === 'Offline' ? 'border-unimed-green bg-green-50 dark:bg-green-900/20' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300']">
                <input type="radio" value="Offline" v-model="learningMode" class="w-5 h-5 accent-unimed-green" />
                <h4 class="font-bold text-slate-800 dark:text-white flex items-center gap-2"><i class="ph-fill ph-map-pin text-unimed-green"></i> Offline (Tatap Muka)</h4>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div class="relative z-10">
          <h3 class="font-bold text-xl mb-6 flex items-center gap-2"><i class="ph-fill ph-receipt text-unimed-yellow"></i> {{ authStore.t('Rincian Tagihan', 'Billing Details') }}</h3>
          <div class="space-y-4 mb-6 text-slate-300 font-medium w-full">
            <div class="flex justify-between w-full"><span>{{ authStore.t('Tarif Tutor', 'Tutor Rate') }} ({{ hours }} Jam)</span><span>Rp {{ (tutor.rate * hours).toLocaleString('id-ID') }}</span></div>
            <div class="flex justify-between w-full border-t border-slate-700 pt-4 text-white"><span>Subtotal</span><span class="font-bold">Rp {{ subtotal.toLocaleString('id-ID') }}</span></div>
            <div class="flex justify-between w-full text-sm text-slate-400"><span>Management Fee BPUB (5%)</span><span>Rp {{ bpubFee.toLocaleString('id-ID') }}</span></div>
          </div>

          <!-- Perbaikan Layout Total Pembayaran & Tombol di Mobile -->
          <div class="flex flex-col md:flex-row justify-between md:items-center border-t-2 border-slate-700 pt-6 gap-6 w-full">
            <div class="w-full md:w-auto text-center md:text-left">
              <p class="text-slate-400 text-sm mb-2 font-bold">{{ authStore.t('Total Keseluruhan', 'Grand Total') }}</p>
              <span class="font-extrabold text-2xl md:text-3xl text-unimed-green bg-white px-4 py-2 rounded-xl border-2 border-slate-200 shadow-sm block md:inline-block w-full md:w-auto">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
            </div>
            <Button @click="handlePayment" :disabled="paymentSuccess" customClass="w-full md:w-auto px-10 py-4 text-lg">
              {{ paymentSuccess ? authStore.t('Memproses...', 'Processing...') : authStore.t('Bayar Sekarang', 'Pay Now') }}
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
import { useAuthStore } from '../stores/authStore.js';
import Button from '../components/common/Button.vue';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();
const authStore = useAuthStore();

const tutor = computed(() => MOCK_TUTORS.find(t => t.id === parseInt(route.params.id)));

const hours = ref(1);
const date = ref('');
const learningMode = ref(tutor.value?.learningMode[0] || 'Online');
const paymentSuccess = ref(false);

const subtotal = computed(() => tutor.value ? tutor.value.rate * hours.value : 0);
const bpubFee = computed(() => subtotal.value * 0.05);
const grandTotal = computed(() => subtotal.value + bpubFee.value);

const handlePayment = () => {
  if(!date.value) return alert(authStore.t("Silakan pilih tanggal pertama sesi terlebih dahulu.", "Please select first session date."));
  
  paymentSuccess.value = true;
  orderStore.setOrder({
    tutor: tutor.value,
    hours: hours.value,
    date: date.value,
    learningMode: learningMode.value,
    totalPaid: grandTotal.value,
    status: 'Berjalan'
  });
  
  setTimeout(() => router.push('/classroom'), 1500);
};
</script>