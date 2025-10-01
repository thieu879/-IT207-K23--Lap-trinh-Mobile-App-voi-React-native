import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "userProfile";

// Cấu trúc dữ liệu cũ
interface UserV1 {
  name: string;
}

// Cấu trúc dữ liệu mới
interface UserV2 {
  user: {
    firstName: string;
    lastName: string;
  };
  version: number;
}

export default function Ex8() {
  const [user, setUser] = useState<UserV2 | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    "Đang kiểm tra dữ liệu..."
  );

  useEffect(() => {
    const migrateAndLoadUser = async () => {
      try {
        const rawData = await AsyncStorage.getItem(STORAGE_KEY);

        if (!rawData) {
          setStatusMessage("Không có dữ liệu người dùng.");
          return;
        }

        const data = JSON.parse(rawData);

        // Trường hợp 1: Dữ liệu đã ở phiên bản 2
        if (data.version && data.version === 2) {
          setUser(data);
          setStatusMessage("Dữ liệu đã ở phiên bản mới nhất.");
          return;
        }

        // Trường hợp 2: Dữ liệu ở phiên bản 1, cần di chuyển
        if (data.name && !data.version) {
          setStatusMessage("Phát hiện dữ liệu cũ, đang tiến hành di chuyển...");

          const nameParts = data.name.split(" ");
          const firstName = nameParts.shift() || "";
          const lastName = nameParts.join(" ");

          const migratedData: UserV2 = {
            user: {
              firstName,
              lastName,
            },
            version: 2,
          };

          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(migratedData));
          setUser(migratedData);

          Alert.alert(
            "Di chuyển thành công",
            "Dữ liệu của bạn đã được cập nhật sang cấu trúc mới."
          );
          setStatusMessage("Hoàn tất di chuyển!");
          return;
        }

        // Trường hợp 3: Dữ liệu không xác định
        setStatusMessage("Định dạng dữ liệu không hợp lệ.");
      } catch (error) {
        Alert.alert("Lỗi", "Không thể đọc hoặc di chuyển dữ liệu người dùng.");
        setStatusMessage("Đã xảy ra lỗi.");
      } finally {
        setLoading(false);
      }
    };

    migrateAndLoadUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Di chuyển Dữ liệu</Text>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : user ? (
          <View>
            <Text style={styles.info}>Họ: {user.user.firstName}</Text>
            <Text style={styles.info}>Tên: {user.user.lastName}</Text>
            <Text style={styles.info}>Phiên bản dữ liệu: {user.version}</Text>
          </View>
        ) : (
          <Text>{statusMessage}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  info: {
    fontSize: 18,
    lineHeight: 28,
  },
});
