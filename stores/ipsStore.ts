import { useFilterStore } from "~/stores/filterStore";

interface IpsStoreState {
  ips: string[];
}

export const useIpsStore = defineStore("ips", {
  state: (): IpsStoreState => ({ ips: [] }),
  actions: {
    async reloadIps() {
      const { $nodeFetch } = useNuxtApp();
      const sessionStore = await useSession();
      const filterStore = useFilterStore();

      const files = ["cock", "cock2"];
      const filters = filterStore.getFilter;

      try {
        const data = await $nodeFetch<{ ips: string[] }>(
          `/log/${sessionStore.value}/ips`,
          {
            method: "GET",
            query: { files, filters },
          },
        );

        this.ips = data.ips;
      } catch (e) {}
    },
  },
});
