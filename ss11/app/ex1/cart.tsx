import { useCart } from "@/context/CartContext";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CartScreen() {
  const { cartItems, updateQuantity } = useCart();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <View style={styles.qtyBox}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text>-</Text>
              </Pressable>
              <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text>+</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ paddingVertical: 12 }}>
            <Text style={{ textAlign: "right", fontWeight: "700" }}>
              Total: ${total.toFixed(2)}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <Pressable style={styles.checkoutBtn}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          Proceed to Checkout
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  thumb: { width: 48, height: 48, borderRadius: 6 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { color: "#757575", marginTop: 2 },
  qtyBox: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#bdbdbd",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutBtn: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#1976d2",
    alignItems: "center",
    justifyContent: "center",
  },
});

