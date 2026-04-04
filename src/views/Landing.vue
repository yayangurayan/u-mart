<template>
  <div class="space-y-16 md:space-y-24 pb-20">
    <div class="relative bg-[#00A651] rounded-3xl overflow-hidden shadow-2xl">
      <div class="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=pattern&backgroundColor=007A3B')] opacity-20"></div>
      <div class="relative p-6 md:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 text-white z-10 text-center lg:text-left">
          <span class="inline-block text-xs px-3 py-1.5 rounded-full font-bold border bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">Platform Layanan Jasa Tutor Mahasiswa</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Tingkatkan Keahlian Bersama <span class="text-[#FDB913]">Mahasiswa Terbaik UNIMED</span>
          </h1>
          <p class="text-green-50 text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            U-Mart hadir mengoptimalkan potensi mahasiswa menjadi mentor tersertifikasi untuk kebutuhan akademik dan karir Anda.
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button variant="secondary" @click="$router.push('/shop')" customClass="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto">Mulai Cari Tutor</Button>
          </div>
        </div>
        
        <div class="flex-1 w-full z-10">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group cursor-pointer border-4 border-white/20">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Video Cover" class="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-[#FDB913] rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <i class="ph-fill ph-play text-2xl md:text-3xl text-slate-900 ml-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fitur Guru Terdekat -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-gradient-to-r from-[#FDB913] to-yellow-400 rounded-3xl p-8 md:p-10 shadow-lg text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-shadow cursor-pointer" @click="searchNearby">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-3">
            <i class="ph-fill ph-map-pin text-[#00A651] text-4xl"></i> Ayo Cari Guru Terdekat!
          </h2>
          <p class="text-slate-800 font-medium mb-1">Temukan tutor UNIMED di sekitar domisili Anda untuk kenyamanan belajar Offline / Tatap Muka.</p>
          <p class="text-sm text-slate-700/80 font-bold">*Mohon izinkan akses fitur lokasi (GPS) pada perangkat Anda.</p>
        </div>
        <Button variant="primary" customClass="whitespace-nowrap px-8 py-4 shadow-xl">Aktifkan & Cari</Button>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Layanan & Keunggulan Kami</h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">Ekosistem terintegrasi yang menjamin kualitas pembelajaran dan keamanan transaksi Anda.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(item, index) in features" :key="index" class="group bg-white p-6 md:p-8 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" :class="item.hover">
          <div :class="`w-14 h-14 md:w-16 md:h-16 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`">
            <i :class="`ph ${item.icon} text-3xl ${item.color}`"></i>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-slate-800 mb-3">{{ item.title }}</h3>
          <p class="text-sm md:text-base text-slate-600 leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Tim Pengembang Kembali Ditampilkan Secara Penuh -->
    <div class="bg-slate-50 py-16 px-4 rounded-3xl border border-slate-200">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">Pengembang U-Mart</h2>
        <p class="text-slate-500">Tim PKM-PI Kolaborasi Ilmu Ekonomi & Pendidikan TIK UNIMED</p>
      </div>
      <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        <div v-for="(member, i) in teamMembers" :key="i" class="text-center w-36">
          <div class="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-md overflow-hidden mb-4 hover:scale-110 transition-transform duration-300">
            <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name.split(' ')[0]}&backgroundColor=e2e8f0`" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <h4 class="font-bold text-slate-800 text-sm leading-tight">{{ member.name }}</h4>
          <p class="text-xs text-[#00A651] font-bold mt-1 leading-tight">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/common/Button.vue';
import { TEAM_MEMBERS } from '../stores/dataStore.js';

const router = useRouter();
const teamMembers = ref(TEAM_MEMBERS);

const searchNearby = () => {
  alert("Meminta akses lokasi GPS...");
  router.push({ path: '/shop', query: { sort: 'distance' } });
};

const features = ref([
  { icon: 'ph-shield-check', title: "Tutor Tersertifikasi", desc: "Skill divalidasi BPUB UNIMED.", color: "text-[#00A651]", bg: "bg-green-50", hover: "hover:border-[#00A651]" },
  { icon: 'ph-clock', title: "Jadwal Fleksibel", desc: "Atur jadwal langsung dengan Class Room digital.", color: "text-[#FDB913]", bg: "bg-yellow-50", hover: "hover:border-[#FDB913]" },
  { icon: 'ph-student', title: "Tatap Muka & Online", desc: "Belajar nyaman di mana saja yang Anda inginkan.", color: "text-[#00539C]", bg: "bg-blue-50", hover: "hover:border-[#00539C]" }
]);
</script>