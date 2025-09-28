import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoProps {
  id: number;
  title: string;
  onDelete: (id: number) => void;
}

const Todo = ({ id, title, onDelete }: TodoProps) => {
  return (
    <View style={style.container}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={() => onDelete(id)} style={style.button}>
        <Text style={style.buttonText}>Delete</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "red",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Todo;
