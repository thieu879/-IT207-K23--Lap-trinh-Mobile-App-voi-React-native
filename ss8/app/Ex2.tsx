import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex2() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("darkMode");
        if (savedMode !== null) {
          setIsDarkMode(JSON.parse(savedMode));
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải cài đặt.");
      }
    };

    loadSettings();
  }, []);

  const toggleSwitch = async (value: boolean) => {
    setIsDarkMode(value);
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu cài đặt.");
    }
  };

  const containerStyle = [
    styles.container,
    { backgroundColor: isDarkMode ? "#121212" : "#f5f5f5" },
  ];

  const textStyle = [
    styles.label,
    { color: isDarkMode ? "#FFFFFF" : "#000000" },
  ];

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.settingRow}>
        <Text style={textStyle}>Chế độ ban đêm</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  label: {
    fontSize: 18,
  },
});
