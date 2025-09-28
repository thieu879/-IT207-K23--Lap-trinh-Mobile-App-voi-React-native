import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (userInfo.email === "" || userInfo.password === "") {
      Alert.alert("Login", "Please enter email and password");
      return;
    }
    Alert.alert(userInfo.email, userInfo.password);
  };
  return (
    <>
      <View style={style.container}>
        <Text style={style.title}>Login</Text>
        <TextInput
          style={style.input}
          placeholder="Email"
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
        />
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "blue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginForm;
