import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },
  { id: "6", name: "Item 6" },
  { id: "7", name: "Item 7" },
];

export default function Ex7() {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;
  const numColumns = isPortrait ? 1 : 2;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Chế độ hiển thị: {isPortrait ? "Dọc (Portrait)" : "Ngang (Landscape)"}
      </Text>

      <FlatList
        data={data}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  list: {
    justifyContent: "center",
  },
  itemBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
  },
});
