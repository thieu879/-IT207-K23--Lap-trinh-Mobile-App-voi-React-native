import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Props = {
  product: Product;
  onPress?: (id: string) => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress && onPress(product.id)}
      style={styles.card}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },
  image: { width: "100%", height: 140 },
  info: { padding: 12 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 14, color: "#1e88e5", fontWeight: "600" },
});

