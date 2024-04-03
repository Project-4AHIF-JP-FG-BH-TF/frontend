import { useFilterStore } from "~/stores/filterStore";

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
      } catch (e) {}
    },
  },
});
