import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          style={styles.logoButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Post")}
          >
            <Icon type="ionicon" name="add-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("Profile")}
          >
            <Icon type="ionicon" name="person-outline" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "white",
    height: 75,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    top: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    width: "100%",
    justifyContent: "space-between",
  },
  headerRight: {
    flexDirection: "row",
  },
  icon: {
    height: "100%",
    justifyContent: "center",
    marginHorizontal: 8,
    width: 50,
  },
  logo: {
    resizeMode: "contain",
    width: 100,
    height: "100%",
  },
  logoButton: {
    marginHorizontal: 20,
  },
});
