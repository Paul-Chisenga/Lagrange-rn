import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { Pressable, View } from "react-native";
import MenuIcon from "../../../../assets/svgs/MenuIcon";
import BellIcon from "../../../../assets/svgs/BellIcon";

export default function TabLayout() {
  const theme = useColorScheme();
  const headerBackground = useThemeColor({}, "background", "system");
  const color = useThemeColor({}, "text", "title");

  return (
    <>
      {theme === "light" && (
        <StatusBar
          animated
          backgroundColor={Colors.light.tint.default}
          style="light"
        />
      )}
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: color,
          // headerTintColor: theme === "light" ? "#000" : "#fff",
          headerStyle: { backgroundColor: headerBackground },
          headerTitleStyle: { fontFamily: "IBMPlexSans_700Bold" },
          headerTitleAlign: "center",
          headerTitle: "",
          headerRight({ tintColor }) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "center",
                }}
              >
                <Pressable>
                  <BellIcon width={24} height={24} fill={tintColor} />
                </Pressable>
                {/* <Pressable onPress={handleSignOut}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={tintColor}
                  />
                </Pressable> */}
              </View>
            );
          },
        }}
      />
    </>
  );
}
