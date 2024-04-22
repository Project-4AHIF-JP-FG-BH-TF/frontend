import { useFilterStore } from "~/stores/filterStore";
import { ToastType } from "~/types/ToastType";

interface EntryCountStoreState {
  all: number;
  filtered: number;
}

export const useEntryCountStore = defineStore("count", {
  state: (): EntryCountStoreState => ({ all: 0, filtered: 0 }),
  actions: {
    async reloadCount() {
      const { $nodeFetch } = useNuxtApp();
      const sessionStore = await useSession();
      const filterStore = useFilterStore();
      const fileStore = useFileStore();
      const toastStore = useToastStore();

      const files = fileStore.files
        .filter((value) => value.active)
        .map((value) => value.name);
      const filters = filterStore.getFilter;

      try {
        const data = await $nodeFetch<EntryCountStoreState>(
          `/log/${sessionStore.value}/count`,
          {
            method: "GET",
            query: { files, filters },
          },
        );

        this.all = data.all;
        this.filtered = data.filtered;
      } catch (e) {
        toastStore.addMessage({
          message: "Failed to fetch entry count!",
          type: ToastType.ERROR,
        });
      }
    },
  },
});
