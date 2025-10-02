import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { User } from "../types";
import ContactItem from "./ContactItem";

interface Props {
  contacts: User[];
  onEdit: (contact: User) => void;
}

export default function ContactList({ contacts, onEdit }: Props) {
  if (contacts.length === 0) {
    return <Text style={styles.emptyText}>Danh bạ của bạn trống.</Text>;
  }

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContactItem item={item} onPress={() => onEdit(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
