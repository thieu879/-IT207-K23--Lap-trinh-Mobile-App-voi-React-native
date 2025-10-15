import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useDeletePosition,
  usePositionsList,
} from "../../../hooks/usePositions";
import { Position } from "../../../types";

export default function PositionListScreen() {
  const router = useRouter();
  const { data: positions, isLoading, isError } = usePositionsList();
  const deletePositionMutation = useDeletePosition();

  const handleDeletePress = (id: number) => {
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => deletePositionMutation.mutate(id),
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }: { item: Position }) => {
    const isActive = item.positionStatus === "ACTIVE";
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.push(`/positions/${item.id}`)}
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.positionName}</Text>
          <Text
            style={{
              color: isActive ? "#2F855A" : "#C53030",
              fontWeight: "bold",
            }}
          >
            {isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() =>
              router.push({
                pathname: "/positions/edit",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => handleDeletePress(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#E53E3E" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#E53E3E" />
        <Text style={styles.errorText}>
          Không thể tải dữ liệu. Vui lòng thử lại.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/positions/add")}>
              <Ionicons name="add-circle" size={32} color="#38A169" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={positions || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Ionicons name="briefcase-outline" size={64} color="#A0AEC0" />
            <Text style={styles.emptyText}>Chưa có vị trí nào.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  loadingText: { marginTop: 16, fontSize: 16, color: "#666" },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#E53E3E",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#A0AEC0",
    textAlign: "center",
  },
});
