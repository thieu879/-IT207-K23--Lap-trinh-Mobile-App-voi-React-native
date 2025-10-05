import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function Home3() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#fff",
          elevation: 3,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>
          Trang chủ
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Đây là màn hình Home
        </Text>
        <Text style={{ marginTop: 5, color: "#555" }}>
          Nhấn vào icon ☰ ở góc trên bên trái để mở menu.
        </Text>
      </View>
    </View>
  );
}
