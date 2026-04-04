import { defineStore } from 'pinia';
import { MOCK_TUTORS, CURRENT_USER } from './dataStore.js';

export const useOrderStore = defineStore('order', {
  state: () => ({
    activeOrder: null,
    orderHistory: [],
    cart: [] // State untuk fitur Keranjang Belanja Shop
  }),
  actions: {
    addToCart(tutor) {
      if (!this.cart) this.cart = [];
      const exists = this.cart.find(item => item.id === tutor.id);
      if (!exists) {
        this.cart.push(tutor);
        alert(`${tutor.name} berhasil ditambahkan ke keranjang!`);
      } else {
        alert(`${tutor.name} sudah ada di dalam keranjang Anda.`);
      }
    },
    removeFromCart(tutorId) {
      if (!this.cart) this.cart = [];
      this.cart = this.cart.filter(item => item.id !== tutorId);
    },
    setOrder(orderData) {
      this.activeOrder = {
        id: `TRX-${Math.floor(Math.random() * 10000)}`,
        ...orderData
      };
      // Hapus otomatis dari keranjang jika berhasil di-checkout
      this.removeFromCart(orderData.tutor.id);
    },
    completeOrder(rating, reviewComment) {
      if (this.activeOrder) {
        this.activeOrder.status = "Selesai";
        
        // Simulasikan penambahan ulasan secara real-time ke profil Tutor
        const tutorIndex = MOCK_TUTORS.findIndex(t => t.id === this.activeOrder.tutor.id);
        if(tutorIndex !== -1 && rating > 0) {
          MOCK_TUTORS[tutorIndex].reviewsList.unshift({
            user: CURRENT_USER.name,
            rating: rating,
            comment: reviewComment
          });
          MOCK_TUTORS[tutorIndex].reviews += 1;
        }

        if (!this.orderHistory) this.orderHistory = [];
        this.orderHistory.unshift(this.activeOrder);
        this.activeOrder = null;
      }
    },
    clearOrder() {
      this.activeOrder = null;
    }
  }
});