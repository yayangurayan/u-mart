<template>
  <div class="pb-20 px-4 md:px-0 animate-in fade-in">
    <div v-if="!activeOrder" class="text-center py-20 md:py-32 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mx-4 md:mx-0 transition-colors">
      <div class="w-20 h-20 md:w-24 md:h-24 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ph-fill ph-chalkboard-teacher text-4xl md:text-5xl text-slate-300 dark:text-slate-500"></i>
      </div>
      <h2 class="text-xl md:text-2xl font-bold mb-4 text-slate-800 dark:text-white">{{ authStore.t('Belum Ada Kelas Aktif', 'No Active Class') }}</h2>
      <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8 font-medium">{{ authStore.t('Anda belum memesan sesi apapun. Cari tutor untuk memulai belajar!', 'You haven\'t booked any session. Find a tutor to start learning!') }}</p>
      <Button @click="$router.push('/shop')" customClass="mx-auto px-6 md:px-8 shadow-md">{{ authStore.t('Cari Tutor Sekarang', 'Find Tutor Now') }}</Button>
    </div>

    <div v-else>
      <div class="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">Class Room (ID: {{ activeOrder.id }})</h2>
          <p class="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{{ authStore.t('Ruang interaksi, penjadwalan, dan live chat Anda.', 'Your interaction, scheduling, and live chat room.') }}</p>
        </div>
        <span class="w-fit text-xs px-4 py-1.5 rounded-full font-bold border bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-800 animate-pulse flex items-center gap-2 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-unimed-green"></span> {{ authStore.t('Kelas Aktif', 'Active Class') }}
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-2 border-unimed-green/30 p-6 md:p-8 relative overflow-hidden transition-colors">
            <div class="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">{{ activeOrder.tutor.skills[0].name }} (Level: {{ activeOrder.tutor.skills[0].level }})</h3>
                <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 flex items-center gap-2 font-bold">
                  <i class="ph-fill ph-user text-[#00539C] dark:text-blue-400 text-lg"></i> Tutor: {{ activeOrder.tutor.name }}
                </p>
                <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 flex items-center gap-2 font-bold mt-1">
                  <i class="ph-fill ph-chalkboard text-unimed-green text-lg"></i> Mode: {{ activeOrder.learningMode }}
                </p>
              </div>
              <div class="bg-[#FDB913]/10 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 border border-[#FDB913]/30 w-full sm:w-auto text-center shadow-sm">
                <i class="ph-fill ph-calendar text-[#FDB913] text-lg inline align-middle mr-1"></i> {{ authStore.t('Jadwal', 'Schedule') }}: {{ activeOrder.date }}
              </div>
            </div>

            <div class="mb-8 md:mb-10 bg-slate-50 dark:bg-slate-700/50 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
              <div class="flex justify-between items-end mb-3">
                <span class="font-bold text-slate-800 dark:text-white text-base md:text-lg">{{ authStore.t('Progress Sesi Kelas', 'Class Session Progress') }}</span>
                <span class="font-extrabold text-xl md:text-2xl text-unimed-green">10%</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 md:h-4 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-[#FDB913] to-unimed-green h-full w-[10%]"></div>
              </div>
              <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold">{{ authStore.t('Aktif selama 30 Hari.', 'Active for 30 Days.') }} ({{ authStore.t('Total Akumulasi', 'Total Acc') }}: {{ activeOrder.hours }} {{ authStore.t('Jam', 'Hours') }})</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <Button v-if="activeOrder.learningMode === 'Online'" @click="openGMeet" customClass="py-3 md:py-4 text-base md:text-lg bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md">
                <i class="ph-fill ph-video-camera text-xl"></i> Join Google Meet
              </Button>
              <Button v-else @click="alert(authStore.t('Silakan temui Tutor di lokasi: ', 'Please meet Tutor at location: ') + activeOrder.tutor.location)" customClass="py-3 md:py-4 text-base md:text-lg bg-unimed-green text-white border-none shadow-md hover:bg-unimed-dark">
                <i class="ph-fill ph-map-pin text-xl"></i> {{ authStore.t('Lihat Lokasi Pertemuan Offline', 'See Offline Meeting Location') }}
              </Button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
             <div class="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <button @click="classTab = 'chat'" :class="['flex-1 py-4 font-extrabold text-sm md:text-base transition-colors', classTab === 'chat' ? 'text-[#00539C] dark:text-blue-400 border-b-4 border-[#00539C] dark:border-blue-400 bg-white dark:bg-slate-700' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white']">Live Chat Tutor</button>
            </div>
            
            <div class="p-4 md:p-6 bg-slate-50 dark:bg-slate-800">
              <div class="flex flex-col h-72 md:h-80 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
                <div class="flex-grow space-y-4 overflow-y-auto mb-4 pr-2" ref="chatBox">
                  <div v-for="(msg, i) in chatMessages" :key="i" :class="['flex w-full', msg.sender === 'user' ? 'justify-end' : 'justify-start']">
                    <div v-if="msg.sender === 'tutor'" class="flex items-start gap-2 max-w-[85%]">
                      <img :src="activeOrder.tutor.image" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
                      <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {{ msg.text }}
                      </div>
                    </div>
                    <div v-else class="flex items-start gap-2 max-w-[85%]">
                      <div class="bg-unimed-green text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm font-medium">
                        {{ msg.text }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <input v-model="newMessage" @keyup.enter="sendMessage" type="text" :placeholder="authStore.t('Ketik pesan...', 'Type a message...')" class="flex-grow px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-unimed-green text-sm font-medium bg-slate-50 dark:bg-slate-800 dark:text-white" />
                  <Button @click="sendMessage" customClass="px-5 shadow-md"><i class="ph-bold ph-paper-plane-right text-lg"></i></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1 space-y-6">
          <div class="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 dark:border-slate-900">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2"><i class="ph-fill ph-calendar-plus text-[#FDB913] text-2xl"></i> {{ authStore.t('Kalender Bersama', 'Shared Calendar') }}</h4>
            <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-3">
              <div v-for="day in ['M','S','S','R','K','J','S']" :key="day">{{ day }}</div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm mb-6 font-bold">
              <button 
                v-for="i in 14" :key="i" 
                @click="alertCalendar(i)"
                :class="['p-2.5 rounded-xl transition-all hover:scale-110', i === 5 ? 'bg-unimed-green text-white shadow-lg shadow-unimed-green/50' : i === 10 ? 'bg-[#FDB913]/20 text-[#FDB913] border border-[#FDB913]/30' : 'text-slate-300 hover:bg-slate-800']">
                {{ 10 + i }}
              </button>
            </div>
            <p class="text-xs text-slate-400 text-center mb-6 font-medium">*{{ authStore.t('Klik tanggal untuk buat/lihat janji temu', 'Click date to create/view appointment') }}</p>
            <Button variant="outline" customClass="w-full border-slate-700 text-white hover:bg-slate-800 text-sm py-3 font-bold">{{ authStore.t('Input Jadwal Baru', 'Input New Schedule') }}</Button>
          </div>

          <div class="bg-[#fffbeb] dark:bg-[#FDB913]/10 rounded-3xl p-6 md:p-8 border-2 border-[#FDB913]/40 text-center shadow-lg transition-colors">
            <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-yellow-100 dark:border-yellow-900/50">
              <i class="ph-fill ph-check-circle text-4xl text-[#FDB913]"></i>
            </div>
            <h4 class="font-extrabold text-lg mb-2 text-yellow-900 dark:text-yellow-400">{{ authStore.t('Selesaikan Sesi Kelas?', 'Finish Class Session?') }}</h4>
            <p class="text-xs md:text-sm text-yellow-800 dark:text-yellow-500/80 mb-6 font-medium">{{ authStore.t('Selesaikan pesanan agar dana diteruskan ke tutor. Anda akan diminta memberi rating.', 'Complete the order so funds are forwarded to the tutor. You will be asked to rate.') }}</p>
            <Button variant="secondary" @click="showRatingModal = true" customClass="w-full shadow-md text-sm md:text-base py-3.5">{{ authStore.t('Akhiri & Beri Rating', 'End & Give Rating') }}</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Pop-up Interaktif -->
    <div v-if="showRatingModal" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 transition-colors">
        <h3 class="text-2xl font-extrabold text-slate-800 dark:text-white text-center mb-2">{{ authStore.t('Beri Ulasan Tutor', 'Rate the Tutor') }}</h3>
        <p class="text-center text-slate-500 dark:text-slate-400 text-sm mb-6 font-medium">{{ authStore.t('Bagaimana pengalaman belajar Anda bersama', 'How was your learning experience with') }} {{ activeOrder?.tutor.name }}?</p>
        
        <div class="flex justify-center gap-2 mb-6">
          <i 
            v-for="n in 5" :key="n" 
            @click="userRating = n"
            :class="['text-4xl cursor-pointer transition-transform hover:scale-110', userRating >= n ? 'ph-fill ph-star text-[#FDB913]' : 'ph-fill ph-star text-slate-200 dark:text-slate-600']">
          </i>
        </div>

        <textarea 
          v-model="userReview" 
          rows="3" 
          class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-unimed-green mb-6 font-medium text-slate-800 dark:text-white"
          :placeholder="authStore.t('Tulis ulasan Anda di sini...', 'Write your review here...')">
        </textarea>

        <div class="flex gap-4">
          <Button variant="ghost" @click="showRatingModal = false" customClass="flex-1 py-3 font-bold border border-slate-200 dark:border-slate-700">{{ authStore.t('Batal', 'Cancel') }}</Button>
          <Button variant="primary" @click="submitRatingAndFinish" :disabled="userRating === 0" customClass="flex-1 py-3 shadow-md">{{ authStore.t('Kirim & Selesai', 'Submit & Finish') }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../stores/orderStore.js';
import { useAuthStore } from '../stores/authStore.js';
import Button from '../components/common/Button.vue';

const router = useRouter();
const orderStore = useOrderStore();
const authStore = useAuthStore();
const activeOrder = computed(() => orderStore.activeOrder);
const classTab = ref('chat');

const chatMessages = ref([
  { sender: 'tutor', text: authStore.t('Halo! Selamat datang di kelas kita. Ada materi spesifik yang ingin dipelajari hari ini?', 'Hello! Welcome to our class. Any specific material to learn today?') }
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
      text: authStore.t('Baik, saya catat ya. Nanti kita akan bahas lebih detail saat sesi dimulai.', 'Alright, noted. We will discuss it in detail when the session starts.') 
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
  if(i === 5) alert(authStore.t("Tanggal 15: Jadwal Utama Anda. (Telah Disetujui)", "15th: Your Main Schedule. (Approved)"));
  else if(i === 10) alert(authStore.t("Tanggal 20: Slot kosong dari Tutor.", "20th: Empty slot from Tutor."));
  else alert(authStore.t("Tidak ada jadwal. Klik 'Input Jadwal Baru'.", "No schedule. Click 'Input New Schedule'."));
};

const openGMeet = () => alert("Membuka Google Meet...");

const submitRatingAndFinish = () => {
  orderStore.completeOrder(userRating.value, userReview.value);
  showRatingModal.value = false;
  alert(authStore.t("Terima kasih! Ulasan telah tersimpan.", "Thank you! Review has been saved."));
  router.push('/profile');
}
</script>