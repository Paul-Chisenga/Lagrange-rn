import { PaymentMethodCard } from "@/components/PaymentMethodCard";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const mpsa = require("../../../../assets/images/mpesa.png");

export default function Withdraw() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Withdraw",
        }}
      />
      <ThemedView style={styles.container}>
        <PaymentMethodCard
          title={"Mpesa"}
          img={{
            source: mpsa,
            height: 53,
            width: 91,
          }}
        />
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
});
