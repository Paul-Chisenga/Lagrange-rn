import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import { authContext } from "@/context/auth";
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
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Form } from "@/components/Form/Form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/server/auth";
import FetchError from "@/components/common/FetchError";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import useSocialAuth from "@/hooks/useSocialAuth";

export default function SignIn() {
  const { email } = useLocalSearchParams<{ email: string }>();

  const color = useThemeColor({}, "text", "default");
  const { signIn } = useContext(authContext);

  const { handleGoogleAuth } = useSocialAuth();

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      signIn(data.access_token);
    },
  });

  return (
    <AuthScreen Img={LogoAuthPageSvg}>
      <Form onSubmit={mutate}>
        <AuthScreenModal>
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
              <Link href={"/auth/sign-up"} asChild>
                <TouchableOpacity>
                  <Text style={{ color: "red", fontSize: 12 }}>
                    Register Now
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </AuthScreenHeader>
          <AuthScreenContent>
            <View style={styles.formGroup}>
              <ThemedTextInput
                label="Email"
                name="email"
                placeholder="Your email address"
                required
                defaultValue={email}
              />
              <PasswordInput
                label="Password"
                name="password"
                placeholder="Password"
                required
              />
            </View>
            <FetchError error={error} />
            <Link href={"/auth/reset-password"} asChild>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                disabled={isPending}
              >
                <ThemedText style={styles.forgotPassword}>
                  forgot password
                </ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={color}
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            </Link>
          </AuthScreenContent>
          <AuthScreenFooter>
            <AuthScreenActions
              isLogin
              submitting={isPending}
              onUseGoogle={handleGoogleAuth}
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
    paddingHorizontal: 10,
    rowGap: 20,
  },
  forgotPassword: {
    marginLeft: "auto",
    textDecorationLine: "underline",
  },
});
