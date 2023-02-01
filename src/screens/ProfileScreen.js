import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import axios from "axios";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, icon, followers, followings, bio, name, ctx, user } =
    route?.params;
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      setIsFetching(false);
    }, 3000);
  }, []);

  useEffect(() => {
    async function fetchFollowerAcc() {
      setIsFetching(true);
      const API_URI = `https://api.github.com/users/${ctx ? user : username}`;

      try {
        const res = await axios.get(API_URI);
        const { login, avatar_url, followers, following, name, bio, message } =
          res.data;
        setData([
          {
            login,
            avatar_url,
            followers,
            following,
            name,
            bio,
            message,
          },
        ]);
        setIsFetching(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    if (user) {
      fetchFollowerAcc();
    }
  }, [user, ctx]);

  if (isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color={"blue"}
        style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
      />
    );
  }

  return (
    <SafeAreaView>
      <Header title="Profile" />

      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={{ uri: ctx ? data[0]?.avatar_url : icon }}
            style={styles.image}
            resizeMode="center"
          />
        </View>
        <View style={styles.active}></View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
          {ctx ? data[0]?.name : name}
        </Text>
        <Text style={[styles.text, { color: "#aeb5bc", fontSize: 18 }]}>
          {ctx ? data[0]?.bio : bio}
        </Text>
        <Text style={[styles.text, { color: "#aeb5bc", fontSize: 18 }]}>
          @{ctx ? data[0]?.login : username}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("Modal", {
              username: ctx ? data[0]?.login : username,
              ctx: true,
            })
          }
          style={styles.statsBox}
        >
          <Text style={[styles.text, { fontSize: 24 }]}>
            {ctx ? data[0]?.followers : followers}
          </Text>
          <Text style={[styles.text, styles.subText]}>Followers</Text>
        </Pressable>
        <Text
          style={[
            styles.text,
            { marginHorizontal: 8, fontSize: 32, color: "#aeb5bc" },
          ]}
        >
          |
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate("Modal", {
              username: ctx ? data[0]?.login : username,
              ctx: true,
            })
          }
          style={styles.statsBox}
        >
          <Text style={[styles.text, { fontSize: 24 }]}>
            {ctx ? data[0]?.following : followings}
          </Text>
          <Text style={[styles.text, styles.subText]}>Followings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    // fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 85,
    overflow: "hidden",
  },
  sm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 28,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  active: {
    backgroundColor: "#34ffb9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  subText: {
    fontSize: 12,
    color: "#aeb5bc",
    textTransform: "uppercase",
    fontWeight: "500",
  },
});
