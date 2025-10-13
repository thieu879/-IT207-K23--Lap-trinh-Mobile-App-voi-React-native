import { useCallback, useEffect, useState } from "react";
import { Position } from "../data/mockData";
import { baseUrl } from "../utils/baseUrl";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await baseUrl.get("/positions");
      setPositions(Array.isArray(response.data) ? response.data : []);
    } catch (e: any) {
      console.error("Lỗi khi tải danh sách vị trí:", e);
      setError(e.message || "Có lỗi xảy ra khi tải danh sách vị trí");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  return {
    positions,
    loading,
    error,
    refreshPositions: getPositions,
  };
};
