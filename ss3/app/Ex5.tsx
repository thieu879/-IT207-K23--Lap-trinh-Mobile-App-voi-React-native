import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex5() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Trang chủ</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Nội dung của ứng dụng ở đây...</Text>
        <Text style={styles.contentText}>
          Header ở trên sẽ tự động thay đổi theo nền tảng.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.OS === "android" ? "#2196F3" : "white",
  },
  headerContainer: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        backgroundColor: "#2196F3",
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        color: "black",
        textAlign: "center",
      },
      android: {
        color: "white",
        textAlign: "left",
      },
    }),
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  contentText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    ...Platform.select({
      ios: {
        color: "black",
        textAlign: "center",
      },
      android: {
        color: "black",
        textAlign: "left",
      },
    }),
  },
});
