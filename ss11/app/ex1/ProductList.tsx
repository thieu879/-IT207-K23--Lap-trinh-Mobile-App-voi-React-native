import ProductCard from "@/components/ex1/ProductCard";
import { PRODUCTS } from "@/constants/products";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ProductListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(id) =>
              router.push({ pathname: "/ex1/product/[id]", params: { id } })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "700", marginTop: 8, marginBottom: 8 },
});
