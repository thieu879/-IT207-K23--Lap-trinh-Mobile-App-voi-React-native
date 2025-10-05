import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "@/types/Navigation";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro" },
  { id: 2, name: "MacBook Air M3" },
  { id: 3, name: "Apple Watch Series 9" },
];

export default function Home() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ex1/Detail", { id: item.id })}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 16, borderRadius: 10, backgroundColor: "#fff" },
  name: { fontSize: 16 },
});
