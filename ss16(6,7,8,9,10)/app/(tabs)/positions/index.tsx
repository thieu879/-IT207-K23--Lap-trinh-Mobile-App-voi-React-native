import {
  deletePosition,
  getAllPosition,
  togglePositionStatus,
} from "@/apis/position.api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Position } from "../../../types";

export default function PositionListScreen() {
  // Lấy dữ liệu từ Store
  const { data, error, status, deleteStatus } = useAppSelector(
    (state) => state.position
  );
  const dispatch = useAppDispatch();

  // Bắn dispatch để cho store biết là mình cần làm gì
  useEffect(() => {
    dispatch(getAllPosition());
  }, [dispatch]);

  const router = useRouter();

  const handleDeletePress = (id: number) => {
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "HỦY", style: "cancel" },
      {
        text: "XÓA",
        onPress: () => dispatch(deletePosition(id)),
        style: "destructive",
      },
    ]);
  };

  const handleToggleStatus = (id: number) => {
    dispatch(togglePositionStatus(id));
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
          <Switch
            trackColor={{ false: "#767577", true: "#63B3ED" }}
            thumbColor={isActive ? "#3182CE" : "#f4f3f4"}
            onValueChange={() => handleToggleStatus(item.id)}
            value={isActive}
          />
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

  if (status === "PENDING") {
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});
