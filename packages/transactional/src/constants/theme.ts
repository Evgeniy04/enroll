export interface EmailTheme {
  background: string;
  surface: string;

  brand: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  border: string;
  otpBackground: string;
}

/**
 * Значения должны быть синхронизированы с react-native-reusables
 */
export const emailTheme: EmailTheme = {
  background: "#FFFFFF",
  surface: "#FFFFFF",

  brand: "#171717",

  textPrimary: "#0A0A0A",
  textSecondary: "#737373",
  textMuted: "#A3A3A3",

  border: "#E5E5E5",
  otpBackground: "#F5F5F5",
};
