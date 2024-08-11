import { authContext } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
export default function AuthLayout() {
  const { session } = useContext(authContext);

  if (session) {
    return <Redirect href={"/(app)"} />;
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
    </Stack>
  );
}
