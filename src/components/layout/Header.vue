<template>
  <header class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-[#008542] to-[#006e36] rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform">U</div>
          <span class="font-extrabold text-2xl tracking-tight text-slate-800">U-Mart<span class="text-[#FDB913]">.</span></span>
        </router-link>
        
        <!-- Navigation Right -->
        <div class="flex items-center gap-2 sm:gap-6">
          <button class="p-2 text-slate-400 hover:text-[#008542] transition-colors relative">
            <i class="ph ph-bell text-2xl"></i>
            <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <router-link to="/classroom" class="p-2 text-slate-400 hover:text-[#008542] transition-colors relative hidden sm:block">
            <i class="ph ph-shopping-cart text-2xl"></i>
            <span v-if="orderStore.activeOrder" class="absolute top-0 right-0 w-4 h-4 bg-[#FDB913] text-[10px] font-bold text-slate-900 flex items-center justify-center rounded-full shadow-sm">1</span>
          </router-link>

          <div class="h-8 w-px bg-slate-200 hidden sm:block mx-2"></div>

          <!-- User Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button @click="isUserMenuOpen = !isUserMenuOpen" class="flex items-center gap-3 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors">
              <img :src="authStore.user?.avatar" alt="User" class="w-8 h-8 rounded-full bg-white shadow-sm" />
              <span class="font-bold text-sm hidden md:block text-slate-700">{{ authStore.user?.name }}</span>
              <i class="ph ph-caret-down text-slate-400 transition-transform" :class="{ 'rotate-180': isUserMenuOpen }"></i>
            </button>

            <!-- Menu Item -->
            <div v-if="isUserMenuOpen" class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2">
              <div class="px-4 py-3 border-b border-slate-50 mb-2">
                <p class="text-sm font-bold text-slate-800">{{ authStore.user?.name }}</p>
                <p class="text-xs text-slate-500 truncate">{{ authStore.user?.email }}</p>
              </div>
              <router-link to="/profile" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008542] flex items-center gap-2 font-medium">
                <i class="ph ph-user"></i> Profil & Pencapaian
              </router-link>
              <router-link to="/shop" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008542] flex items-center gap-2 font-medium">
                <i class="ph ph-storefront"></i> Cari Skill (Toko)
              </router-link>
              <router-link to="/classroom" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#008542] flex items-center gap-2 font-medium">
                <i class="ph ph-book-open"></i> Class Room / Progress
              </router-link>
              <div class="h-px bg-slate-100 my-2"></div>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold">
                <i class="ph ph-sign-out"></i> Logout
              </button>
            </div>
          </div>

          <!-- Mobile Toggle -->
          <button class="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg ml-2" @click="$emit('toggle-menu')">
            <i class="ph ph-list text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore.js';
import { useOrderStore } from '../../stores/orderStore.js';

const authStore = useAuthStore();
const orderStore = useOrderStore();
const router = useRouter();

const isUserMenuOpen = ref(false);
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const handleLogout = () => {
  authStore.logout();
  isUserMenuOpen.value = false;
  router.push('/');
};
</script>