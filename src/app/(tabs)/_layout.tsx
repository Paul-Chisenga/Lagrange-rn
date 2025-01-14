import { authContext } from "@/context/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import BellIcon from "../../../assets/svgs/BellIcon";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import WelcomePageLogo from "../../../assets/svgs/WelcomePageLogo";

export default function TabsLayout() {
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
  // tab colors
  const tabDefaultColor = useThemeColor({}, "text", "default");
  // header colors
  const headerBackground = useThemeColor({}, "background", "system");
  const headerTintColor = useThemeColor({}, "text", "title");

  // hide splash screen
  useEffect(() => {
    if (session) {
      SplashScreen.hideAsync();
    }
  }, [session]);

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the auth group and sign in again.
  if (!session) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <>
      <StatusBar animated style={theme === "light" ? "dark" : "light"} />
      <Tabs
        screenOptions={{
          // Tab
          tabBarInactiveTintColor: tabDefaultColor,
          tabBarActiveTintColor: Colors.light.tint.default,
          tabBarStyle: { height: 60, paddingTop: 5 },
          tabBarHideOnKeyboard: true,
          // header options
          headerShadowVisible: false,
          headerTintColor: headerTintColor,
          headerTransparent: false,
          headerStyle: {
            backgroundColor: headerBackground,
            borderBottomWidth: 1,
          },
          headerTitleStyle: { fontFamily: "IBMPlexSans_700Bold" },
          headerTitleAlign: "center",
          headerLeft: () => <WelcomePageLogo height={45} />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerRight({ tintColor }) {
            return (
              <View
                style={
                  {
                    // flexDirection: "row",
                    // columnGap: 10,
                    // alignItems: "center",
                    // paddingHorizontal: 10,
                  }
                }
              >
                <Pressable>
                  <BellIcon width={24} height={24} fill={tintColor} />
                </Pressable>
              </View>
            );
          },
          headerRightContainerStyle: {
            paddingHorizontal: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Lagrange",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mines"
          options={{
            tabBarLabel: "Mines",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="apps" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sequests"
          options={{
            tabBarLabel: "Sequests",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pulse" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
