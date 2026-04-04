<template>
  <div class="pb-20 px-4 md:px-0">
    <div v-if="!activeOrder" class="text-center py-20 md:py-32 bg-white rounded-3xl border border-slate-100 shadow-sm mx-4 md:mx-0">
      <div class="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ph ph-chalkboard-teacher text-4xl md:text-5xl text-slate-300"></i>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-slate-700">Belum Ada Kelas Aktif</h2>
      <p class="text-sm md:text-base text-slate-500 mb-6">Anda belum memesan sesi apapun. Cari tutor untuk memulai belajar!</p>
      <Button @click="$router.push('/shop')" customClass="mx-auto px-6 md:px-8">Mulai Cari Tutor</Button>
    </div>

    <div v-else>
      <div class="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Class Room (ID: {{ activeOrder.id }})</h2>
          <p class="text-sm md:text-base text-slate-500">Ruang interaksi, materi, dan evaluasi pembelajaran Anda.</p>
        </div>
        <span class="w-fit text-xs px-4 py-1.5 rounded-full font-bold border bg-green-100 text-green-800 border-green-200 animate-pulse flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-unimed-green"></span> Live Class
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl shadow-sm border-2 border-unimed-green/20 p-6 md:p-8 relative overflow-hidden">
            <div class="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-slate-800 mb-2">{{ activeOrder.tutor.skills[0].name }} (Level: {{ activeOrder.tutor.skills[0].level }})</h3>
                <p class="text-sm md:text-base text-slate-600 flex items-center gap-2">
                  <i class="ph-fill ph-user text-unimed-blue"></i> Tutor: <span class="font-bold">{{ activeOrder.tutor.name }}</span>
                </p>
              </div>
              <div class="bg-slate-100 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-700 border border-slate-200 w-full sm:w-auto text-center">
                <i class="ph-fill ph-calendar text-unimed-yellow"></i> Jadwal: {{ activeOrder.date }}
              </div>
            </div>

            <div class="mb-8 md:mb-10 bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100">
              <div class="flex justify-between items-end mb-3">
                <span class="font-bold text-slate-700 text-base md:text-lg">Progress Kelas</span>
                <span class="font-extrabold text-xl md:text-2xl text-unimed-green">35%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-3 md:h-4 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-unimed-yellow to-unimed-green h-full transition-all duration-1000 w-[35%] relative"></div>
              </div>
              <p class="text-xs md:text-sm text-slate-500 font-medium">1 dari {{ activeOrder.hours }} Jam Sesi Diselesaikan</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button @click="openGMeet" customClass="py-3 md:py-4 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white border-none shadow-blue-600/30">
                <i class="ph-fill ph-video-camera text-xl"></i> Join Google Meet
              </Button>
              <Button v-if="activeOrder.addonModul" variant="outline" customClass="py-3 md:py-4 text-base md:text-lg">
                <i class="ph ph-file-pdf text-xl"></i> Download Modul
              </Button>
              <Button v-else variant="ghost" disabled customClass="py-3 md:py-4 text-base md:text-lg bg-slate-100 text-slate-400 cursor-not-allowed">
                Modul Tidak Tersedia
              </Button>
            </div>
          </div>

          <!-- Classroom Tabs -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
             <div class="flex border-b border-slate-100 bg-slate-50 flex-col sm:flex-row">
              <button @click="classTab = 'materi'" :class="['flex-1 py-3 md:py-4 font-bold text-sm md:text-base transition-colors', classTab === 'materi' ? 'text-unimed-blue border-b-2 sm:border-b-4 border-unimed-blue bg-white' : 'text-slate-500 hover:text-slate-800']">Silabus Materi</button>
              <button @click="classTab = 'chat'" :class="['flex-1 py-3 md:py-4 font-bold text-sm md:text-base transition-colors', classTab === 'chat' ? 'text-unimed-blue border-b-2 sm:border-b-4 border-unimed-blue bg-white' : 'text-slate-500 hover:text-slate-800']">Live Chat Tutor</button>
            </div>
            
            <div class="p-6 md:p-8">
              <div v-if="classTab === 'materi'" class="space-y-4">
                <div v-for="(materi, i) in syllabus" :key="i" :class="['flex items-center justify-between p-3 md:p-4 rounded-xl border', materi.status === 'Selesai' ? 'bg-green-50 border-green-100' : materi.status === 'Aktif' ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100 opacity-60']">
                  <div class="flex items-center gap-3 md:gap-4">
                    <div :class="['w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center', materi.status === 'Selesai' ? 'bg-unimed-green text-white' : 'bg-slate-200 text-slate-500']">
                      <i :class="['text-lg md:text-xl', materi.status === 'Selesai' ? 'ph-bold ph-check' : 'ph ph-book-open']"></i>
                    </div>
                    <div>
                      <h5 class="font-bold text-sm md:text-base text-slate-800 line-clamp-1">{{ materi.title }}</h5>
                      <span class="text-[10px] md:text-xs text-slate-500 font-medium">Format: {{ materi.type }}</span>
                    </div>
                  </div>
                  <span :class="['text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap', materi.status === 'Selesai' ? 'bg-green-200 text-green-800' : materi.status === 'Aktif' ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-600']">{{ materi.status }}</span>
                </div>
              </div>

              <!-- Simulasi Chat -->
              <div v-if="classTab === 'chat'" class="flex flex-col h-64 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div class="flex-grow space-y-4 overflow-y-auto mb-4 p-1 md:p-2">
                  <div class="flex items-start gap-3">
                     <img :src="activeOrder.tutor.image" class="w-8 h-8 rounded-full" />
                     <div class="bg-white p-3 rounded-xl rounded-tl-none border border-slate-100 shadow-sm text-xs md:text-sm">
                       Halo! Link gmeet nya nanti menyusul ya kak di jam kelas. Modulnya bisa didownload.
                     </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input type="text" placeholder="Ketik pesan..." class="flex-grow px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-unimed-green text-sm" />
                  <Button customClass="px-4"><i class="ph-bold ph-paper-plane-right"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Kalender Interaktif & Rating WDD -->
        <div class="lg:col-span-1 space-y-6">
          
          <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-lg">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2"><i class="ph-fill ph-calendar text-unimed-yellow"></i> Kalender Interaktif</h4>
            <div class="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
              <div v-for="day in ['M','S','S','R','K','J','S']" :key="day">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm mb-6">
              <button 
                v-for="i in 14" :key="i" 
                @click="alertCalendar(i)"
                :class="['p-2 rounded-lg transition-transform hover:scale-110', i === 5 ? 'bg-unimed-green text-white font-bold' : i === 10 ? 'bg-unimed-yellow/20 text-unimed-yellow' : 'text-slate-300 hover:bg-white/10']">
                {{ 10 + i }}
              </button>
            </div>
            <p class="text-xs text-slate-400 text-center mb-4">*Klik tanggal untuk melihat jadwal</p>
            <Button variant="outline" customClass="w-full border-white/20 text-white hover:bg-white/10 text-sm">Reschedule Sesi</Button>
          </div>

          <div class="bg-[#fffbeb] rounded-3xl p-6 border border-unimed-yellow/30 text-center shadow-sm">
            <div class="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i class="ph-fill ph-check-circle text-3xl md:text-4xl text-unimed-yellow"></i>
            </div>
            <h4 class="font-bold text-base md:text-lg mb-2 text-yellow-900">Selesaikan Sesi?</h4>
            <p class="text-xs md:text-sm text-yellow-800 mb-6">Selesaikan pesanan agar dana diteruskan ke tutor dan berikan rating untuk membuka lencana.</p>
            <Button variant="secondary" @click="showRatingModal = true" customClass="w-full shadow-sm text-sm md:text-base py-3">Selesaikan Sesi</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Pop-up Modal Interaktif (Fase Finalisasi Produk) -->
    <div v-if="showRatingModal" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
        <h3 class="text-2xl font-bold text-slate-800 text-center mb-2">Beri Ulasan Tutor</h3>
        <p class="text-center text-slate-500 text-sm mb-6">Bagaimana pengalaman belajar Anda bersama {{ activeOrder?.tutor.name }}?</p>
        
        <div class="flex justify-center gap-2 mb-6">
          <i 
            v-for="n in 5" :key="n" 
            @click="userRating = n"
            :class="['text-4xl cursor-pointer transition-transform hover:scale-110', userRating >= n ? 'ph-fill ph-star text-unimed-yellow' : 'ph ph-star text-slate-200']">
          </i>
        </div>

        <textarea 
          v-model="userReview" 
          rows="3" 
          class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-unimed-green mb-6"
          placeholder="Tulis ulasan Anda di sini... (Contoh: Penjelasannya sangat mudah dipahami!)">
        </textarea>

        <div class="flex gap-4">
          <Button variant="ghost" @click="showRatingModal = false" customClass="flex-1 py-3">Batal</Button>
          <Button variant="primary" @click="submitRatingAndFinish" :disabled="userRating === 0" customClass="flex-1 py-3">Kirim & Selesai</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../stores/orderStore.js';
import Button from '../components/common/Button.vue';

const router = useRouter();
const orderStore = useOrderStore();
const activeOrder = computed(() => orderStore.activeOrder);
const classTab = ref('materi');

// State untuk Rating
const showRatingModal = ref(false);
const userRating = ref(0);
const userReview = ref('');

const alertCalendar = (i) => {
  if(i === 5) alert("Tanggal 15: Sesi Anda dijadwalkan di hari ini!");
  else if(i === 10) alert("Tanggal 20: Tutor tersedia untuk Reschedule.");
  else alert("Tidak ada jadwal pada tanggal ini.");
};

const openGMeet = () => alert("Membuka Google Meet secara eksternal...");

const submitRatingAndFinish = () => {
  // Panggil Pinia Action yang sekarang menerima Parameter Rating & Review untuk WDD
  orderStore.completeOrder(userRating.value, userReview.value);
  showRatingModal.value = false;
  alert("Terima kasih! Ulasan Anda telah tersimpan dan lencana berhasil dibuka.");
  router.push('/profile');
}

const syllabus = [
  { title: "Pengenalan & Fundamental", status: "Selesai", type: "PDF" },
  { title: "Praktek & Studi Kasus Part 1", status: "Aktif", type: "Video/Meet" },
  { title: "Evaluasi & Tanya Jawab", status: "Terkunci", type: "Tugas" }
];
</script>