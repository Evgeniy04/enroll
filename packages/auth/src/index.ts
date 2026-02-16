import { expo } from "@better-auth/expo";
import { db } from "@enroll/db";
import * as schema from "@enroll/db/schema/auth";
import { env } from "@enroll/env/server";
import { getOtpEmailHtml } from "@enroll/transactional";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, username } from "better-auth/plugins";
import nodemailer from "nodemailer";

const FORBIDDEN_USERNAMES = [
  "admin",
  "administrator",
  "support",
  "help",
  "root",
  "system",
  "moderator",
  "official",
  "owner",
  "auth",
  "api",
  "dev",
  "test",
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      about: { type: "string" },
    },
  },
  trustedOrigins: [
    env.CORS_ORIGIN,
    "enroll://",
    ...(env.NODE_ENV === "development" ? ["exp://"] : []),
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  disablePaths: ["/is-username-available"],
  plugins: [
    expo(),
    username({
      usernameValidator: (username) => {
        const lowerUsername = username.toLowerCase();
        return (
          !FORBIDDEN_USERNAMES.includes(lowerUsername) &&
          /^[a-z0-9_-]+$/.test(lowerUsername)
        );
      },
      displayUsernameValidator: (displayUsername) => {
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
      },
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          const html = await getOtpEmailHtml(otp);

          transporter.sendMail(
            {
              from: `"Enroll App" <${env.SMTP_FROM}>`,
              to: email,
              subject: "Ваш код подтверждения",
              html: html,
            },
            (err, info) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(info.envelope);
              console.log(info.messageId);
            },
          );
        }
      },
    }),
  ],

  rateLimit: {
    enabled: true,
    customRules: {
      "/email-otp/send-verification-otp": {
        window: 60,
        max: 2,
      },
      "/sign-in/email-otp": {
        window: 60,
        max: 5,
      },
    },
  },
});
