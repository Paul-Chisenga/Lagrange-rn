import { Form } from "@/components/Form/Form";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Mpesa() {
  const router = useRouter();

  function handleSubmit() {
    router.navigate({ pathname: "/withdraw/otp" });
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Fill Details To Withdraw",
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form onSubmit={handleSubmit} style={styles.form}>
            <View style={styles.formGroup}>
              <ThemedTextInput
                label="National ID"
                placeholder="123"
                keyboardType="number-pad"
              />
              <ThemedTextInput
                label="Phone Number"
                placeholder="254"
                keyboardType="number-pad"
              />
              <ThemedTextInput label="Email" placeholder="" />
              <ThemedTextInput label="Amount" placeholder="ksh 0.00" />
            </View>
            <View style={styles.btnContainer}>
              <ThemedButton icon={{ name: "wallet-outline" }}>
                Withdraw
              </ThemedButton>
            </View>
          </Form>
        </ScrollView>
      </ThemedView>
    </>
  );
}
const styles = StyleSheet.create({
  form: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  formGroup: {
    rowGap: 20,
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
  },
});
