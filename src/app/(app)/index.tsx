import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import MenuIcon from "../../../assets/svgs/MenuIcon";
import WelcomePageLogo from "../../../assets/svgs/WelcomePageLogo";
import { Drawer } from "expo-router/drawer";
import { Link, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { MineCard } from "@/components/MineCard";
import PageTitle from "@/components/PageTitle";
import { SequestCard } from "@/components/SequestCard";
import { ThemedButton1 } from "@/components/ThemedButton1";
import { ThemedButton2 } from "@/components/ThemedButton2";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PushDownIcon from "../../../assets/svgs/PushDownIcon";
import PushUpIcon from "../../../assets/svgs/PushUpIcon";
import RepeatIcon from "../../../assets/svgs/RepeatIcon";
import ShareIcon from "../../../assets/svgs/ShareIcon";
import mines from "@/data/mines.json";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const navigation = useNavigation();

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
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <MenuIcon width={24} height={24} fill={tintColor} />
              </Pressable>
            );
          },
        }}
      />
      {/* <CustomDrawerContent /> */}
      <ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Numbers */}
          <View style={styles.numbersContainer}>
            <PageTitle>Total Carbon Sequested</PageTitle>
            <View style={styles.tco2eContainer}>
              <ThemedText
                type="title"
                lightColor={Colors.light.tint.accent_1}
                darkColor={Colors.light.tint.accent_1}
              >
                0.473
              </ThemedText>
              <ThemedText
                type="subtitle"
                lightColor={Colors.light.tint.default}
                darkColor={Colors.light.tint.default}
              >
                tCO2e
              </ThemedText>
            </View>
            <ThemedText
              style={styles.shillings}
              type="subtitle"
              lightColor={Colors.light.tint.accent_4}
            >
              Ksh 300
            </ThemedText>
          </View>
          {/* Actions */}
          <View style={styles.actionsContainer}>
            <ThemedButton1 Icon={RepeatIcon} variant="accent_3">
              Convert
            </ThemedButton1>
            <ThemedButton1 Icon={ShareIcon} variant="accent_3">
              Share
            </ThemedButton1>
            <ThemedButton1 Icon={PushDownIcon} variant="accent_3">
              Deposit
            </ThemedButton1>
            <Link href={"/withdraw"} asChild>
              <ThemedButton1 Icon={PushUpIcon} variant="accent_4">
                Withdraw
              </ThemedButton1>
            </Link>
          </View>
          {/* Latest sequest */}
          <View style={styles.latestSequest}>
            <View style={styles.titleContainer}>
              <ThemedText type="subtitle">Latest sequest</ThemedText>
              <Link href={"/sequests"} asChild>
                <ThemedButton2 iconName="arrow-forward" variant="default" />
              </Link>
            </View>
            <SequestCard
              project={"Jamuhuri wetland"}
              trees={500}
              carbon={47.71}
            />
          </View>
          {/* active mines */}
          <View style={styles.minesContainer}>
            <View style={[styles.titleContainer, { paddingHorizontal: 20 }]}>
              <ThemedText type="subtitle">Active open mines</ThemedText>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ columnGap: 20, paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              <MineCard mine={mines[0]} variant={"accent_1"} />
              <MineCard mine={mines[1]} variant={"default"} />
              <MineCard mine={mines[2]} variant={"accent_2"} />
            </ScrollView>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  numbersContainer: { paddingHorizontal: 20, paddingTop: 20 },
  tco2eContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  shillings: { paddingHorizontal: 30, textAlign: "right" },
  actionsContainer: {
    paddingHorizontal: 20,
    marginVertical: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
  latestSequest: { paddingHorizontal: 20, marginBottom: 35 },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  minesContainer: {
    marginBottom: 25,
  },
});
