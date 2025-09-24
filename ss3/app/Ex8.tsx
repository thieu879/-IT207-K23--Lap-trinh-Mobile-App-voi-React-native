import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 360;

function normalize(size: number): number {
  const newSize = size * scale;
  return Math.round(newSize);
}

export default function Ex8() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80",
          }}
          style={styles.bannerImage}
        />

        <Text style={styles.title}>
          React Native: Xây dựng ứng dụng di động đa nền tảng
        </Text>

        <View style={styles.authorContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.authorName}>Sơn Nguyễn</Text>
            <Text style={styles.postDate}>Đăng ngày: 07/09/2025</Text>
          </View>
        </View>

        <Text style={styles.content}>
          React Native đã cách mạng hóa lĩnh vực phát triển ứng dụng di động
          bằng cách cho phép các nhà phát triển xây dựng các ứng dụng gốc cho cả
          iOS và Android từ một cơ sở mã duy nhất. Được phát triển bởi Facebook,
          framework này sử dụng thư viện React, một trong những thư viện
          JavaScript phổ biến nhất để xây dựng giao diện người dùng.
        </Text>
        <Text style={styles.content}>
          Ưu điểm lớn nhất của React Native là hiệu suất gần bằng với ứng dụng
          gốc và khả năng tái sử dụng code giữa các nền tảng, giúp tiết kiệm
          thời gian và chi phí phát triển.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: normalize(24),
    fontWeight: "bold",
    fontFamily: "TitleFont-Bold",
    marginBottom: 12,
    color: "#1a1a1a",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  authorName: {
    fontSize: normalize(16),
    fontWeight: "600",
    fontFamily: "ContentFont-Regular",
    color: "#333",
  },
  postDate: {
    fontSize: normalize(12),
    color: "#888",
    fontFamily: "ContentFont-Regular",
  },
  content: {
    fontSize: normalize(15),
    lineHeight: normalize(24),
    fontFamily: "ContentFont-Regular",
    color: "#4f4f4f",
    marginBottom: 12,
  },
});
