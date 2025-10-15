import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import {
    createPosition,
    deletePosition,
    fetchPositionById,
    fetchPositions,
    updatePosition,
} from "../apis/positions";
import { UpdatePosition } from "../types";

// Query keys
export const queryKeys = {
  positions: ["positions"] as const,
  position: (id: number) => ["position", id] as const,
};

// Custom hook for fetching positions list
export const usePositionsList = () => {
  return useQuery({
    queryKey: queryKeys.positions,
    queryFn: fetchPositions,
  });
};

// Custom hook for fetching position details
export const usePositionDetails = (id: number) => {
  return useQuery({
    queryKey: queryKeys.position(id),
    queryFn: () => fetchPositionById(id),
    enabled: !!id,
  });
};

// Custom hook for creating position
export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions });
      Alert.alert("Thành công", "Vị trí đã được tạo thành công!");
      router.back();
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", "Không thể tạo vị trí. Vui lòng thử lại.");
      console.error("Create position error:", error);
    },
  });
};

// Custom hook for updating position
export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePosition }) =>
      updatePosition(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions });
      queryClient.invalidateQueries({ queryKey: queryKeys.position(variables.id) });
      Alert.alert("Thành công", "Vị trí đã được cập nhật thành công!");
      router.back();
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", "Không thể cập nhật vị trí. Vui lòng thử lại.");
      console.error("Update position error:", error);
    },
  });
};

// Custom hook for deleting position
export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions });
      Alert.alert("Thành công", "Vị trí đã được xóa thành công!");
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", "Không thể xóa vị trí. Vui lòng thử lại.");
      console.error("Delete position error:", error);
    },
  });
};