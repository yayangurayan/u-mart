<template>
  <div class="pb-20" v-if="tutor">
    <Button variant="ghost" @click="$router.push('/shop')" customClass="mb-6 -ml-4">
      <i class="ph ph-arrow-left"></i> Kembali ke Pencarian
    </Button>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#FDB913]/10 rounded-bl-full -z-10"></div>
          <img :src="tutor.image" :alt="tutor.name" class="w-40 h-40 rounded-2xl bg-slate-50 shadow-md border-4 border-white" />
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
              <h1 class="text-3xl font-extrabold text-slate-800">{{ tutor.name }}</h1>
              <span class="text-xs px-2.5 py-1 rounded-full font-bold border bg-green-100 text-green-800 border-green-200 mt-2 md:mt-0">Tutor Aktif</span>
            </div>
            <p class="text-[#00539C] font-bold text-lg mb-4">{{ tutor.major }}</p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <i class="ph-fill ph-medal text-xl text-[#00A651]"></i> 
                <span class="font-bold text-slate-700">IPK {{ tutor.ipk.toFixed(2) }}</span>
              </div>
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <i class="ph-fill ph-star text-xl text-[#FDB913]"></i>
                <span class="font-bold text-slate-700">{{ tutor.rating }}</span>
                <span class="text-slate-500">({{ tutor.reviews }} ulasan)</span>
              </div>
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <i class="ph-fill ph-map-pin text-xl text-red-500"></i> 
                <span class="font-bold text-slate-700">{{ tutor.location }} ({{ tutor.distance }} km)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="flex border-b border-slate-200 bg-slate-50">
            <button @click="activeTab = 'about'" :class="['flex-1 py-4 font-bold text-sm transition-colors', activeTab === 'about' ? 'text-[#00A651] border-b-2 border-[#00A651] bg-white' : 'text-slate-500 hover:text-slate-800']">Tentang & Skills</button>
            <button @click="activeTab = 'reviews'" :class="['flex-1 py-4 font-bold text-sm transition-colors', activeTab === 'reviews' ? 'text-[#00A651] border-b-2 border-[#00A651] bg-white' : 'text-slate-500 hover:text-slate-800']">Ulasan ({{ tutor.reviewsList.length }})</button>
          </div>
          
          <div class="p-8">
            <div v-if="activeTab === 'about'" class="space-y-8">
              <div>
                <h2 class="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
                  <i class="ph-fill ph-user text-[#00A651]"></i> Tentang Saya
                </h2>
                <p class="text-slate-600 leading-relaxed font-medium">{{ tutor.desc }}</p>
              </div>

              <div>
                <h2 class="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <i class="ph-fill ph-medal text-[#FDB913]"></i> Rincian Keahlian (Skills)
                </h2>
                <div class="space-y-4">
                  <div v-for="(skill, i) in tutor.skills" :key="i" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
                    <div class="flex items-center gap-4 mb-2 sm:mb-0">
                      <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', skill.type === 'Hard Skill' ? 'bg-[#00A651]/10 text-[#00A651]' : 'bg-[#FDB913]/10 text-[#FDB913]']">
                        <i :class="['text-xl', skill.type === 'Hard Skill' ? 'ph-fill ph-shield-check' : 'ph-fill ph-medal']"></i>
                      </div>
                      <div>
                        <h4 class="font-bold text-slate-800">{{ skill.name }}</h4>
                        <p class="text-xs font-bold text-slate-500">{{ skill.type }} • {{ skill.level }}</p>
                      </div>
                    </div>
                    <div v-if="skill.type === 'Hard Skill' && (skill.level === 'Intermediate' || skill.level === 'Advanced')" class="flex items-center gap-2 text-xs font-bold text-[#00A651] bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                      <i class="ph-fill ph-check-circle"></i> Tersertifikasi BPUB
                    </div>
                    <div v-else-if="skill.type === 'Soft Skill'" class="text-xs font-bold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-lg">Tanpa Sertifikat</div>
                    <div v-else class="text-xs font-bold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-lg">Beginner</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'reviews'" class="space-y-6">
              <div v-if="tutor.reviewsList.length === 0" class="text-center text-slate-500 py-4 font-medium">Belum ada ulasan untuk tutor ini.</div>
              <div v-for="(review, i) in tutor.reviewsList" :key="i" class="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-slate-800">{{ review.user }}</h4>
                  <div class="flex text-[#FDB913]">
                    <i v-for="n in 5" :key="n" :class="['text-sm', n <= review.rating ? 'ph-fill ph-star' : 'ph ph-star']"></i>
                  </div>
                </div>
                <p class="text-slate-600 text-sm font-medium">"{{ review.comment }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sticky top-24 border-t-4 border-t-[#00A651]">
          <h3 class="font-bold text-xl mb-6">Mulai Belajar</h3>
          <div class="flex items-end gap-1 mb-6 pb-6 border-b border-slate-200">
            <span class="text-4xl font-extrabold text-[#00A651]">Rp {{ tutor.rate.toLocaleString('id-ID') }}</span>
            <span class="text-slate-500 mb-1 font-bold">/jam</span>
          </div>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3 text-sm text-slate-700 font-bold">
              <i class="ph-fill ph-video-camera text-xl text-[#00539C]"></i> Online / Offline Tersedia
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700 font-bold">
              <i class="ph-fill ph-clock text-xl text-[#FDB913]"></i> Penjadwalan Fleksibel
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700 font-bold">
              <i class="ph-fill ph-calendar-check text-xl text-[#00A651]"></i> Paket Berlaku 30 Hari
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-200">
              <p class="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Jadwal Tersedia</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="(schedule, i) in tutor.availableSchedules" :key="i" class="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <i class="ph ph-clock mr-1"></i>{{ schedule }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <Button variant="primary" @click="$router.push(`/checkout/${tutor.id}`)" customClass="w-full py-4 text-lg rounded-xl shadow-[#00A651]/30">
              Pesan Sesi Sekarang
            </Button>
            <Button variant="outline" @click="orderStore.addToCart(tutor)" customClass="w-full py-3 text-sm rounded-xl font-bold border-slate-300 text-slate-700 hover:bg-slate-100">
              <i class="ph ph-shopping-cart text-lg mr-1"></i> Tambah ke Keranjang
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/common/Button.vue';
import { MOCK_TUTORS } from '../stores/dataStore.js';
import { useOrderStore } from '../stores/orderStore.js';

const route = useRoute();
const orderStore = useOrderStore();
const tutor = computed(() => MOCK_TUTORS.find(t => t.id === parseInt(route.params.id)));
const activeTab = ref('about');
</script>