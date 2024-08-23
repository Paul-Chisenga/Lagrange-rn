import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { ThemedButton2 } from "../ThemedButton2";
import { usePathname, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { authContext } from "@/context/auth";
import { setStorageItemAsync } from "@/utils/localstorage";
import { useContext, useState } from "react";

const avatar = require("../../../assets/images/avatar.png");

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [signout, setSignout] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const backgroundColor = useThemeColor(
    { dark: Colors.dark.background.system },
    "background",
    "default"
  );
  const itemBackgroundColor = useThemeColor(
    { dark: "#ffffff11" },
    "background",
    "system"
  );
  const itemTintColor = useThemeColor(
    { dark: Colors.light.tint.default },
    "text",
    "default"
  );

  const { signOut } = useContext(authContext);
  async function handleSignOut() {
    try {
      setSignout(true);
      await setStorageItemAsync("lagrande_exists", null);
      await signOut();
    } catch (error) {
      setSignout(false);
      throw new Error("Sign Out failed");
    }
  }

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor,
        flexGrow: 1,
        paddingHorizontal: 0,
      }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image
            source={avatar}
            style={{ width: 38, height: 38, borderRadius: 38 }}
          />
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          <DrawerItem
            label={"Home"}
            focused={pathname === "/"}
            activeBackgroundColor={itemBackgroundColor}
            activeTintColor={itemTintColor}
            inactiveTintColor={"#ffffff"}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 20,
              marginHorizontal: 0,
              maxWidth: "80%",
            }}
            onPress={() => router.navigate("/")}
            icon={({ color, focused, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            )}
          />
          <DrawerItem
            label={"Profile"}
            focused={pathname === "/profile"}
            activeBackgroundColor={itemBackgroundColor}
            activeTintColor={itemTintColor}
            inactiveTintColor={"#ffffff"}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 20,
              marginHorizontal: 0,
              maxWidth: "80%",
            }}
            onPress={() => {}}
            icon={({ color, focused, size }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            )}
          />
          <DrawerItem
            label={"Mines"}
            activeBackgroundColor={itemBackgroundColor}
            activeTintColor={itemTintColor}
            inactiveTintColor={"#ffffff"}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 20,
              marginHorizontal: 0,
              maxWidth: "80%",
            }}
            onPress={() => {}}
            icon={({ color, focused, size }) => (
              <Ionicons name="trending-up-outline" size={size} color={color} />
            )}
          />
          <DrawerItem
            label={"Help"}
            activeBackgroundColor={itemBackgroundColor}
            activeTintColor={itemTintColor}
            inactiveTintColor={"#ffffff"}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 20,
              marginHorizontal: 0,
              maxWidth: "80%",
            }}
            onPress={() => {}}
            icon={({ color, focused, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            )}
          />
        </View>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <ThemedButton2
            iconName="log-out-outline"
            variant="white"
            onPress={handleSignOut}
            loading={signout}
          >
            Logout
          </ThemedButton2>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "blue",
  },
  headerContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 10,
  },
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    padding: 30,
  },
});
