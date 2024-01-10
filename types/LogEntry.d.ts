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
