import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

const SignupScreen = () => {
  const navigation = useNavigation();
  const auth = firebase.auth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const signup = async () => {
    try {
      if (email !== "" && password != "") {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.background}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          onChangeText={setEmail}
          value={email}
        ></TextInput>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={
          !password | !email ? styles.loginButton : styles.loginButtonUnusable
        }
        disabled={!password | !email}
        onPress={() => {
          signup();
          if (!signupError) {
            console.log(signupError);
          }
        }}
      >
        <Text style={{ color: "white" }}>Signup</Text>
      </TouchableOpacity>
      {signupError ? <Text style={{ color: "red" }}>{signupError}</Text> : null}
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
  },
  inputBox: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ededed",
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "85%",
    height: 50,
  },
  loginButton: {
    backgroundColor: "#d4ebf2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: 50,
  },
  loginButtonUnusable: {
    backgroundColor: "#72bcd4",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: 50,
  },
  logo: {
    width: 175,
    height: 100,
    resizeMode: "contain",
  },
});
