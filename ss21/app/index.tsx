import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Platform, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    notificationListener.current = subscription;

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
    };
  }, []);

  const sendImmediateNotification = async () => {
    const trigger =
      Platform.OS === "android" ? { channelId: "reminders" } : null;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Xin chào! 👋",
        body: "Đây là thông báo được gửi ngay lập tức",
      },
      trigger: trigger as any,
    });
  };

  const sendDelayedNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc nhở",
        body: "Bạn đã lên lịch nhắc nhở thành công!",
        data: {
          student: "SV001",
          course: "React Native",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        channelId: Platform.OS === "android" ? "reminders" : undefined,
      },
    });

    Alert.alert("Thành công", "Đã lên lịch nhắc nhở.");
  };

  const sendNavigationNotification = async () => {
    const trigger =
      Platform.OS === "android" ? { channelId: "reminders" } : null;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Chi tiết sản phẩm",
        body: "Nhấn để xem chi tiết",
        data: {
          screen: "Details",
          itemId: 123,
        },
      },
      trigger: trigger as any,
    });
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("reminders", {
        name: "Nhắc nhở",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });

      await Notifications.setNotificationChannelAsync("news", {
        name: "Tin tức",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      try {
        const existingToken = await AsyncStorage.getItem("expo_push_token");

        token = (await Notifications.getExpoPushTokenAsync()).data;

        if (existingToken === token) {
          console.log("Token unchanged, no update needed");
        } else if (!existingToken || existingToken !== token) {
          console.log("Token changed or new token, updating...");
          await AsyncStorage.setItem("expo_push_token", token);
          console.log("Token updated successfully");
        }
      } catch (error) {
        console.log("Error handling token:", error);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    setExpoPushToken(token || "");
    return token;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Notification Exercises
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Button title="Gửi ngay" onPress={sendImmediateNotification} />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Button
          title="Nhắc tôi sau 10 giây"
          onPress={sendDelayedNotification}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Expo Push Token:</Text>
        <Text style={{ fontSize: 12, color: "gray", marginBottom: 10 }}>
          {expoPushToken ? expoPushToken : "Đang lấy token..."}
        </Text>
        <Button
          title="Lấy lại Token"
          onPress={registerForPushNotificationsAsync}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Button
          title="Gửi thông báo có điều hướng"
          onPress={sendNavigationNotification}
        />
      </View>

      {notification && (
        <View
          style={{ marginTop: 20, padding: 10, backgroundColor: "#f0f0f0" }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Last Notification:
          </Text>
          <Text>Title: {notification.request.content.title}</Text>
          <Text>Body: {notification.request.content.body}</Text>
          {notification.request.content.data && (
            <Text>
              Data: {JSON.stringify(notification.request.content.data)}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
