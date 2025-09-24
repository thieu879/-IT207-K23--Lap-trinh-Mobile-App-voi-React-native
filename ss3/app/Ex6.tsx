import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: string;
  name: string;
}

const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: i.toString(),
  name: `Sản phẩm ${i + 1}`,
}));

export default function ProductGrid() {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = ({
      window,
    }: {
      window: { width: number; height: number };
    }) => {
      setWindowWidth(window.width);
      setWindowHeight(window.height);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription.remove();
  }, []);

  const isPortrait = windowHeight >= windowWidth;
  const isTablet = windowWidth >= 768;

  const numColumns = isTablet ? 4 : isPortrait ? 2 : 3;

  const margin = 10;
  const itemWidth = (windowWidth - margin * 2 * numColumns) / numColumns;
  const itemHeight = itemWidth * 1.25;
  const fontSize = itemWidth / 8;

  const renderItem = ({ item }: { item: Product }) => (
    <View
      style={[styles.item, { width: itemWidth, height: itemHeight, margin }]}
    >
      <Text style={[styles.text, { fontSize }]} numberOfLines={2}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // reset FlatList khi số cột thay đổi
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  item: {
    backgroundColor: "#4caf50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "white", fontWeight: "600", textAlign: "center" },
});
