import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { sleep } from "@/utils/functions";
import { Colors } from "@/constants/Colors";
import AuthPageSvg from "../../../assets/svgs/AuthPageSvg";
import OTPForm from "@/components/auth/OTPForm";
import { authContext } from "@/context/auth";
import {
  AuthScreen,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
} from "@/components/auth/AuthScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedCheckBox } from "@/components/ThemedCheckBox";
import { AuthScreenButton } from "@/components/auth/AuthScreenButton";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { signIn } = useContext(authContext);

  const router = useRouter();

  async function handleSubmit() {
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

  async function handleSignUp() {
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
    <AuthScreen Img={AuthPageSvg} onSubmit={handleSubmit}>
      <AuthScreenHeader title="Sign Up">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <ThemedText>Already have an account ?</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "red" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </AuthScreenHeader>
      <AuthScreenContent>
        <View style={styles.formGroup}>
          <ThemedTextInput
            label="Full Name"
            placeholder="Type your full name"
            required
          />
          <ThemedTextInput label="ID NO" placeholder="Type ID No" required />
          <ThemedTextInput
            label="Email"
            keyboardType="email-address"
            placeholder="Your email address"
            required
          />
          <ThemedTextInput label="Phone" placeholder="254" required />
          <ThemedTextInput
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
          <ThemedTextInput
            label="Confirm Password"
            placeholder="Password"
            secureTextEntry={true}
            required
          />
        </View>
      </AuthScreenContent>
      <AuthScreenFooter>
        <ThemedCheckBox required>
          I have read and agree to the
          <ThemedText style={{ color: Colors.light.tint.default }}>
            LaGrange Terms of Use
          </ThemedText>
          and
          <ThemedText style={{ color: Colors.light.tint.default }}>
            Privacy policy
          </ThemedText>
        </ThemedCheckBox>
        <AuthScreenButton
          icon={{ name: "person-add" }}
          disabled={loading}
          loading={loading}
        >
          Sign Up
        </AuthScreenButton>
      </AuthScreenFooter>
      <OTPForm
        onSubmit={handleSignUp}
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
