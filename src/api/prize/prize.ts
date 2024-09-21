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