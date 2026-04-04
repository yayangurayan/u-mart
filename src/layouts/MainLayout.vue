<template>
  <!-- Menambahkan transisi dark mode ke seluruh aplikasi -->
  <div class="min-h-screen font-sans flex flex-col selection:bg-unimed-green selection:text-white transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    
    <!-- Menggunakan penamaan AppHeader agar terhindar dari bug bentrok tag HTML -->
    <AppHeader />

    <!-- Main Content Area -->
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
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';
// Hamburger & Drawer Mobile dihapus sesuai instruksi karena redundan dengan Profil Logo
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(5px); }
</style>