import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthenticatedUserContext);
  const auth = Firebase.auth();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.background}>
      <Header />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSignOut();
        }}
      >
        <Text>signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
