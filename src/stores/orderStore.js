import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => ({
    activeOrder: null
  }),
  actions: {
    setOrder(orderData) {
      this.activeOrder = orderData;
    },
    clearOrder() {
      this.activeOrder = null;
    }
  }
});