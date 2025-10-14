import store from "@/redux/store";
import { Slot } from "expo-router";
import React from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
