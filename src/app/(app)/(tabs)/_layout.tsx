import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Text } from "react-native";
import HomeIcon from "../../../../assets/svgs/HomeIcon";
import ShopIcon from "../../../../assets/svgs/ShopIcon";
import TreesIcon from "../../../../assets/svgs/Treescon";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const theme = useColorScheme();
  const headerBackground = useThemeColor({}, "background", "system");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? "light"].tabIconSelected.default,
        tabBarStyle: {
          backgroundColor: Colors[theme ?? "light"].tabBackground.default,
        },
        tabBarInactiveTintColor:
          Colors[theme ?? "light"].tabIconDefault.default,
        tabBarLabel({ focused, children, color }) {
          if (!focused) return null;
          return (
            <Text
              style={{ color, fontFamily: "Inter_600SemiBold", fontSize: 12 }}
            >
              {children}
            </Text>
          );
        },
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerTintColor: theme === "light" ? "#000" : "#fff",
        headerStyle: { backgroundColor: headerBackground },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon stroke={color} strokeWidth={1} width={22} height={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Activities",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor:
                  Colors[theme ?? "light"].tabShopBackground.default,
                width: 55,
                height: 55,
                padding: 15,
                borderRadius: 50,
                position: "absolute",
                top: -22,
              }}
            >
              <ShopIcon stroke={color} width={22} height={22} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TreesIcon stroke={color} width={22} height={22} />
          ),
        }}
      />
    </Tabs>
  );
}
