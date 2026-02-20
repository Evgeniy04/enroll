import { FormMeta } from "@/screens/auth/Otp/Otp.types";
import { createUserSchema } from "@enroll/shared";
import { formOptions } from "@tanstack/react-form";

const defaultMeta: FormMeta = {
  intent: null,
};

export const formOpts = formOptions({
  defaultValues: {
    email: "",
    otp: "",
  },
  validators: {
    onSubmit: createUserSchema,
  },
  onSubmitMeta: defaultMeta,
});
