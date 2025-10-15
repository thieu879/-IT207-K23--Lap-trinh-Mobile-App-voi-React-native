import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PositionForm from "../../../components/PositionForm";
import {
  usePositionDetails,
  useUpdatePosition,
} from "../../../hooks/usePositions";
import { UpdatePosition } from "../../../types";

export default function EditPositionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);

  const { data: position, isLoading, isError } = usePositionDetails(positionId);
  const updatePositionMutation = useUpdatePosition();

  const handleUpdatePosition = (data: UpdatePosition) => {
    updatePositionMutation.mutate({ id: positionId, data });
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "Chỉnh sửa vị trí" }} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </>
    );
  }

  if (isError || !position) {
    return (
      <>
        <Stack.Screen options={{ title: "Chỉnh sửa vị trí" }} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Chỉnh sửa vị trí" }} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <PositionForm
          onSubmit={handleUpdatePosition}
          initialValues={{
            positionName: position.positionName,
            description: position.description,
            positionStatus: position.positionStatus,
          }}
          submitButtonText="Cập nhật"
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: { marginTop: 16, fontSize: 16, color: "#666" },
  errorText: { fontSize: 18, color: "#E53E3E", textAlign: "center" },
});
