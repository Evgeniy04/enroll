export type AuthStatus = "idle" | "otpRequested" | "verifying" | "verified";

export type SubmitIntent = "requestOtp" | "resendOtp" | "verifyOtp";

export type FormMeta = {
  intent: SubmitIntent | null;
};
