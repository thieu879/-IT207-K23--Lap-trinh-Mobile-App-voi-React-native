import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { addToCart, fetchProductById } from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    params.id ? state.products.productById[params.id] : undefined
  );

  React.useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id) as any);
    }
  }, [dispatch, params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {product?.image ? (
          <Image source={{ uri: product.image }} style={styles.productImage} />
        ) : null}

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product?.name || ""}</Text>
          <Text style={styles.description}>{product?.name}</Text>
          <Text style={styles.sectionTitle}>Dung lượng</Text>
          <View style={styles.sizeContainer} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Giá tiền</Text>
          <Text style={styles.priceValue}>
            {product?.price?.toLocaleString("vi-VN")} VNĐ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => product && dispatch(addToCart({ product }) as any)}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  productImage: { width: "100%", height: 300, resizeMode: "contain" },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: "bold", color: "#222" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: { marginLeft: 8, fontSize: 16, color: "#555" },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginVertical: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  sizeContainer: { flexDirection: "row", marginTop: 10 },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sizeText: { fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceLabel: { fontSize: 16, color: "gray" },
  priceValue: { fontSize: 22, fontWeight: "bold", color: "#e53e3e" },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
