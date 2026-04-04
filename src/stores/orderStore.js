import { defineStore } from 'pinia';
import { MOCK_TUTORS, CURRENT_USER } from './dataStore.js';

export const useOrderStore = defineStore('order', {
  state: () => ({
    activeOrder: null,
    orderHistory: []
  }),
  actions: {
    setOrder(orderData) {
      this.activeOrder = {
        id: `TRX-${Math.floor(Math.random() * 10000)}`,
        ...orderData
      };
    },
    completeOrder(rating, reviewComment) {
      if (this.activeOrder) {
        this.activeOrder.status = "Selesai";
        
        // Simulasikan penambahan review ke database tutor
        const tutorIndex = MOCK_TUTORS.findIndex(t => t.id === this.activeOrder.tutor.id);
        if(tutorIndex !== -1 && rating > 0) {
          MOCK_TUTORS[tutorIndex].reviewsList.unshift({
            user: CURRENT_USER.name,
            rating: rating,
            comment: reviewComment
          });
          MOCK_TUTORS[tutorIndex].reviews += 1;
        }

        this.orderHistory.unshift(this.activeOrder);
        this.activeOrder = null;
      }
    },
    clearOrder() {
      this.activeOrder = null;
    }
  }
});