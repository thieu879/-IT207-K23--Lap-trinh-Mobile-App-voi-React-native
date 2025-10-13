import { useCallback, useEffect, useState } from "react";
import { Position } from "../types";
import { getAllPosition } from "../apis/position.apis";
import { axiosInstance } from "@/utils/axios-instance";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPositions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPosition();
      setPositions(Array.isArray(data) ? data : [data]);
    } catch (e) {
      console.error("Lỗi khi tải danh sách vị trí:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const addPosition = async (position: Omit<Position, "id" | "createAt">) => {
    try {
      const newPosition: Position = {
        ...position,
        id: `position_${Date.now()}`,
        createdAt: new Date(),
      };
      const response = await axiosInstance.post<Position>("positions", newPosition);
      setPositions((prev) => [...prev, response.data]);
    } catch (e) {
      console.error("Lỗi khi thêm vị trí:", e);
    }
  };

  const updatePosition = async (updatedPosition: Position) => {
    try {
      await axiosInstance.put(`positions/${updatedPosition.id}`, updatedPosition);
      setPositions((prev) =>
        prev.map((p) => (p.id === updatedPosition.id ? updatedPosition : p))
      );
    } catch (e) {
      console.error("Lỗi khi cập nhật vị trí:", e);
    }
  };

  const deletePosition = async (id: string) => {
    try {
      await axiosInstance.delete(`positions/${id}`);
      setPositions((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Lỗi khi xóa vị trí:", e);
    }
  };

  const getPositionById = (id: string): Position | undefined => {
    return positions.find((p) => p.id == id);
  };

  const getPositionByIdFromServer = async (id: string): Promise<Position | null> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Position>(`positions/${id}`);
      return response.data;
    } catch (e) {
      console.error("Lỗi khi tải chi tiết vị trí:", e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    positions,
    loading,
    addPosition,
    updatePosition,
    deletePosition,
    getPositionById,
    getPositionByIdFromServer,
    refreshPositions: getPositions,
  };
};
