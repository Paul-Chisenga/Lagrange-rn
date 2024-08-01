import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { authContext } from "@/context/auth";
import { sleep } from "@/utils/functions";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ModalCard } from "@/components/ModalCard";
import Constants from "expo-constants";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import OTPForm from "@/components/auth/OTPForm";

export default function Otp() {
  const { signIn } = useContext(authContext);
  const [loading, setLoading] = useState(false);

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
        <ModalCard style={styles.modalContainer}>
          <OTPForm onSubmit={handleAuth} loading={loading} show={true} />
        </ModalCard>
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
