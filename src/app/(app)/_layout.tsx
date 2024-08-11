import { authContext } from "@/context/auth";
import { Redirect } from "expo-router";
import { useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import PageTitle from "@/components/PageTitle";
import CustomDrawerContent from "@/components/navigation/CustomDrawerContent";

export default function AppLayout() {
  const { session } = useContext(authContext);

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={CustomDrawerContent}
        initialRouteName="variation-3"
      >
        <Drawer.Screen name="index" redirect />
        <Drawer.Screen name="variation-3" />
        <Drawer.Screen name="variation-1" />
        <Drawer.Screen name="variation-2" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
