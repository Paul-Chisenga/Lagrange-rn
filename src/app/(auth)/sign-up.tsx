import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { sleep } from "@/utils/functions";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ModalCard } from "@/components/ModalCard";
import Constants from "expo-constants";
import SignUpForm from "@/components/auth/SignUpForm";
import AuthPageSvg from "../../../assets/svgs/AuthPageSvg";
import OTPForm from "@/components/auth/OTPForm";
import { authContext } from "@/context/auth";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useContext(authContext);

  const router = useRouter();

  async function handleSignUp() {
    try {
      setLoading(true);
      await sleep(3000);
      // router.push("otp");
      setLoading(false);
      setShowOtp(true);
    } catch (error) {
      setLoading(false);
      throw new Error("Something went wrong");
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
          <AuthPageSvg style={styles.logo} />
        </View>
        {!showOtp && (
          <ModalCard style={styles.modalContainer}>
            <SignUpForm
              onSwitchToLogin={() => {
                router.back();
              }}
              onSubmit={handleSignUp}
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
    paddingHorizontal: 31,
    flex: 1,
  },
});
