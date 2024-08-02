import { Stack } from "expo-router";
import MenuIcon from "../../../../assets/svgs/MenuIcon";
import BellIcon from "../../../../assets/svgs/BellIcon";
import { View, StyleSheet, Pressable, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { authContext } from "@/context/auth";
import { useContext } from "react";
import { setStorageItemAsync } from "@/utils/localstorage";
import Home2 from "@/components/home/Home2";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
  const { signOut } = useContext(authContext);
  const theme = useColorScheme();

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
      {theme === "light" && (
        <StatusBar
          animated
          backgroundColor={Colors.light.tint.default}
          style="light"
        />
      )}
      <Stack.Screen
        options={{
          headerTitle: "",
          // headerShadowVisible: true,
          headerStyle: {
            // backgroundColor:
            //   theme === "light" ? `${Colors.light.tint.default}05` : undefined,
          },
          headerLeft({ tintColor }) {
            return (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* <ThemedText>MENU</ThemedText> */}
                <MenuIcon width={24} height={24} fill={tintColor} />
              </Pressable>
            );
          },
          headerRight({ tintColor }) {
            return (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "center",
                }}
              >
                <Pressable>
                  <BellIcon width={24} height={24} fill={tintColor} />
                </Pressable>
                {/* <Pressable onPress={handleSignOut}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={tintColor}
                  />
                </Pressable> */}
              </View>
            );
          },
        }}
      />

      <Home2 />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  scrollContainer: {
    flex: 1,
  },
  title: {},
  scrollContent: {},
  minesContainer: {
    marginBottom: 25,
  },
  minesTitle: {
    maxWidth: 82,
    marginHorizontal: 30,
  },
  minesScrollContainer: {
    marginVertical: 20,
  },
  minesScrollContent: {
    columnGap: 20,
    paddingHorizontal: 15,
  },
  upcomingContainer: {
    paddingHorizontal: 15,
  },
  upcomingTitle: {},
  upcomingCardContainer: {
    marginVertical: 20,
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: `${Colors.light.tint.accent_1}33`,
  },
  upcomingCardLogo: {
    marginLeft: "auto",
  },
  upcomingCardInnerContainer: {
    flex: 1,
    flexDirection: "row",
    columnGap: 20,
  },
  upcomingCardTitle: {
    fontFamily: "BebasNeue_400Regular",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  upcomingCardDescription: {
    fontFamily: "BeVietnamPro_400Regular",
    fontSize: 10,
    maxWidth: 140,
    lineHeight: 13,
  },
  upcomingCardBtn: {
    marginVertical: 20,
    marginLeft: "auto",
  },
});
