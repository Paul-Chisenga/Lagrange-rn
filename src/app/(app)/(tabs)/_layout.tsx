import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "expo-image";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "light" ? "#fff" : Colors.dark.background.default,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tint.default,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tint.default,
        tabBarLabelStyle: {
          fontFamily: "Inter_600SemiBold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require(`../../../../assets/icons/home.png`)
                  : require(`../../../../assets/icons/home-outline.png`)
              }
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Activities",
          tabBarLabelStyle: {
            color: Colors[colorScheme ?? "light"].tint.default,
          },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].tint.default,
                width: 55,
                height: 55,
                padding: 15,
                borderRadius: 50,
                position: "absolute",
                top: -22,
              }}
            >
              <Image
                source={require(`../../../../assets/icons/shop.png`)}
                style={{ width: 24, height: 24 }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require(`../../../../assets/icons/trees.png`)}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
