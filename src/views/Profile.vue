<template>
  <div class="pb-20 px-4 md:px-0">
    <div class="mb-6 md:mb-8">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Dashboard Pengguna</h2>
      <p class="text-sm md:text-base text-slate-500 font-medium">Kelola informasi pribadi, riwayat pesanan, dan lencana keahlian Anda.</p>
    </div>

    <!-- Onboarding Guide untuk User Baru yang Lengkap Lencananya -->
    <div v-if="orderStore.orderHistory.length === 0" class="bg-gradient-to-r from-green-50 to-emerald-50 border border-[#00A651]/30 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
      <div class="flex-1">
        <h3 class="text-xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
          <i class="ph-fill ph-hand-waving text-[#FDB913] text-2xl"></i> Selamat Datang di U-Mart!
        </h3>
        <p class="text-sm text-slate-600 mb-5 font-medium">Anda belum memiliki riwayat kelas. Ikuti 3 langkah mudah ini untuk mulai meningkatkan skill Anda:</p>
        <div class="flex flex-col sm:flex-row gap-5 text-xs md:text-sm font-bold text-slate-700">
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-sm">1</div> Cari Tutor di Toko</div>
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-sm">2</div> Pesan & Atur Jadwal</div>
          <div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-sm">3</div> Dapatkan Lencana</div>
        </div>
      </div>
      <Button @click="$router.push('/shop')" customClass="whitespace-nowrap shadow-lg w-full sm:w-auto py-4 px-8 text-base">Cari Kelas Pertama</Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-28 md:h-32 bg-gradient-to-b from-[#00A651]/20 to-transparent -z-10"></div>
          <img :src="authStore.user?.avatar" alt="Profile" class="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 bg-white" />
          <h3 class="text-xl md:text-2xl font-extrabold text-slate-800">{{ authStore.user?.name }}</h3>
          <p class="text-sm md:text-base text-[#00539C] font-bold mb-6">{{ authStore.user?.role }} / {{ authStore.user?.major }}</p>
          
          <div class="flex justify-center gap-4 text-sm mb-6 md:mb-8">
            <div class="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs font-bold mb-1">IPK</span>
              <span class="font-extrabold text-slate-800 text-lg">{{ authStore.user?.ipk }}</span>
            </div>
            <div class="bg-slate-50 px-5 py-3 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs font-bold mb-1">Sesi Selesai</span>
              <span class="font-extrabold text-slate-800 text-lg">{{ orderStore.orderHistory.length }}</span>
            </div>
          </div>

          <div class="space-y-3 text-left">
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3.5 rounded-xl overflow-hidden border border-slate-100">
              <i class="ph-fill ph-envelope-simple text-[#00A651] text-xl shrink-0"></i>
              <span class="text-xs md:text-sm font-bold truncate">{{ authStore.user?.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <i class="ph-fill ph-phone text-[#00A651] text-xl shrink-0"></i>
              <span class="text-xs md:text-sm font-bold">{{ authStore.user?.phone }}</span>
            </div>
          </div>
          
          <Button variant="outline" customClass="w-full mt-6 text-sm md:text-base font-extrabold border-2">Edit Profil</Button>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
          <div class="flex border-b border-slate-200 bg-slate-50 flex-col sm:flex-row">
            <button @click="profileTab = 'achievements'" :class="['flex-1 py-4 md:py-5 font-extrabold text-sm md:text-base transition-colors', profileTab === 'achievements' ? 'text-[#FDB913] border-b-4 border-[#FDB913] bg-white' : 'text-slate-500 hover:text-slate-800']">Lencana Keahlian</button>
            <button @click="profileTab = 'history'" :class="['flex-1 py-4 md:py-5 font-extrabold text-sm md:text-base transition-colors', profileTab === 'history' ? 'text-[#00A651] border-b-4 border-[#00A651] bg-white' : 'text-slate-500 hover:text-slate-800']">Riwayat Transaksi</button>
          </div>

          <div v-if="profileTab === 'achievements'" class="p-6 md:p-8 flex-grow">
            <h3 class="text-xl md:text-2xl font-extrabold text-slate-800 flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-fill ph-medal text-4xl text-[#FDB913]"></i> Pencapaian Anda
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              
              <!-- Dummy Lencana Statis Murni untuk Profile -->
              <div class="p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all bg-yellow-50 border-yellow-200">
                <i class="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal text-yellow-600"></i>
                <div class="relative z-10">
                  <i class="text-4xl mb-4 ph-fill ph-medal text-yellow-500"></i>
                  <h4 class="font-extrabold text-base md:text-lg text-slate-800 mb-1 truncate">Desain Grafis Dasar</h4>
                  <p class="text-xs md:text-sm text-slate-600 mb-4 font-bold truncate">Mentor: Riyan Dinata</p>
                  <div class="flex justify-between items-center border-t border-black/5 pt-4">
                    <span class="text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-wider">Completed</span>
                    <span class="text-[10px] md:text-xs font-bold text-slate-600">Januari 2026</span>
                  </div>
                </div>
              </div>

              <!-- Lencana Dinamis Berdasarkan History Pesanan Terselesaikan -->
              <div v-for="(hist, i) in orderStore.orderHistory" :key="'ach-'+i" class="p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all bg-green-50 border-green-200">
                <i class="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal text-[#00A651]"></i>
                <div class="relative z-10">
                  <i class="text-4xl mb-4 ph-fill ph-medal text-[#00A651]"></i>
                  <h4 class="font-extrabold text-base md:text-lg text-slate-800 mb-1 truncate">{{ hist.tutor.skills[0].name }}</h4>
                  <p class="text-xs md:text-sm text-slate-600 mb-4 font-bold truncate">Mentor: {{ hist.tutor.name }}</p>
                  <div class="flex justify-between items-center border-t border-black/5 pt-4">
                    <span class="text-[10px] md:text-xs font-extrabold text-slate-500 uppercase tracking-wider">Completed</span>
                    <span class="text-[10px] md:text-xs font-bold text-slate-600">{{ hist.date }}</span>
                  </div>
                </div>
              </div>
              
              <div class="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-center text-slate-500 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer" @click="$router.push('/shop')">
                <div class="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mb-3 text-3xl font-extrabold text-slate-400">+</div>
                <p class="font-extrabold">Pelajari Skill Baru</p>
              </div>
            </div>
          </div>

          <div v-if="profileTab === 'history'" class="p-6 md:p-8 flex-grow">
             <h3 class="text-xl md:text-2xl font-extrabold text-slate-800 flex items-center gap-2 mb-6 md:mb-8">
              <i class="ph-bold ph-receipt text-3xl text-[#00A651]"></i> Riwayat Pesanan
            </h3>
            
            <div v-if="orderStore.orderHistory.length === 0" class="text-center py-16 text-slate-500 font-medium bg-slate-50 rounded-2xl border border-slate-200">
              <i class="ph ph-receipt text-5xl text-slate-300 mb-3 block"></i>
              Anda belum memiliki riwayat transaksi apapun.
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="(hist, index) in orderStore.orderHistory" :key="index" class="p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[#00A651] transition-colors bg-white shadow-sm">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-extrabold text-slate-500">{{ hist.id }}</span>
                    <span class="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold bg-green-100 text-green-700">{{ hist.status }}</span>
                    <span class="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold bg-blue-100 text-blue-700">{{ hist.learningMode }}</span>
                  </div>
                  <h4 class="font-extrabold text-slate-800 text-base md:text-lg">Tutor: {{ hist.tutor.name }}</h4>
                  <p class="text-xs md:text-sm text-slate-500 font-bold mt-1">
                    <i class="ph-fill ph-map-pin text-red-500 inline mr-1"></i> Lokasi: {{ hist.tutor.location }}
                  </p>
                </div>
                <div class="text-left sm:text-right border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <p class="text-xs text-slate-500 mb-1 font-bold">Total Pembayaran</p>
                  <p class="font-extrabold text-lg md:text-xl text-[#00A651]">Rp {{ hist.totalPaid.toLocaleString('id-ID') }}</p>
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