import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const theme = useColorScheme();
  const headerBackground = useThemeColor(
    { dark: Colors.dark.background.system },
    "background",
    "default"
  );

  return (
    <>
      <StatusBar animated style={"light"} />
      <Stack
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: headerBackground },
        }}
      ></Stack>
    </>
  );
}
