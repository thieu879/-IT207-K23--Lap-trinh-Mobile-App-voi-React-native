import React from "react";
import { StyleSheet, View } from "react-native";
import BusinessCard from "../components/BusinessCard";

export default function Ex1() {
  return (
    <View>
      <View style={style.container}>
        <BusinessCard />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

