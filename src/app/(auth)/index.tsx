import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { sleep } from "@/utils/functions";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ModalCard } from "@/components/ModalCard";
import Constants from "expo-constants";
import LoginForm from "@/components/auth/LoginForm";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import { SwipeModal } from "@/components/SwipeModal";
import OTPForm from "@/components/auth/OTPForm";
import { authContext } from "@/context/auth";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useContext(authContext);

  const router = useRouter();

  async function handleLogin() {
    try {
      setLoading(true);
      await sleep(3000);
      setShowOtp(true);
      // router.push("otp");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error("Sign in failed");
    }
  }

  async function handleAuth() {
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
    <ThemedView
      style={styles.container}
      lightColor={Colors.light.background.default}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <LogoAuthPageSvg style={styles.logo} />
        </View>
        {!showOtp && (
          <ModalCard style={styles.modalContainer}>
            <LoginForm
              onSwitchToSignup={() => {
                router.push("/sign-up");
              }}
              onForgotPassword={() => {
                router.push("/reset-password");
              }}
              onSubmit={handleLogin}
              loading={loading}
            />
          </ModalCard>
        )}
        <OTPForm
          onSubmit={handleAuth}
          loading={loading}
          style={{ flex: 0, paddingHorizontal: 30, paddingVertical: 20 }}
          show={showOtp}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingTop: 30 + Constants.statusBarHeight,
  },
  logo: {},

  modalContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
});
