import { Task, TaskFormData, TaskStatus } from "@/types";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";
import { axiosInstance } from "@/utils/axios-instance";

export const fetchTasks = async (): Promise<BaseResponse<Task>> => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchTask = async (id: string): Promise<SingleResponse<Task>> => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createTask = async (
  task: TaskFormData
): Promise<SingleResponse<Task>> => {
  try {
    const response = await axiosInstance.post("/tasks", task);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateTask = async (
  id: string,
  task: TaskFormData
): Promise<SingleResponse<Task>> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateTaskStatus = async (
  id: string,
  status: TaskStatus
): Promise<SingleResponse<Task>> => {
  try {
    const response = await axiosInstance.patch(`/tasks/${id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteTask = async (id: string): Promise<SingleResponse<null>> => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
