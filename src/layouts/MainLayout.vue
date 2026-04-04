<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-[#00A651] selection:text-white">
    <!-- BUG FIXED: Menggunakan AppHeader agar tidak bentrok dengan tag HTML standar <header> -->
    <AppHeader @toggle-menu="isMenuOpen = !isMenuOpen" />
    
    <!-- Mobile Drawer -->
    <div v-if="isMenuOpen" class="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" @click="isMenuOpen = false">
      <div class="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6 flex flex-col gap-2" @click.stop>
        <div class="flex justify-between items-center mb-8">
          <span class="font-extrabold text-xl">Menu Utama</span>
          <button @click="isMenuOpen = false"><i class="ph ph-x text-xl text-slate-400"></i></button>
        </div>
        <router-link to="/" @click="isMenuOpen = false" class="text-left font-bold py-3 text-slate-600 hover:text-[#00A651]">Beranda</router-link>
        <router-link to="/profile" @click="isMenuOpen = false" class="text-left font-bold py-3 text-slate-600 hover:text-[#00A651]">Profil & Pencapaian</router-link>
        <router-link to="/shop" @click="isMenuOpen = false" class="text-left font-bold py-3 text-slate-600 hover:text-[#00A651]">Cari Tutor (Toko)</router-link>
        <router-link to="/classroom" @click="isMenuOpen = false" class="text-left font-bold py-3 text-slate-600 hover:text-[#00A651]">Class Room</router-link>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- BUG FIXED: Menggunakan wrapper <div> transisi standar Vue -->
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
import { ref } from 'vue';
import AppHeader from '../components/layout/Header.vue';
import AppFooter from '../components/layout/Footer.vue';

const isMenuOpen = ref(false);
</script>

<style>
/* Menggantikan v-motion dengan animasi CSS Murni yang 100% stabil */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>