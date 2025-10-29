import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import TaskListItem from "../../../components/TaskListItem";
import { TaskStatus } from "../../../types";
import {
  useTasks,
  useDeleteTask,
  useUpdateTaskStatus,
} from "../../../hooks/useTasks";

export default function TaskListScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const { data: tasks = [], isLoading, isError, refetch } = useTasks();
  const { mutate: deleteTask, isPending: deleting } = useDeleteTask();
  const { mutate: updateStatus, isPending: updating } = useUpdateTaskStatus();

  // State để quản lý modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Thêm nút "Thêm mới" (+) vào header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/(tasks)/add")}>
          <Ionicons
            name="add-circle"
            size={30}
            color="#007AFF"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  const handleToggleStatus = (id: string) => {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    const nextStatus =
      current.status === TaskStatus.Completed
        ? TaskStatus.Pending
        : TaskStatus.Completed;
    updateStatus({ id, status: nextStatus });
  };

  const openDeleteModal = (id: string) => {
    setSelectedTaskId(id);
    setModalVisible(true);
  };

  const handleDeleteTask = () => {
    if (selectedTaskId) {
      deleteTask(selectedTaskId);
    }
    setModalVisible(false);
    setSelectedTaskId(null);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 8 }}>Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Đã xảy ra lỗi khi tải danh sách</Text>
          <Button title="Thử lại" onPress={() => refetch()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskListItem
            task={item}
            onToggleStatus={handleToggleStatus}
            onDelete={openDeleteModal}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={isLoading || updating || deleting}
        onRefresh={refetch}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text>Chưa có công việc nào</Text>
          </View>
        }
      />

      {/* Modal xác nhận xóa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa công việc này?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
              <Pressable style={styles.deleteButton} onPress={handleDeleteTask}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... (Styles cho màn hình List và Modal)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginLeft: 15,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
