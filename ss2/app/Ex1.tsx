import React from "react";
import { Text, View, Image, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex1() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://picsum.photos/100" }}
        />
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.description}>
          React Native Developer | UI/UX Enthusiast
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
});
