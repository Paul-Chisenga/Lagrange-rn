import { Demo } from "@/components/Demo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
export default function Activities() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Demo />
    </ThemedView>
  );
}
