import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Ex3() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text style={style.count}>{count}</Text>
      <View style={style.buttonContainer}>
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
        <Button title="Giảm" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
