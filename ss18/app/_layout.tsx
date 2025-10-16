import store from "@/redux/store";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product-detail"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
