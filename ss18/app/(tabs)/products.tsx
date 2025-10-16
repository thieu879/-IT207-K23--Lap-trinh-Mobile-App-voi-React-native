import { addToCart, fetchProducts } from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductCardProps } from "../../types/index";

const PRODUCTS: Product[] = [];

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        onPress={() =>
          router.push({
            pathname: "/product-detail",
            params: { id: item.id },
          })
        }
        style={styles.title}
        numberOfLines={2}
      >
        {item.name}
      </Text>
      <Text style={styles.price}>{item.price.toLocaleString("vi-VN")} VNĐ</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          dispatch(addToCart({ product: item, quantity: 1 }) as any)
        }
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  React.useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Cửa hàng" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={() => dispatch(fetchProducts() as any)}
        ListEmptyComponent={
          !loading ? (
            <View style={{ paddingTop: 80, alignItems: "center" }}>
              <Ionicons name="cube-outline" size={64} color="#ccc" />
              <Text style={{ marginTop: 10, color: "#888" }}>
                Không có sản phẩm
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: "100%", height: 120, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53e3e",
    marginVertical: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
});
