import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SavedPost = {
  id: string;
  title: string;
  author: string;
  image: string;
};

import { fetchSavedArticles, toggleSaveArticle } from "@/apis/articles";
import type { Article } from "@/types";

const SavedPostCard = ({
  item,
  onUnsave,
}: {
  item: SavedPost;
  onUnsave: (id: string) => void;
}) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text
        onPress={() =>
          router.push({
            pathname: "/posts/[id]",
            params: { id: item.id },
          })
        }
        style={styles.cardTitle}
      >
        {item.title}
      </Text>
      <Text style={styles.cardAuthor}>bởi {item.author}</Text>
    </View>
    <TouchableOpacity
      style={styles.bookmarkButton}
      onPress={() => onUnsave(item.id)}
    >
      <Ionicons name="bookmark" size={24} color="#3b82f6" />
    </TouchableOpacity>
  </View>
);

export default function SavedPostsScreen() {
  const [saved, setSaved] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetchSavedArticles({ page: 1, limit: 50 });
        const items: Article[] = Array.isArray(res?.items)
          ? res.items
          : res || [];
        if (!isMounted) return;
        setSaved(
          items.map((a) => ({
            id: String(a.id),
            title: a.title,
            author: a.author?.name || "",
            image: a.thumbnailUrl || "https://picsum.photos/300/200",
          }))
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnsave = async (id: string) => {
    try {
      await toggleSaveArticle(id);
      setSaved((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saved}
        renderItem={({ item }) => (
          <SavedPostCard item={item} onUnsave={handleUnsave} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa lưu bài viết nào.</Text>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAuthor: { fontSize: 14, color: "gray", marginTop: 4 },
  bookmarkButton: { padding: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
