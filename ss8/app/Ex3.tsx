import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex3() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const savedCount = await AsyncStorage.getItem("count");
        if (savedCount !== null) {
          setCount(Number(savedCount));
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải giá trị đếm.");
      }
    };

    loadCount();
  }, []);

  const updateCount = async (newCount: number) => {
    setCount(newCount);
    try {
      await AsyncStorage.setItem("count", newCount.toString());
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu giá trị đếm.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.countText}>{count}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="GIẢM (-)" onPress={() => updateCount(count - 1)} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="TĂNG (+)" onPress={() => updateCount(count + 1)} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
  },
  countText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonWrapper: {
    marginHorizontal: 10,
    width: 120,
  },
});
