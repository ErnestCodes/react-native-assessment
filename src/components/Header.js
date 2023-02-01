import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 2, marginVertical: 15, marginLeft: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 70,
        }}
      >
        <TouchableOpacity
          style={{ padding: 2 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#ff4d88" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold", paddingLeft: 2 }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
