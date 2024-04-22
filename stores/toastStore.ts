import { defineStore } from "pinia";
import type { ToastData } from "~/types/ToastData";

interface ToastStoreState {
  messages: ToastData[];
}

export const useOrderStore = defineStore("order", {
  state: (): ToastStoreState => ({
    messages: [],
  }),
  actions: {
    addMessage(toastData: ToastData) {
      this.messages.push(toastData);
      setTimeout(() => {
        this.messages.splice(this.messages.indexOf(toastData), 1);
      }, 3 * 1000);
    },
  },
});
