import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Todo from "../components/Todo";

interface Todo {
  id: number;
  title: string;
}

export default function Ex6() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue === "") {
      Alert.alert("Please enter a todo");
      return;
    }
    setTodo([...todo, { id: todo.length + 1, title: inputValue }]);
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert("Todo deleted", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => setTodo(todo.filter((item) => item.id !== id)),
      },
    ]);
  };

  return (
    <View>
      <View style={style.container}>
        <View style={style.inputContainer}>
          <TextInput
            style={style.input}
            placeholder="Add a todo"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity onPress={handleAddTodo} style={style.button}>
            <Text style={style.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={style.todoContainer}>
          {todo.map((item) => (
            <Todo
              key={item.id}
              id={item.id}
              title={item.title}
              onDelete={handleDeleteTodo}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    maxWidth: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
