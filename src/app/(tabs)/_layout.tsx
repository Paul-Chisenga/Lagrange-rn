import { authContext } from "@/context/auth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, SplashScreen, Tabs, useNavigation } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Pressable, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import BellIcon from "../../../assets/svgs/BellIcon";
import { Ionicons } from "@expo/vector-icons";

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
  // header colors
  const headerBackground = useThemeColor({}, "background", "system");
  const headerTintColor = useThemeColor({}, "text", "title");

  const navigation = useNavigation();

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
      <Tabs
        screenOptions={{
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
      >
        <Tabs.Screen
          name="index"
          options={{
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
