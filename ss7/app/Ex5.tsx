import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

type State = Todo[];

const initialState: State = [];

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), name: action.payload, completed: false }
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function Ex5() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trang chủ</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>THÊM</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: "TOGGLE_TODO", payload: item.id })
              }
            >
              <Text
                style={[styles.todoText, item.completed && styles.completed]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch({ type: "DELETE_TODO", payload: item.id })}
            >
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 5,
    padding: 10,
    borderRadius: 5
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5
  },
  todoText: { fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "gray" },
  delete: { color: "red", fontWeight: "bold", fontSize: 18 }
});
