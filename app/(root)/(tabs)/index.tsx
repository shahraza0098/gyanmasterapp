

import React from "react";
import { Text, View } from "react-native";

import { UserButton } from "@clerk/expo/native";
import { useUser } from "@clerk/expo";
export default function HomeScreen() {


  const { user } = useUser();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        <UserButton />
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 22,
        }}
      >
        Welcome {user?.firstName}
      </Text>
    </View>
  );
}
