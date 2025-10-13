import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Employee } from "../../../data/mockData";
import { useEmployees } from "../../../hooks/useEmployees";

export default function EmployeeListScreen() {
  const router = useRouter();
  const { employees, loading, error, deleteEmployee, refreshEmployees } =
    useEmployees();
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (employee: Employee) => {
    Alert.alert(
      "Xóa nhân viên",
      `Bạn có chắc chắn muốn xóa nhân viên ${employee.employeeName}?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteEmployee(employee.id);
              Alert.alert("Thành công", "Đã xóa nhân viên thành công");
            } catch (error: any) {
              Alert.alert(
                "Lỗi",
                error.message || "Có lỗi xảy ra khi xóa nhân viên"
              );
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshEmployees();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
        <Text style={styles.loadingText}>Đang tải danh sách nhân viên...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshEmployees}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Danh sách Nhân viên",
          headerRight: () => (
            <Link href="/employees/add" asChild>
              <TouchableOpacity>
                <Ionicons name="add-circle" size={32} color="tomato" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      {employees.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Chưa có nhân viên nào</Text>
          <Link href="/employees/add" asChild>
            <TouchableOpacity style={styles.addFirstButton}>
              <Text style={styles.addFirstButtonText}>
                Thêm nhân viên đầu tiên
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }: { item: Employee }) => (
            <Link
              href={{
                pathname: "/employees/[id]",
                params: { id: item.id.toString() },
              }}
              asChild
            >
              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.employeeName} ({item.employeeCode})
                  </Text>
                  <Text style={styles.itemPosition}>{item.positionName}</Text>
                  <Text style={styles.itemPhone}>{item.phoneNumber}</Text>
                </View>
                <View style={styles.itemActions}>
                  <Link
                    href={{
                      pathname: "/employees/edit/[id]",
                      params: { id: item.id.toString() },
                    }}
                    asChild
                  >
                    <TouchableOpacity>
                      <Ionicons name="pencil" size={24} color="#007AFF" />
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => handleDelete(item)}
                  >
                    <Ionicons name="trash" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "tomato",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  addFirstButton: {
    backgroundColor: "tomato",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPosition: { fontSize: 14, color: "gray", marginTop: 4 },
  itemPhone: { fontSize: 14, color: "gray", marginTop: 2 },
  itemActions: { flexDirection: "row", alignItems: "center" },
});
