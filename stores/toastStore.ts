import { defineStore } from "pinia";
import type { ToastData } from "~/types/ToastData";

interface ToastStoreState {
  messages: ToastData[];
}

export const useOrderStore = defineStore("order", {
  state: (): ToastStoreState => ({
    messages: [],
  }),
  actions: {},
});
