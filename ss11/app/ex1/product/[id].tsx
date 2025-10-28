import { PRODUCTS } from "@/constants/products";
import { useCart } from "@/context/CartContext";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === String(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image
          source={{ uri: product.image }}
          style={{ width: "100%", height: 260 }}
        />
        <View style={{ padding: 16 }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.section}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.btn} onPress={() => addToCart(product)}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { fontSize: 28, fontWeight: "800", marginBottom: 6 },
  price: {
    fontSize: 18,
    color: "#1e88e5",
    fontWeight: "700",
    marginBottom: 16,
  },
  section: { fontSize: 14, fontWeight: "700", marginBottom: 8 },
  description: { fontSize: 14, color: "#555", lineHeight: 20 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
  },
  btn: {
    backgroundColor: "#1976d2",
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

