
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