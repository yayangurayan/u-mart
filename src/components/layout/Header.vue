<template>
  <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <img src="./logo.png" alt="U-Mart Logo" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
          <span class="font-bold text-xl text-unimed-green hidden sm:block">U-Mart</span>
        </router-link>

        <!-- Navigation Right -->
        <div class="flex items-center gap-2 sm:gap-4">
          <router-link to="/" class="flex items-center gap-2 p-2 sm:px-4 sm:py-2 text-slate-500 dark:text-slate-400 hover:text-unimed-green dark:hover:text-unimed-green hover:bg-green-50 dark:hover:bg-slate-800 rounded-xl transition-colors" active-class="text-unimed-green bg-green-50 dark:bg-slate-800 font-bold" :title="authStore.t('Beranda', 'Home')">
            <i class="ph ph-house text-2xl"></i>
            <span class="hidden lg:block font-medium text-sm">{{ authStore.t('Beranda', 'Home') }}</span>
          </router-link>

          <!-- Fitur Notifikasi Sederhana -->
          <div class="relative" ref="notifRef">
            <button @click="isNotifOpen = !isNotifOpen" class="p-2 text-slate-400 dark:text-slate-400 hover:text-unimed-green transition-colors relative" :title="authStore.t('Notifikasi', 'Notifications')">
              <i class="ph ph-bell text-2xl"></i>
              <span v-if="notifications.length > 0" class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>

            <!-- Penyesuaian posisi dropdown di mobile -->
            <div v-if="isNotifOpen" class="absolute -right-8 sm:right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-3 px-4 z-50">
              <h4 class="font-bold text-slate-800 dark:text-white mb-3 border-b dark:border-slate-700 pb-2">{{ authStore.t('Notifikasi', 'Notifications') }}</h4>
              <div v-if="notifications.length === 0" class="text-sm text-slate-500 dark:text-slate-400 text-center py-4">{{ authStore.t('Tidak ada notifikasi.', 'No notifications.') }}</div>
              <div v-else class="space-y-3 max-h-60 overflow-y-auto pr-1">
                <div v-for="notif in notifications" :key="notif.id" class="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-700 pb-2 last:border-0 last:pb-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg cursor-pointer transition-colors">
                  <p class="text-sm font-bold text-slate-800 dark:text-white">{{ notif.title }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ notif.desc }}</p>
                  <span class="text-[10px] text-unimed-green font-bold">{{ notif.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BUG FIXED: Fitur Keranjang Belanja (Class hidden dihapus agar tampil di Mobile) -->
          <div class="relative" ref="cartRef">
            <button @click="isCartOpen = !isCartOpen" class="p-2 text-slate-400 dark:text-slate-400 hover:text-unimed-green transition-colors relative block" :title="authStore.t('Keranjang', 'Cart')">
              <i class="ph ph-shopping-cart text-2xl"></i>
              <span v-if="orderStore.cart && orderStore.cart.length > 0" class="absolute top-0 right-0 w-4 h-4 bg-unimed-yellow text-[10px] font-bold text-slate-900 flex items-center justify-center rounded-full shadow-sm">{{ orderStore.cart.length }}</span>
            </button>

            <!-- Penyesuaian posisi dropdown di mobile agar tidak keluar layar (-right-16) -->
            <div v-if="isCartOpen" class="absolute -right-16 sm:right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-3 px-4 z-50">
              <h4 class="font-bold text-slate-800 dark:text-white mb-3 border-b dark:border-slate-700 pb-2">{{ authStore.t('Keranjang Anda', 'Your Cart') }}</h4>
              <div v-if="!orderStore.cart || orderStore.cart.length === 0" class="text-sm text-slate-500 dark:text-slate-400 text-center py-4">{{ authStore.t('Keranjang kosong.', 'Cart is empty.') }}</div>
              <div v-else class="space-y-3 max-h-60 overflow-y-auto pr-1">
                <div v-for="item in orderStore.cart" :key="item.id" class="flex justify-between items-center gap-3">
                  <img :src="item.image" class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600" />
                  <div class="flex-1 overflow-hidden">
                    <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ item.name }}</p>
                  </div>
                  <button @click="$router.push(`/checkout/${item.id}`); isCartOpen = false" class="bg-unimed-green text-white text-xs px-3 py-1.5 rounded-lg hover:bg-unimed-dark font-bold">{{ authStore.t('Pesan', 'Order') }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BUG FIXED: Indikator Kelas Sedang Aktif (Class hidden dihapus agar tampil di Mobile) -->
          <router-link v-if="orderStore.activeOrder" to="/classroom" class="p-2 text-unimed-green bg-green-50 dark:bg-green-900/30 rounded-lg transition-colors relative block" :title="authStore.t('Class Room Aktif', 'Active Classroom')">
            <i class="ph ph-chalkboard-teacher text-2xl"></i>
            <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
          </router-link>

          <div class="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1"></div>

          <!-- User Dropdown Menu -->
          <div class="relative" ref="dropdownRef">
            <button @click="isUserMenuOpen = !isUserMenuOpen" class="flex items-center gap-2 sm:gap-3 p-1.5 pr-2 sm:pr-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 transition-colors">
              <img :src="authStore.user?.avatar" alt="User" class="w-8 h-8 rounded-full bg-white shadow-sm" />
              <span class="font-bold text-sm hidden md:block text-slate-700 dark:text-slate-200">{{ authStore.user?.name }}</span>
              <i class="ph ph-caret-down text-slate-400 dark:text-slate-300 transition-transform" :class="{ 'rotate-180': isUserMenuOpen }"></i>
            </button>

            <div v-if="isUserMenuOpen" class="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 origin-top-right transition-all z-50">
              <div class="px-4 py-3 border-b border-slate-50 dark:border-slate-700 mb-2">
                <p class="text-sm font-bold text-slate-800 dark:text-white">{{ authStore.user?.name }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ authStore.user?.email }}</p>
              </div>
              <router-link to="/profile" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-unimed-green dark:hover:text-unimed-green flex items-center gap-3 font-medium transition-colors">
                <i class="ph ph-user text-xl text-slate-400"></i> {{ authStore.t('Profil & Riwayat', 'Profile & History') }}
              </router-link>
              <router-link to="/shop" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-unimed-green dark:hover:text-unimed-green flex items-center gap-3 font-medium transition-colors">
                <i class="ph ph-storefront text-xl text-slate-400"></i> {{ authStore.t('Cari Tutor (Toko)', 'Find Tutor (Shop)') }}
              </router-link>
              <router-link to="/classroom" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-unimed-green dark:hover:text-unimed-green flex items-center gap-3 font-medium transition-colors">
                <i class="ph ph-chalkboard-teacher text-xl text-slate-400"></i> {{ authStore.t('Class Room Aktif', 'Active Class Room') }}
              </router-link>
              
              <div class="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
              
              <router-link to="/settings" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-unimed-green dark:hover:text-unimed-green flex items-center gap-3 font-medium transition-colors">
                <i class="ph ph-gear text-xl text-slate-400"></i> {{ authStore.t('Pengaturan', 'Settings') }}
              </router-link>
              <a href="https://wa.me/" target="_blank" @click="isUserMenuOpen = false" class="w-full text-left px-4 py-2.5 text-sm text-unimed-green hover:bg-green-50 dark:hover:bg-slate-700 flex items-center gap-3 font-bold transition-colors">
                <i class="ph ph-whatsapp-logo text-xl"></i> {{ authStore.t('Komunitas (WhatsApp)', 'Community (WhatsApp)') }}
              </a>
              
              <div class="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
              <button @click="handleLogout" class="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 font-bold transition-colors">
                <i class="ph ph-sign-out text-xl"></i> {{ authStore.t('Keluar', 'Logout') }}
              </button>
            </div>
          </div>
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
const isNotifOpen = ref(false);

const dropdownRef = ref(null);
const cartRef = ref(null);
const notifRef = ref(null);

const notifications = ref([
  { id: 1, title: authStore.t('Selamat datang di U-Mart!', 'Welcome to U-Mart!'), desc: authStore.t('Temukan tutor impianmu sekarang.', 'Find your dream tutor now.'), time: 'Baru saja' },
  { id: 2, title: authStore.t('Diskon Spesial 10%', 'Special 10% Discount'), desc: authStore.t('Gunakan kupon UMART10 pada saat checkout.', 'Use UMART10 coupon at checkout.'), time: '2 jam lalu' }
]);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) isUserMenuOpen.value = false;
  if (cartRef.value && !cartRef.value.contains(event.target)) isCartOpen.value = false;
  if (notifRef.value && !notifRef.value.contains(event.target)) isNotifOpen.value = false;
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const handleLogout = () => {
  authStore.logout();
  isUserMenuOpen.value = false;
  router.push('/');
};
</script>