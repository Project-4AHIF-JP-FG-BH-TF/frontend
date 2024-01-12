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
        const data = await useFetch(
          `${runtimeConfig.public.baseURL}/api/log/${sessionStore.sessionID}/ips`,
          {
            method: "GET",
            query: { files, filters },
            server: false,
          },
        );

        if (data.error.value == null) {
          this.ips = (data.data.value as { ips: string[] }).ips;
        }
      } catch (e) {}
    },
  },
});
