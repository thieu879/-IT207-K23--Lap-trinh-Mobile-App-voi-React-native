import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousNumber, setPreviousNumber] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousNumber === null) {
      setPreviousNumber(display);
    } else if (operation) {
      const currentValue = previousNumber || "0";
      const newValue = calculate(
        parseFloat(currentValue),
        inputValue,
        operation
      );

      setDisplay(String(newValue));
      setPreviousNumber(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (previousNumber !== null && operation) {
      const inputValue = parseFloat(display);
      const currentValue = parseFloat(previousNumber);
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousNumber(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousNumber(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const renderButton = (title: string, onPress: () => void, style?: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      <View style={styles.row}>
        {renderButton("C", clear, styles.clearButton)}
        <View style={styles.button} />
        <View style={styles.button} />
        {renderButton("/", () => inputOperation("/"), styles.operatorButton)}
      </View>

      <View style={styles.row}>
        {renderButton("7", () => inputNumber("7"))}
        {renderButton("8", () => inputNumber("8"))}
        {renderButton("9", () => inputNumber("9"))}
        {renderButton("*", () => inputOperation("*"), styles.operatorButton)}
      </View>

      <View style={styles.row}>
        {renderButton("4", () => inputNumber("4"))}
        {renderButton("5", () => inputNumber("5"))}
        {renderButton("6", () => inputNumber("6"))}
        {renderButton("-", () => inputOperation("-"), styles.operatorButton)}
      </View>

      <View style={styles.row}>
        {renderButton("1", () => inputNumber("1"))}
        {renderButton("2", () => inputNumber("2"))}
        {renderButton("3", () => inputNumber("3"))}
        {renderButton("+", () => inputOperation("+"), styles.operatorButton)}
      </View>

      <View style={styles.row}>
        {renderButton("0", () => inputNumber("0"), styles.zeroButton)}
        <View style={styles.button} />
        {renderButton("=", performCalculation, styles.equalsButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  displayText: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "300",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 80,
    backgroundColor: "#333",
    marginHorizontal: 5,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "400",
  },
  operatorButton: {
    backgroundColor: "#ff9500",
  },
  clearButton: {
    backgroundColor: "#a6a6a6",
  },
  equalsButton: {
    backgroundColor: "#ff9500",
    flex: 2,
  },
  zeroButton: {
    flex: 2,
  },
});

export default Calculator;
