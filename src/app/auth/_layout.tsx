import { authContext } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function AuthLayout() {
  const { session } = useContext(authContext);

  // hide splash screen
  useEffect(() => {
    if (!session) {
      SplashScreen.hideAsync();
    }
  }, [session]);

  if (session) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="update-password" />
    </Stack>
  );
}
