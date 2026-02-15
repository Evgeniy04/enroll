import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";
import React, { type FC } from "react";
import { emailTheme } from "../constants/theme";
import {
  container,
  fontFamily,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from "../constants/tokens";

interface OtpEmailProps {
  otp: string;
}

const OtpEmail: FC<OtpEmailProps> = ({ otp }) => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      backgroundColor: emailTheme.background,
      fontFamily,
    },

    container: {
      maxWidth: container.width,
      margin: `${spacing.xxl} auto`,
      backgroundColor: emailTheme.surface,
      borderRadius: radius.lg,
      padding: `${spacing.xxl} ${spacing.xl}`,
    },

    brand: {
      textAlign: "center" as const,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.bold,
      letterSpacing: "1px",
      color: emailTheme.brand,
      margin: 0,
    },

    heroTitle: {
      textAlign: "center" as const,
      fontSize: "30px",
      fontWeight: fontWeight.extraBold,
      color: emailTheme.textPrimary,
      margin: `${spacing.md} 0 ${spacing.sm}`,
    },

    heroSubtitle: {
      textAlign: "center" as const,
      fontSize: fontSize.md,
      lineHeight: "24px",
      color: emailTheme.textSecondary,
      margin: 0,
    },

    otpWrap: {
      textAlign: "center" as const,
      margin: `${spacing.xl} 0`,
      padding: `${spacing.lg}`,
      backgroundColor: emailTheme.otpBackground,
      borderRadius: radius.lg,
      border: `1px solid ${emailTheme.border}`,
    },

    otpLabel: {
      fontSize: fontSize.xs,
      textTransform: "uppercase" as const,
      letterSpacing: "2px",
      color: emailTheme.textMuted,
      margin: `0 0 ${spacing.sm}`,
    },

    otp: {
      fontSize: "40px",
      fontWeight: fontWeight.extraBold,
      letterSpacing: "10px",
      color: emailTheme.textPrimary,
      margin: 0,
    },

    info: {
      textAlign: "center" as const,
      fontSize: fontSize.sm,
      lineHeight: "22px",
      color: emailTheme.textSecondary,
      margin: 0,
    },

    footer: {
      textAlign: "center" as const,
      fontSize: fontSize.xs,
      lineHeight: "18px",
      color: emailTheme.textMuted,
      marginTop: spacing.xl,
    },
  };

  return (
    <Html>
      <Head />
      <Preview>{otp} — подтверждение входа</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* BRAND */}
          <Text style={styles.brand}>ВАША КОМПАНИЯ</Text>

          {/* HERO */}
          <Text style={styles.heroTitle}>Это ваш код входа</Text>
          <Text style={styles.heroSubtitle}>
            Введите его в приложении, чтобы продолжить авторизацию.
          </Text>

          {/* OTP */}
          <Section style={styles.otpWrap}>
            <Text style={styles.otpLabel}>Код подтверждения</Text>
            <Text style={styles.otp}>{otp}</Text>
          </Section>

          {/* INFO */}
          <Text style={styles.info}>
            Код действует <b>3 минуты</b>. Сотрудники сервиса никогда не
            спрашивают такие данные.
          </Text>

          {/* FOOTER */}
          <Text style={styles.footer}>
            Не пытались войти? Просто проигнорируйте письмо.
            <br />© 2026 Ваша компания
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const getOtpEmailHtml = async (otp: string) => {
  return await render(React.createElement(OtpEmail, { otp }));
};

export default OtpEmail;
