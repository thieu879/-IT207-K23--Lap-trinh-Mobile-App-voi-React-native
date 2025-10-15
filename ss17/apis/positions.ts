import { CreatePosition, Position, UpdatePosition } from "../types";
import axiosInstance from "../utils/axiosInstance";

// Fetch all positions
export const fetchPositions = async (): Promise<Position[]> => {
  const response = await axiosInstance.get("/positions");
  return response.data.data;
};

// Fetch position by ID
export const fetchPositionById = async (id: number): Promise<Position> => {
  const response = await axiosInstance.get(`/positions/${id}`);
  return response.data.data;
};

// Create new position
export const createPosition = async (position: CreatePosition): Promise<Position> => {
  const response = await axiosInstance.post("/positions", position);
  return response.data.data;
};

// Update position
export const updatePosition = async (id: number, position: UpdatePosition): Promise<Position> => {
  const response = await axiosInstance.put(`/positions/${id}`, position);
  return response.data.data;
};

// Delete position
export const deletePosition = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/positions/${id}`);
};
