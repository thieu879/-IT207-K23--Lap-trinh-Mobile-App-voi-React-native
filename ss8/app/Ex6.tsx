import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

interface Settings {
  username: string;
  email: string;
  notificationsEnabled: boolean;
}

const STORAGE_KEY = "userSettings";

export default function Ex6() {
  const [settings, setSettings] = useState<Settings>({
    username: "Guest",
    email: "",
    notificationsEnabled: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải cài đặt.");
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu cài đặt.");
    }
  };

  const updateSetting = (key: keyof Settings, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput
          style={styles.input}
          value={settings.username}
          onChangeText={(text) => updateSetting("username", text)}
          placeholder="Tên hiển thị của bạn"
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={settings.email}
          onChangeText={(text) => updateSetting("email", text)}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.settingItemRow}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={settings.notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={(value) =>
            updateSetting("notificationsEnabled", value)
          }
          value={settings.notificationsEnabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  settingItem: {
    marginBottom: 25,
  },
  settingItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});
