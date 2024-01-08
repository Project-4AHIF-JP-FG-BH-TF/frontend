import type { UUID } from "node:crypto";
import { defineStore } from "pinia";
import { generateUuid } from "vscode-languageclient/lib/common/utils/uuid";
import { delay } from "unicorn-magic";

export interface LogEntry {
  session_id: UUID;
  file_name: string;
  entry_nr: number;
  creation_date: Date;
  classification: "info" | "error";
  service_ip: string;
  user_id: string;
  user_session_id: string;
  java_class: string;
  content: string;
}

interface State {
  entries: LogEntry[];
}

interface Filters {}

export const useLogEntryStore = defineStore("logEntries", {
  state: (): State => ({
    entries: [],
  }),
  getters: {
    getEntries: (state): LogEntry[] => state.entries,
  },
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
      _start: number,
      _count: number,
      _desc: boolean = false,
      _filters: Filters = {},
    ) {
      await delay({ milliseconds: 1 });
      this.clearEntries();

      // to bypass lint

      // TODO with backend
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

      this.addEntries(testEntries);
      this.addEntries(testEntries);
    },
  },
});
