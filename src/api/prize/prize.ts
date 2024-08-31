import type { Prize, PrizeDTO } from "@/types/prize";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetPrizes = async <T>(): Promise<APIResponse<Prize[]>> => {
  try {
    const response = await apiClient.get(`/prizes`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get prizes`);
  }
}

export const apiGetPrizeByID = async <T>(id: string): Promise<APIResponse<Prize>> => {
  try {
    const response = await apiClient.get(`/prizes/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get prize by id: ${id}`);
  }
}

export const apiCreatePrize = async <T>(prizeDTO: PrizeDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/prizes", prizeDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create prize");
  }
}

export const apiUpdatePrize = async <T>(prize: Prize): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/prizes/${prize.id}`, prize)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create prize");
  }
}

export const apiDeletePrize = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/prizes/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete prize");
  }
}