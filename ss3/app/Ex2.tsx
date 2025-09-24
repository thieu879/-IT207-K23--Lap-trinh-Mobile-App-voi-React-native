import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Ex2() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lần 1: Sắp xếp dọc (column)</Text>
            <View style={styles.layout1_Container}>
              <View style={[styles.box, styles.box1]} />
              <View style={[styles.box, styles.box2]} />
              <View style={[styles.box, styles.box3]} />
              <View style={[styles.box, styles.box4]} />
              <View style={[styles.box, styles.box5]} />
            </View>
          </View>
            
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lần 2: Sắp xếp ngang (row)</Text>
            <View style={styles.layout2_Container}>
              <View style={[styles.box, styles.box1]} />
              <View style={[styles.box, styles.box2]} />
              <View style={[styles.box, styles.box3]} />
              <View style={[styles.box, styles.box4]} />
              <View style={[styles.box, styles.box5]} />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Lần 3: Sắp xếp dạng lưới (wrap)
            </Text>
            <View style={styles.layout3_Container}>
              <View style={[styles.box, styles.box1]} />
              <View style={[styles.box, styles.box2]} />
              <View style={[styles.box, styles.box3]} />
              <View style={[styles.box, styles.box4]} />
              <View style={[styles.box, styles.box5]} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F3F4F6",
  },
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  box: {
    borderRadius: 8,
  },
  layout1_Container: {
    alignItems: "center",
  },
  layout2_Container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  layout3_Container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  box1: { backgroundColor: "#EF4444", width: 100, height: 40, margin: 5 },
  box2: { backgroundColor: "#F97316", width: 80, height: 50, margin: 5 },
  box3: { backgroundColor: "#22C55E", width: 120, height: 60, margin: 5 },
  box4: { backgroundColor: "#3B82F6", width: 90, height: 30, margin: 5 },
  box5: { backgroundColor: "#8B5CF6", width: 110, height: 55, margin: 5 },
});
