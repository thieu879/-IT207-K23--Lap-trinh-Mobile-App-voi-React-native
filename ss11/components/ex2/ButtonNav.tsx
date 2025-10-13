import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link, usePathname } from "expo-router";

export default function ButtonNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/ex2/Home" as const, icon: "home-outline" as const },
    { href: "/ex2/Products" as const, icon: "file-tray-stacked-outline" as const },
    { href: "/ex2/Account" as const, icon: "person-circle-outline" as const },
  ]as const satisfies ReadonlyArray<{ href: Href; icon: keyof typeof Ionicons.glyphMap }>;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        const color = active ? "#f59e0b" : "#6b7280";
        return (
          <Link key={tab.href} href={tab.href} asChild replace>
            <TouchableOpacity
              style={styles.item}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Ionicons name={tab.icon} size={22} color={color} />
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-around",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  item: { padding: 8 },
});
