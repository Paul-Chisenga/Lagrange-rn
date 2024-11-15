export type FormData = Record<string, string | boolean | undefined>;
//
export type AuthResponseData = {
  token: string;
  iat: string;
  exp: string;
  email: string;
};
export enum AuthFlow {
  SIGN_UP = "sign-up",
  RESET_PASSWORD = "reset-password",
}
// PAYLOADS
/* auth */
export type LoginPayload = {
  email: string;
  password: string;
};
export type SignUpPayload = LoginPayload & {
  confirmPw: string;
  name: string;
};
export type VerifyOtpPayload = {
  token: string;
  otp: number;
  flow: AuthFlow;
};
export type ResetPasswordPayload = Pick<LoginPayload, "email"> & {};
export type UpdatePasswordPayload = Omit<SignUpPayload, "name"> & {};
