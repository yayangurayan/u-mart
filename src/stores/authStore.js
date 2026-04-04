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
    // Fitur Penterjemah Pintar untuk seluruh aplikasi
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
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      // Logika inti untuk memicu Tailwind Dark Mode
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