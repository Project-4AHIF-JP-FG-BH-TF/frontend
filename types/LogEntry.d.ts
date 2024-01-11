import type { UUID } from "node:crypto";

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

export interface RangeDate {
  from: Date | undefined;
  to: Date | undefined;
}

export enum Classification {
  info = "info",
  error = "error",
}

export interface Filters {
  date: RangeDate | undefined;
  ip: string | undefined;
  text: string | undefined;
  regex: boolean | undefined;
  classification: Classification | undefined;
}
