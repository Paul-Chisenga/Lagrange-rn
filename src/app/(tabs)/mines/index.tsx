import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text, View } from "react-native";
export default function Mines() {
  return <ThemedView style={styles.container}></ThemedView>;
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
