import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

import { fetchArticles } from "@/apis/articles";
import type { Article } from "@/types";

type Post = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: number;
};

type PostCardProps = {
  item: Post;
};

const PostCard: React.FC<PostCardProps> = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/posts/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: item.authorAvatar }}
            style={styles.authorAvatar}
          />
          <Text style={styles.authorName}>{item.author}</Text>
        </View>
        <View style={styles.likesInfo}>
          <Ionicons name="heart-outline" size={20} color="#e53e3e" />
          <Text style={styles.likesCount}>{item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetchArticles({ page: 1, limit: 20 });
        const items: Article[] = Array.isArray(res?.items)
          ? res.items
          : res || [];
        if (!isMounted) return;
        setPosts(
          items.map((a) => ({
            id: String(a.id),
            title: a.title,
            author: a.author?.name || "",
            authorAvatar: a.author?.avatarUrl || "https://i.pravatar.cc/150",
            image: a.thumbnailUrl || "https://picsum.photos/400/300",
            likes: a.likesCount || 0,
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", padding: 15 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  authorInfo: { flexDirection: "row", alignItems: "center" },
  authorAvatar: { width: 30, height: 30, borderRadius: 15 },
  authorName: { marginLeft: 8, fontWeight: "500" },
  likesInfo: { flexDirection: "row", alignItems: "center" },
  likesCount: { marginLeft: 5, fontWeight: "600" },
});
