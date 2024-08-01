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
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {/* <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="politics-1" />
        <Stack.Screen name="variation-1" />
        <Stack.Screen name="variation-2" />
        <Stack.Screen name="variation-3" />
      </Stack> */}
    </>
  );
}
