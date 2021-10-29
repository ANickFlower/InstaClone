import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase";

export default function HomeScreen() {
  const navigation = useNavigation();
  const auth = firebase.auth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  const signin = async () => {
    try {
      if (email !== "" && password != "") {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setSigninError(error.message);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.inputContainer}>
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
            signin();
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        {signinError ? (
          <Text style={{ color: "red" }}>{signinError}</Text>
        ) : null}
      </View>
      <View style={styles.signupContainer}>
        <Text style={{ color: "#a9a9a9" }}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: "#001a33" }}
          >
            {" "}
            Sign up.
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  input: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    paddingTop: 150,
    alignItems: "center",
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
  signupContainer: {
    borderTopWidth: 1,
    borderColor: "#ededed",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
