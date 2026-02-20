import { expo } from "@better-auth/expo";
import { db } from "@enroll/db";
import * as schema from "@enroll/db/schema/auth";
import { env } from "@enroll/env/server";
import { updateUserSchema } from "@enroll/shared";
import { getOtpEmailHtml } from "@enroll/transactional";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, phoneNumber, username } from "better-auth/plugins";
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
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        validator: {
          input: updateUserSchema.shape.firstName,
        },
      },
      lastName: {
        type: "string",
        validator: {
          input: updateUserSchema.shape.lastName,
        },
      },
      about: {
        type: "string",
        validator: {
          input: updateUserSchema.shape.about,
        },
      },
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
      usernameValidator: (username) =>
        updateUserSchema.shape.username.safeParse(username).success,
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
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        console.log(phoneNumber, code);
        // Implement sending OTP code via SMS
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
