<template>
  <div class="pb-20 px-4 md:px-0">
    <div v-if="!activeOrder" class="text-center py-20 md:py-32 bg-white rounded-3xl border border-slate-200 shadow-sm mx-4 md:mx-0">
      <div class="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ph-fill ph-chalkboard-teacher text-4xl md:text-5xl text-slate-300"></i>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-slate-800">Belum Ada Kelas Aktif</h2>
      <p class="text-sm md:text-base text-slate-500 mb-8 font-medium">Anda belum memesan sesi apapun. Cari tutor untuk memulai belajar!</p>
      <Button @click="$router.push('/shop')" customClass="mx-auto px-6 md:px-8 shadow-md">Cari Tutor Sekarang</Button>
    </div>

    <div v-else>
      <div class="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Class Room (ID: {{ activeOrder.id }})</h2>
          <p class="text-sm md:text-base text-slate-500 font-medium">Ruang interaksi, penjadwalan, dan live chat Anda.</p>
        </div>
        <span class="w-fit text-xs px-4 py-1.5 rounded-full font-bold border bg-green-100 text-green-800 border-green-300 animate-pulse flex items-center gap-2 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#00A651]"></span> Kelas Aktif
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl shadow-sm border-2 border-[#00A651]/30 p-6 md:p-8 relative overflow-hidden">
            <div class="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-slate-800 mb-2">{{ activeOrder.tutor.skills[0].name }} (Level: {{ activeOrder.tutor.skills[0].level }})</h3>
                <p class="text-sm md:text-base text-slate-600 flex items-center gap-2 font-bold">
                  <i class="ph-fill ph-user text-[#00539C] text-lg"></i> Tutor: {{ activeOrder.tutor.name }}
                </p>
                <p class="text-sm md:text-base text-slate-600 flex items-center gap-2 font-bold mt-1">
                  <i class="ph-fill ph-chalkboard text-[#00A651] text-lg"></i> Mode: {{ activeOrder.learningMode }}
                </p>
              </div>
              <div class="bg-[#FDB913]/10 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-800 border border-[#FDB913]/30 w-full sm:w-auto text-center shadow-sm">
                <i class="ph-fill ph-calendar text-[#FDB913] text-lg inline align-middle mr-1"></i> Jadwal: {{ activeOrder.date }}
              </div>
            </div>

            <div class="mb-8 md:mb-10 bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-200 shadow-inner">
              <div class="flex justify-between items-end mb-3">
                <span class="font-bold text-slate-800 text-base md:text-lg">Progress Sesi Kelas</span>
                <span class="font-extrabold text-xl md:text-2xl text-[#00A651]">10%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-3 md:h-4 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-[#FDB913] to-[#00A651] h-full w-[10%]"></div>
              </div>
              <p class="text-xs md:text-sm text-slate-500 font-bold">Aktif selama 30 Hari. (Total Akumulasi: {{ activeOrder.hours }} Jam)</p>
            </div>

            <!-- BUG FIXED: Logika Mode Belajar GMeet atau Offline -->
            <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <Button v-if="activeOrder.learningMode === 'Online'" @click="openGMeet" customClass="py-3 md:py-4 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md">
                <i class="ph-fill ph-video-camera text-xl"></i> Join Google Meet
              </Button>
              <Button v-else @click="alert('Silakan temui Tutor di lokasi: ' + activeOrder.tutor.location)" customClass="py-3 md:py-4 text-base md:text-lg bg-[#00A651] text-white border-none shadow-md hover:bg-[#007A3B]">
                <i class="ph-fill ph-map-pin text-xl"></i> Lihat Lokasi Pertemuan Offline
              </Button>
            </div>
          </div>

          <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
             <div class="flex border-b border-slate-200 bg-slate-50 flex-col sm:flex-row">
              <button @click="classTab = 'chat'" :class="['flex-1 py-4 font-extrabold text-sm md:text-base transition-colors', classTab === 'chat' ? 'text-[#00539C] border-b-4 border-[#00539C] bg-white' : 'text-slate-500 hover:text-slate-800']">Live Chat Tutor</button>
            </div>
            
            <div class="p-4 md:p-6 bg-slate-50">
              <!-- Sistem Auto-Reply Chat Berfungsi -->
              <div class="flex flex-col h-72 md:h-80 bg-white rounded-2xl p-4 border border-slate-200 shadow-inner">
                <div class="flex-grow space-y-4 overflow-y-auto mb-4 pr-2" ref="chatBox">
                  <div v-for="(msg, i) in chatMessages" :key="i" :class="['flex w-full', msg.sender === 'user' ? 'justify-end' : 'justify-start']">
                    <div v-if="msg.sender === 'tutor'" class="flex items-start gap-2 max-w-[85%]">
                      <img :src="activeOrder.tutor.image" class="w-8 h-8 rounded-full border border-slate-200" />
                      <div class="bg-slate-100 p-3 rounded-2xl rounded-tl-none border border-slate-200 text-sm font-medium text-slate-800">
                        {{ msg.text }}
                      </div>
                    </div>
                    <div v-else class="flex items-start gap-2 max-w-[85%]">
                      <div class="bg-[#00A651] text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm font-medium">
                        {{ msg.text }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Ketik pesan..." class="flex-grow px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00A651] text-sm font-medium bg-slate-50" />
                  <Button @click="sendMessage" customClass="px-5 shadow-md"><i class="ph-bold ph-paper-plane-right text-lg"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2"><i class="ph-fill ph-calendar-plus text-[#FDB913] text-2xl"></i> Kalender Bersama</h4>
            <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-3">
              <div v-for="day in ['M','S','S','R','K','J','S']" :key="day">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm mb-6 font-bold">
              <button 
                v-for="i in 14" :key="i" 
                @click="alertCalendar(i)"
                :class="['p-2.5 rounded-xl transition-all hover:scale-110', i === 5 ? 'bg-[#00A651] text-white shadow-lg shadow-green-500/50' : i === 10 ? 'bg-[#FDB913]/20 text-[#FDB913] border border-[#FDB913]/30' : 'text-slate-300 hover:bg-slate-800']">
                {{ 10 + i }}
              </button>
            </div>
            <p class="text-xs text-slate-400 text-center mb-6 font-medium">*Klik tanggal untuk buat/lihat janji temu (Offline/Online)</p>
            <Button variant="outline" customClass="w-full border-white/20 text-white hover:bg-white/10 text-sm py-3 font-bold">Input Jadwal Baru</Button>
          </div>

          <div class="bg-[#fffbeb] rounded-3xl p-6 md:p-8 border-2 border-[#FDB913]/40 text-center shadow-lg">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-yellow-100">
              <i class="ph-fill ph-check-circle text-4xl text-[#FDB913]"></i>
            </div>
            <h4 class="font-extrabold text-lg mb-2 text-yellow-900">Selesaikan Sesi Kelas?</h4>
            <p class="text-xs md:text-sm text-yellow-800 mb-6 font-medium">Selesaikan pesanan agar dana diteruskan ke tutor. Anda akan diminta memberi rating untuk membuka Lencana Keahlian.</p>
            <Button variant="secondary" @click="showRatingModal = true" customClass="w-full shadow-md text-sm md:text-base py-3.5">Akhiri & Beri Rating</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Pop-up Interaktif -->
    <div v-if="showRatingModal" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <h3 class="text-2xl font-extrabold text-slate-800 text-center mb-2">Beri Ulasan Tutor</h3>
        <p class="text-center text-slate-500 text-sm mb-6 font-medium">Bagaimana pengalaman belajar Anda bersama {{ activeOrder?.tutor.name }}?</p>
        
        <div class="flex justify-center gap-2 mb-6">
          <i 
            v-for="n in 5" :key="n" 
            @click="userRating = n"
            :class="['text-4xl cursor-pointer transition-transform hover:scale-110', userRating >= n ? 'ph-fill ph-star text-[#FDB913]' : 'ph-fill ph-star text-slate-200']">
          </i>
        </div>

        <textarea 
          v-model="userReview" 
          rows="3" 
          class="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651] mb-6 font-medium text-slate-800"
          placeholder="Tulis ulasan Anda di sini... (Contoh: Penjelasannya sangat mudah dipahami!)">
        </textarea>

        <div class="flex gap-4">
          <Button variant="ghost" @click="showRatingModal = false" customClass="flex-1 py-3 font-bold border border-slate-200">Batal</Button>
          <Button variant="primary" @click="submitRatingAndFinish" :disabled="userRating === 0" customClass="flex-1 py-3 shadow-md">Kirim & Selesai</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../stores/orderStore.js';
import Button from '../components/common/Button.vue';

const router = useRouter();
const orderStore = useOrderStore();
const activeOrder = computed(() => orderStore.activeOrder);
const classTab = ref('chat');

// Chat Auto-Reply Sesuai Permintaan
const chatMessages = ref([
  { sender: 'tutor', text: 'Halo! Selamat datang di kelas kita. Ada materi spesifik yang ingin dipelajari hari ini atau ingin bahas jadwal?' }
]);
const newMessage = ref('');
const chatBox = ref(null);

const sendMessage = () => {
  if(!newMessage.value.trim()) return;
  
  chatMessages.value.push({ sender: 'user', text: newMessage.value });
  newMessage.value = '';
  scrollToBottom();

  setTimeout(() => {
    chatMessages.value.push({ 
      sender: 'tutor', 
      text: 'Baik, saya catat ya. Nanti kita akan bahas lebih detail saat sesi dimulai. Jangan ragu menghubungi jika ada kendala.' 
    });
    scrollToBottom();
  }, 1000);
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight;
};

const showRatingModal = ref(false);
const userRating = ref(0);
const userReview = ref('');

const alertCalendar = (i) => {
  if(i === 5) alert("Tanggal 15: Jadwal Utama Anda. (Telah Disetujui)");
  else if(i === 10) alert("Tanggal 20: Slot kosong dari Tutor. Anda bisa input janji temu ke tanggal ini.");
  else alert("Tanggal ini belum ada jadwal. Klik 'Input Jadwal Baru' untuk mengajukan.");
};

const openGMeet = () => alert("Membuka Google Meet secara eksternal...");

const submitRatingAndFinish = () => {
  orderStore.completeOrder(userRating.value, userReview.value);
  showRatingModal.value = false;
  alert("Terima kasih! Ulasan telah tersimpan dan lencana keahlian Anda berhasil dibuka.");
  router.push('/profile');
}
</script>