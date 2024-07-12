import { authContext } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function AppLayout() {
  const { session } = useContext(authContext);

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href={"(auth)"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
