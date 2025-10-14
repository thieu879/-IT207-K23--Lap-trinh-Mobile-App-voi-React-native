import {
  addRandomToArray,
  clearRandomArray,
} from "@/redux/slices/RandomSlice";
import { RootState } from "@/redux/store/store";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Ex2() {
  const value = useSelector((state: RootState) => state.random.random);
  const randomArray = useSelector(
    (state: RootState) => state.random.randomArray
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Random Generator</Text>
        <Text style={styles.currentValue}>Số hiện tại: {value}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => dispatch(addRandomToArray())}
        >
          <Text style={styles.buttonText}>Thêm Random</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={() => dispatch(clearRandomArray())}
        >
          <Text style={styles.buttonText}>Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.arrayContainer}>
        <Text style={styles.arrayTitle}>
          Mảng số random ({randomArray.length} phần tử):
        </Text>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
        >
          {randomArray.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có số nào trong mảng</Text>
          ) : (
            <View style={styles.numberGrid}>
              {randomArray.map((num, index) => (
                <View key={index} style={styles.numberItem}>
                  <Text style={styles.numberText}>{num}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 20,
    color: "#3b82f6",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#22c55e",
  },
  secondaryButton: {
    backgroundColor: "#3b82f6",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledText: {
    opacity: 0.5,
  },
  arrayContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arrayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 40,
  },
  numberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  numberItem: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  indexText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});
