import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import type { Ex2StackParamList } from "@/types/Navigation";

const tabs = [
  {
    key: "ex2/Home2",
    label: "Trang chủ",
    icon: "home-outline",
    iconActive: "home",
  },
  {
    key: "ex2/Setting",
    label: "Cài đặt",
    icon: "settings-outline",
    iconActive: "settings",
  },
  {
    key: "ex2/Profile",
    label: "Hồ sơ",
    icon: "person-outline",
    iconActive: "person",
  },
] as const;

export default function BottomNav() {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<Ex2StackParamList>>();
  const active = route.name as keyof Ex2StackParamList;

  return (
    <View style={styles.wrap}>
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <Pressable
            key={t.key}
            style={styles.item}
            onPress={() => navigation.navigate(t.key)}
          >
            <Ionicons
              name={(isActive ? t.iconActive : t.icon) as any}
              size={22}
              color={isActive ? "#0a84ff" : "#6b7280"}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? "#0a84ff" : "#6b7280" },
              ]}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  item: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { marginTop: 4, fontSize: 11, fontWeight: "500" },
});
