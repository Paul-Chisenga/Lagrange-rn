import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { authContext } from "@/context/auth";
import { sleep } from "@/utils/functions";
import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  const { signOut } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSignOut() {
    try {
      setIsLoading(true);
      await sleep(3000);
      await signOut();
    } catch (error) {
      throw new Error("Sign Out failed");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <ThemedText type="title">Upcoming events</ThemedText>
        <ThemedText type="subtitle">Coming this week</ThemedText>
        <ThemedText type="default">
          Edit app/index.tsx to edit this screen.
        </ThemedText>
        <ThemedText type="defaultSemiBold">Edit this screen</ThemedText>
        <ThemedText type="link" onPress={handleSignOut}>
          {isLoading ? "Please wait" : "Sign Out"}
        </ThemedText>
      </View>
      <ThemedView
        style={{
          rowGap: 10,
          margin: 10,
          padding: 20,
        }}
        lightColor="#eee"
      >
        <ThemedButton icon={{ name: "add" }}>Primary</ThemedButton>
        <ThemedButton variant="accent_1">Green</ThemedButton>
        <ThemedButton variant="accent_2">Yellow</ThemedButton>
        <ThemedButton variant="white">White</ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
