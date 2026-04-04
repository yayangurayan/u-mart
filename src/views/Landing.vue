<template>
  <div class="space-y-16 md:space-y-24 pb-20">
    <!-- Hero Section -->
    <div class="relative bg-unimed-green rounded-3xl overflow-hidden shadow-2xl">
      <div class="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=pattern&backgroundColor=007A3B')] opacity-20"></div>
      <div class="relative p-6 md:p-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        <div class="flex-1 text-white z-10 text-center lg:text-left">
          <span class="inline-block text-xs px-2.5 py-1 rounded-full font-medium border bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">Platform Layanan Jasa Tutor Mahasiswa</span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Tingkatkan Keahlian Bersama <span class="text-unimed-yellow">Mahasiswa Terbaik UNIMED</span>
          </h1>
          <p class="text-green-50 text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            U-Mart hadir mengoptimalkan potensi mahasiswa menjadi mentor tersertifikasi untuk kebutuhan akademik dan karir Anda.
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button variant="secondary" @click="$router.push('/shop')" customClass="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto">Mulai Cari Tutor</Button>
          </div>
        </div>
        
        <div class="flex-1 w-full z-10">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group cursor-pointer border-4 border-white/10">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Video Cover" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-unimed-yellow rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <i class="ph-fill ph-play text-2xl md:text-3xl text-slate-900 ml-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fitur Guru Terdekat (CTA) -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-gradient-to-r from-unimed-yellow to-yellow-400 rounded-3xl p-8 md:p-10 shadow-lg text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 transform transition-transform hover:scale-[1.02] cursor-pointer" @click="searchNearby">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-3">
            <i class="ph-fill ph-map-pin text-unimed-green text-4xl"></i> Ayo Cari Guru Terdekat!
          </h2>
          <p class="text-slate-800 font-medium mb-1">Temukan tutor UNIMED di sekitar domisili Anda untuk kenyamanan belajar offline.</p>
          <p class="text-sm text-slate-700/80 font-bold">*Mohon izinkan akses fitur lokasi (GPS) pada perangkat Anda.</p>
        </div>
        <Button variant="primary" customClass="whitespace-nowrap px-8 py-4 shadow-xl">Aktifkan & Cari</Button>
      </div>
    </div>

    <!-- Features -->
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/common/Button.vue';

const router = useRouter();

const searchNearby = () => {
  // Simulasi mengaktifkan lokasi dan redirect ke shop dengan parameter distance
  alert("Meminta akses lokasi GPS...");
  router.push({ path: '/shop', query: { sort: 'distance' } });
};

const features = ref([
  { icon: 'ph-shield-check', title: "Tutor Tersertifikasi", desc: "Skill divalidasi BPUB UNIMED.", color: "text-unimed-green", bg: "bg-green-50", hover: "hover:border-unimed-green" },
  { icon: 'ph-clock', title: "Jadwal Fleksibel", desc: "Atur jadwal langsung dengan Class Room digital.", color: "text-unimed-yellow", bg: "bg-yellow-50", hover: "hover:border-unimed-yellow" },
  { icon: 'ph-book-open', title: "Modul Premium", desc: "Akses dan unduh materi PDF khusus untuk Anda.", color: "text-unimed-blue", bg: "bg-blue-50", hover: "hover:border-unimed-blue" }
]);
</script>