import { StyleSheet, View } from "react-native";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import {
  AuthScreen,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
  AuthScreenModal,
} from "@/components/auth/AuthScreen";
import { ThemedTextInput } from "@/components/inputs/ThemedTextInput";
import { ThemedButton } from "@/components/buttons/ThemedButton";
import { Form } from "@/components/Form/Form";
import { ThemedText } from "@/components/ThemedText";
import FetchError from "@/components/common/FetchError";
import { resetPassword } from "@/server/auth";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { AuthFlow } from "@/lib/types";

export default function ResetPassword() {
  const router = useRouter();

  const { mutate, error, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess(data) {
      router.navigate({
        pathname: "/auth/verify-user",
        params: { ...data, flow: AuthFlow.RESET_PASSWORD },
      });
    },
  });

  return (
    <AuthScreen Img={LogoAuthPageSvg}>
      <Form onSubmit={mutate}>
        <AuthScreenModal>
          <AuthScreenHeader title="Reset Password" />
          <AuthScreenContent>
            <View style={{ paddingVertical: 10 }}>
              <ThemedText>
                Please enter your email address to reset your password
              </ThemedText>
            </View>
            <View style={styles.formGroup}>
              <ThemedTextInput
                label="Email"
                name="email"
                placeholder="Your email address"
                required
                defaultValue="paulsther@gmail.com"
              />
              <FetchError error={error} />
            </View>
          </AuthScreenContent>
          <AuthScreenFooter>
            <ThemedButton
              disabled={isPending}
              loading={isPending}
              style={{
                borderRadius: 30,
              }}
              type="outline"
              icon={{ name: "key" }}
            >
              Reset password
            </ThemedButton>
          </AuthScreenFooter>
        </AuthScreenModal>
      </Form>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  formGroup: { paddingVertical: 10 },
});
