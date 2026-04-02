import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MotionPlugin } from '@vueuse/motion';
import App from './App.vue';

// BUG FIXED: Path router disesuaikan dengan folder "routers" milik Anda
import router from './routers/index.js';

// BUG FIXED: Path style.css disesuaikan karena berada langsung di dalam folder src/
import './style.css'; 

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(MotionPlugin);

app.mount('#app');