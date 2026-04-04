<template>
  <div class="pb-20 px-4 md:px-0">
    <div class="mb-6 md:mb-8">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Dashboard Pengguna</h2>
      <p class="text-sm md:text-base text-slate-500">Kelola informasi pribadi, riwayat kelas, dan lencana keahlian yang telah Anda pelajari.</p>
    </div>

    <!-- Instruksi Onboarding Baru untuk Pengguna (User Baru) -->
    <div v-if="orderStore.orderHistory.length === 0" class="bg-gradient-to-r from-unimed-green/10 to-green-50 border border-unimed-green/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-unimed-dark mb-2 flex items-center gap-2">
          <i class="ph-fill ph-hand-waving text-yellow-500"></i> Selamat Datang di U-Mart!
        </h3>
        <p class="text-sm text-slate-600 mb-4">Anda belum memiliki riwayat kelas. Ikuti 3 langkah mudah ini untuk memulai:</p>
        <div class="flex flex-col sm:flex-row gap-4 text-xs md:text-sm font-medium text-slate-700">
          <div class="flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-unimed-green text-white flex items-center justify-center">1</div> Cari Tutor di Toko</div>
          <div class="flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-unimed-green text-white flex items-center justify-center">2</div> Pesan & Bayar Sesi</div>
          <div class="flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-unimed-green text-white flex items-center justify-center">3</div> Mulai Belajar via GMeet</div>
        </div>
      </div>
      <Button @click="$router.push('/shop')" customClass="whitespace-nowrap shadow-md">Cari Kelas Pertama</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <!-- Sidebar Profil -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-28 md:h-32 bg-unimed-green/10 -z-10"></div>
          <img :src="authStore.user?.avatar" alt="Profile" class="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 bg-white" />
          <h3 class="text-xl md:text-2xl font-bold text-slate-800">{{ authStore.user?.name }}</h3>
          <p class="text-sm md:text-base text-unimed-blue font-medium mb-6">{{ authStore.user?.role }} / {{ authStore.user?.major }}</p>
          
          <div class="flex justify-center gap-4 text-sm mb-6 md:mb-8">
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs">IPK</span>
              <span class="font-bold text-slate-800">{{ authStore.user?.ipk }}</span>
            </div>
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs">Sesi Selesai</span>
              <span class="font-bold text-slate-800">{{ orderStore.orderHistory.length }}</span>
            </div>
          </div>

          <div class="space-y-3 text-left">
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl overflow-hidden">
              <i class="ph-fill ph-envelope-simple text-unimed-green text-xl"></i>
              <span class="text-xs md:text-sm font-medium truncate">{{ authStore.user?.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
              <i class="ph-fill ph-phone text-unimed-green text-xl"></i>
              <span class="text-xs md:text-sm font-medium">{{ authStore.user?.phone }}</span>
            </div>
          </div>
          
          <Button variant="outline" customClass="w-full mt-6 text-sm md:text-base">Edit Profil</Button>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
          <div class="flex border-b border-slate-100 bg-slate-50 flex-col sm:flex-row">
            <button @click="profileTab = 'achievements'" :class="['flex-1 py-3 md:py-4 font-bold text-sm md:text-base transition-colors', profileTab === 'achievements' ? 'text-unimed-yellow border-b-2 sm:border-b-4 border-unimed-yellow bg-white' : 'text-slate-500 hover:text-slate-800']">Lencana Keahlian</button>
            <button @click="profileTab = 'history'" :class="['flex-1 py-3 md:py-4 font-bold text-sm md:text-base transition-colors', profileTab === 'history' ? 'text-unimed-green border-b-2 sm:border-b-4 border-unimed-green bg-white' : 'text-slate-500 hover:text-slate-800']">Riwayat Transaksi</button>
          </div>

          <div v-if="profileTab === 'achievements'" class="p-6 md:p-8 flex-grow">
            <h3 class="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-fill ph-medal text-3xl text-unimed-yellow"></i> Pencapaian Anda
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              
              <div v-if="orderStore.orderHistory.length === 0" class="col-span-full text-center py-10 text-slate-400">
                Belum ada lencana. Selesaikan kelas untuk membukanya!
              </div>

              <!-- Menampilkan Lencana Dinamis dari History Pesanan yang sudah selesai -->
              <div v-for="(hist, i) in orderStore.orderHistory" :key="'ach-'+i" class="p-5 md:p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all bg-green-50 border-green-200">
                <i class="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal"></i>
                <div class="relative z-10">
                  <i class="text-3xl mb-4 ph-fill ph-medal text-unimed-green"></i>
                  <h4 class="font-bold text-base md:text-lg text-slate-800 mb-1 truncate">{{ hist.tutor.skills[0].name }}</h4>
                  <p class="text-xs md:text-sm text-slate-600 mb-4 truncate">Mentor: {{ hist.tutor.name }}</p>
                  <div class="flex justify-between items-center border-t border-black/5 pt-4">
                    <span class="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</span>
                    <span class="text-[10px] md:text-xs font-medium text-slate-600">{{ hist.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="profileTab === 'history'" class="p-6 md:p-8 flex-grow">
             <h3 class="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-bold ph-receipt text-3xl text-unimed-green"></i> Riwayat Pesanan
            </h3>
            
            <div v-if="orderStore.orderHistory.length === 0" class="text-center py-10 text-slate-400">
              Belum ada riwayat pesanan.
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(hist, index) in orderStore.orderHistory" :key="index" class="p-4 md:p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-unimed-green transition-colors bg-white">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-slate-500">{{ hist.id }}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-green-100 text-green-700">{{ hist.status }}</span>
                  </div>
                  <h4 class="font-bold text-slate-800 text-base md:text-lg">Tutor: {{ hist.tutor.name }}</h4>
                  <p class="text-xs md:text-sm text-slate-500"><i class="ph ph-calendar-blank inline"></i> {{ hist.date }}</p>
                </div>
                <div class="text-left sm:text-right">
                  <p class="text-[10px] md:text-xs text-slate-500 mb-1">Total Pembayaran</p>
                  <p class="font-extrabold text-base md:text-lg text-unimed-green">Rp {{ hist.totalPaid.toLocaleString('id-ID') }}</p>
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