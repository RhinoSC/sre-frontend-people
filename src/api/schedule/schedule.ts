import type { Schedule, ScheduleDTO } from "@/types/schedule";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetSchedules = async <T>(): Promise<APIResponse<Schedule[]>> => {
  try {
    const response = await apiClient.get(`/schedules`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get schedules`);
  }
}

export const apiGetScheduleByID = async <T>(id: string): Promise<APIResponse<Schedule>> => {
  try {
    const response = await apiClient.get(`/schedules/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get schedule by id: ${id}`);
  }
}