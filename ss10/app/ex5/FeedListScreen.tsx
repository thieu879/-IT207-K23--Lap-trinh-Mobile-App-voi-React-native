import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FeedStackParamList } from "../../types/Navigation";

type Nav = NativeStackNavigationProp<FeedStackParamList, "FeedList">;

const DATA = [
  { id: 1, title: "Bài viết 1" },
  { id: 2, title: "Bài viết 2" },
  { id: 3, title: "Bài viết 3" },
];

export default function FeedListScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("FeedDetail", { id: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: "600" },
});
