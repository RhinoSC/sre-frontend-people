import type { Donation, DonationDTO } from "@/types/donation";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetDonations = async <T>(): Promise<APIResponse<Donation[]>> => {
  try {
    const response = await apiClient.get(`/donations`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get donations`);
  }
}

export const apiGetDonationByID = async <T>(id: string, details: boolean): Promise<APIResponse<Donation>> => {
  try {
    let url = `/donations/${id}`
    if (details) {
      url = `/donations/${id}?details=true`
    }
    const response = await apiClient.get(url)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get donation by id: ${id}`);
  }
}

export const apiCreateDonation = async <T>(donationDTO: DonationDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/donations", donationDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create donation");
  }
}

export const apiUpdateDonation = async <T>(donation: Donation): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/donations/${donation.id}`, donation)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create donation");
  }
}

export const apiDeleteDonation = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/donations/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete donation");
  }
}