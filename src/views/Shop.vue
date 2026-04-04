<template>
  <div class="pb-20 px-4 md:px-0">
    <div class="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mb-8 animate-in fade-in transition-colors">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ authStore.t('Eksplorasi Keahlian (Toko)', 'Skill Exploration (Shop)') }}</h2>
      <p class="text-slate-300 mb-8 max-w-2xl text-sm md:text-base">{{ authStore.t('Cari merchant/tutor berdasarkan kategori Skill, Nama, atau Lokasi.', 'Find tutors by Skill, Name, or Location.') }}</p>
      
      <div class="flex flex-col lg:flex-row gap-4 mb-6 w-full">
        <div class="relative flex-1 w-full">
          <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
          <input 
            type="text" 
            :placeholder="authStore.t('Cari Tutor...', 'Search Tutors...')"
            class="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl border-none text-slate-900 focus:ring-4 focus:ring-unimed-green/30 transition-shadow outline-none font-medium"
            v-model="searchTerm"
          />
        </div>
        
        <div class="relative">
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i class="ph ph-sort-ascending text-slate-400"></i>
          </div>
          <select v-model="sortBy" class="w-full lg:w-auto bg-white text-slate-800 border border-slate-200 pl-10 pr-8 py-3.5 md:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-unimed-green appearance-none font-bold">
            <option value="rekomendasi">{{ authStore.t('Rekomendasi', 'Recommended') }}</option>
            <option value="distance">{{ authStore.t('Jarak Terdekat (GPS)', 'Nearest (GPS)') }}</option>
            <option value="rating">{{ authStore.t('Rating Tertinggi', 'Highest Rating') }}</option>
            <option value="reviews">{{ authStore.t('Ulasan Terbanyak', 'Most Reviewed') }}</option>
            <option value="price_asc">{{ authStore.t('Harga Terendah', 'Lowest Price') }}</option>
            <option value="price_desc">{{ authStore.t('Harga Tertinggi', 'Highest Price') }}</option>
          </select>
        </div>
      </div>

      <div class="flex gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md overflow-x-auto w-full lg:w-fit hide-scrollbar">
        <button 
          v-for="type in filterOptions" :key="type"
          @click="filterType = type"
          :class="['px-4 md:px-6 py-2 md:py-2.5 rounded-lg whitespace-nowrap text-sm md:text-base font-bold transition-colors', filterType === type ? 'bg-unimed-yellow text-slate-900' : 'text-white hover:bg-white/20']"
        >
          {{ type === 'All' ? authStore.t('Semua', 'All') : type }}
        </button>
      </div>
    </div>

    <!-- Tutors Grid -->
    <div v-if="filteredTutors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
      <div 
        v-for="tutor in filteredTutors" :key="tutor.id" 
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-unimed-green dark:hover:border-unimed-green transition-all duration-300 flex flex-col h-full animate-in fade-in"
      >
        <div class="h-24 md:h-28 bg-gradient-to-r from-green-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 relative">
          <div class="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm flex items-center gap-1">
            <i class="ph-fill ph-map-pin text-unimed-green"></i> {{ tutor.distance }} km
          </div>
          <div class="absolute -bottom-10 left-4 md:left-6 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-700 overflow-hidden shadow-md">
            <img :src="tutor.image" :alt="tutor.name" class="w-full h-full object-cover" />
          </div>
        </div>
        
        <div class="pt-12 md:pt-14 p-5 md:p-6 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-4 w-full">
            <div class="overflow-hidden pr-2">
              <h3 class="font-bold text-lg md:text-xl text-slate-800 dark:text-white line-clamp-1">{{ tutor.name }}</h3>
              <p class="text-xs md:text-sm text-unimed-blue dark:text-blue-400 font-bold truncate">{{ tutor.major }}</p>
            </div>
            <div class="flex flex-col items-end shrink-0">
              <div class="flex items-center gap-1 text-unimed-yellow">
                <i class="ph-fill ph-star"></i>
                <span class="font-bold text-slate-800 dark:text-white">{{ tutor.rating }}</span>
              </div>
              <span class="text-[10px] md:text-xs text-slate-400 font-medium">({{ tutor.reviews }} {{ authStore.t('ulasan', 'reviews') }})</span>
            </div>
          </div>
          
          <div class="space-y-2 mb-6 flex-grow">
            <div v-for="skill in filterTutorSkills(tutor.skills)" :key="skill.name" class="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-100 dark:border-slate-600">
              <div class="flex items-center gap-2">
                <i :class="['ph text-lg', skill.type === 'Hard Skill' ? 'ph-shield-check text-unimed-green' : 'ph-medal text-unimed-yellow']"></i>
                <span class="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">{{ skill.name }}</span>
              </div>
              <span :class="['text-[9px] md:text-[10px] px-2 py-0.5 rounded uppercase font-extrabold', skill.level === 'Advanced' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : skill.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300']">
                {{ skill.level }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto w-full">
            <div class="truncate pr-2">
              <span class="text-unimed-green font-extrabold text-lg md:text-xl">Rp {{ tutor.rate.toLocaleString('id-ID') }}</span>
              <span class="text-slate-400 text-xs md:text-sm font-medium">/jam</span>
            </div>
            <div class="flex gap-2 shrink-0">
              <Button variant="outline" @click="orderStore.addToCart(tutor)" customClass="px-3 py-1.5" :title="authStore.t('Tambah ke Keranjang', 'Add to Cart')">
                <i class="ph ph-shopping-cart text-lg"></i>
              </Button>
              <Button variant="primary" @click="$router.push(`/tutor/${tutor.id}`)" customClass="text-sm px-3 py-1.5">{{ authStore.t('Profil', 'Profile') }}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mx-4 md:mx-0">
      <div class="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="ph ph-magnifying-glass text-3xl md:text-4xl text-slate-400 dark:text-slate-500"></i>
      </div>
      <h3 class="text-lg md:text-xl font-bold text-slate-700 dark:text-white">{{ authStore.t('Tutor Tidak Ditemukan', 'Tutor Not Found') }}</h3>
      <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">{{ authStore.t('Coba sesuaikan kata kunci pencarian Anda.', 'Try adjusting your search keywords.') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/common/Button.vue';
import { MOCK_TUTORS } from '../stores/dataStore.js';
import { useOrderStore } from '../stores/orderStore.js';
import { useAuthStore } from '../stores/authStore.js';

const route = useRoute();
const orderStore = useOrderStore();
const authStore = useAuthStore();

const filterType = ref('All');
const filterOptions = ['All', 'Hard Skill', 'Soft Skill'];
const searchTerm = ref('');
const sortBy = ref('rekomendasi'); 

onMounted(() => {
  if (route.query.sort === 'distance') sortBy.value = 'distance';
});

const filteredTutors = computed(() => {
  let result = MOCK_TUTORS.filter(tutor => {
    const matchName = tutor.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchSkillSearch = tutor.skills.some(s => s.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
    const matchFilter = filterType.value === 'All' ? true : tutor.skills.some(s => s.type === filterType.value);
    return (matchName || matchSkillSearch) && matchFilter;
  });

  if (sortBy.value === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sortBy.value === 'price_asc') result.sort((a, b) => a.rate - b.rate);
  else if (sortBy.value === 'price_desc') result.sort((a, b) => b.rate - a.rate);
  else if (sortBy.value === 'distance') result.sort((a, b) => a.distance - b.distance); 
  else if (sortBy.value === 'reviews') result.sort((a, b) => b.reviews - a.reviews); 

  return result;
});

const filterTutorSkills = (skills) => skills.filter(s => filterType.value === 'All' || s.type === filterType.value).slice(0, 3);
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>