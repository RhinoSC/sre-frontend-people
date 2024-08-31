import type { User, UserDTO } from "@/types/user";
import { apiClient } from "../axios";
import type { APIResponse } from "@/types/api";


export const apiGetUsers = async <T>(): Promise<APIResponse<User[]>> => {
  try {
    const response = await apiClient.get(`/users`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get users`);
  }
}

export const apiGetUserByID = async <T>(id: string): Promise<APIResponse<User>> => {
  try {
    const response = await apiClient.get(`/users/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get user by id: ${id}`);
  }
}

export const apiCreateUser = async <T>(userDTO: UserDTO): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.post("/users", userDTO)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export const apiUpdateUser = async <T>(user: User): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.patch(`/users/${user.id}`, user)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export const apiDeleteUser = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await apiClient.delete(`/users/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}