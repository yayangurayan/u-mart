import { defineStore } from 'pinia';
import { CURRENT_USER } from './dataStore.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: CURRENT_USER,
    isAuthenticated: true,
    // State Baru untuk Fitur Pengaturan
    theme: 'light', 
    language: 'id'
  }),
  actions: {
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      alert(this.language === 'id' ? "Logout berhasil!" : "Logout successful!");
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      // Mengubah class 'dark' pada tag HTML utama agar Tailwind Dark Mode bekerja
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleLanguage() {
      this.language = this.language === 'id' ? 'en' : 'id';
    }
  }
});