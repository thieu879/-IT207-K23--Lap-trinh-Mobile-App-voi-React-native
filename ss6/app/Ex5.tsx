import React, { useCallback, useMemo, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: string;
  name: string;
}

interface Section {
  title: string;
  data: Product[];
}

const PRODUCTS_DATA: Section[] = [
  {
    title: "Tivi",
    data: [
      { id: "1", name: "LG OLED C3 55 inch" },
      { id: "2", name: "Samsung QLED Q90 65 inch" },
      { id: "3", name: "Sony Bravia XR A80K" },
      { id: "4", name: "TCL Mini LED 75 inch" },
      { id: "5", name: "Panasonic 4K Smart TV" },
    ],
  },
  {
    title: "Đồng hồ thông minh",
    data: [
      { id: "6", name: "Apple Watch Series 10" },
      { id: "7", name: "Samsung Galaxy Watch 6" },
      { id: "8", name: "Garmin Forerunner 965" },
      { id: "9", name: "Xiaomi Watch S2" },
      { id: "10", name: "Huawei Watch GT4" },
    ],
  },
  {
    title: "Máy ảnh",
    data: [
      { id: "11", name: "Canon EOS R8" },
      { id: "12", name: "Sony Alpha A7 IV" },
      { id: "13", name: "Nikon Z6 II" },
      { id: "14", name: "Fujifilm X-T5" },
      { id: "15", name: "Panasonic Lumix S5II" },
    ],
  },
  {
    title: "Đồ gia dụng",
    data: [
      { id: "16", name: "Robot hút bụi Ecovacs T20" },
      { id: "17", name: "Nồi chiên không dầu Philips XXL" },
      { id: "18", name: "Máy lọc không khí Sharp KC-G60" },
      { id: "19", name: "Máy pha cà phê De’Longhi EC685" },
      { id: "20", name: "Máy giặt Samsung AddWash 10kg" },
    ],
  },
];

export default function Ex5() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return PRODUCTS_DATA;
    }

    const query = searchQuery.toLowerCase().trim();

    return PRODUCTS_DATA.map((section) => ({
      title: section.title,
      data: section.data.filter((product) =>
        product.name.toLowerCase().includes(query)
      ),
    })).filter((section) => section.data.length > 0);
  }, [searchQuery]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity style={styles.productItem}>
        <Text style={styles.productName}>{item.name}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionCount}>({section.data.length})</Text>
      </View>
    ),
    []
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
        <Text style={styles.emptySubText}>Thử tìm kiếm với từ khóa khác</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh mục sản phẩm</Text>
        <Text style={styles.subtitle}>
          {searchQuery ? `Kết quả cho "${searchQuery}"` : "Tất cả sản phẩm"}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <SectionList
        sections={filteredData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        style={styles.sectionList}
        contentContainerStyle={styles.sectionListContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => (
          <View style={styles.sectionSeparator} />
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tổng cộng:{" "}
          {filteredData.reduce((sum, section) => sum + section.data.length, 0)}{" "}
          sản phẩm
        </Text>
      </View>
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  clearButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#6c757d",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionList: {
    flex: 1,
  },
  sectionListContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#e9ecef",
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#495057",
  },
  sectionCount: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  productItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  separator: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginLeft: 20,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6c757d",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#adb5bd",
    textAlign: "center",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  footerText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    fontWeight: "500",
  },
});
