<template>
  <div class="pb-20">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-slate-800 mb-2">Profil & Pencapaian</h2>
      <p class="text-slate-500">Kelola informasi pribadi dan lihat lencana keahlian yang telah Anda pelajari.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 space-y-6">
        <!-- Profil Card -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-32 bg-[#008542]/10 -z-10"></div>
          <img :src="authStore.user?.avatar" alt="Profile" class="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg mb-4 bg-white" />
          <h3 class="text-2xl font-bold text-slate-800">{{ authStore.user?.name }}</h3>
          <p class="text-[#00539C] font-medium mb-6">{{ authStore.user?.role }} / {{ authStore.user?.major }}</p>
          
          <div class="flex justify-center gap-4 text-sm mb-8">
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs">IPK</span>
              <span class="font-bold text-slate-800">{{ authStore.user?.ipk }}</span>
            </div>
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <span class="block text-slate-500 text-xs">Sesi Selesai</span>
              <span class="font-bold text-slate-800">4</span>
            </div>
          </div>

          <div class="space-y-3 text-left">
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
              <i class="ph-fill ph-envelope-simple text-[#008542] text-xl"></i>
              <span class="text-sm font-medium">{{ authStore.user?.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl">
              <i class="ph-fill ph-phone text-[#008542] text-xl"></i>
              <span class="text-sm font-medium">{{ authStore.user?.phone }}</span>
            </div>
          </div>
          
          <Button variant="outline" customClass="w-full mt-6">Edit Profil</Button>
        </div>
      </div>

      <div class="lg:col-span-2">
        <!-- Achievement Badges -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 h-full">
          <h3 class="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-8">
            <i class="ph-fill ph-medal text-3xl text-[#FDB913]"></i> Lencana Keahlian
          </h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="(ach, i) in achievements" :key="i" :class="['p-6 rounded-2xl border-2 relative overflow-hidden group hover:shadow-md transition-all', ach.color]">
              <i :class="['absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500 text-8xl ph-fill ph-medal']"></i>
              <div class="relative z-10">
                <i :class="['text-3xl mb-4 ph-fill ph-medal', ach.iconCol]"></i>
                <h4 class="font-bold text-lg text-slate-800 mb-1">{{ ach.skill }}</h4>
                <p class="text-sm text-slate-600 mb-4">Mentor: {{ ach.tutor }}</p>
                <div class="flex justify-between items-center border-t border-black/5 pt-4">
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed</span>
                  <span class="text-xs font-medium text-slate-600">{{ ach.date }}</span>
                </div>
              </div>
            </div>
            
            <div class="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-center text-slate-500 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer" @click="$router.push('/shop')">
              <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-3 text-2xl font-bold">+</div>
              <p class="font-bold">Pelajari Skill Baru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import Button from '../components/common/Button.vue';

const authStore = useAuthStore();

const achievements = [
  { skill: "Desain Grafis Dasar", tutor: "Riyan Dinata", date: "Maret 2026", color: "bg-blue-50 border-blue-200", iconCol: "text-blue-600" },
  { skill: "Public Speaking", tutor: "Siti Khofifah", date: "Februari 2026", color: "bg-yellow-50 border-yellow-200", iconCol: "text-yellow-600" },
  { skill: "Manajemen Waktu", tutor: "Andrian", date: "Januari 2026", color: "bg-green-50 border-green-200", iconCol: "text-green-600" }
];
</script>