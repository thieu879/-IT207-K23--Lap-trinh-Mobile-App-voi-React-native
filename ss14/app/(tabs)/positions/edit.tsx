import { Position } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import PositionForm from "../../../components/PositionForm";
import { usePositions } from "../../../hooks/usePositions";

export default function EditPositionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPositionById, updatePosition, loading } = usePositions();

  const position = getPositionById(id);

  const handleUpdatePosition = async (data: Omit<Position, "id" | "createAt">) => {
    if (position) {
      await updatePosition({ ...position, ...data });
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  return (
    <ScrollView style={styles.container}>
      <PositionForm
        onSubmit={handleUpdatePosition}
        initialValues={position}
        submitButtonText="Cập nhật"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});