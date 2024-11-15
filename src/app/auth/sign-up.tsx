import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import AuthPageSvg from "../../../assets/svgs/AuthPageSvg";
import {
  AuthScreen,
  AuthScreenActions,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
  AuthScreenModal,
} from "@/components/auth/AuthScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/inputs/ThemedTextInput";
import { ThemedCheckBox } from "@/components/inputs/ThemedCheckBox";
import { Form } from "@/components/Form/Form";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/server/auth";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import FetchError from "@/components/common/FetchError";
import { AuthFlow } from "@/lib/types";
import useSocialAuth from "@/hooks/useSocialAuth";

export default function SignUp() {
  const router = useRouter();

  const { handleGoogleAuth } = useSocialAuth();

  const { mutate, error, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      router.navigate({
        pathname: "/auth/verify-user",
        params: { ...data, flow: AuthFlow.SIGN_UP },
      });
    },
  });

  return (
    <AuthScreen Img={AuthPageSvg}>
      <Form onSubmit={mutate}>
        <AuthScreenModal>
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
                <Text style={{ color: "red", fontSize: 12 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </AuthScreenHeader>
          <AuthScreenContent>
            <View style={styles.formGroup}>
              <ThemedTextInput
                label="Full Name"
                name="name"
                placeholder="Type your full name"
                required
                defaultValue="Paul Chisenga"
              />
              {/* <ThemedTextInput label="ID NO" placeholder="Type ID No" required /> */}
              <ThemedTextInput
                label="Email"
                name="email"
                keyboardType="email-address"
                placeholder="Your email address"
                required
                defaultValue="paulsther@gmail.com"
              />
              {/* <ThemedTextInput
              label="Phone"
              name="phone"
              placeholder="254"
              required
            /> */}
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Password"
                required
                defaultValue="1234567890"
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPw"
                placeholder="Password"
                required
                defaultValue="1234567890"
              />
            </View>
            <FetchError error={error} />
          </AuthScreenContent>
          <AuthScreenFooter>
            <ThemedCheckBox name="twc" required>
              I have read and agree to the
              <ThemedText style={{ color: Colors.light.tint.default }}>
                LaGrange Terms of Use
              </ThemedText>
              and
              <ThemedText style={{ color: Colors.light.tint.default }}>
                Privacy policy
              </ThemedText>
            </ThemedCheckBox>
            <AuthScreenActions
              onUseGoogle={handleGoogleAuth}
              submitting={isPending}
            />
          </AuthScreenFooter>
        </AuthScreenModal>
      </Form>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    paddingTop: 30,
    rowGap: 20,
  },
});
