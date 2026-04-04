<template>
  <header class="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-[#00A651] to-[#007A3B] rounded-xl flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-105 transition-transform">U</div>
          <span class="font-extrabold text-2xl tracking-tight text-slate-800">U-Mart<span class="text-[#FDB913]">.</span></span>
        </router-link>
        
        <!-- Navigation Right -->
        <div class="flex items-center gap-1 sm:gap-4">
          <router-link to="/" class="flex items-center gap-2 p-2 sm:px-4 sm:py-2 text-slate-500 hover:text-[#00A651] hover:bg-green-50 rounded-xl transition-colors" active-class="text-[#00A651] bg-green-50 font-bold" title="Beranda Utama">
            <i class="ph ph-house text-2xl"></i>
            <span class="hidden lg:block font-medium text-sm">Beranda</span>
          </router-link>

          <!-- BUG FIXED: Fitur Keranjang Belanja Dropdown Asli -->
          <div class="relative" ref="cartRef">
            <button @click="isCartOpen = !isCartOpen" class="p-2 text-slate-400 hover:text-[#00A651] transition-colors relative hidden sm:block" title="Keranjang Belanja">
              <i class="ph ph-shopping-cart text-2xl"></i>
              <span v-if="orderStore.cart && orderStore.cart.length > 0" class="absolute top-0 right-0 w-4 h-4 bg-[#FDB913] text-[10px] font-bold text-slate-900 flex items-center justify-center rounded-full shadow-sm">{{ orderStore.cart.length }}</span>
            </button>

            <div v-if="isCartOpen" class="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-4 z-50">
              <h4 class="font-bold text-slate-800 mb-3 border-b pb-2">Keranjang Anda</h4>
              <div v-if="!orderStore.cart || orderStore.cart.length === 0" class="text-sm text-slate-500 text-center py-4">Keranjang masih kosong.</div>
              <div v-else class="space-y-3 max-h-60 overflow-y-auto pr-1">
                <div v-for="item in orderStore.cart" :key="item.id" class="flex justify-between items-center gap-3">
                  <img :src="item.image" class="w-10 h-10 rounded-full border border-slate-200" />
                  <div class="flex-1 overflow-hidden">
                    <p class="text-sm font-bold text-slate-800 truncate">{{ item.name }}</p>
                    <p class="text-xs text-[#00539C] truncate font-bold">{{ item.skills[0]?.name }}</p>
                  </div>
                  <button @click="$router.push(`/checkout/${item.id}`); isCartOpen = false" class="bg-[#00A651] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#007A3B] shadow-sm">Pesan</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Class Room Icon (Sesi Berjalan) -->
          <router-link v-if="orderStore.activeOrder" to="/classroom" class="p-2 text-[#00A651] bg-green-50 rounded-lg transition-colors relative hidden sm:block" title="Class Room Aktif">
            <i class="ph ph-chalkboard-teacher text-2xl"></i>
            <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
          </router-link>

          <div class="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

          <!-- User Dropdown Menu Terlengkap -->
          <div class="relative" ref="dropdownRef">
            <button @click="isUserMenuOpen = !isUserMenuOpen" class="flex items-center gap-2 sm:gap-3 p-1.5 pr-2 sm:pr-3 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors">
              <img :src="authStore.user?.avatar" alt="User" class="w-8 h-8 rounded-full bg-white shadow-sm" />
              <span class="font-bold text-sm hidden md:block text-slate-700">{{ authStore.user?.name }}</span>
              <i class="ph ph-caret-down text-slate-400 transition-transform" :class="{ 'rotate-180': isUserMenuOpen }"></i>
            </button>

            <div v-if="isUserMenuOpen" class="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 origin-top-right transition-all">
              <div class="px-4 py-3 border-b border-slate-50 mb-2">
                <p class="text-sm font-bold text-slate-800">{{ authStore.user?.name }}</p>
                <p class="text-xs text-slate-500 truncate">{{ authStore.user?.email }}</p>
              </div>
              <router-link to="/profile" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00A651] flex items-center gap-3 font-medium">
                <i class="ph ph-user text-lg"></i> Profil & Riwayat
              </router-link>
              <router-link to="/shop" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00A651] flex items-center gap-3 font-medium">
                <i class="ph ph-storefront text-lg"></i> Cari Tutor
              </router-link>
              <router-link to="/classroom" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00A651] flex items-center gap-3 font-medium">
                <i class="ph ph-book-open text-lg"></i> Class Room Aktif
              </router-link>
              <div class="h-px bg-slate-100 my-2"></div>
              
              <button @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#00A651] flex items-center gap-3 font-medium">
                <i class="ph ph-gear text-lg"></i> Pengaturan
              </button>
              <a href="#" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2 text-sm text-[#00539C] hover:bg-blue-50 flex items-center gap-3 font-medium">
                <i class="ph ph-discord-logo text-lg"></i> Komunitas (Discord)
              </a>
              
              <div class="h-px bg-slate-100 my-2"></div>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-bold">
                <i class="ph ph-sign-out text-lg"></i> Logout
              </button>
            </div>
          </div>

          <button class="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg ml-1" @click="$emit('toggle-menu')">
            <i class="ph ph-list text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../../stores/authStore.js';
import { useOrderStore } from '../../stores/orderStore.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const orderStore = useOrderStore();
const router = useRouter();

const isUserMenuOpen = ref(false);
const isCartOpen = ref(false);
const dropdownRef = ref(null);
const cartRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
  if (cartRef.value && !cartRef.value.contains(event.target)) {
    isCartOpen.value = false;
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