import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        console.log("Notification data:", data);

        if (data) {
          console.log("Data student:", (data as any).student);
          console.log("Data course:", (data as any).course);
        }

        if (data && (data as any).screen === "Details") {
          const itemId = (data as any).itemId;
          console.log(`Should navigate to Details with itemId: ${itemId}`);
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Notification Exercises" }}
      />
      <Stack.Screen name="details" options={{ title: "Details Screen" }} />
    </Stack>
  );
}
