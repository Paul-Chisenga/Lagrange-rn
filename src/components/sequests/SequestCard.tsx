import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { ElevatedCard } from "../ElevatedCard";
import { Sequest } from "@/models/sequests";

interface SequestCardProps {
  data: Sequest;
}

export function SequestCard({ data }: SequestCardProps) {
  return (
    <ElevatedCard style={styles.container}>
      <View style={styles.row1}>
        <ThemedText style={styles.project} type="subtitle">
          {data.project.title}
        </ThemedText>
        <ThemedText style={styles.carbon} type="subtitle">
          {data.tCO2} tCO2e
        </ThemedText>
      </View>
      <View style={styles.row2}>
        <ThemedText style={styles.trees}>{1} Trees planted</ThemedText>
        <ThemedText style={styles.cash} type="subtitle">
          Ksh {data.cash.ksh}
        </ThemedText>
      </View>
    </ElevatedCard>
  );
}
const styles = StyleSheet.create({
  container: {
    rowGap: 5,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  project: {
    fontSize: 16,
  },
  trees: {
    fontSize: 12,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  carbon: {
    fontSize: 16,
  },
  cash: {
    fontSize: 14,
    color: Colors.light.tint.accent_1,
  },
});
