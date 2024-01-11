import { defineStore } from "pinia";

export interface OrderStoreState {
  order: "ASC" | "DESC";
}

export const useOrderStore = defineStore("order", {
  state: (): OrderStoreState => ({
    order: "DESC",
  }),
  actions: {
    setOrder(value: "ASC" | "DESC") {
      this.order = value;
    },
  },
});
