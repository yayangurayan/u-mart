<template>
  <div class="pb-20 px-4 md:px-0 animate-in fade-in">
    <div class="mb-6 md:mb-8">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">{{ authStore.t('Dashboard Pengguna', 'User Dashboard') }}</h2>
      <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{{ authStore.t('Kelola informasi pribadi, riwayat pesanan, dan lencana keahlian Anda.', 'Manage personal information, order history, and your skill badges.') }}</p>
    </div>

    <!-- Onboarding Guide untuk User Baru yang Lengkap Lencananya -->
    <div v-if="orderStore.orderHistory.length === 0" class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 border border-unimed-green/30 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-colors">
      <div class="flex-1">
        <h3 class="text-xl font-extrabold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
          <i class="ph-fill ph-hand-waving text-[#FDB913] text-2xl"></i> {{ authStore.t('Selamat Datang di U-Mart!', 'Welcome to U-Mart!') }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 mb-5 font-medium">{{ authStore.t('Anda belum memiliki riwayat kelas. Ikuti 3 langkah mudah ini:', 'You have no class history. Follow these 3 easy steps:') }}</p>
        <div class="flex flex-col sm:flex-row gap-5 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200">
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-unimed-green text-white flex items-center justify-center shadow-sm">1</div> {{ authStore.t('Cari Tutor di Toko', 'Find Tutor in Shop') }}</div>
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-unimed-green text-white flex items-center justify-center shadow-sm">2</div> {{ authStore.t('Pesan & Atur Jadwal', 'Book & Schedule') }}</div>
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-unimed-green text-white flex items-center justify-center shadow-sm">3</div> {{ authStore.t('Dapatkan Lencana', 'Earn Badges') }}</div>
        </div>
      </div>
      <Button @click="$router.push('/shop')" customClass="whitespace-nowrap shadow-lg w-full sm:w-auto py-4 px-8 text-base">{{ authStore.t('Cari Kelas Pertama', 'Find First Class') }}</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 text-center relative overflow-hidden transition-colors">
          <div class="absolute top-0 left-0 w-full h-28 md:h-32 bg-gradient-to-b from-unimed-green/20 to-transparent -z-10"></div>
          <img :src="authStore.user?.avatar" alt="Profile" class="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-white dark:border-slate-800 shadow-lg mb-4 bg-white dark:bg-slate-700" />
          <h3 class="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">{{ authStore.user?.name }}</h3>
          <p class="text-sm md:text-base text-unimed-blue dark:text-blue-400 font-bold mb-6">{{ authStore.user?.role }} / {{ authStore.user?.major }}</p>
          
          <div class="flex justify-center gap-4 text-sm mb-6 md:mb-8">
            <div class="bg-slate-50 dark:bg-slate-700/50 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600">
              <span class="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">IPK</span>
              <span class="font-extrabold text-slate-800 dark:text-white text-lg">{{ authStore.user?.ipk }}</span>
            </div>
            <div class="bg-slate-50 dark:bg-slate-700/50 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600">
              <span class="block text-slate-500 dark:text-slate-400 text-xs font-bold mb-1">{{ authStore.t('Sesi Selesai', 'Sessions Done') }}</span>
              <span class="font-extrabold text-slate-800 dark:text-white text-lg">{{ orderStore.orderHistory.length }}</span>
            </div>
          </div>

          <div class="space-y-3 text-left">
            <div class="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700">
              <i class="ph-fill ph-envelope-simple text-unimed-green text-xl shrink-0"></i>
              <span class="text-xs md:text-sm font-bold truncate">{{ authStore.user?.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
              <i class="ph-fill ph-phone text-unimed-green text-xl shrink-0"></i>
              <span class="text-xs md:text-sm font-bold">{{ authStore.user?.phone }}</span>
            </div>
          </div>
          
          <Button variant="outline" customClass="w-full mt-6 text-sm md:text-base font-extrabold border-2">{{ authStore.t('Edit Profil', 'Edit Profile') }}</Button>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full flex flex-col transition-colors">
          <div class="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex-col sm:flex-row">
            <button @click="profileTab = 'achievements'" :class="['flex-1 py-4 md:py-5 font-extrabold text-sm md:text-base transition-colors', profileTab === 'achievements' ? 'text-[#FDB913] border-b-4 border-[#FDB913] bg-white dark:bg-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white']">{{ authStore.t('Lencana Keahlian', 'Skill Badges') }}</button>
            <button @click="profileTab = 'history'" :class="['flex-1 py-4 md:py-5 font-extrabold text-sm md:text-base transition-colors', profileTab === 'history' ? 'text-unimed-green border-b-4 border-unimed-green bg-white dark:bg-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white']">{{ authStore.t('Riwayat Transaksi', 'Transaction History') }}</button>
          </div>

          <div v-if="profileTab === 'achievements'" class="p-6 md:p-8 flex-grow">
            <h3 class="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-fill ph-medal text-4xl text-[#FDB913]"></i> {{ authStore.t('Pencapaian Anda', 'Your Achievements') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              
              <!-- Dummy Lencana Statis Murni -->
              <div class="p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50">
                <i class="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal text-yellow-600"></i>
                <div class="relative z-10">
                  <i class="text-4xl mb-4 ph-fill ph-medal text-yellow-500"></i>
                  <h4 class="font-extrabold text-base md:text-lg text-slate-800 dark:text-white mb-1 truncate">Desain Grafis Dasar</h4>
                  <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 font-bold truncate">Mentor: Riyan Dinata</p>
                  <div class="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-4">
                    <span class="text-[10px] md:text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</span>
                    <span class="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400">Januari 2026</span>
                  </div>
                </div>
              </div>

              <!-- Lencana Dinamis dari History -->
              <div v-for="(hist, i) in orderStore.orderHistory" :key="'ach-'+i" class="p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50">
                <i class="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal text-unimed-green"></i>
                <div class="relative z-10">
                  <i class="text-4xl mb-4 ph-fill ph-medal text-unimed-green"></i>
                  <h4 class="font-extrabold text-base md:text-lg text-slate-800 dark:text-white mb-1 truncate">{{ hist.tutor.skills[0].name }}</h4>
                  <p class="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 font-bold truncate">Mentor: {{ hist.tutor.name }}</p>
                  <div class="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-4">
                    <span class="text-[10px] md:text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</span>
                    <span class="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400">{{ hist.date }}</span>
                  </div>
                </div>
              </div>
              
              <div class="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 transition-colors cursor-pointer" @click="$router.push('/shop')">
                <div class="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center mb-3 text-3xl font-extrabold text-slate-400 dark:text-slate-300">+</div>
                <p class="font-extrabold">{{ authStore.t('Pelajari Skill Baru', 'Learn New Skill') }}</p>
              </div>
            </div>
          </div>

          <div v-if="profileTab === 'history'" class="p-6 md:p-8 flex-grow">
             <h3 class="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-bold ph-receipt text-3xl text-unimed-green"></i> {{ authStore.t('Riwayat Pesanan', 'Order History') }}
            </h3>
            
            <div v-if="orderStore.orderHistory.length === 0" class="text-center py-16 text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              <i class="ph ph-receipt text-5xl text-slate-300 dark:text-slate-500 mb-3 block"></i>
              {{ authStore.t('Anda belum memiliki riwayat transaksi apapun.', 'You have no transaction history.') }}
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(hist, index) in orderStore.orderHistory" :key="index" class="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-unimed-green dark:hover:border-unimed-green transition-colors bg-white dark:bg-slate-800 shadow-sm">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-extrabold text-slate-500 dark:text-slate-400">{{ hist.id }}</span>
                    <span class="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">{{ hist.status }}</span>
                    <span class="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">{{ hist.learningMode }}</span>
                  </div>
                  <h4 class="font-extrabold text-slate-800 dark:text-white text-base md:text-lg">Tutor: {{ hist.tutor.name }}</h4>
                  <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold mt-1">
                    <i class="ph-fill ph-map-pin text-red-500 inline mr-1"></i> Lokasi: {{ hist.tutor.location }}
                  </p>
                </div>
                <div class="text-left sm:text-right border-t sm:border-t-0 border-slate-100 dark:border-slate-700 pt-3 sm:pt-0">
                  <p class="text-xs text-slate-500 dark:text-slate-400 mb-1 font-bold">{{ authStore.t('Total Pembayaran', 'Total Payment') }}</p>
                  <p class="font-extrabold text-lg md:text-xl text-unimed-green">Rp {{ hist.totalPaid.toLocaleString('id-ID') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useOrderStore } from '../stores/orderStore.js';
import Button from '../components/common/Button.vue';

const authStore = useAuthStore();
const orderStore = useOrderStore();
const profileTab = ref('achievements');
</script>