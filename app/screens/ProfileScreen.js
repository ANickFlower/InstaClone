import React, { useContext, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import firebase from "firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { visitLexicalEnvironment } from "typescript";
require("firebase/firestore");
require("firebase/firebase-storage");

const ProfileScreen = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [posts, setPosts] = useState([]);

  firebase
    .firestore()
    .collection("posts")
    .doc(user.uid)
    .collection("userPosts")
    .orderBy("creation", "desc")
    .get()
    .then((snapshot) => {
      let userPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setPosts(userPosts);
    });

  return (
    <View style={styles.background}>
      <Header />
      <View style={styles.listBackground}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemBackground}>
              <View style={styles.user}>
                <Text style={styles.userText}>{user.email}</Text>
              </View>
              <View style={styles.image}>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={{ aspectRatio: 1 / 1, flex: 1 }}
                />
              </View>
              <View style={styles.description}>
                <Text>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    width: "100%",
    height: "70%",
  },
  itemBackground: {
    flex: 1,
    paddingVertical: 10,
  },
  listBackground: {
    backgroundColor: "white",
    top: 75,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  user: {
    padding: 10,
  },
  userText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
