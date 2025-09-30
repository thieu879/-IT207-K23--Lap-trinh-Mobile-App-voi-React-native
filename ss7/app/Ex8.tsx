import { useDebounce } from "@/components/useDebounce";
import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Ex8() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      setTimeout(() => {
        setResults([
          `Kết quả cho "${debouncedQuery}" #1`,
          `Kết quả cho "${debouncedQuery}" #2`,
          `Kết quả cho "${debouncedQuery}" #3`,
        ]);
        setLoading(false);
      }, 800);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa..."
        value={query}
        onChangeText={setQuery}
      />

      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}

      {results.map((item, index) => (
        <Text key={index} style={styles.result}>
          {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
  },
});
