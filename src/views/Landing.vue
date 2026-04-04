<template>
  <div class="space-y-24 pb-20">
    <!-- Hero Section: Animasi v-motion Dihapus untuk mencegah Blank Screen, diganti dengan transisi CSS murni -->
    <div class="relative bg-[#008542] rounded-3xl overflow-hidden shadow-2xl">
      <div class="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=pattern&backgroundColor=006e36')] opacity-20"></div>
      <div class="relative p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
        <div class="flex-1 text-white z-10">
          <span class="inline-block text-xs px-2.5 py-1 rounded-full font-medium border bg-white/20 text-white border-white/30 mb-6 backdrop-blur-sm">Platform Layanan Jasa Tutor Mahasiswa</span>
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Tingkatkan Keahlian Bersama <span class="text-[#FDB913]">Mahasiswa Terbaik UNIMED</span>
          </h1>
          <p class="text-green-50 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            U-Mart hadir mengoptimalkan potensi mahasiswa menjadi mentor tersertifikasi untuk kebutuhan akademik dan karir Anda.
          </p>
          <div class="flex flex-wrap gap-4">
            <Button variant="secondary" @click="$router.push('/shop')" customClass="px-8 py-4 text-lg">Mulai Cari Tutor</Button>
          </div>
        </div>
        
        <div class="flex-1 w-full z-10">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 aspect-video group cursor-pointer border-4 border-white/10">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Video Cover" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-20 h-20 bg-[#FDB913] rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                <i class="ph-fill ph-play text-3xl text-slate-900 ml-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">Layanan & Keunggulan Kami</h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-lg">Ekosistem terintegrasi yang menjamin kualitas pembelajaran dan keamanan transaksi Anda.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(item, index) in features" :key="index" class="group bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer" :class="item.hover">
          <div :class="`w-16 h-16 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`">
            <i :class="`ph ${item.icon} text-3xl ${item.color}`"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-3">{{ item.title }}</h3>
          <p class="text-slate-600 leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="bg-slate-50 py-16 px-4 rounded-3xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">Pengembang U-Mart</h2>
        <p class="text-slate-500">Tim PKM-PI Kolaborasi Ilmu Ekonomi & Pendidikan TIK UNIMED</p>
      </div>
      <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        <div v-for="(member, i) in teamMembers" :key="i" class="text-center">
          <div class="w-24 h-24 mx-auto bg-white rounded-full border-4 border-white shadow-md overflow-hidden mb-4 hover:scale-110 transition-transform duration-300">
            <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name.split(' ')[0]}&backgroundColor=e2e8f0`" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <h4 class="font-bold text-slate-800 text-sm">{{ member.name }}</h4>
          <p class="text-xs text-[#008542] font-medium mt-1 w-32 mx-auto leading-tight">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '../components/common/Button.vue';
import { TEAM_MEMBERS } from '../stores/dataStore.js';

const teamMembers = ref(TEAM_MEMBERS);

const features = ref([
  { icon: 'ph-shield-check', title: "Tutor Tersertifikasi", desc: "Skill level menengah ke atas wajib melampirkan sertifikat yang divalidasi BPUB UNIMED.", color: "text-[#008542]", bg: "bg-green-50", hover: "hover:border-[#008542]" },
  { icon: 'ph-clock', title: "Jadwal Fleksibel & GMeet", desc: "Atur jadwal langsung dan dapatkan link Google Meet otomatis melalui Class Room digital.", color: "text-[#FDB913]", bg: "bg-yellow-50", hover: "hover:border-[#FDB913]" },
  { icon: 'ph-book-open', title: "Modul Premium", desc: "Akses dan unduh langsung materi PDF atau presentasi yang disiapkan khusus untuk sesi Anda.", color: "text-[#00539C]", bg: "bg-blue-50", hover: "hover:border-[#00539C]" }
]);
</script>