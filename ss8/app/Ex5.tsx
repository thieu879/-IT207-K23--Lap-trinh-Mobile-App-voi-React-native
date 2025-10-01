import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

interface Todo {
  id: string;
  text: string;
}

export default function Ex5() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("todos");
        if (jsonValue !== null) {
          setTodos(JSON.parse(jsonValue));
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải danh sách công việc.");
      }
    };

    loadTodos();
  }, []);

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      const jsonValue = JSON.stringify(newTodos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu danh sách công việc.");
    }
  };

  const addTodo = () => {
    if (!todoText.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập công việc.");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todoText.trim(),
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    saveTodos(newTodos);
    setTodoText("");
    Keyboard.dismiss();
  };

  const removeTodo = (id: string) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa công việc này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
          saveTodos(newTodos);
        },
        style: "destructive",
      },
    ]);
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity
        onPress={() => removeTodo(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={todoText}
          onChangeText={setTodoText}
          onSubmitEditing={addTodo}
        />
        <Button title="THÊM" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có công việc nào.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f7",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  todoItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 5,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#ff3b30",
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
