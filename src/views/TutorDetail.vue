<template>
  <div class="pb-20" v-if="tutor">
    <Button variant="ghost" @click="$router.push('/shop')" customClass="mb-6 -ml-4">
      <i class="ph ph-arrow-left"></i> Kembali
    </Button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8" v-motion :initial="{ opacity: 0, x: -30 }" :enter="{ opacity: 1, x: 0 }">
        <!-- Header Profil -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#FDB913]/10 rounded-bl-full -z-10"></div>
          <img :src="tutor.image" :alt="tutor.name" class="w-40 h-40 rounded-2xl bg-slate-50 shadow-md border-4 border-white" />
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
              <h1 class="text-3xl font-extrabold text-slate-800">{{ tutor.name }}</h1>
              <span class="text-xs px-2.5 py-1 rounded-full font-bold border bg-green-100 text-green-800 border-green-200 mt-2 md:mt-0">Tutor Aktif</span>
            </div>
            <p class="text-[#00539C] font-bold text-lg mb-4">{{ tutor.major }}</p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <i class="ph-fill ph-medal text-xl text-[#008542]"></i> 
                <span class="font-bold text-slate-700">IPK {{ tutor.ipk.toFixed(2) }}</span>
              </div>
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <i class="ph-fill ph-star text-xl text-[#FDB913]"></i>
                <span class="font-bold text-slate-700">{{ tutor.rating }}</span>
                <span class="text-slate-500">({{ tutor.reviews }} ulasan)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Deskripsi & Skill -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h2 class="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
            <i class="ph ph-user text-2xl text-[#008542]"></i> Tentang Saya
          </h2>
          <p class="text-slate-600 leading-relaxed mb-8">{{ tutor.desc }}</p>

          <h2 class="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <i class="ph ph-medal text-2xl text-[#FDB913]"></i> Rincian Keahlian (Skills)
          </h2>
          <div class="space-y-4">
            <div v-for="(skill, i) in tutor.skills" :key="i" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
              <div class="flex items-center gap-4 mb-2 sm:mb-0">
                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', skill.type === 'Hard Skill' ? 'bg-[#008542]/10 text-[#008542]' : 'bg-[#FDB913]/10 text-[#FDB913]']">
                  <i :class="['text-xl', skill.type === 'Hard Skill' ? 'ph ph-shield-check' : 'ph ph-medal']"></i>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">{{ skill.name }}</h4>
                  <p class="text-xs text-slate-500">{{ skill.type }} • {{ skill.level }}</p>
                </div>
              </div>
              
              <div v-if="skill.type === 'Hard Skill' && (skill.level === 'Intermediate' || skill.level === 'Advanced')" class="flex items-center gap-2 text-xs font-bold text-[#008542] bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                <i class="ph-fill ph-check-circle"></i> Tersertifikasi BPUB
              </div>
              <div v-else-if="skill.type === 'Soft Skill'" class="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Tanpa Sertifikat (Soft Skill)</div>
              <div v-else class="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Beginner (Review Based)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Float Pemesanan -->
      <div class="lg:col-span-1" v-motion :initial="{ opacity: 0, x: 30 }" :enter="{ opacity: 1, x: 0 }">
        <div class="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sticky top-24 border-t-4 border-t-[#008542]">
          <h3 class="font-bold text-xl mb-6">Mulai Belajar</h3>
          <div class="flex items-end gap-1 mb-6 pb-6 border-b border-slate-100">
            <span class="text-4xl font-extrabold text-[#008542]">Rp {{ tutor.rate.toLocaleString('id-ID') }}</span>
            <span class="text-slate-500 mb-1 font-medium">/jam</span>
          </div>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3 text-sm text-slate-700 font-medium"><i class="ph ph-video-camera text-xl text-[#00539C]"></i> 1-on-1 via Google Meet</div>
            <div class="flex items-center gap-3 text-sm text-slate-700 font-medium"><i class="ph ph-clock text-xl text-[#FDB913]"></i> Penjadwalan Fleksibel</div>
            <div class="flex items-center gap-3 text-sm text-slate-700 font-medium"><i class="ph ph-file-text text-xl text-[#008542]"></i> Opsi Modul Premium</div>
          </div>

          <Button variant="primary" @click="$router.push(`/checkout/${tutor.id}`)" customClass="w-full py-4 text-lg rounded-xl">
            Pesan Sesi Sekarang
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/common/Button.vue';
import { MOCK_TUTORS } from '../stores/dataStore.js';

const route = useRoute();
const tutor = computed(() => MOCK_TUTORS.find(t => t.id === parseInt(route.params.id)));
</script>