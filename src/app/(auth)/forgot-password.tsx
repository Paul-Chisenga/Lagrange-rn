import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { sleep } from "@/utils/functions";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import { authContext } from "@/context/auth";
import OTPForm from "@/components/auth/OTPForm";
import {
  AuthScreen,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
} from "@/components/auth/AuthScreen";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { AuthScreenButton } from "@/components/auth/AuthScreenButton";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useContext(authContext);

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

  return (
    <AuthScreen Img={LogoAuthPageSvg} onSubmit={handleSubmit}>
      <AuthScreenHeader title="Forgot Password" />
      <AuthScreenContent>
        <View style={styles.formGroup}>
          <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
          <ThemedTextInput
            label="New Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
          <ThemedTextInput
            label="Confirm password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
        </View>
      </AuthScreenContent>
      <AuthScreenFooter>
        <AuthScreenButton
          icon={{ name: "key" }}
          disabled={loading}
          loading={loading}
        >
          Submit
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
});
