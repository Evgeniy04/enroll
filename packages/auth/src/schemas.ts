import * as z from "zod";
import { FORBIDDEN_USERNAMES, USERNAME_REGEX } from "./constants";

export const createUserSchema = z.object({
  email: z
    .email("Введите действительный адрес электронной почты.")
    .max(256, "Адрес электронной почты не может быть длиннее 256 символов."),

  otp: z
    .string()
    .regex(/^[0-9]{6}$/, "OTP должен состоять только из цифр.")
    .or(z.literal("")),
});

export const updateUserSchema = z.object({
  image: z.url().max(2048).or(z.literal("")),

  firstName: z
    .string()
    .trim()
    .min(1, "Пожалуйста, введите ваше имя.")
    .max(50, "Имя слишком длинное (макс. 50 символов)."),

  lastName: z
    .string()
    .trim()
    .max(50, "Фамилия слишком длинная (макс. 50 символов).")
    .or(z.literal("")),

  username: z
    .string()
    .trim()
    .min(3, "Минимум 3 символа.")
    .max(30, "Максимум 30 символов.")
    .toLowerCase()
    .regex(USERNAME_REGEX, "Только латинские буквы, цифры, знаки «-» и «_».")
    .refine((val) => !FORBIDDEN_USERNAMES.includes(val), "Это имя занято.")
    .or(z.literal("")),

  about: z
    .string()
    .trim()
    .max(500, "Описание слишком большое (макс. 500 символов).")
    .or(z.literal("")),
});
