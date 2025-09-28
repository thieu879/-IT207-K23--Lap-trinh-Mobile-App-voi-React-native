import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState<"green" | "yellow" | "red">(
    "green"
  );

  const switchLight = () => {
    setCurrentLight((prevLight) => {
      switch (prevLight) {
        case "green":
          return "yellow";
        case "yellow":
          return "red";
        case "red":
          return "green";
        default:
          return "green";
      }
    });
  };

  const getLightStyle = (lightColor: "green" | "yellow" | "red") => {
    const isActive = currentLight === lightColor;
    return [styles.light, styles[lightColor], { opacity: isActive ? 1 : 0.3 }];
  };

  return (
    <View style={styles.container}>
      <View style={styles.trafficLightContainer}>
        <View style={getLightStyle("red")} />
        <View style={getLightStyle("yellow")} />
        <View style={getLightStyle("green")} />
      </View>

      <TouchableOpacity style={styles.button} onPress={switchLight}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  trafficLightContainer: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  light: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: "#666",
  },
  red: {
    backgroundColor: "#ff4444",
  },
  yellow: {
    backgroundColor: "#ffdd44",
  },
  green: {
    backgroundColor: "#44ff44",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TrafficLight;
