import type { Filters } from "~/types/LogEntry";

interface FilterStoreState {
  ip: string;
  regex: boolean;
  text: string;
  from: Date | null;
  to: Date | null;
  classification: "info" | "error" | "";
}

export interface QuickFilterData {
  classification: "info" | "error" | undefined;
  ip: string | undefined;
  text: string | undefined;
}

export const useFilterStore = defineStore("filter", {
  state: (): FilterStoreState => ({}) as FilterStoreState,
  getters: {
    getFilter: (state): Filters => {
      return {
        date: {
          from: state.from === null ? undefined : state.from,
          to: state.to === null ? undefined : state.to,
        },
        classification:
          state.classification === "" ? undefined : state.classification,
        text: state.text === "" ? undefined : state.text,
        regex: state.regex,
        ip: state.ip === "" ? undefined : state.ip,
      };
    },
  },
  actions: {
    clearFilter() {
      this.from = null;
      this.to = null;
      this.classification = "";
      this.text = "";
      this.regex = false;
      this.ip = "";
    },
    applyQuickFilter(quickFilter: QuickFilterData) {
      if (quickFilter.ip) {
        this.ip = quickFilter.ip;
      }
      if (quickFilter.text) {
        this.regex = false;
        this.text = quickFilter.text;
      }
      if (quickFilter.classification) {
        this.classification = quickFilter.classification;
      }
    },
  },
});
