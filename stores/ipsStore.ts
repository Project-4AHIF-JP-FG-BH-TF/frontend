import { useFilterStore } from "~/stores/filterStore";
import { ToastType } from "~/types/ToastType";

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
      const fileStore = useFileStore();
      const toastStore = useToastStore();

      const files = fileStore.files
        .filter((value) => value.active)
        .map((value) => value.name);
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
      } catch (e) {
        toastStore.addMessage({
          message: "Failed to fetch IPs!",
          type: ToastType.ERROR,
        });
      }
    },
  },
});
