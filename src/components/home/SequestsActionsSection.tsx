import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import PushDownIcon from "../../../assets/svgs/PushDownIcon";
import PushUpIcon from "../../../assets/svgs/PushUpIcon";
import RepeatIcon from "../../../assets/svgs/RepeatIcon";
import ShareIcon from "../../../assets/svgs/ShareIcon";
import { ThemedButton1 } from "../buttons/ThemedButton1";
import { ThemedButton } from "../buttons/ThemedButton";

export default function SequestsActionsSection() {
  return (
    <View style={styles.container}>
      {/* <ThemedButton1 Icon={RepeatIcon} variant="accent_3">
        Convert
      </ThemedButton1>
      <ThemedButton1 Icon={ShareIcon} variant="accent_3">
        Share
      </ThemedButton1>
      <ThemedButton1 Icon={PushDownIcon} variant="accent_3">
        Deposit
      </ThemedButton1> */}
      <Link href={"/withdraw"} asChild>
        <ThemedButton variant="accent_4" style={{ width: "100%" }}>
          Withdraw
        </ThemedButton>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 35,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginVertical: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
});
