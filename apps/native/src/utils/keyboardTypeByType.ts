import { TextInputProps } from "react-native";

export const keyboardTypeByType: Record<
  "text" | "email" | "password" | "number" | "tel" | "url",
  TextInputProps["keyboardType"]
> = {
  text: "default",
  email: "email-address",
  password: "default",
  number: "numeric",
  tel: "phone-pad",
  url: "url",
};
