import React, { useContext } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { Pressable, View } from "react-native";
import BellIcon from "../../../assets/svgs/BellIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/navigation/CustomDrawer";
import { authContext } from "@/context/auth";
import { Redirect } from "expo-router";

export default function TabLayout() {
  const { session } = useContext(authContext);
  // theme
  const theme = useColorScheme();
  // drawer colors
  const drawerActiveBackgroundColor = useThemeColor(
    { dark: "#ffffff11" },
    "background",
    "system"
  );
  const drawerActiveTintColor = useThemeColor(
    { dark: Colors.light.tint.default },
    "text",
    "default"
  );
  // header colors
  const headerBackground = useThemeColor({}, "background", "system");
  const headerTintColor = useThemeColor({}, "text", "title");

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <>
      {theme === "light" && (
        <StatusBar
          animated
          backgroundColor={Colors.light.tint.default}
          style="light"
        />
      )}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            // drawer
            drawerActiveBackgroundColor,
            drawerActiveTintColor,
            drawerInactiveTintColor: "#ffffff",
            drawerItemStyle: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 20,
              marginHorizontal: 0,
              maxWidth: "80%",
            },
            // header options
            headerShadowVisible: false,
            headerTintColor: headerTintColor,
            headerStyle: {
              backgroundColor: headerBackground,
            },
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
                    paddingHorizontal: 10,
                  }}
                >
                  <Pressable>
                    <BellIcon width={24} height={24} fill={tintColor} />
                  </Pressable>
                </View>
              );
            },
          }}
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen name="index" />
          <Drawer.Screen name="sequests" />
          <Drawer.Screen name="withdraw" />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
