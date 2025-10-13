import { Stack } from "expo-router";
import React from "react";
export default function PositionLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách Vị trí" }} />
      <Stack.Screen
        name="add"
        options={{ title: "Thêm vị trí mới", presentation: "modal" }}
      />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết vị trí" }} />
      <Stack.Screen
        name="edit"
        options={{ title: "Chỉnh sửa vị trí", presentation: "modal" }}
      />
    </Stack>
  );
}