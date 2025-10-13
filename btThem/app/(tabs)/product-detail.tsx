import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProductDetailScreen() {
  const { id, name, price, quantity } = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Chi tiết Sản phẩm</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.detailItem}>
          <ThemedText style={styles.label}>Mã sản phẩm:</ThemedText>
          <ThemedText style={styles.value}>{id}</ThemedText>
        </View>

        <View style={styles.detailItem}>
          <ThemedText style={styles.label}>Tên sản phẩm:</ThemedText>
          <ThemedText style={[styles.value, styles.boldValue]}>
            {name}
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <ThemedText style={styles.label}>Giá:</ThemedText>
          <ThemedText style={styles.value}>
            {parseFloat(price as string).toLocaleString("vi-VN")} VNĐ
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <ThemedText style={styles.label}>Số lượng:</ThemedText>
          <ThemedText style={styles.value}>{quantity}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  detailItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  boldValue: {
    fontWeight: "bold",
  },
});

