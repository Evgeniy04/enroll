import { expo } from "@better-auth/expo";
import { db } from "@enroll/db";
import * as schema from "@enroll/db/schema/auth";
import { env } from "@enroll/env/server";
import { getOtpEmailHtml } from "@enroll/transactional";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import nodemailer from "nodemailer";

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
  plugins: [
    expo(),
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
