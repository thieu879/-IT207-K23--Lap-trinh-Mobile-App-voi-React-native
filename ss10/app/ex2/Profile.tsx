import BottomNav from "@/components/BottomNav";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Đây là màn hình Profile</Text>
      <BottomNav />
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 56,
  },
  title: { fontSize: 16, fontWeight: "600" },
});
