import {
  AuthResponseData,
  FormData,
  LoginPayload,
  SignUpPayload,
  UpdatePasswordPayload,
  VerifyOtpPayload,
} from "@/lib/types";
import axios, { AxiosError } from "axios";

export async function signUp(data: SignUpPayload) {
  if (data.password !== data.confirmPw) {
    throw new AxiosError("Passwords do not match", "422");
  }
  const res = await axios.post<AuthResponseData>("auth/sign-up", data);

  return res.data;
}
/** this function will be used for both signup and password reset flows */
export async function verifyOtp(data: VerifyOtpPayload) {
  const res = await axios.post<{ access_token: string }>(
    "auth/verify-user",
    data
  );
  return res.data;
}
export async function getNewOtp(prevToken: string) {
  const res = await axios.get<{ token: string; duration: string }>(
    `auth/new-code?token=${prevToken}`
  );
  return res.data;
}
export async function login(data: LoginPayload) {
  const res = await axios.post<{ access_token: string }>("auth/local", data);
  return res.data;
}
export async function resetPassword(data: FormData) {
  const res = await axios.post<AuthResponseData>("auth/reset-password", data);
  return res.data;
}
export async function updatePassword(data: UpdatePasswordPayload) {
  if (data.password !== data.confirmPw) {
    throw new AxiosError("Passwords do not match", "422");
  }
  const res = await axios.put<string>("auth/update-password", data);
  return res.data;
}
