import type { Bid, BidDTO } from "@/types/bid";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetBids = async <T>(): Promise<APIResponse<Bid[]>> => {
  try {
    const response = await apiClient.get(`/bids`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get bids`);
  }
}

export const apiGetBidByID = async <T>(id: string): Promise<APIResponse<Bid>> => {
  try {
    const response = await apiClient.get(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get bid by id: ${id}`);
  }
}

export const apiCreateBid = async <T>(bidDTO: BidDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/bids", bidDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create bid");
  }
}

export const apiUpdateBid = async <T>(bid: Bid): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/bids/${bid.id}`, bid)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create bid");
  }
}

export const apiDeleteBid = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete bid");
  }
}