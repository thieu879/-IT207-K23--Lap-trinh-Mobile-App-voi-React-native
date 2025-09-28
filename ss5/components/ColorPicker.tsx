import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ColorPicker = () => {
  const [redValue, setRedValue] = useState(128);
  const [greenValue, setGreenValue] = useState(128);
  const [blueValue, setBlueValue] = useState(128);

  const adjustColor = (
    colorSetter: React.Dispatch<React.SetStateAction<number>>,
    currentValue: number,
    increment: boolean
  ) => {
    const change = increment ? 1 : -1;
    const newValue = currentValue + change;

    if (newValue >= 0 && newValue <= 255) {
      colorSetter(newValue);
    }
  };

  const renderColorControl = (
    colorName: string,
    colorValue: number,
    colorSetter: React.Dispatch<React.SetStateAction<number>>
  ) => (
    <View style={styles.colorRow}>
      <Text style={styles.colorLabel}>
        {colorName}: {colorValue}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => adjustColor(colorSetter, colorValue, false)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => adjustColor(colorSetter, colorValue, true)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.colorPreview,
          {
            backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})`,
          },
        ]}
      />

      <View style={styles.controlsContainer}>
        {renderColorControl("Red", redValue, setRedValue)}
        {renderColorControl("Green", greenValue, setGreenValue)}
        {renderColorControl("Blue", blueValue, setBlueValue)}
      </View>

      <View style={styles.colorInfoContainer}>
        <Text style={styles.colorInfo}>
          RGB({redValue}, {greenValue}, {blueValue})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  colorPreview: {
    height: 200,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  controlsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  colorLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    minWidth: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 24,
    fontWeight: "bold",
  },
  colorInfoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  colorInfo: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});

export default ColorPicker;
