import { PositionStatus } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreatePositionRequest {
  positionName: string;
  description: string;
  positionStatus: PositionStatus;
}

export interface UpdatePositionRequest {
  positionName: string;
  description: string;
  positionStatus: PositionStatus;
}

// Gọi API lấy danh sách vị trí
export const getAllPosition = createAsyncThunk(
  "position/getAllPosition",
  async () => {
    const response = await axiosInstance.get("positions");
    console.log("Response: ", response);
    return response.data;
  }
);

// Gọi API lấy chi tiết vị trí
export const getPositionById = createAsyncThunk(
  "position/getPositionById",
  async (id: number) => {
    const response = await axiosInstance.get(`positions/${id}`);
    console.log("Position Detail Response: ", response);
    return response.data;
  }
);

// Gọi API thêm mới vị trí
export const createPosition = createAsyncThunk(
  "position/createPosition",
  async (positionData: CreatePositionRequest) => {
    const response = await axiosInstance.post("positions", positionData);
    console.log("Create Position Response: ", response);
    return response.data;
  }
);

// Gọi API cập nhật vị trí
export const updatePosition = createAsyncThunk(
  "position/updatePosition",
  async ({ id, positionData }: { id: number; positionData: UpdatePositionRequest }) => {
    const response = await axiosInstance.put(`positions/${id}`, positionData);
    console.log("Update Position Response: ", response);
    return response.data;
  }
);

// Gọi API xóa vị trí
export const deletePosition = createAsyncThunk(
  "position/deletePosition",
  async (id: number) => {
    const response = await axiosInstance.delete(`positions/${id}`);
    console.log("Delete Position Response: ", response);
    return { id };
  }
);

// Gọi API toggle trạng thái vị trí
export const togglePositionStatus = createAsyncThunk(
  "position/togglePositionStatus",
  async (id: number) => {
    const currentResponse = await axiosInstance.get(`positions/${id}`);
    const currentPosition = currentResponse.data.data;
    
    const newStatus = currentPosition.positionStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    const response = await axiosInstance.put(`positions/${id}`, {
      positionName: currentPosition.positionName,
      description: currentPosition.description,
      positionStatus: newStatus,
    });
    
    console.log("Toggle Position Status Response: ", response);
    return response.data;
  }
);
