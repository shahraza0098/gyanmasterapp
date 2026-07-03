
// app/(root)/tabs/_layout.tsx

import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, PressableProps } from "react-native";

export default function TabsLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Poppins-Medium",
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E0E0E0",
          position: "absolute",
          marginBottom: 20,
          marginHorizontal: 20,
          borderRadius: 16,
          paddingBottom: 6,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        },
        headerShown: false,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
          tabBarButton: (props: PressableProps) => (
            <Pressable {...props} style={{ flex: 1, alignItems: "center", justifyContent: "center" }} />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color }) => <Feather name="book" size={22} color={color} />,
        }}
      />

     

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
