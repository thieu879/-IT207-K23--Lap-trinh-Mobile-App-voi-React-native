import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex1() {
  const [name, setName] = useState("");
  const [storedName, setStoredName] = useState<string | null>(null);

  useEffect(() => {
    const loadName = async () => {
      try {
        const nameFromStorage = await AsyncStorage.getItem("userName");
        if (nameFromStorage !== null) {
          setStoredName(nameFromStorage);
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải dữ liệu đã lưu.");
      }
    };

    loadName();
  }, []);

  const saveName = async () => {
    if (!name.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập tên của bạn.");
      return;
    }
    try {
      await AsyncStorage.setItem("userName", name);
      setStoredName(name);
      setName("");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu tên.");
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {storedName ? (
          <Text style={styles.greeting}>Chào mừng trở lại, {storedName}!</Text>
        ) : (
          <>
            <Text style={styles.label}>Nhập tên của bạn:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ví dụ: An Nguyễn"
              value={name}
              onChangeText={setName}
            />
            <Button title="LƯU" onPress={saveName} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
  },
  container: {
    padding: 20,
    marginHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 16,
    fontSize: 16,
  },
});
