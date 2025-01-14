import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  useFonts,
  IBMPlexSans_400Regular,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  BebasNeue_400Regular,
  BeVietnamPro_400Regular,
} from "@expo-google-fonts/dev";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, authContext } from "@/context/auth";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

// set axios global url
axios.defaults.baseURL = process.env.EXPO_PUBLIC_BACKEND_URL;

// Component that makes sure that navigation stack is loaded only when the authentication context has been computed
function BootstrapApp() {
  const { isLoading, loadAuthState } = useContext(authContext);

  // query session from storage if any
  useEffect(() => {
    loadAuthState().catch(() => {
      throw new Error("Something went wrong");
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar animated style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="auth" />
      </Stack>
    </>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// use query client
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    IBMPlexSans_400Regular,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    BebasNeue_400Regular,
    BeVietnamPro_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
              <BootstrapApp />
            </AuthProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
