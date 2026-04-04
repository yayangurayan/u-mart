<template>
  <div class="min-h-screen font-sans flex flex-col selection:bg-unimed-green selection:text-white transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <AppHeader />

    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
import { useAuthStore } from '../stores/authStore.js';

const authStore = useAuthStore();

// BUG FIXED: Memaksa DOM HTML menyesuaikan dengan state theme pada saat dimuat
onMounted(() => {
  authStore.applyTheme();
});
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(5px); }
</style>