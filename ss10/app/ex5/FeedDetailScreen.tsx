import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { FeedStackParamList } from "../../types/Navigation";

type DetailRoute = RouteProp<FeedStackParamList, "FeedDetail">;

export default function FeedDetailScreen() {
  const { params } = useRoute<DetailRoute>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết bài viết</Text>
      <Text style={styles.caption}>ID: {params.id}</Text>
      <Button title="Quay lại" onPress={() => history.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
  caption: { fontSize: 18, marginBottom: 16 },
});
