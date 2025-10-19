import store from "@/redux/store";
import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  // Layout gốc để quản lý các màn hình modal trong tương lai
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
