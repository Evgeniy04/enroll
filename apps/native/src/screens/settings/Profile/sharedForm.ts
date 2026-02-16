import { updateUserSchema } from "@enroll/auth/schemas";
import { formOptions } from "@tanstack/react-form";

export const formOpts = formOptions({
  defaultValues: {
    image: "",
    firstName: "",
    lastName: "",
    username: "",
    about: "",
  },
  validators: {
    onChange: updateUserSchema,
  },
});
