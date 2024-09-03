import { PaymentMethodCard } from "@/components/PaymentMethodCard";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const mpsa = require("../../../../assets/images/mpesa.png");

export default function Withdraw() {
  const router = useRouter();

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
          onSelect={() => {
            router.navigate({ pathname: "/withdraw/mpesa" });
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
    paddingHorizontal: 20,
  },
});
