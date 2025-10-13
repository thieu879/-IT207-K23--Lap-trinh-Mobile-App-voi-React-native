import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: "Trang chủ" }} />
      <ScrollView style={styles.container}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Chào mừng!</Text>
          <Text style={styles.welcomeText}>
            Xin chào {user?.fullName}, chúc bạn một ngày làm việc hiệu quả!
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Tính năng chính</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureText}>Quản lý nhân viên</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>➕</Text>
            <Text style={styles.featureText}>Thêm nhân viên mới</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✏️</Text>
            <Text style={styles.featureText}>Chỉnh sửa thông tin</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🗑️</Text>
            <Text style={styles.featureText}>Xóa nhân viên</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Thông tin hệ thống</Text>
          <Text style={styles.infoText}>
            Ứng dụng quản lý nhân viên được xây dựng với React Native và Expo
            Router.
          </Text>
          <Text style={styles.infoText}>
            Sử dụng API RESTful để quản lý dữ liệu nhân viên một cách hiệu quả.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  featuresCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#666",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
});
