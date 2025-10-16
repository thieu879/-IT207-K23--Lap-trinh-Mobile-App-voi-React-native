import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  clearCart,
  removeItem,
  updateCartQuantity,
} from "@/redux/slices/productSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString("vi-VN")} VNĐ
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                updateCartQuantity({
                  productId: item.id,
                  quantity: item.quantity - 1,
                }) as any
              )
            }
          >
            <Ionicons name="remove-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                updateCartQuantity({
                  productId: item.id,
                  quantity: item.quantity + 1,
                }) as any
              )
            }
          >
            <Ionicons name="add-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => dispatch(removeItem(item.id) as any)}>
        <Ionicons name="trash-outline" size={24} color="#e53e3e" />
      </TouchableOpacity>
    </View>
  );
};

const CartSummary: React.FC<{ subtotal: number; onClear: () => void }> = ({
  subtotal,
  onClear,
}) => (
  <View style={styles.summaryContainer}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Tạm tính</Text>
      <Text style={styles.summaryValue}>
        {subtotal.toLocaleString("vi-VN")} VNĐ
      </Text>
    </View>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
      <TextInput keyboardType="numeric" style={styles.textInput} />
    </View>
    <View style={styles.separator} />
    <View style={styles.summaryRow}>
      <Text style={styles.totalLabel}>Tổng cộng</Text>
      <Text style={styles.totalValue}>
        {subtotal.toLocaleString("vi-VN")} VNĐ
      </Text>
    </View>
    <TouchableOpacity
      style={{ marginTop: 10, alignSelf: "flex-end" }}
      onPress={onClear}
    >
      <Text style={{ color: "#e53e3e", fontWeight: "600" }}>
        Xóa toàn bộ giỏ hàng
      </Text>
    </TouchableOpacity>
  </View>
);

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.products.cartItems);
  const data = cartItems.map((c) => ({
    id: c.product.id,
    name: c.product.name,
    price: c.product.price,
    quantity: c.quantity,
    image: c.product.image,
  }));
  const subtotal = data.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />
      <FlatList
        data={data}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <CartSummary
            subtotal={subtotal}
            onClear={() => dispatch(clearCart() as any)}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
});
