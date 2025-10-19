import { deleteArticle, fetchMyArticles } from "@/apis/articles";
import type { Article } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Data will be loaded from API

type Post = {
  id: string;
  title: string;
  status: "published" | "draft";
  image: string;
};

const PostRow = ({
  item,
  onDelete,
}: {
  item: Post;
  onDelete: (post: Post) => void;
}) => (
  <View style={styles.postRow}>
    <Image source={{ uri: item.image }} style={styles.postImage} />
    <View style={styles.postInfo}>
      <Text style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              item.status === "published" ? "#4ade80" : "#facc15",
          },
        ]}
      >
        <Text style={styles.statusText}>
          {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </Text>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => router.push(`/profile/edit-post?postId=${item.id}`)}
      >
        <Ionicons name="pencil-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item)}>
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MyPostsScreen() {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const res = await fetchMyArticles({ page: 1, limit: 50 });
      const items: Article[] = Array.isArray(res?.items)
        ? res.items
        : res || [];
      if (!isMounted) return;
      setMyPosts(
        (items || []).map(
          (a): Post => ({
            id: String(a.id),
            title: a.title,
            status: (a as any).status === "draft" ? "draft" : "published",
            image: a.thumbnailUrl || "https://picsum.photos/300/200",
          })
        )
      );
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = (post: Post) => {
    Alert.alert("Xóa", `Bạn có chắc muốn xóa: ${post.title}`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          await deleteArticle(post.id);
          setMyPosts((prev) => prev.filter((p) => p.id !== post.id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile/create-post")}
            >
              <Ionicons name="add-circle" size={32} color="#22c55e" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList<Post>
        data={myPosts}
        renderItem={({ item }: { item: Post }) => (
          <PostRow item={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa có bài viết nào.</Text>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postImage: { width: 80, height: 80, borderRadius: 10 },
  postInfo: { flex: 1, marginLeft: 15 },
  postTitle: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 8,
  },
  statusText: { fontSize: 12, fontWeight: "bold", color: "white" },
  actions: { flexDirection: "row", gap: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
