import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { User } from "../types";

interface Props {
  item: User;
  onPress: () => void;
}

export default function ContactItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPhone}>{item.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: { fontSize: 18, fontWeight: "500" },
  itemPhone: { fontSize: 16, color: "#666" },
});
