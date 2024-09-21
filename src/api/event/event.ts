import type { MyEvent, MyEventDTO } from "@/types/event";
import type { APIResponse } from "@/types/api";
import { apiClient } from "../axios";

export const apiGetEventByID = async <T>(id: string): Promise<APIResponse<MyEvent>> => {
  try {
    const response = await apiClient.get(`/events/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get event by id: ${id}`);
  }
}

export const apiGetEventInfo = async <T>(): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.get(`/events/info`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get event info`);
  }
}