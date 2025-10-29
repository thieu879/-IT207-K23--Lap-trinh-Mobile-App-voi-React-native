// app/(tabs)/(tasks)/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useTask } from "../../../hooks/useTasks";
import { TaskStatus } from "../../../types";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: task, isLoading, isError } = useTask(id);

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

  if (isError || !task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy công việc.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.name}</Text>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Trạng thái:</Text>
          <Text
            style={[
              styles.value,
              {
                color:
                  task.status === TaskStatus.Completed ? "green" : "orange",
              },
            ]}
          >
            {task.status}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Độ ưu tiên:</Text>
          <Text style={styles.value}>{task.priority}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Mô tả:</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// ... (Styles cho màn Chi tiết)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginTop: 8,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
});
