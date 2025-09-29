import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
}

const initialData: Product[] = [
  {
    id: "1",
    name: "Asus ROG Phone 7",
    price: 899,
    description: "Điện thoại gaming Asus ROG Phone 7.",
    details: "Màn hình 6.78 inch, chip Snapdragon 8 Gen 2, bộ nhớ 256GB.",
  },
  {
    id: "2",
    name: "Xiaomi 13 Ultra",
    price: 999,
    description: "Điện thoại cao cấp Xiaomi 13 Ultra.",
    details: "Màn hình 6.73 inch, camera Leica 50MP, pin 5000mAh.",
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: 1199,
    description: "Laptop Apple MacBook Air M3.",
    details: "Màn hình 13.6 inch Liquid Retina, chip M3, SSD 512GB.",
  },
  {
    id: "4",
    name: "Lenovo Yoga Slim 7",
    price: 1050,
    description: "Laptop mỏng nhẹ Lenovo Yoga Slim 7.",
    details: "Màn hình 14 inch, Intel Core i7, RAM 16GB, SSD 512GB.",
  },
  {
    id: "5",
    name: "Bose QuietComfort Ultra",
    price: 379,
    description: "Tai nghe chống ồn Bose QuietComfort Ultra.",
    details: "Chống ồn chủ động, thời lượng pin 24 giờ.",
  },
  {
    id: "6",
    name: "Garmin Venu 3",
    price: 449,
    description: "Đồng hồ thông minh Garmin Venu 3.",
    details: "Màn AMOLED 1.4 inch, GPS, nhiều chế độ luyện tập.",
  },
  {
    id: "7",
    name: "Huawei MatePad 11.5",
    price: 529,
    description: "Máy tính bảng Huawei MatePad 11.5.",
    details: "Màn hình 11.5 inch, chip Snapdragon 7, bộ nhớ 128GB.",
  },
];

const newData: Product[] = [
  {
    id: "8",
    name: "Nothing Phone (2)",
    price: 699,
    description: "Điện thoại Nothing Phone (2) thiết kế trong suốt.",
    details: "Màn hình 6.7 inch OLED, chip Snapdragon 8+, 256GB.",
  },
  {
    id: "9",
    name: "Realme GT 5 Pro",
    price: 749,
    description: "Điện thoại Realme GT 5 Pro hiệu năng cao.",
    details: "Màn hình 6.78 inch, chip Snapdragon 8 Gen 2, pin 5400mAh.",
  },
  {
    id: "10",
    name: "Sony WF-1000XM5",
    price: 299,
    description: "Tai nghe không dây Sony WF-1000XM5.",
    details: "Chống ồn chủ động, thời gian sử dụng 30 giờ.",
  },
];

export default function Ex7() {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadedNewData, setLoadedNewData] = useState<boolean>(false);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || loadedNewData) return;

    setLoading(true);

    setTimeout(() => {
      setProducts((prevProducts) => [...prevProducts, ...newData]);
      setLoading(false);
      setLoadedNewData(true);
      setHasMore(false);
    }, 2000);
  }, [loading, hasMore, loadedNewData]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={styles.productCard}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        </View>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productDetails}>{item.details}</Text>
      </View>
    ),
    [formatPrice]
  );

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải thêm...</Text>
      </View>
    );
  }, [loading]);

  const renderLoadMoreButton = useCallback(() => {
    if (loading || !hasMore || loadedNewData) return null;

    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
        <Text style={styles.loadMoreButtonText}>Tải thêm sản phẩm</Text>
      </TouchableOpacity>
    );
  }, [loading, hasMore, loadedNewData, handleLoadMore]);

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách sản phẩm</Text>
        <Text style={styles.subtitle}>Hiện có {products.length} sản phẩm</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {renderLoadMoreButton()}

      {!hasMore && loadedNewData && (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>
            ✅ Đã tải hết tất cả sản phẩm
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  productName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginRight: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  productDescription: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 6,
    lineHeight: 20,
  },
  productDetails: {
    fontSize: 12,
    color: "#6c757d",
    lineHeight: 18,
  },
  separator: {
    height: 12,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  loadMoreButton: {
    backgroundColor: "#007AFF",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loadMoreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  endMessage: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  endMessageText: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
});

