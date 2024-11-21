import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import {
  AuthScreen,
  AuthScreenModal,
  AuthScreenHeader,
  AuthScreenContent,
  AuthScreenFooter,
} from "@/components/auth/AuthScreen";
import { ThemedButton } from "@/components/buttons/ThemedButton";
import FetchError from "@/components/common/FetchError";
import { Form } from "@/components/Form/Form";
import { ThemedText } from "@/components/ThemedText";
import { View, StyleSheet } from "react-native";
import { updatePassword } from "@/server/auth";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import FetchSuccess from "@/components/common/FetchSuccess";

export default function UpdatePassword() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const { mutate, error, isPending, isSuccess, data } = useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      setTimeout(() => {
        router.replace({
          pathname: "/auth/",
          params: { email },
        });
      }, 3000);
    },
  });

  return (
    <AuthScreen Img={LogoAuthPageSvg}>
      <Form onSubmit={(data) => mutate({ ...data, email })}>
        <AuthScreenModal>
          <AuthScreenHeader title="Set a new password" />
          <AuthScreenContent>
            <View style={{ paddingVertical: 10 }}>
              <ThemedText>Please enter a new password below.</ThemedText>
            </View>
            <View style={styles.formGroup}>
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Password"
                required
              />
              <PasswordInput
                label="Confirm Password"
                name="confirmPw"
                placeholder="Password"
                required
              />
            </View>
            <FetchError error={error} />
            {isSuccess && <FetchSuccess message={data} />}
          </AuthScreenContent>
          <AuthScreenFooter>
            <ThemedButton
              disabled={isPending || isSuccess}
              loading={isPending || isSuccess}
              style={{
                borderRadius: 30,
              }}
              type="outline"
              icon={{ name: "key" }}
            >
              Update password
            </ThemedButton>
          </AuthScreenFooter>
        </AuthScreenModal>
      </Form>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    paddingVertical: 15,
    rowGap: 20,
  },
});
