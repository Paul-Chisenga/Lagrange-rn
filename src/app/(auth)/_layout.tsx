import { authContext } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { View, Text } from "react-native";
export default function AuthLayout() {
  const { session } = useContext(authContext);

  if (session) {
    return <Redirect href={"(app)"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Authentication" }} />
      <Stack.Screen name="otp" options={{ headerTitle: "OTP" }} />
    </Stack>
  );
}
