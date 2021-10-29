import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Button,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
require("firebase/firestore");
require("firebase/firebase-storage");

const PostScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const uploadImage = async () => {
    const childPath = `post/${user.uid}/${Math.random().toString(36)}`;

    const res = await fetch(image);
    const blob = await res.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(user.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        description,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        navigation.popToTop();
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerContentLeft}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon type="ionicon" name="arrow-back-outline" />
            </TouchableOpacity>
            <Text style={styles.headerText}>New post</Text>
          </View>
          <View style={styles.headerContentRight}>
            <TouchableOpacity
              style={
                description && image
                  ? styles.postButtonUsable
                  : styles.postButtonUnusable
              }
              disabled={!description | !image}
              onPress={uploadImage}
            >
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.image}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={require("../assets/placeholder.jpg")}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
        <View style={styles.bottomContent}>
          {!image ? (
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
          ) : (
            <Button
              title="Pick a different image from camera roll"
              onPress={pickImage}
            />
          )}
          <View style={styles.description}>
            <View style={styles.descriptionTitle}>
              <Text style={styles.descriptionTitleText}>Description</Text>
            </View>
            <TextInput
              placeholder={"Write your description here..."}
              multiline={true}
              value={description}
              onChangeText={setDescription}
            ></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContent: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  contentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    marginTop: 10,
    width: "98%",
    alignItems: "center",
  },
  descriptionTitle: {
    borderColor: "gainsboro",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: "98%",
    alignItems: "center",
  },
  descriptionTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "white",
    height: 75,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContentRight: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
  },
  icon: {
    height: "100%",
    marginHorizontal: 8,
    width: 50,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  postButtonUsable: {
    backgroundColor: "#ADD8E6",
    marginHorizontal: 10,
  },
  postButtonUnusable: {
    backgroundColor: "#FF7F7F",
    marginHorizontal: 10,
  },
  postText: {
    fontSize: 25,
    padding: 5,
  },
});
