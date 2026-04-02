<template>
  <div class="pb-20">
    <!-- Header Search & Filter -->
    <div class="bg-slate-900 text-white rounded-3xl p-8 mb-8">
      <h2 class="text-3xl font-bold mb-4">Eksplorasi Keahlian (Toko)</h2>
      <p class="text-slate-300 mb-8 max-w-2xl">Cari merchant/tutor berdasarkan kategori Soft Skill, Hard Skill, atau nama spesifik. Hanya skill tersertifikasi yang tampil di level menengah ke atas.</p>
      
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
          <input 
            type="text" 
            placeholder="Cari tutor, 'Akuntansi', 'VueJS'..."
            class="w-full pl-12 pr-4 py-4 rounded-xl border-none text-slate-900 focus:ring-4 focus:ring-[#008542]/30 transition-shadow outline-none"
            v-model="searchTerm"
          />
        </div>
        <div class="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md overflow-x-auto">
          <button 
            v-for="type in filterOptions" :key="type"
            @click="filterType = type"
            :class="['px-6 py-2.5 rounded-lg whitespace-nowrap font-medium transition-colors', filterType === type ? 'bg-[#FDB913] text-slate-900' : 'text-white hover:bg-white/20']"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tutors Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="tutor in filteredTutors" :key="tutor.id" class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        <!-- Card Header -->
        <div class="h-28 bg-gradient-to-r from-[#008542]/10 to-[#00539C]/10 relative">
          <div class="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm">
            IPK {{ tutor.ipk.toFixed(2) }}
          </div>
          <div class="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
            <img :src="tutor.image" :alt="tutor.name" class="w-full h-full object-cover" />
          </div>
        </div>
        
        <!-- Card Body -->
        <div class="pt-14 p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-bold text-xl text-slate-800">{{ tutor.name }}</h3>
              <p class="text-sm text-[#00539C] font-medium">{{ tutor.major }}</p>
            </div>
            <div class="flex flex-col items-end">
              <div class="flex items-center gap-1 text-[#FDB913]">
                <i class="ph-fill ph-star"></i>
                <span class="font-bold text-slate-800">{{ tutor.rating }}</span>
              </div>
              <span class="text-xs text-slate-400">({{ tutor.reviews }} ulasan)</span>
            </div>
          </div>
          
          <div class="space-y-2 mb-6 flex-grow">
            <div v-for="skill in filterTutorSkills(tutor.skills)" :key="skill.name" class="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div class="flex items-center gap-2">
                <i :class="['ph', skill.type === 'Hard Skill' ? 'ph-shield-check text-[#008542]' : 'ph-medal text-[#FDB913]']"></i>
                <span class="text-sm font-medium text-slate-700">{{ skill.name }}</span>
              </div>
              <span :class="['text-[10px] px-2 py-0.5 rounded uppercase font-bold', skill.level === 'Advanced' ? 'bg-purple-100 text-purple-700' : skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700']">
                {{ skill.level }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div>
              <span class="text-[#008542] font-extrabold text-xl">Rp {{ tutor.rate.toLocaleString('id-ID') }}</span>
              <span class="text-slate-400 text-sm">/jam</span>
            </div>
            <Button variant="outline" @click="$router.push(`/tutor/${tutor.id}`)">Profil Lengkap</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from '../components/common/Button.vue';
import { MOCK_TUTORS } from '../stores/dataStore';

const filterType = ref('All');
const filterOptions = ['All', 'Hard Skill', 'Soft Skill'];
const searchTerm = ref('');

const filteredTutors = computed(() => {
  return MOCK_TUTORS.filter(tutor => {
    const matchName = tutor.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchSkillSearch = tutor.skills.some(s => s.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
    const matchFilter = filterType.value === 'All' ? true : tutor.skills.some(s => s.type === filterType.value);
    return (matchName || matchSkillSearch) && matchFilter;
  });
});

const filterTutorSkills = (skills) => {
  const filtered = skills.filter(s => filterType.value === 'All' || s.type === filterType.value);
  return filtered.slice(0, 3);
};
</script>