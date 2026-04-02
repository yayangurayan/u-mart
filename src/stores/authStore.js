import { defineStore } from 'pinia';
import { CURRENT_USER } from './dataStore.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: CURRENT_USER,
    isAuthenticated: true
  }),
  actions: {
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      alert("Logout berhasil!");
    }
  }
});