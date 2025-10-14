import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  selectFavoriteCount,
  selectUsers,
  toggleFavorite,
} from "@/redux/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function Ex4() {
  const users = useAppSelector(selectUsers);
  const favCount = useAppSelector(selectFavoriteCount);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Favorites User</Text>
      <Text style={styles.caption}>Favorites: {favCount}</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.label}>
                UserName: <Text style={styles.name}>{item.name}</Text>
              </Text>
              <View style={styles.favLine}>
                <Text style={styles.label}>Favorites: </Text>
                <Pressable
                  onPress={() => dispatch(toggleFavorite(item.id))}
                  hitSlop={8}
                >
                  <Text
                    style={[
                      styles.heart,
                      item.favorite ? styles.heartOn : styles.heartOff,
                    ]}
                  >
                    {item.favorite ? "❤️" : "？"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 4,
    color: "#111827",
  },
  caption: {
    fontSize: 14,
    color: "#6b7280",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
  row: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  info: {
    gap: 6,
  },
  label: {
    color: "#6b7280",
    fontSize: 14,
  },
  name: {
    color: "#111827",
    fontWeight: "700",
  },
  favLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heart: {
    fontSize: 18,
  },
  heartOn: {
    color: "#ef4444",
  },
  heartOff: {
    color: "#9ca3af",
  },
});
