import { CartProvider, useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

function CartHeaderIcon() {
  const { totalQuantity } = useCart();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/ex1/cart")}
      style={{ paddingHorizontal: 8 }}
    >
      <View>
        <Ionicons name="cart-outline" size={22} />
        {totalQuantity > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -6,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#1976d2",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 2,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
              {totalQuantity}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function Layout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="ex1/Home"
          options={{ title: "Home", headerRight: () => <CartHeaderIcon /> }}
        />
        <Stack.Screen
          name="ex1/ProductList"
          options={{
            title: "Product List",
            headerRight: () => <CartHeaderIcon />,
          }}
        />
        <Stack.Screen
          name="ex1/product/[id]"
          options={{
            title: "Product Detail",
            headerRight: () => <CartHeaderIcon />,
          }}
        />
        <Stack.Screen
          name="ex1/cart"
          options={{ title: "Cart", headerRight: () => <CartHeaderIcon /> }}
        />
      </Stack>
    </CartProvider>
  );
}
