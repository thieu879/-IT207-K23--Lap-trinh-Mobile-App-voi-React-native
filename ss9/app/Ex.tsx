// src/App.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types";
import ContactList from "@/components/ContactList";
import ContactFormModal from "@/components/ContactFormModal";

const CONTACTS_STORAGE_KEY = "@contacts";

export default function App() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<User | null>(null);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
        if (jsonValue != null) {
          setContacts(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Lỗi không thể tải danh bạ", e);
      }
    };
    loadContacts();
  }, []);

  useEffect(() => {
    const saveContacts = async () => {
      try {
        const jsonValue = JSON.stringify(contacts);
        await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, jsonValue);
      } catch (e) {
        console.error("Lỗi không thể lưu danh bạ", e);
      }
    };
    saveContacts();
  }, [contacts]);

  const handleOpenAddForm = () => {
    setCurrentContact(null);
    setModalVisible(true);
  };

  const handleOpenEditForm = (contact: User) => {
    setCurrentContact(contact);
    setModalVisible(true);
  };

  const handleSaveContact = (contactData: Omit<User, "id">) => {
    if (currentContact) {
      const updatedContacts = contacts.map((c) =>
        c.id === currentContact.id ? { ...c, ...contactData } : c
      );
      setContacts(updatedContacts);
    } else {
      const newContact: User = {
        id: Date.now().toString(),
        ...contactData,
      };
      setContacts([...contacts, newContact]);
    }
    setModalVisible(false);
  };

  const handleDeleteContact = () => {
    if (!currentContact) return;
    const filteredContacts = contacts.filter((c) => c.id !== currentContact.id);
    setContacts(filteredContacts);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh bạ</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleOpenAddForm}>
          <Text style={styles.addButtonText}>THÊM MỚI</Text>
        </TouchableOpacity>
      </View>

      <ContactList contacts={contacts} onEdit={handleOpenEditForm} />

      <ContactFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveContact}
        onDelete={handleDeleteContact}
        currentContact={currentContact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: { color: "white", fontWeight: "bold" },
});
