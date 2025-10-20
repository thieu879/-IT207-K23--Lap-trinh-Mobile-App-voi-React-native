import { useRouter } from "expo-router";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text>Home</Text>
      </View>
      <View>
        <View>
          <Text>Welcome to Mini Shop</Text>
        </View>
        <View>
          <Text>Find best products here</Text>
        </View>
        <View>
          <Image
            source={{
              uri: "https://xuconcept.com/wp-content/uploads/2020/12/chup-anh-quan-ao-dep.jpg",
            }}
            style={{ width: "90%", height: 200 }}
          />
        </View>
        <View>
          <Button
            title="Browse all products"
            onPress={() => router.push("/ex1/ProductList")}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  homeHeader: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
