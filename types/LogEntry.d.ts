import type { UUID } from "node:crypto";

export interface LogEntry {
  session_id: UUID;
  file_name: string;
  entry_nr: number;
  creation_date: Date;
  classification: string;
  service_ip: string | undefined;
  user_id: string | undefined;
  user_session_id: string | undefined;
  java_class: string;
  content: string;
}

export interface RangeDate {
  from: Date | undefined;
  to: Date | undefined;
}

export interface Filters {
  date: RangeDate | undefined;
  ip: string | undefined;
  text: string | undefined;
  regex: boolean | undefined;
  classification: "info" | "error" | undefined;
}

export interface Columns {
  date: boolean;
  level: boolean;
  ip: boolean;
  user: boolean;
  session: boolean;
  text: boolean;
}
