// src/screens/Ex3.tsx
import React, { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  selectColumns,
  selectViewMode,
  setMode,
} from "@/redux/slices/viewSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function Ex3() {
  const mode = useAppSelector(selectViewMode);
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  const data = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), []);

  const isGrid = mode === "grid";

  return (
    <View style={styles.container}>
      <View style={styles.toggleBar}>
        <Pressable
          onPress={() => dispatch(setMode("list"))}
          style={[
            styles.toggleBtn,
            !isGrid ? styles.toggleActive : styles.toggleInactive,
          ]}
        >
          <Text
            style={
              !isGrid ? styles.toggleTextActive : styles.toggleTextInactive
            }
          >
            List mode
          </Text>
        </Pressable>

        <Pressable
          onPress={() => dispatch(setMode("grid"))}
          style={[
            styles.toggleBtn,
            isGrid ? styles.toggleActive : styles.toggleInactive,
          ]}
        >
          <Text
            style={isGrid ? styles.toggleTextActive : styles.toggleTextInactive}
          >
            Grid mode
          </Text>
        </Pressable>
      </View>

      <FlatList
        key={isGrid ? "grid" : "list"}
        data={data}
        numColumns={columns}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item)}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View
            style={[styles.card, isGrid ? styles.cardGrid : styles.cardList]}
          >
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const CARD_COLOR = "#ef4444";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 16,
  },
  toggleBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 12,
    justifyContent: "center",
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 22,
  },
  toggleActive: {
    backgroundColor: "#1e90ff",
  },
  toggleInactive: {
    backgroundColor: "#eaeef3",
  },
  toggleTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  toggleTextInactive: {
    color: "#1f2937",
    fontWeight: "600",
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  columnWrapper: {
    gap: 12,
    paddingVertical: 6,
  },
  card: {
    backgroundColor: CARD_COLOR,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardList: {
    height: 80,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  cardGrid: {
    height: 140,
    flex: 1,
  },
  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
