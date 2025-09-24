import { COLORS, CONTAINER_STYLES, FONT_SIZES, SPACING } from "@/style/GlobalStyles";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LoginScreenRefactored = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    Alert.alert("Thành công", `Chào mừng trở lại, ${email}!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoiding}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Đăng Nhập</Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn"
            placeholderTextColor={COLORS.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor={COLORS.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    ...CONTAINER_STYLES,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZES.header,
    color: COLORS.text,
    fontWeight: "bold",
    marginBottom: SPACING.lg,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: "center",
    width: "100%",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.medium,
    marginTop: SPACING.md,
  },
});

export default LoginScreenRefactored;
