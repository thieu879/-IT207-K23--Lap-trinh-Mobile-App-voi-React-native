import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedBox() {
  const { theme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <View style={styles.box}>
      <Text style={styles.text}>Tôi là một Box trong theme: {theme}</Text>
      <ThemedChild />
    </View>
  );
}

function ThemedChild() {
  const { theme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <View style={styles.childBox}>
      <Text style={styles.text}>Tôi là Component con, theme: {theme}</Text>
    </View>
  );
}

export default function Ex6() {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}

function MainScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = themedStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Chế độ hiện tại: {theme}</Text>
      <Button
        title={`Chuyển sang ${theme === "light" ? "Dark" : "Light"} Mode`}
        onPress={toggleTheme}
      />
      <ThemedBox />
    </SafeAreaView>
  );
}

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "light" ? "#fff" : "#333",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    },
    box: {
      marginTop: 20,
      padding: 20,
      borderRadius: 8,
      backgroundColor: theme === "light" ? "#f0f0f0" : "#555"
    },
    childBox: {
      marginTop: 10,
      padding: 15,
      borderRadius: 8,
      backgroundColor: theme === "light" ? "#e0e0e0" : "#777"
    },
    text: {
      color: theme === "light" ? "#000" : "#fff",
      fontSize: 16
    }
  });
