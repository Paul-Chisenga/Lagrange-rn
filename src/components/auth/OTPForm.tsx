import { useCallback, useEffect, useState } from "react";
import LogoAuthPageSvg from "../../../assets/svgs/LogoAuthPageSvg";
import {
  AuthScreen,
  AuthScreenContent,
  AuthScreenFooter,
  AuthScreenHeader,
  AuthScreenModal,
} from "./AuthScreen";
import { AppState, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "../buttons/ThemedButton";
import { useMutation } from "@tanstack/react-query";
import { getNewOtp } from "@/server/auth";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import FetchError from "../common/FetchError";
import { Colors } from "@/constants/Colors";
import { AuthResponseData } from "@/lib/types";

interface OTPFormProps {
  authData: AuthResponseData;
  submitting?: boolean;
  submitError?: unknown;
  onSubmit: (code: number) => void;
}

export default function OTPForm({
  authData,
  submitting,
  submitError,
  onSubmit,
}: OTPFormProps) {
  const [otp, setOtp] = useState<number>();
  const [timeRemaining, setTimeRemaining] = useState(0);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [authData.token]);

  const setInitialTime = useCallback(() => {
    const now = new Date().getTime();
    const time = Math.floor((+authData.exp - now) / 1000);
    time > 0 ? setTimeRemaining(time) : setTimeRemaining(0);
  }, [authData.exp]);

  // track app state and reset remaining time when app comes back from background to active state
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        setInitialTime();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [setInitialTime]);
  // reset counter when user requests new code
  useEffect(() => {
    setInitialTime();
  }, [setInitialTime]);

  // Convert seconds to hours, minutes, and seconds
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // new code
  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: getNewOtp,
    onSuccess(data) {
      router.setParams({ ...data });
    },
  });

  const handleSubmit = useCallback(() => {
    if (otp) {
      onSubmit(otp);
    }
  }, [otp]);

  return (
    <AuthScreen Img={LogoAuthPageSvg}>
      <AuthScreenModal>
        <AuthScreenHeader title={"Verify email"}></AuthScreenHeader>
        <AuthScreenContent>
          <View style={{ paddingVertical: 30 }}>
            <ThemedText style={{ fontSize: 18, textAlign: "center" }}>
              We’ve sent you a code
            </ThemedText>
            <ThemedText style={{ textAlign: "center" }}>
              the code was sent to {authData.email}
            </ThemedText>
          </View>
          <View style={{ rowGap: 25 }}>
            <OtpInput
              numberOfDigits={5}
              focusColor={Colors.light.background.default}
              focusStickBlinkingDuration={500}
              onFilled={(text) => {
                if (!isNaN(+text)) {
                  setOtp(+text);
                }
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              // theme={{
              //   containerStyle: styles.container,
              //   pinCodeContainerStyle: styles.pinCodeContainer,
              //   pinCodeTextStyle: styles.pinCodeText,
              //   focusStickStyle: styles.focusStick,
              //   focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              // }}
            />
            <FetchError error={error || submitError} center />
            <ThemedText style={{ textAlign: "center" }}>
              Code will expire in{" "}
              <ThemedText type="defaultSemiBold">{`${minutes}:${seconds}`}</ThemedText>
            </ThemedText>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                flexWrap: "wrap",
                paddingTop: 15,
              }}
            >
              <ThemedText style={{ fontSize: 12 }}>
                Haven’t got the email yet?
              </ThemedText>
              <TouchableOpacity
                disabled={submitting || isPending}
                onPress={() => mutate(authData.token)}
              >
                <ThemedText type="defaultSemiBold">
                  {isPending ? "Sending code..." : "Resend code"}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </AuthScreenContent>
        <AuthScreenFooter>
          <ThemedButton
            button
            onPress={handleSubmit}
            disabled={submitting || isPending}
            loading={submitting}
            style={{
              borderRadius: 30,
            }}
            icon={{ name: "key-outline" }}
            type="outline"
          >
            Verify Code
          </ThemedButton>
        </AuthScreenFooter>
      </AuthScreenModal>
    </AuthScreen>
  );
}
