import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const validateForm = async () => {
    // Check if name is empty
    if (!name.trim()) {
      Alert.alert("Lỗi", "Tên sản phẩm không được để trống");
      return false;
    }

    // Check if name already exists
    try {
      const storedProducts = await AsyncStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const existingProduct = products.find(
          (p: any) => p.name.toLowerCase() === name.toLowerCase()
        );
        if (existingProduct) {
          Alert.alert("Lỗi", "Tên sản phẩm đã tồn tại");
          return false;
        }
      }
    } catch (error) {
      console.error("Error checking existing products:", error);
    }

    // Check if price is valid
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert("Lỗi", "Giá sản phẩm phải là số và lớn hơn 0");
      return false;
    }

    // Check if quantity is valid
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      Alert.alert("Lỗi", "Số lượng phải là số nguyên và lớn hơn 0");
      return false;
    }

    return true;
  };

  const handleAddProduct = async () => {
    if (!(await validateForm())) {
      return;
    }

    try {
      const storedProducts = await AsyncStorage.getItem("products");
      const products = storedProducts ? JSON.parse(storedProducts) : [];

      const newProduct = {
        id: Date.now().toString(),
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity),
      };

      products.push(newProduct);
      await AsyncStorage.setItem("products", JSON.stringify(products));

      Alert.alert("Thành công", "Sản phẩm đã được thêm mới", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Thêm mới Sản phẩm</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Tên sản phẩm</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên sản phẩm"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Giá sản phẩm</ThemedText>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Số lượng</ThemedText>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="0"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <ThemedText style={styles.addButtonText}>THÊM MỚI</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  form: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
