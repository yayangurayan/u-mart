import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion' // Import plugin
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(MotionPlugin) // Gunakan plugin

app.mount('#app')import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import index from './index.js';

// Impor gaya CSS utama (Tailwind)
import './assets/style.css'; 

const app = createApp(App);

// Penggunaan Pinia & Router Wajib untuk Production
app.use(createPinia());
app.use(router);

app.mount('#app');