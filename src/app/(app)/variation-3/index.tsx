import { Stack } from "expo-router";
import MenuIcon from "../../../../assets/svgs/MenuIcon";
import BellIcon from "../../../../assets/svgs/BellIcon";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { MineCard } from "@/components/MineCard";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import UpcomingMineSvg from "../../../../assets/svgs/UpcomingMineSvg";
import UpcomingMineLogoSvg from "../../../../assets/svgs/UpcomingMineLogoSvg";
import { ThemedButton } from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { authContext } from "@/context/auth";
import { useContext } from "react";
import { setStorageItemAsync } from "@/utils/localstorage";

export default function Index() {
  const { signOut } = useContext(authContext);

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
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft({ tintColor }) {
            return (
              <Pressable>
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
                <Pressable onPress={handleSignOut}>
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={tintColor}
                  />
                </Pressable>
              </View>
            );
          },
        }}
      />

      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.minesContainer}>
            <ThemedText
              style={[styles.title, styles.minesTitle]}
              type="subtitle"
            >
              Available Mines
            </ThemedText>
            <ScrollView
              horizontal
              style={styles.minesScrollContainer}
              contentContainerStyle={styles.minesScrollContent}
            >
              <MineCard title={"ewaso rehabilitation"} variant={"accent_1"} />
              <MineCard title={"Nairobi Rehabilitation"} variant={"default"} />
              <MineCard title={"jamuhuri wetland"} variant={"accent_2"} />
            </ScrollView>
          </View>
          <View style={styles.upcomingContainer}>
            <ThemedText type="subtitle">Upcoming Mines</ThemedText>
            <ThemedView style={styles.upcomingCardContainer}>
              {/* Logo */}
              <UpcomingMineLogoSvg style={styles.upcomingCardLogo} />
              <View style={styles.upcomingCardInnerContainer}>
                {/* Image */}
                <UpcomingMineSvg />
                {/* Text */}
                <View>
                  <ThemedText
                    style={styles.upcomingCardTitle}
                    type="subtitle"
                    lightColor="#000"
                  >
                    Nairobi Tree planting day
                  </ThemedText>
                  <ThemedText
                    style={styles.upcomingCardDescription}
                    lightColor="#000"
                  >
                    Nairobi Tree planting day is set to improve various water
                    resources that serve the people of nairobi
                  </ThemedText>
                  <ThemedButton
                    style={styles.upcomingCardBtn}
                    icon={{ name: "add" }}
                    variant="default"
                  >
                    mine carbon
                  </ThemedButton>
                </View>
              </View>
            </ThemedView>
          </View>
        </ScrollView>
      </ThemedView>
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
