import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { sleep } from "@/utils/functions";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleAuth() {
    try {
      setIsLoading(true);
      await sleep(3000);
      router.replace("otp");
    } catch (error) {
      setIsLoading(false);
      throw new Error("Sign in failed");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button
        onPress={handleAuth}
        title={isLoading ? "Authenticating..." : "Authenticate"}
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
