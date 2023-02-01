import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../colors";
import Profile from "../components/Profile";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(true);
  const [input, setInput] = useState("");
  const [userRecord, setUserRecord] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(function () {
      setIsFetching(false);
    }, 3000);
  }, []);

  useEffect(() => {
    async function getUser() {
      if (input) {
        const API_URI = `https://api.github.com/users/${input}`;

        try {
          const res = await axios.get(API_URI);

          if (!res.data) {
            return;
          }

          const {
            login,
            avatar_url,
            followers,
            following,
            name,
            bio,
            message,
          } = res.data;

          if (message) {
            setMsg(message);
          }

          setUserRecord([
            {
              ...userRecord,
              login,
              avatar_url,
              followers,
              following,
              name,
              bio,
            },
          ]);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    getUser();
  }, [input]);

  if (isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.background}
        style={{ alignSelf: "center", justifyContent: "center" }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#191970" }}>
        <View
          style={{
            alignItems: "flex-end",
            padding: 16,
          }}
        >
          <AntDesign name="user" size={30} style={{ color: colors.white }} />
        </View>

        {/* Name Area */}
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.white, fontSize: 30 }}>
            {"Hello,\nJohn Doe"}
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              flexDirection: "row",
              backgroundColor: "#2A2ABB",
              borderRadius: 20,
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={30}
              style={{ color: colors.white }}
            />
            <TextInput
              onChangeText={setInput}
              autoCapitalize="none"
              placeholder="Search..."
              placeholderTextColor={"#fff"}
              style={{ color: "#fff", marginLeft: 10 }}
            />
          </View>
        </View>
      </View>

      {/* Profile List */}
      <View
        style={{
          padding: 20,
          backgroundColor: colors.background,
          justifyContent: "flex-start",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={{ fontSize: 24 }}>Profiles</Text>
      </View>

      <View style={{ height: "80%" }}>
        <ScrollView
          style={{
            backgroundColor: colors.background,
            flex: 1,
          }}
        >
          {userRecord.length > 0 ? (
            <Profile
              username={userRecord[0]?.login}
              icon={userRecord[0]?.avatar_url}
              followers={userRecord[0]?.followers}
              followings={userRecord[0]?.following}
              bio={userRecord[0]?.bio}
              name={userRecord[0]?.name}
            />
          ) : msg ? (
            <View>
              <Text>{msg}</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 16 : 0,
    backgroundColor: "#191970",
  },
  add: {
    backgroundColor: "#2A2ABB",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: 15,
    marginVertical: 12,
  },
});

export default HomeScreen;
