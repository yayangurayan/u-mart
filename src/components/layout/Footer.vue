<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-unimed-green rounded-lg flex items-center justify-center text-white font-bold text-lg">U</div>
            <span class="font-extrabold text-xl text-slate-800 dark:text-white">U-Mart.</span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
            {{ authStore.t('Platform Ekosistem Layanan Jasa Tutor Privat Mahasiswa Terintegrasi BPUB BLU Universitas Negeri Medan.', 'Ecosystem Platform for Integrated Private Student Tutor Services BPUB BLU Universitas Negeri Medan.') }}
          </p>
        </div>
        <div>
          <h5 class="font-bold text-slate-800 dark:text-white mb-4">{{ authStore.t('Layanan', 'Services') }}</h5>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><router-link to="/shop" class="hover:text-unimed-green dark:hover:text-unimed-green">{{ authStore.t('Cari Tutor', 'Find Tutors') }}</router-link></li>
            <li><a href="#" class="hover:text-unimed-green dark:hover:text-unimed-green">{{ authStore.t('Validasi Sertifikat', 'Certificate Validation') }}</a></li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold text-slate-800 dark:text-white mb-4">{{ authStore.t('Bantuan', 'Support') }}</h5>
          <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><a href="#" class="hover:text-unimed-green dark:hover:text-unimed-green">{{ authStore.t('FAQ & Panduan', 'FAQ & Guide') }}</a></li>
            <li><a href="#" class="hover:text-unimed-green dark:hover:text-unimed-green">{{ authStore.t('Hubungi Kami', 'Contact Us') }}</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
        <p>© 2026 Tim PKM-PI U-Mart UNIMED. {{ authStore.t('Hak Cipta Dilindungi.', 'All Rights Reserved.') }}</p>
        <p>Vue 3 Production Build</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore.js';
const authStore = useAuthStore();
</script>