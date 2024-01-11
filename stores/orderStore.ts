import { defineStore } from "pinia";

export interface State {
    order: "ASC" | "DESC";
}

export const useOrderStore = defineStore("order", {
    state: (): State => ({
       order: "DESC",
    }),
    actions: {
        setOrder(value: "ASC" | "DESC") {
            this.order = value;
        }
    }
})