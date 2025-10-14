// src/screens/Ex5.tsx
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  selectLang,
  selectT,
  setLanguage,
  toggleLanguage,
} from "@/redux/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function Ex5() {
  const lang = useAppSelector(selectLang);
  const t = useAppSelector(selectT);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Pressable
          onPress={() => dispatch(setLanguage("vi"))}
          style={[styles.item, lang === "vi" && styles.activeItem]}
        >
          <Text style={styles.itemText}>
            {t.vi} {lang === "vi" ? "✓" : ""}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => dispatch(setLanguage("en"))}
          style={[styles.item, lang === "en" && styles.activeItem]}
        >
          <Text style={styles.itemText}>
            {t.en} {lang === "en" ? "✓" : ""}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.body}>{t.body}</Text>
      <Text style={styles.academy}>{t.academy}</Text>

      <Pressable
        onPress={() => dispatch(toggleLanguage())}
        style={styles.toggleBtn}
        hitSlop={8}
      >
        <Text style={styles.toggleText}>
          {lang === "en" ? "Switch to Vietnamese" : "Chuyển sang English"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16, gap: 16 },
  menu: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  item: { paddingHorizontal: 14, paddingVertical: 10, backgroundColor: "#fff" },
  activeItem: { backgroundColor: "#f3f4f6" },
  itemText: { fontSize: 16, color: "#111827" },
  body: { fontSize: 16, color: "#374151", lineHeight: 22 },
  academy: { fontSize: 20, fontWeight: "700", color: "#111827" },
  toggleBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 8,
  },
  toggleText: { color: "#fff", fontWeight: "600" },
});
