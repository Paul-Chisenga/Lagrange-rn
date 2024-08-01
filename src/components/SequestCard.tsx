import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { ElevatedCard } from "./ElevatedCard";

interface Sequest {
  project: string;
  trees: number;
  carbon: number;
}

interface Props extends Sequest {}

export function SequestCard({ project, trees, carbon }: Props) {
  return (
    <ElevatedCard style={styles.container}>
      <View style={styles.row1}>
        <ThemedText style={styles.project} type="subtitle">
          {project}
        </ThemedText>
        <ThemedText style={styles.carbon} type="subtitle">
          {carbon} tCO2e
        </ThemedText>
      </View>
      <View style={styles.row2}>
        <ThemedText style={styles.trees}>{trees} Trees planted</ThemedText>
        <ThemedText style={styles.cash} type="subtitle">
          Ksh 3,000,579
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
