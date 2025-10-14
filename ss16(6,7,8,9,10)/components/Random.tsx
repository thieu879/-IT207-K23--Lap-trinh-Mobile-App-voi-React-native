import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { random } from "@/redux/slices/random.slice";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Random() {
  // Lấy dữ liệu từ trong store
  const { numbers } = useAppSelector((state) => state.random);

  // Bắn dispatch
  const distpatch = useAppDispatch();

  const handleRandom = () => {
    // Bắn dispatch từ component vào trong reducer (slice)
    distpatch(random(Math.ceil(Math.random() * 100)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Random: {JSON.stringify(numbers)}</Text>
      <Button title="Random number" onPress={handleRandom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
    fontWeight: 700,
  },
});
