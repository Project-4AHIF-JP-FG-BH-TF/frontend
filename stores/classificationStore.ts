import { useFilterStore } from "~/stores/filterStore";
import { ToastType } from "~/types/ToastType";

interface ClassificationStoreState {
  classifications: string[];
}

export const useClassificationStore = defineStore("classification", {
  state: (): ClassificationStoreState => ({ classifications: [] }),
  actions: {
    async reloadClassifications() {
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
        const data = await $nodeFetch<{ classifications: string[] }>(
          `/log/${sessionStore.value}/classifications`,
          {
            method: "GET",
            query: { files, filters },
          },
        );

        this.classifications = data.classifications;
      } catch (e) {
        toastStore.addMessage({
          message: "Failed to fetch classifications!",
          type: ToastType.ERROR,
        });
      }
    },
  },
});
