import type { Schedule } from "./schedule";

export interface APIResponse<T = any> {
  data: T;
  message: string;
}

export interface loginResponse {
  data: {
    id: string,
    token: string
  },
  message: string
}