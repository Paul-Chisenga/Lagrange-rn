import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { authContext } from "@/context/auth";
import { sleep } from "@/utils/functions";

export default function Otp() {
  const { signIn } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAuth() {
    try {
      setIsLoading(true);
      await sleep(3000);
      await signIn("session-token");
    } catch (error) {
      setIsLoading(false);
      throw new Error("Sign in failed");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP</Text>
      <TextInput
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,.2)",
          borderRadius: 5,
        }}
        keyboardType="number-pad"
        maxLength={4}
      />
      <Button
        onPress={handleAuth}
        title={isLoading ? "Please wait" : "Proceed"}
        color={"indigo"}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    padding: 50,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
  },
});
