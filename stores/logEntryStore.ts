import type { UUID } from "node:crypto";
import { defineStore } from "pinia";
import { generateUuid } from "vscode-languageclient/lib/common/utils/uuid";
import { delay } from "unicorn-magic";
import { useSessionStore } from "~/stores/sessionStore";
import type { LogEntry } from "~/types/LogEntry";

interface State {
  entries: LogEntry[];
}

interface Filters {}

export const useLogEntryStore = defineStore("logEntries", {
  state: (): State => ({
    entries: [],
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
    async loadEntries(
      start: number,
      count: number,
      _desc: boolean = false,
      _filters: Filters = {},
    ) {
      await delay({ milliseconds: 1 });
      this.clearEntries();

      // TODO with backend
      // TODO check if it works

      const logs = await fetchLogEntries(start, count, []);

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
    },
  },
});

async function fetchLogEntries(
  from: number,
  count: number,
  files: string[],
): Promise<LogEntry[] | null> {
  const sessionStore = useSessionStore();

  try {
    const data = await useFetch(
      `${process.env.baseURL}/api/log/${sessionStore.sessionID}`,
      {
        method: "GET",
        body: {
          from,
          count,
          files,
        },
      },
    );

    return data.error.value == null
      ? (data.data.value as { logs: LogEntry[] }).logs
      : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Nuxt Error");
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
}
