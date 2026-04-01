import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion' // Import plugin
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(MotionPlugin) // Gunakan plugin

app.mount('#app')