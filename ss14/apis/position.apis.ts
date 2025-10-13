import { Position } from "@/types";
import { axiosInstance } from "@/utils/axios-instance";

export const getAllPosition = async (): Promise<Position[]> => {
  const response = await axiosInstance.get<{ data: Position[] }>("positions");
  return response.data.data;
};
