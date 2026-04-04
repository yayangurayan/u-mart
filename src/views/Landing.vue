<template>
  <div class="space-y-16 md:space-y-24 pb-20">
    <div class="relative bg-unimed-green rounded-3xl overflow-hidden shadow-2xl animate-in fade-in">
      <div class="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=pattern&backgroundColor=0e6e7a')] opacity-20"></div>
      <div class="relative p-6 md:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 text-white z-10 text-center lg:text-left">
          <span class="inline-block text-xs px-3 py-1.5 rounded-full font-bold border bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">{{ authStore.t('Platform Layanan Jasa Tutor Mahasiswa', 'Student Tutor Service Platform') }}</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            {{ authStore.t('Tingkatkan Keahlian Bersama', 'Improve Skills With') }} <span class="text-unimed-yellow">{{ authStore.t('Mahasiswa Terbaik UNIMED', 'UNIMED Best Students') }}</span>
          </h1>
          <p class="text-green-50 text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {{ authStore.t('U-Mart hadir mengoptimalkan potensi mahasiswa menjadi mentor tersertifikasi untuk kebutuhan akademik dan karir Anda.', 'U-Mart is here to optimize student potential to become certified mentors for your academic and career needs.') }}
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button variant="secondary" @click="$router.push('/shop')" customClass="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto">{{ authStore.t('Mulai Cari Tutor', 'Start Finding Tutors') }}</Button>
          </div>
        </div>
        
        <div class="flex-1 w-full z-10">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group cursor-pointer border-4 border-white/20">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Video Cover" class="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-unimed-yellow rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <i class="ph-fill ph-play text-2xl md:text-3xl text-slate-900 ml-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Terdekat -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-gradient-to-r from-unimed-yellow to-yellow-400 rounded-3xl p-8 md:p-10 shadow-lg text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow cursor-pointer" @click="searchNearby">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-3">
            <i class="ph-fill ph-map-pin text-unimed-green text-4xl"></i> {{ authStore.t('Ayo Cari Guru Terdekat!', 'Find Nearby Tutors!') }}
          </h2>
          <p class="text-slate-800 font-medium mb-1">{{ authStore.t('Temukan tutor UNIMED di sekitar domisili Anda untuk kenyamanan belajar Offline / Tatap Muka.', 'Find UNIMED tutors around your domicile for convenient Offline learning.') }}</p>
        </div>
        <Button variant="primary" customClass="whitespace-nowrap px-8 py-4 shadow-xl">{{ authStore.t('Aktifkan GPS', 'Activate GPS') }}</Button>
      </div>
    </div>

    <div class="bg-slate-50 dark:bg-slate-800 py-16 px-4 rounded-3xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-4">{{ authStore.t('Pengembang U-Mart', 'U-Mart Developers') }}</h2>
        <p class="text-slate-500 dark:text-slate-400">Tim PKM-PI Kolaborasi Ilmu Ekonomi & Pendidikan TIK UNIMED</p>
      </div>
      <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        <div v-for="(member, i) in teamMembers" :key="i" class="text-center w-36">
          <div class="w-24 h-24 mx-auto bg-white dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-600 shadow-md overflow-hidden mb-4 hover:scale-110 transition-transform duration-300">
            <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name.split(' ')[0]}&backgroundColor=e2e8f0`" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <h4 class="font-bold text-slate-800 dark:text-white text-sm leading-tight">{{ member.name }}</h4>
          <p class="text-xs text-unimed-green font-bold mt-1 leading-tight">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/common/Button.vue';
import { TEAM_MEMBERS } from '../stores/dataStore.js';
import { useAuthStore } from '../stores/authStore.js';

const router = useRouter();
const authStore = useAuthStore();
const teamMembers = ref(TEAM_MEMBERS);

const searchNearby = () => {
  alert(authStore.t("Meminta akses lokasi GPS...", "Requesting GPS access..."));
  router.push({ path: '/shop', query: { sort: 'distance' } });
};
</script>