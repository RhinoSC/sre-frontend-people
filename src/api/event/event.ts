import type { MyEvent, MyEventDTO } from "@/types/event";
import type { APIResponse } from "@/types/api";
import { apiClient } from "../axios";



export const apiGetEvents = async <T>(): Promise<APIResponse<MyEvent[]>> => {
  try {
    const response = await apiClient.get(`/events`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get events`);
  }
}

export const apiGetEventByID = async <T>(id: string): Promise<APIResponse<MyEvent>> => {
  try {
    const response = await apiClient.get(`/events/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get event by id: ${id}`);
  }
}

export const apiCreateEvent = async <T>(eventDTO: MyEventDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/events", eventDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create event");
  }
}

export const apiUpdateEvent = async <T>(event: MyEvent): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/events/${event.id}`, event)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create event");
  }
}

export const apiDeleteEvent = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/events/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete event");
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