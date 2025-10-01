import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  productId: string;
  name: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { productId: "a1", name: "Laptop Pro" },
  { productId: "b2", name: "Chuột không dây" },
  { productId: "c3", name: "Bàn phím cơ" },
];

const STORAGE_KEY = "shoppingCart";

export default function Ex7() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const jsonCart = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonCart !== null) {
          setCart(JSON.parse(jsonCart));
        }
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải giỏ hàng.");
      }
    };
    loadCart();
  }, []);

  const saveCart = async (newCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu giỏ hàng.");
    }
  };

  const addToCart = (productToAdd: Product) => {
    let newCart: CartItem[];
    const existingItem = cart.find(
      (item) => item.productId === productToAdd.productId
    );

    if (existingItem) {
      newCart = cart.map((item) =>
        item.productId === productToAdd.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...productToAdd, quantity: 1 }];
    }

    setCart(newCart);
    saveCart(newCart);
    Alert.alert("Thành công", `Đã thêm "${productToAdd.name}" vào giỏ!`);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Button title="THÊM VÀO GIỎ" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Giỏ hàng của bạn</Text>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
        ) : (
          cart.map((item) => (
            <Text key={item.productId} style={styles.cartItemText}>
              - {item.name} (Số lượng: {item.quantity})
            </Text>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        <FlatList
          data={PRODUCTS}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.productId}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f7",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
  },
  cartItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});
