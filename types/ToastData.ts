import type { ToastType } from "~/types/ToastType";

export interface ToastData {
  type: ToastType;
  message: string;
}
