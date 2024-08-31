
import type { Run, RunDTO } from "@/types/run";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetRuns = async <T>(details: string): Promise<APIResponse<Run[]>> => {
  try {
    let url = `/runs`
    if (details === "simple") {
      url = `/runs?details=simple`
    } else if (details === "bids") {
      url = `/runs?details=bids`
    }
    const response = await apiClient.get(url)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get runs`);
  }
}

export const apiGetRunByID = async <T>(id: string): Promise<APIResponse<Run>> => {
  try {
    const response = await apiClient.get(`/runs/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get run by id: ${id}`);
  }
}

export const apiCreateRun = async <T>(runDTO: RunDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/runs", runDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create run");
  }
}

export const apiUpdateRun = async <T>(run: Run): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/runs/${run.id}`, run)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to update run");
  }
}

export const apiUpdateScheduleRuns = async <T>(runs: Run[]): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/runs/order", runs)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to update schedule runs");
  }
}

export const apiDeleteRun = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/runs/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete run");
  }
}

export const apiGetTwitchCategories = async <T>(name: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.get(`/runs/twitch/categories?name=${name}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to get categories");
  }
}

export const apiGetTwitchCategoryByID = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.get(`/runs/twitch/game?id=${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to get categories");
  }
}