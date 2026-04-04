import { defineStore } from 'pinia';
import { CURRENT_USER } from './dataStore.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: CURRENT_USER,
    isAuthenticated: true,
    theme: 'light', 
    language: 'id'
  }),
  getters: {
    t: (state) => {
      return (idText, enText) => {
        return state.language === 'id' ? idText : enText;
      }
    }
  },
  actions: {
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      alert(this.t("Logout berhasil!", "Logout successful!"));
    },
    // Fungsi ini dipanggil dari Settings.vue
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme();
    },
    // Fungsi khusus untuk sinkronisasi DOM (Dipanggil di MainLayout)
    applyTheme() {
      const htmlEl = document.documentElement;
      if (this.theme === 'dark') {
        htmlEl.classList.add('dark');
      } else {
        htmlEl.classList.remove('dark');
      }
    },
    setLanguage(lang) {
      this.language = lang;
    }
  }
});