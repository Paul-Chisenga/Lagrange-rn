import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const theme = useColorScheme();
  const headerBackground = useThemeColor({}, "background", "system");

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: theme === "light" ? "#000" : "#fff",
        headerStyle: { backgroundColor: headerBackground },
      }}
    ></Stack>
  );
}
