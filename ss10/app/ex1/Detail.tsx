import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/Navigation";

type DetailRouteProp = RouteProp<RootStackParamList, "ex1/Detail">;
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function Detail() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết Sản phẩm</Text>
      <Text style={{ marginTop: 24 }}>
        Đây là trang chi tiết cho sản phẩm có ID:
      </Text>
      <Text style={styles.id}>{id}</Text>
      <Button title="GO BACK" onPress={() => navigation.goBack()} />
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
  title: { fontSize: 18, fontWeight: "600" },
  id: { fontSize: 24, fontWeight: "700", marginVertical: 16 },
});
