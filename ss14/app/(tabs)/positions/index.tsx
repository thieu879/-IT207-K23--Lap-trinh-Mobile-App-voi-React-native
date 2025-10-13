import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
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
import { usePositions } from "../../../hooks/usePositions";
import { Position, PositionStatus } from "../../../types";

const getStatusStyle = (status: PositionStatus) => {
  switch (status) {
    case "ACTIVE":
      return {
        borderColor: "#38A169",
        color: "#38A169",
      };
    case "INACTIVE":
      return {
        borderColor: "#E53E3E",
        color: "#E53E3E",
      };
    default:
      return {
        borderColor: "#718096",
        color: "#718096",
      };
  }
};

export default function PositionListScreen() {
  const router = useRouter();
  const { positions, loading, deletePosition, refreshPositions } = usePositions();
  
  useFocusEffect(
    React.useCallback(() => {
      refreshPositions();
    }, [])
  );

  const handleDeletePress = (id: string) => {
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => deletePosition(id), style: "destructive" },
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
          <View
          style={[
            styles.statusBadge,
            { backgroundColor: isActive ? "#D1FAE5" : "#FECACA", borderColor: "transparent" },
          ]}
        >
          <Text
            style={{
              color: isActive ? "#047857" : "#B91C1C",
              fontWeight: "bold",
              fontSize: 13,
            }}
          >
            {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
          </Text>
        </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
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

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
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
        data={positions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có vị trí nào.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
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
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemDescription: { fontSize: 16, color: "gray", marginVertical: 4 },
  statusBadge: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});