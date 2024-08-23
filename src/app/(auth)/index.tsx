import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { sleep } from "@/utils/functions";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import { authContext } from "@/context/auth";
import {
  AuthScreen,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
} from "@/components/auth/AuthScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import OTPForm from "@/components/auth/OTPForm";
import { AuthScreenButton } from "@/components/auth/AuthScreenButton";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useContext(authContext);

  const router = useRouter();

  async function handleSubmit() {
    try {
      setLoading(true);
      await sleep(3000);
      setLoading(false);
      setShowOtp(true);
    } catch (error) {
      setLoading(false);
      throw new Error("Something went wrong");
    }
  }

  async function handleLogin() {
    try {
      setLoading(true);
      await sleep(3000);
      await signIn("session-token");
    } catch (error) {
      setLoading(false);
      throw new Error("Something went wrong");
    }
  }

  function handleForgotPassword() {
    router.push("/forgot-password");
  }

  return (
    <AuthScreen Img={LogoAuthPageSvg} onSubmit={handleSubmit}>
      <AuthScreenHeader title="Welcome">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <ThemedText>Don't have an account yet ? </ThemedText>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={{ color: "red" }}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </AuthScreenHeader>
      <AuthScreenContent>
        <View style={styles.formGroup}>
          <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
          <ThemedTextInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
          <TouchableOpacity disabled={loading} onPress={handleForgotPassword}>
            <ThemedText style={styles.forgotPassword} type="defaultSemiBold">
              Forgot password
            </ThemedText>
          </TouchableOpacity>
        </View>
      </AuthScreenContent>
      <AuthScreenFooter>
        <AuthScreenButton
          icon={{ name: "log-in" }}
          disabled={loading}
          loading={loading}
        >
          Login
        </AuthScreenButton>
      </AuthScreenFooter>
      <OTPForm
        onSubmit={handleLogin}
        loading={loading}
        style={{ flex: 0, paddingHorizontal: 30, paddingVertical: 20 }}
        show={showOtp}
        onCancel={() => setShowOtp(false)}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    paddingVertical: 30,
    rowGap: 20,
  },
  forgotPassword: {
    marginLeft: "auto",
  },
});
