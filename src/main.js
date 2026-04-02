import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';

// Path presisi ke folder routers sesuai struktur direktori Anda
import router from './routers/index.js';

// Impor gaya CSS utama Tailwind
import './style.css'; 

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);

app.mount('#app');