import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { colors } from "../colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ username, icon, followers, followings, bio, name }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        backgroundColor: colors.white,
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onPress={() =>
        navigation.navigate("Profile", {
          username,
          icon,
          followers,
          followings,
          bio,
          name,
        })
      }
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ url: icon }}
          style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 5 }}
        />
        <View>
          <Text style={{ fontSize: 16 }}>{name}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: colors.greyColor }}>
              {followers} followers
            </Text>
            <Text style={{ marginHorizontal: 5, color: colors.greyColor }}>
              |
            </Text>
            <Text style={{ color: colors.greyColor }}>
              {followings} followings
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        {/* <MaterialCommunityIcons
          name="pencil"
          size={30}
          style={{ color: theme }}
        /> */}
        <AntDesign
          name="arrowright"
          size={30}
          style={{ color: "#000", marginLeft: 5 }}
        />
      </View>
    </Pressable>
  );
};

export default Profile;
