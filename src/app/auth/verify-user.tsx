import OTPForm from "@/components/auth/OTPForm";
import { authContext } from "@/context/auth";
import { AuthFlow, AuthResponseData } from "@/lib/types";
import { verifyOtp } from "@/server/auth";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";

export default function VerifyUser() {
  const params = useLocalSearchParams<AuthResponseData & { flow: AuthFlow }>();

  const router = useRouter();

  const { signIn } = useContext(authContext);

  const { mutate, error, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess(data) {
      if (params.flow === AuthFlow.SIGN_UP) {
        signIn(data.access_token);
      } else if (params.flow === AuthFlow.RESET_PASSWORD) {
        router.navigate({
          pathname: "/auth/update-password",
          params: { ...data },
        });
      } else {
        throw new Error("Unauthorized operation");
      }
    },
  });

  return (
    <OTPForm
      authData={params}
      onSubmit={(otp) =>
        mutate({ token: params.token, otp, flow: params.flow })
      }
      submitting={isPending}
      submitError={error}
    />
  );
}
