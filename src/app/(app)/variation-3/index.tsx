import { Pressable, StyleSheet, View } from "react-native";
import { authContext } from "@/context/auth";
import { useContext } from "react";
import { setStorageItemAsync } from "@/utils/localstorage";
import Home2 from "@/components/home/Home2";
import MenuIcon from "../../../../assets/svgs/MenuIcon";
import WelcomePageLogo from "../../../../assets/svgs/WelcomePageLogo";
import { Drawer } from "expo-router/drawer";
import { useNavigation } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import CustomDrawerContent from "@/components/navigation/CustomDrawerContent";

export default function Index() {
  const { signOut } = useContext(authContext);

  const navigation = useNavigation();

  async function handleSignOut() {
    try {
      await setStorageItemAsync("lagrande_exists", null);
      await signOut();
    } catch (error) {
      throw new Error("Sign Out failed");
    }
  }

  return (
    <>
      <Drawer.Screen
        options={{
          headerTitle() {
            return <WelcomePageLogo height={45} />;
          },
          headerLeft({ tintColor }) {
            return (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <MenuIcon width={24} height={24} fill={tintColor} />
              </Pressable>
            );
          },
        }}
      />
      <CustomDrawerContent />
      {/* <Home2 /> */}
    </>
  );
}

const styles = StyleSheet.create({});
