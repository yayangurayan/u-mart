<template>
  <div class="pb-20 px-4 md:px-0">
    <!-- Header Search & Filter -->
    <div class="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mb-8">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Eksplorasi Keahlian (Toko)</h2>
      <p class="text-slate-300 mb-8 max-w-2xl text-sm md:text-base">Cari merchant/tutor berdasarkan kategori Skill, Nama, atau Lokasi.</p>
      
      <div class="flex flex-col lg:flex-row gap-4 mb-6">
        <div class="relative flex-1">
          <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
          <input 
            type="text" 
            placeholder="Cari 'Akuntansi', 'VueJS'..."
            class="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl border-none text-slate-900 focus:ring-4 focus:ring-unimed-green/30 transition-shadow outline-none"
            v-model="searchTerm"
          />
        </div>
        
        <!-- Sorting Lengkap sesuai WDD -->
        <div class="relative">
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i class="ph ph-sort-ascending text-slate-400"></i>
          </div>
          <select v-model="sortBy" class="w-full lg:w-auto bg-white text-slate-800 border border-slate-200 pl-10 pr-8 py-3.5 md:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-unimed-green appearance-none font-medium">
            <option value="rekomendasi">Rekomendasi</option>
            <option value="distance">Jarak Terdekat (GPS)</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="reviews">Ulasan Terbanyak</option>
            <option value="price_asc">Harga Terendah</option>
            <option value="price_desc">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      <div class="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md overflow-x-auto w-full lg:w-fit hide-scrollbar">
        <button 
          v-for="type in filterOptions" :key="type"
          @click="filterType = type"
          :class="['px-4 md:px-6 py-2 md:py-2.5 rounded-lg whitespace-nowrap text-sm md:text-base font-medium transition-colors', filterType === type ? 'bg-unimed-yellow text-slate-900' : 'text-white hover:bg-white/20']"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <!-- Tutors Grid -->
    <div v-if="filteredTutors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <div 
        v-for="tutor in filteredTutors" :key="tutor.id" 
        class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
      >
        <div class="h-24 md:h-28 bg-gradient-to-r from-unimed-green/10 to-unimed-blue/10 relative">
          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1">
            <i class="ph-fill ph-map-pin text-unimed-green"></i> {{ tutor.distance }} km
          </div>
          <div class="absolute -bottom-10 left-4 md:left-6 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
            <img :src="tutor.image" :alt="tutor.name" class="w-full h-full object-cover" />
          </div>
        </div>
        
        <div class="pt-12 md:pt-14 p-5 md:p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-bold text-lg md:text-xl text-slate-800 line-clamp-1">{{ tutor.name }}</h3>
              <p class="text-xs md:text-sm text-unimed-blue font-medium">{{ tutor.major }}</p>
            </div>
            <div class="flex flex-col items-end">
              <div class="flex items-center gap-1 text-unimed-yellow">
                <i class="ph-fill ph-star"></i>
                <span class="font-bold text-slate-800">{{ tutor.rating }}</span>
              </div>
              <span class="text-[10px] md:text-xs text-slate-400">({{ tutor.reviews }} ulasan)</span>
            </div>
          </div>
          
          <div class="space-y-2 mb-6 flex-grow">
            <div v-for="skill in filterTutorSkills(tutor.skills)" :key="skill.name" class="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div class="flex items-center gap-2">
                <i :class="['ph', skill.type === 'Hard Skill' ? 'ph-shield-check text-unimed-green' : 'ph-medal text-unimed-yellow']"></i>
                <span class="text-xs md:text-sm font-medium text-slate-700 truncate max-w-[120px]">{{ skill.name }}</span>
              </div>
              <span :class="['text-[9px] md:text-[10px] px-2 py-0.5 rounded uppercase font-bold', skill.level === 'Advanced' ? 'bg-purple-100 text-purple-700' : skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700']">
                {{ skill.level }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div>
              <span class="text-unimed-green font-extrabold text-lg md:text-xl">Rp {{ tutor.rate.toLocaleString('id-ID') }}</span>
              <span class="text-slate-400 text-xs md:text-sm">/jam</span>
            </div>
            <Button variant="outline" @click="$router.push(`/tutor/${tutor.id}`)" customClass="text-sm px-3 py-1.5">Lihat Profil</Button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mx-4 md:mx-0">
      <div class="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="ph ph-magnifying-glass text-3xl md:text-4xl text-slate-400"></i>
      </div>
      <h3 class="text-lg md:text-xl font-bold text-slate-700">Tutor Tidak Ditemukan</h3>
      <p class="text-sm md:text-base text-slate-500 mt-2">Coba sesuaikan kata kunci pencarian Anda.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/common/Button.vue';
import { MOCK_TUTORS } from '../stores/dataStore.js';

const route = useRoute();
const filterType = ref('All');
const filterOptions = ['All', 'Hard Skill', 'Soft Skill'];
const searchTerm = ref('');
const sortBy = ref('rekomendasi'); 

onMounted(() => {
  if (route.query.sort === 'distance') {
    sortBy.value = 'distance';
  }
});

const filteredTutors = computed(() => {
  let result = MOCK_TUTORS.filter(tutor => {
    const matchName = tutor.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchSkillSearch = tutor.skills.some(s => s.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
    const matchFilter = filterType.value === 'All' ? true : tutor.skills.some(s => s.type === filterType.value);
    return (matchName || matchSkillSearch) && matchFilter;
  });

  // Sorting Ekstensif
  if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy.value === 'price_asc') {
    result.sort((a, b) => a.rate - b.rate);
  } else if (sortBy.value === 'price_desc') {
    result.sort((a, b) => b.rate - a.rate);
  } else if (sortBy.value === 'distance') {
    result.sort((a, b) => a.distance - b.distance); // Lokasi Terdekat
  } else if (sortBy.value === 'reviews') {
    result.sort((a, b) => b.reviews - a.reviews); // Pengalaman Terbanyak
  }

  return result;
});

const filterTutorSkills = (skills) => {
  return skills.filter(s => filterType.value === 'All' || s.type === filterType.value).slice(0, 3);
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>