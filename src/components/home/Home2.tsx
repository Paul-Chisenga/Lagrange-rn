import { View, StyleSheet, ScrollView } from "react-native";
import { MineCard } from "@/components/MineCard";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton1 } from "../ThemedButton1";
import RepeatIcon from "../../../assets/svgs/RepeatIcon";
import PushUpIcon from "../../../assets/svgs/PushUpIcon";
import ShareIcon from "../../../assets/svgs/ShareIcon";
import PushDownIcon from "../../../assets/svgs/PushDownIcon";
import { SequestCard } from "../SequestCard";
import { Colors } from "@/constants/Colors";
import { ThemedButton2 } from "../ThemedButton2";
import PageTitle from "../PageTitle";
import mines from "@/data/mines.json";
import { Link } from "expo-router";

export default function Home2() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Numbers */}
        <View style={styles.numbersContainer}>
          <PageTitle>Total Carbon Sequested</PageTitle>
          <View style={styles.tco2eContainer}>
            <ThemedText
              style={styles.tco2eAmount}
              type="title"
              lightColor={Colors.light.tint.accent_1}
              darkColor={Colors.light.tint.accent_1}
            >
              0.473
            </ThemedText>
            <ThemedText
              style={styles.tco2eUnit}
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
          <Link href={"/variation-3/withdraw"} asChild>
            <ThemedButton1 Icon={PushUpIcon} variant="accent_4">
              Withdraw
            </ThemedButton1>
          </Link>
        </View>
        {/* Latest sequest */}
        <View style={styles.latestSequest}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title} type="subtitle">
              Latest sequest
            </ThemedText>
            <Link href={"/variation-3/sequests"} asChild>
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
            <ThemedText style={styles.title} type="subtitle">
              Active open mines
            </ThemedText>
          </View>
          <ScrollView
            horizontal
            style={styles.minesScrollContainer}
            contentContainerStyle={styles.minesScrollContent}
            showsHorizontalScrollIndicator={false}
          >
            <MineCard mine={mines[0]} variant={"accent_1"} />
            <MineCard mine={mines[1]} variant={"default"} />
            <MineCard mine={mines[2]} variant={"accent_2"} />
          </ScrollView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flex: 1,
  },
  numbersContainer: { paddingHorizontal: 20, paddingTop: 20 },
  numbersTitle: {
    textAlign: "center",
    marginBottom: 31,
  },
  tco2eContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tco2eAmount: {},
  tco2eUnit: {},
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
  title: {},
  minesContainer: {
    marginBottom: 25,
  },
  minesTitle: {
    paddingHorizontal: 20,
  },
  minesScrollContainer: {},
  minesScrollContent: {
    columnGap: 20,
    paddingHorizontal: 20,
  },
});
