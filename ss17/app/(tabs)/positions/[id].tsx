import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePositionDetails } from "../../../hooks/usePositions";

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);

  const { data: position, isLoading, isError } = usePositionDetails(positionId);

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: "Chi tiết vị trí" }} />
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
        <Stack.Screen options={{ title: "Chi tiết vị trí" }} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>
        </View>
      </>
    );
  }

  const isActive = position.positionStatus === "ACTIVE";

  return (
    <>
      <Stack.Screen options={{ title: "Chi tiết vị trí" }} />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Tên vị trí</Text>
          <Text style={styles.valueName}>{position.positionName}</Text>

          <Text style={styles.label}>Mô tả</Text>
          <Text style={styles.valueDescription}>{position.description}</Text>

          <Text style={styles.label}>Trạng thái</Text>
          <Text
            style={[
              styles.valueStatus,
              { color: isActive ? "#2F855A" : "#C53030" },
            ]}
          >
            {isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Text>

          <Text style={styles.label}>Ngày tạo</Text>
          <Text style={styles.valueDate}>
            {new Date(position.createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: { fontSize: 16, color: "#718096", marginTop: 20, fontWeight: "500" },
  valueName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 8,
  },
  valueDescription: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginTop: 8,
  },
  valueStatus: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  valueDate: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#718096",
    marginTop: 8,
  },
  loadingText: { marginTop: 16, fontSize: 16, color: "#666" },
  errorText: { fontSize: 18, color: "#E53E3E", textAlign: "center" },
});
