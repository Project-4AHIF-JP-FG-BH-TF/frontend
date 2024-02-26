import type { UUID } from "node:crypto";
import { defineStore } from "pinia";
import { generateUuid } from "vscode-languageclient/lib/common/utils/uuid";
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

      const testEntries: LogEntry[] = [
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-01T10:34:23.1234+01:00")),
          classification: "info",
          service_ip: "192.168.0.45",
          user_id: "1",
          user_session_id: "123",
          java_class: "",
          content: "Zusatz Kommentar",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-01T12:00:23.1234+01:00")),
          classification: "info",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
        {
          session_id: generateUuid() as UUID,
          file_name: "",
          entry_nr: 0,
          creation_date: new Date(Date.parse("2024-01-02T12:34:23.1234+01:00")),
          classification: "error",
          service_ip: "192.168.0.1",
          user_id: "123",
          user_session_id: "456",
          java_class: "",
          content: "Zusatz Kommentar ZusatzZusatz ZusatzZusatz",
        },
      ];

      if (logs !== null) {
        this.addEntries(logs);
      }

      this.addEntries(testEntries);
      this.addEntries(testEntries);

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
