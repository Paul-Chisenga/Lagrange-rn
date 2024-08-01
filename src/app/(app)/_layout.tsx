import { authContext } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

export default function AppLayout() {
  const { session } = useContext(authContext);

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href={"(auth)"} />;
  }

  return (
    <>
      <StatusBar animated style={"auto"} />
      <Stack>
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
