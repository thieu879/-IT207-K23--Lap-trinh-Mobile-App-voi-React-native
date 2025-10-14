import { decrement, increment } from "@/redux/slices/CountSlice";
import { RootState } from "@/redux/store/store";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Ex1() {
  const count = useSelector((state: RootState) => state.count.count);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bộ Đếm</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => dispatch(decrement())}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => dispatch(increment())}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  counterContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 48,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  counterText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#3b82f6",
    textAlign: "center",
    minWidth: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 32,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  decrementButton: {
    backgroundColor: "#ef4444",
  },
  incrementButton: {
    backgroundColor: "#22c55e",
  },
  buttonText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footerContainer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    textAlign: "center",
  },
});
