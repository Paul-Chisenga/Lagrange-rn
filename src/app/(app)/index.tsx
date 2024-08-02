import { ElevatedCard } from "@/components/ElevatedCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Link, Redirect } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function index() {
  return <Redirect href={"variation-3"} />;
  return (
    <ThemedView style={styles.container}>
      <Link href={"variation-1"} asChild>
        <Pressable style={styles.cardContainer}>
          <ElevatedCard
            style={[
              styles.card,
              { borderColor: `${Colors.light.tint.default}44` },
            ]}
          >
            <ThemedText style={styles.text}>Variation 1</ThemedText>
          </ElevatedCard>
        </Pressable>
      </Link>
      <Link href={"variation-2"} asChild>
        <Pressable style={styles.cardContainer}>
          <ElevatedCard
            style={[
              styles.card,
              { borderColor: `${Colors.light.tint.accent_1}44` },
            ]}
          >
            <ThemedText style={styles.text}>Variation 2</ThemedText>
          </ElevatedCard>
        </Pressable>
      </Link>
      <Link href={"variation-2"} asChild>
        <Pressable style={styles.cardContainer}>
          <ElevatedCard
            style={[
              styles.card,
              { borderColor: `${Colors.light.tint.accent_2}44` },
            ]}
          >
            <ThemedText style={styles.text}>Variation 2</ThemedText>
          </ElevatedCard>
        </Pressable>
      </Link>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    gap: 10,
  },
  cardContainer: {},
  card: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  text: {
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
