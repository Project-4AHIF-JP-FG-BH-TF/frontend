import { defineStore } from "pinia";
import type { Filters, LogEntry } from "~/types/LogEntry";
import { useOrderStore } from "~/stores/orderStore";
import { useFilterStore } from "~/stores/filterStore";

interface EntryStoreState {
  entries: LogEntry[];
  isFetching: boolean;
}

export const useLogEntryStore = defineStore("logEntries", {
  state: (): EntryStoreState => ({
    entries: [],
    isFetching: false,
  }),
  actions: {
    addEntry(entry: LogEntry) {
      this.entries.push(entry);
    },
    addEntries(logEntries: LogEntry[]) {
      for (const logEntry of logEntries) {
        this.addEntry(logEntry);
      }
    },
    clearEntries() {
      this.entries = [];
    },
    async reloadEntries() {
      console.log("load new entries");
      this.clearEntries();
      await this.fetchWithParameters(0);
    },
    async loadNextEntries() {
      console.log("load additional entries");
      await this.fetchWithParameters(this.entries.length);
    },
    async fetchWithParameters(from: number) {
      if (this.isFetching) {
        return;
      }

      this.isFetching = true;

      const orderStore = useOrderStore();
      const filterStore = useFilterStore();
      const fileStore = useFileStore();

      // TODO with backend
      // TODO check if it works

      const logs = await fetchLogEntries(
        from,
        50,
        fileStore.files
          .filter((value) => value.active)
          .map((value) => value.name),
        orderStore.order,
        filterStore.getFilter,
      );

      if (logs !== null) {
        this.addEntries(logs);
      }

      this.isFetching = false;
    },
  },
});

async function fetchLogEntries(
  from: number,
  count: number,
  files: string[],
  order: string = "ASC",
  filters: Filters,
): Promise<LogEntry[] | null> {
  const sessionStore = await useSession();

  const { $nodeFetch } = useNuxtApp();

  try {
    const data = await $nodeFetch<{ logs: LogEntry[] }>(
      `/log/${sessionStore.value}`,
      {
        method: "GET",
        query: {
          from,
          count,
          files,
          order,
          filters,
        },
      },
    );

    return data.logs;
  } catch (error) {
    console.log(error);
    return null;
  }
}
