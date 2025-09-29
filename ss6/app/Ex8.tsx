import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  category: string;
  readTime: number;
}

const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "Bắt đầu với TypeScript",
    author: "Nguyễn Minh Anh",
    date: new Date("2023-04-01"),
    content: "Giới thiệu TypeScript và cách thiết lập dự án.",
    category: "Lập trình",
    readTime: 6,
  },
  {
    id: "2",
    title: "Tìm hiểu RESTful API",
    author: "Trần Hoàng Long",
    date: new Date("2023-04-05"),
    content: "Khái niệm RESTful API và ví dụ thực tế.",
    category: "Backend",
    readTime: 7,
  },
  {
    id: "3",
    title: "UI/UX là gì?",
    author: "Phạm Thị Hương",
    date: new Date("2023-04-10"),
    content: "Những nguyên tắc cơ bản của thiết kế UI/UX.",
    category: "Thiết kế",
    readTime: 5,
  },
  {
    id: "4",
    title: "Triển khai ứng dụng với Docker",
    author: "Lê Quang Dũng",
    date: new Date("2023-04-12"),
    content: "Các bước container hóa và deploy ứng dụng.",
    category: "DevOps",
    readTime: 8,
  },
  {
    id: "5",
    title: "Machine Learning cho người mới",
    author: "Đỗ Kim Ngọc",
    date: new Date("2023-04-15"),
    content: "Giới thiệu khái niệm và ứng dụng ML cơ bản.",
    category: "AI",
    readTime: 9,
  },
  {
    id: "6",
    title: "Bảo mật Web hiện đại",
    author: "Vũ Quốc Khánh",
    date: new Date("2023-04-20"),
    content: "Các phương pháp phòng chống tấn công phổ biến.",
    category: "Bảo mật",
    readTime: 10,
  },
];

const additionalPosts: BlogPost[] = [
  {
    id: "7",
    title: "GraphQL so với REST",
    author: "Nguyễn Thị Lan",
    date: new Date("2023-04-22"),
    content: "So sánh ưu và nhược điểm của GraphQL và REST.",
    category: "Backend",
    readTime: 7,
  },
  {
    id: "8",
    title: "Kubernetes căn bản",
    author: "Phan Thanh Bình",
    date: new Date("2023-04-25"),
    content: "Giới thiệu kiến trúc và cách triển khai Kubernetes.",
    category: "DevOps",
    readTime: 8,
  },
  {
    id: "9",
    title: "Next.js cho dự án React",
    author: "Đặng Thu Hằng",
    date: new Date("2023-04-28"),
    content: "Lợi ích của Next.js khi xây dựng ứng dụng React.",
    category: "Frontend",
    readTime: 6,
  },
];

export default function Ex8() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [loadedMore, setLoadedMore] = useState(false);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loading || loadedMore) return;
    setLoading(true);
    setTimeout(() => {
      setPosts((prev) => [...prev, ...additionalPosts]);
      setLoading(false);
      setLoadedMore(true);
    }, 2000);
  }, [loading, loadedMore]);

  const renderItem = ({ item }: { item: BlogPost }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postAuthor}>Tác giả: {item.author}</Text>
      <Text style={styles.postDate}>Ngày đăng: {formatDate(item.date)}</Text>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
        <Text style={styles.readTime}>{item.readTime} phút đọc</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách bài viết</Text>
        <Text style={styles.headerSubtitle}>
          Số lượng bài viết: {posts.length}
        </Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={{ color: "#4CAF50", marginTop: 5 }}>
                Đang tải thêm...
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 10,
    borderRadius: 6,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  headerSubtitle: { color: "#fff", marginTop: 4 },
  postCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  postTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  postAuthor: { fontSize: 14, color: "#388E3C" },
  postDate: { fontSize: 12, color: "#777" },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  badge: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontSize: 12, color: "#4CAF50", fontWeight: "600" },
  readTime: { fontSize: 12, color: "#555" },
  footer: { alignItems: "center", padding: 15 },
});

