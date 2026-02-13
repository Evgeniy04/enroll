import { FormMeta } from "@/screens/auth/Otp/Otp.types";
import { formOptions } from "@tanstack/react-form";
import * as z from "zod";

export const createAuthSchema = (requiresOtp: boolean) =>
  z.object({
    email: z.email("Введите действительный адрес электронной почты."),
    otp: requiresOtp
      ? z.string().regex(/^[0-9]{6}$/, "OTP должен состоять из цифр.")
      : z.string(),
  });

const defaultMeta: FormMeta = {
  intent: null,
};

export const formOpts = formOptions({
  defaultValues: {
    email: "",
    otp: "",
  },
  onSubmitMeta: defaultMeta,
});
