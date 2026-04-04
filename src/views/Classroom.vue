<template>
  <div class="pb-20">
    <div v-if="!activeOrder" class="text-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ph ph-chalkboard-teacher text-5xl text-slate-300"></i>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-slate-700">Belum Ada Kelas Aktif</h2>
      <p class="text-slate-500 mb-6">Anda belum memesan sesi apapun. Cari tutor untuk memulai belajar!</p>
      <Button @click="$router.push('/shop')" customClass="mx-auto px-8">Mulai Cari Tutor</Button>
    </div>

    <div v-else>
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-extrabold text-slate-800 mb-2">Class Room (ID: {{ activeOrder.id || 'TRX-123' }})</h2>
          <p class="text-slate-500">Ruang interaksi, materi, dan evaluasi pembelajaran Anda.</p>
        </div>
        <span class="text-xs px-4 py-1.5 rounded-full font-bold border bg-green-100 text-green-800 border-green-200 animate-pulse">Live</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <!-- Class Card -->
          <div class="bg-white rounded-3xl shadow-sm border-2 border-[#008542]/20 p-8 relative overflow-hidden">
            <div class="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <h3 class="text-2xl font-bold text-slate-800 mb-2">{{ activeOrder.tutor.skills[0].name }} (Level: {{ activeOrder.tutor.skills[0].level }})</h3>
                <p class="text-slate-600 flex items-center gap-2">
                  <i class="ph-fill ph-user text-[#00539C]"></i> Tutor: <span class="font-bold">{{ activeOrder.tutor.name }}</span>
                </p>
              </div>
              <div class="bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 border border-slate-200">
                <i class="ph-fill ph-calendar text-[#FDB913]"></i> Jadwal: {{ activeOrder.date }}
              </div>
            </div>

            <div class="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div class="flex justify-between items-end mb-3">
                <span class="font-bold text-slate-700 text-lg">Progress Kelas</span>
                <span class="font-extrabold text-2xl text-[#008542]">35%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-[#FDB913] to-[#008542] h-full transition-all duration-1000 w-[35%] relative"></div>
              </div>
              <p class="text-sm text-slate-500 font-medium">1 dari {{ activeOrder.hours }} Jam Sesi Diselesaikan</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button @click="openGMeet" customClass="py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white border-none shadow-blue-600/30">
                <i class="ph-fill ph-video-camera text-xl"></i> Join Google Meet
              </Button>
              <Button v-if="activeOrder.addonModul" variant="outline" customClass="py-4 text-lg">
                <i class="ph ph-file-pdf text-xl"></i> Download Modul
              </Button>
              <Button v-else variant="ghost" disabled customClass="py-4 text-lg bg-slate-100 text-slate-400 cursor-not-allowed">
                Modul Tidak Tersedia
              </Button>
            </div>
          </div>

          <!-- Classroom Tabs (Silabus & Chat) -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
             <div class="flex border-b border-slate-100 bg-slate-50">
              <button @click="classTab = 'materi'" :class="['flex-1 py-4 font-bold text-sm transition-colors', classTab === 'materi' ? 'text-[#00539C] border-b-2 border-[#00539C] bg-white' : 'text-slate-500 hover:text-slate-800']">Silabus Materi</button>
              <button @click="classTab = 'chat'" :class="['flex-1 py-4 font-bold text-sm transition-colors', classTab === 'chat' ? 'text-[#00539C] border-b-2 border-[#00539C] bg-white' : 'text-slate-500 hover:text-slate-800']">Live Chat Tutor</button>
            </div>
            
            <div class="p-8">
              <div v-if="classTab === 'materi'" class="space-y-4">
                <div v-for="(materi, i) in syllabus" :key="i" :class="['flex items-center justify-between p-4 rounded-xl border', materi.status === 'Selesai' ? 'bg-green-50 border-green-100' : materi.status === 'Aktif' ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100 opacity-60']">
                  <div class="flex items-center gap-4">
                    <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', materi.status === 'Selesai' ? 'bg-[#008542] text-white' : 'bg-slate-200 text-slate-500']">
                      <i :class="['text-xl', materi.status === 'Selesai' ? 'ph-bold ph-check' : 'ph ph-book-open']"></i>
                    </div>
                    <div>
                      <h5 class="font-bold text-slate-800">{{ materi.title }}</h5>
                      <span class="text-xs text-slate-500 font-medium">Format: {{ materi.type }}</span>
                    </div>
                  </div>
                  <span :class="['text-xs px-2.5 py-1 rounded-full font-bold', materi.status === 'Selesai' ? 'bg-green-200 text-green-800' : materi.status === 'Aktif' ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-600']">{{ materi.status }}</span>
                </div>
              </div>

              <!-- Simulasi Chat WDD -->
              <div v-if="classTab === 'chat'" class="flex flex-col h-64 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div class="flex-grow space-y-4 overflow-y-auto mb-4 p-2">
                  <div class="flex items-start gap-3">
                     <img :src="activeOrder.tutor.image" class="w-8 h-8 rounded-full" />
                     <div class="bg-white p-3 rounded-xl rounded-tl-none border border-slate-100 shadow-sm text-sm">
                       Halo! Link gmeet nya nanti menyusul ya kak di jam kelas. Modulnya bisa didownload.
                     </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input type="text" placeholder="Ketik pesan..." class="flex-grow px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#008542]" />
                  <Button customClass="px-4"><i class="ph-bold ph-paper-plane-right"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Akhiri Kelas -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-[#fffbeb] rounded-3xl p-6 border border-[#FDB913]/30 text-center shadow-sm">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i class="ph-fill ph-check-circle text-4xl text-[#FDB913]"></i>
            </div>
            <h4 class="font-bold text-lg mb-2 text-yellow-900">Selesaikan Sesi?</h4>
            <p class="text-sm text-yellow-800 mb-6">Jika kelas sudah berakhir, selesaikan pesanan agar dana diteruskan ke tutor dan berikan rating untuk membuka lencana.</p>
            <!-- Simulasi Fungsi Selesai di Pinia Store -->
            <Button variant="secondary" @click="finishClass" customClass="w-full shadow-sm">Selesaikan Sesi</Button>
          </div>

          <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-lg">
            <h4 class="font-bold text-lg mb-4 flex items-center gap-2"><i class="ph-fill ph-headset text-[#FDB913]"></i> Butuh Bantuan?</h4>
            <p class="text-sm text-slate-400 mb-4">Hubungi admin BPUB jika Anda mengalami kendala dengan tutor atau sistem.</p>
            <Button variant="outline" customClass="w-full border-white/20 text-white hover:bg-white/10 text-sm">Hubungi Support</Button>
          </div>
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

const openGMeet = () => alert("Membuka Google Meet secara eksternal...");

const finishClass = () => {
  if(confirm("Apakah Anda yakin ingin mengakhiri sesi ini? Transaksi tidak dapat dibatalkan.")) {
    // Logika memanggil Complete Order pada Pinia yang memindahkan data ke history
    if (orderStore.completeOrder) {
        orderStore.completeOrder();
    } else {
        orderStore.clearOrder(); // fallback
    }
    alert("Terima kasih! Pesanan diselesaikan. Dana akan dikirim ke Tutor dan fee 5% otomatis masuk ke BPUB.");
    router.push('/profile');
  }
}

const syllabus = [
  { title: "Pengenalan & Fundamental", status: "Selesai", type: "PDF" },
  { title: "Praktek & Studi Kasus Part 1", status: "Aktif", type: "Video/Meet" },
  { title: "Evaluasi & Tanya Jawab", status: "Terkunci", type: "Tugas" }
];
</script>