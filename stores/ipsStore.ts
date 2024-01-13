import { useFilterStore } from "~/stores/filterStore";

interface IpsStoreState {
  ips: string[];
}

export const useIpsStore = defineStore("ips", {
  state: (): IpsStoreState => ({ ips: [] }),
  actions: {
    async reloadIps() {
      const runtimeConfig = useRuntimeConfig();
      const sessionStore = useSessionStore();
      const filterStore = useFilterStore();

      const files = ["cock", "cock2"];
      const filters = filterStore.getFilter;

      try {
        const data = await $fetch<{ ips: string[] }>(
          `${runtimeConfig.public.baseURL}/api/log/${sessionStore.sessionID}/ips`,
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
