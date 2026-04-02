<template>
  <div class="pb-20" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }">
    <div v-if="!activeOrder" class="text-center py-32">
      <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ph ph-video-camera text-4xl text-slate-300"></i>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-slate-700">Belum Ada Kelas Aktif</h2>
      <Button @click="$router.push('/shop')" customClass="mx-auto">Mulai Cari Tutor</Button>
    </div>

    <div v-else>
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800 mb-2">Class Room / Progress</h2>
          <p class="text-slate-500">Interaksi, materi, dan evaluasi pembelajaran Anda.</p>
        </div>
        <span class="text-xs px-4 py-1.5 rounded-full font-bold border bg-green-100 text-green-800 border-green-200">Sedang Berjalan</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white rounded-3xl shadow-sm border-2 border-[#008542]/20 p-8 relative overflow-hidden">
            <div class="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-2">{{ activeOrder.tutor.skills[0].name }} (Level: {{ activeOrder.tutor.skills[0].level }})</h3>
                <p class="text-slate-600 flex items-center gap-2">
                  <i class="ph-fill ph-user text-[#00539C]"></i> Tutor: <span class="font-bold">{{ activeOrder.tutor.name }}</span>
                </p>
              </div>
              <div class="bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 border border-slate-200">
                <i class="ph-fill ph-calendar text-[#FDB913]"></i> Mulai: {{ activeOrder.date }}
              </div>
            </div>

            <!-- Progress Belajar WDD -->
            <div class="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div class="flex justify-between items-end mb-3">
                <span class="font-bold text-slate-700 text-lg">Progress Belajar</span>
                <span class="font-extrabold text-2xl text-[#008542]">35%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-[#FDB913] to-[#008542] h-full transition-all duration-1000 w-[35%] relative"></div>
              </div>
              <p class="text-sm text-slate-500 font-medium">1 dari {{ activeOrder.hours }} Jam Sesi Diselesaikan</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button @click="openGMeet" customClass="py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white border-none">
                <i class="ph-fill ph-video-camera text-xl"></i> Join Google Meet
              </Button>
              <Button v-if="activeOrder.addonModul" variant="outline" customClass="py-4 text-lg">
                <i class="ph ph-file-pdf text-xl"></i> Download Modul
              </Button>
              <Button v-else variant="ghost" disabled customClass="py-4 text-lg bg-slate-100 text-slate-400 cursor-not-allowed">
                Modul Tidak Tersedia
              </Button>
            </div>
          </div>

          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h4 class="font-bold text-xl mb-6 text-slate-800">Daftar Materi / Silabus</h4>
            <div class="space-y-4">
              <div v-for="(materi, i) in syllabus" :key="i" :class="['flex items-center justify-between p-4 rounded-xl border', materi.status === 'Selesai' ? 'bg-green-50 border-green-100' : materi.status === 'Aktif' ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100 opacity-60']">
                <div class="flex items-center gap-4">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', materi.status === 'Selesai' ? 'bg-[#008542] text-white' : 'bg-slate-200 text-slate-500']">
                    <i :class="['text-xl', materi.status === 'Selesai' ? 'ph-bold ph-check' : 'ph ph-book-open']"></i>
                  </div>
                  <div>
                    <h5 class="font-bold text-slate-800">{{ materi.title }}</h5>
                    <span class="text-xs text-slate-500 font-medium">Format: {{ materi.type }}</span>
                  </div>
                </div>
                <span :class="['text-xs px-2.5 py-1 rounded-full font-bold', materi.status === 'Selesai' ? 'bg-green-200 text-green-800' : materi.status === 'Aktif' ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-600']">{{ materi.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-lg">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2"><i class="ph-fill ph-calendar text-[#FDB913]"></i> Kalender Sesi</h4>
            <div class="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
              <div v-for="day in ['M','S','S','R','K','J','S']" :key="day">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm mb-6">
              <div v-for="i in 14" :key="i" :class="['p-2 rounded-lg', i === 5 ? 'bg-[#008542] text-white font-bold' : i === 10 ? 'bg-[#FDB913]/20 text-[#FDB913]' : 'text-slate-300']">
                {{ 10 + i }}
              </div>
            </div>
            <Button variant="outline" customClass="w-full border-white/20 text-white hover:bg-white/10">Reschedule Sesi</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useOrderStore } from '../stores/orderStore.js';
import Button from '../components/common/Button.vue';

const orderStore = useOrderStore();
const activeOrder = computed(() => orderStore.activeOrder);

const openGMeet = () => alert("Membuka Google Meet secara eksternal...");

const syllabus = [
  { title: "Pengenalan & Fundamental", status: "Selesai", type: "PDF" },
  { title: "Praktek & Studi Kasus Part 1", status: "Aktif", type: "Video/Meet" },
  { title: "Evaluasi & Tanya Jawab", status: "Terkunci", type: "Tugas" }
];
</script>