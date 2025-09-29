import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Subject {
  id: string;
  name: string;
  createdAt: Date;
}

const INITIAL_SUBJECTS: Subject[] = [
  { id: "1", name: "Biology", createdAt: new Date() },
  { id: "2", name: "Geography", createdAt: new Date() },
  { id: "3", name: "Computer Science", createdAt: new Date() },
  { id: "4", name: "Art", createdAt: new Date() },
  { id: "5", name: "Music", createdAt: new Date() },
  { id: "6", name: "Economics", createdAt: new Date() },
  { id: "7", name: "Philosophy", createdAt: new Date() },
];

export default function Ex2() {
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [subjectName, setSubjectName] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const handleAddSubject = useCallback(() => {
    const trimmedName = subjectName.trim();
    if (trimmedName === "") {
      Alert.alert("Lỗi", "Vui lòng nhập tên môn học");
      return;
    }

    const newSubject: Subject = {
      id: generateId(),
      name: trimmedName,
      createdAt: new Date(),
    };

    setSubjects((prev) => [newSubject, ...prev]);
    setSubjectName("");
  }, [subjectName]);

  const handleLoadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const moreSubjects: Subject[] = [
        { id: generateId(), name: "Geography", createdAt: new Date() },
        {
          id: generateId(),
          name: "Information Technology",
          createdAt: new Date(),
        },
        { id: generateId(), name: "Biology", createdAt: new Date() },
      ];

      setSubjects((prev) => [...prev, ...moreSubjects]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setSubjects(INITIAL_SUBJECTS);
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên môn học..."
          value={subjectName}
          onChangeText={setSubjectName}
          returnKeyType="done"
          onSubmitEditing={handleAddSubject}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={subjects}
        renderItem={({ item }) => (
          <View style={styles.subjectItem}>
            <View style={styles.subjectContent}>
              <Text style={styles.subjectText}>{item.name}</Text>
              <Text style={styles.subjectDate}>
                {item.createdAt.toLocaleDateString("vi-VN")}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có môn học nào</Text>
            <Text style={styles.emptySubText}>
              Kéo xuống để làm mới hoặc thêm môn học mới
            </Text>
          </View>
        }
        ListHeaderComponent={
          subjects.length > 0 ? (
            <Text style={styles.listHeader}>Danh sách môn học</Text>
          ) : null
        }
        ListFooterComponent={
          subjects.length > 0 ? (
            <TouchableOpacity
              style={[
                styles.loadMoreButton,
                loading && styles.loadMoreButtonDisabled,
              ]}
              onPress={handleLoadMore}
              disabled={loading}
            >
              <Text
                style={[
                  styles.loadMoreText,
                  loading && styles.loadMoreTextDisabled,
                ]}
              >
                {loading ? "Đang tải..." : "Tải thêm"}
              </Text>
            </TouchableOpacity>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  subjectContent: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  subjectDate: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: "center",
    color: "#999",
    lineHeight: 20,
  },
  loadMoreButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loadMoreButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadMoreTextDisabled: {
    color: "#999",
  },
});
