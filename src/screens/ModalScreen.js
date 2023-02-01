import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const BG_IMG =
  "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg";
const ITEM_SIZE = 70 + 20 * 3;

const ModalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, ctx } = route?.params;
  const [data, setData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function getFollowers() {
      const API_URI = `https://api.github.com/users/${username}/followers`;

      try {
        const res = await axios.get(API_URI);
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getFollowings() {
      const API_URI = `https://api.github.com/users/${username}/following`;

      try {
        const response = await axios.get(API_URI);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    if (ctx) {
      getFollowers();
    } else {
      getFollowings();
    }
  }, [username]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              onPress={() => console.warn("hey")}
              style={{
                padding: 20,
                marginBottom: 20,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 12,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("Profile", {
                    user: item?.login,
                    ctx: ctx,
                  })
                }
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{ uri: item?.avatar_url }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                    marginRight: 20 / 2,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 22, fontWeight: "700" }}>
                    {item.login}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
