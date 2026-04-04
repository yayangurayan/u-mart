<template>
  <div class="max-w-4xl mx-auto pb-20 animate-in fade-in">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold flex items-center gap-3 text-slate-800 dark:text-white">
        <i class="ph-fill ph-gear text-unimed-green"></i> 
        {{ authStore.language === 'id' ? 'Pengaturan Akun' : 'Account Settings' }}
      </h2>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">
        {{ authStore.language === 'id' ? 'Sesuaikan preferensi aplikasi dan bahasa sesuai kenyamanan Anda.' : 'Customize app preferences and language to your comfort.' }}
      </p>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      <!-- Toggle Dark Mode -->
      <div class="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 class="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <i class="ph-fill ph-moon text-unimed-blue"></i> Tema Aplikasi (Dark Mode)
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Ubah tampilan menjadi gelap untuk kenyamanan mata di malam hari.</p>
        </div>
        <button 
          @click="authStore.toggleTheme()" 
          :class="['relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-unimed-green focus:ring-offset-2', authStore.theme === 'dark' ? 'bg-unimed-green' : 'bg-slate-300']"
        >
          <span :class="['inline-block h-6 w-6 transform rounded-full bg-white transition-transform', authStore.theme === 'dark' ? 'translate-x-7' : 'translate-x-1']"></span>
        </button>
      </div>

      <!-- Toggle Bahasa -->
      <div class="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 class="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <i class="ph-fill ph-translate text-unimed-yellow"></i> Bahasa (Language)
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Pilih bahasa yang akan digunakan pada antarmuka aplikasi.</p>
        </div>
        <div class="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
          <button 
            @click="authStore.language = 'id'"
            :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', authStore.language === 'id' ? 'bg-white dark:bg-slate-600 text-unimed-green shadow-sm' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700']"
          >
            Indonesia
          </button>
          <button 
            @click="authStore.language = 'en'"
            :class="['px-4 py-2 rounded-lg text-sm font-bold transition-all', authStore.language === 'en' ? 'bg-white dark:bg-slate-600 text-unimed-green shadow-sm' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700']"
          >
            English
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore.js';

const authStore = useAuthStore();
</script>