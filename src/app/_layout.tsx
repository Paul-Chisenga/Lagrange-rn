import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
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

// Component that makes sure that navigation stack is loaded only when the session context has been queried
function AppWithContext() {
  const { isLoading, loadAuthState } = useContext(authContext);

  // query session from storage if any
  useEffect(() => {
    loadAuthState().catch(() => {
      throw new Error("Loading auth failed");
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar animated style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <AppWithContext />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
