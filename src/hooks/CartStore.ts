import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    selectedItems: [],
  }),
  actions: {
    setSelectedItems(items: any) {
      this.selectedItems = items
    },
  },
})
