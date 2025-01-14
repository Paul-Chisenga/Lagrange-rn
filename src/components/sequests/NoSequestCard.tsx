import { View } from "react-native";
import { ThemedButton } from "../buttons/ThemedButton";
import NoResultCard, { NoResultCardProps } from "../common/NoResultCard";
import { ThemedText } from "../ThemedText";

export default function NoSequestCard(props: NoResultCardProps) {
  return (
    <NoResultCard {...props}>
      <ThemedText style={{ opacity: 0.5 }}>
        You don't have any sequest yet
      </ThemedText>
      <View style={{ flexDirection: "row" }}>
        <ThemedButton
          style={{ paddingVertical: 5, borderRadius: 20 }}
          type="link"
        >
          Start a sequest
        </ThemedButton>
      </View>
    </NoResultCard>
  );
}
