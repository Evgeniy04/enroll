import { expoClient } from "@better-auth/expo/client";
import { env } from "@enroll/env/native";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_SERVER_URL,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: Constants.expoConfig?.scheme as string,
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});

type ErrorTypes = Record<
  keyof typeof authClient.$ERROR_CODES | "UNKNOWN_ERROR",
  { ru: string }
>;

export const errorCodes: ErrorTypes = {
  // --- Аккаунт и вход ---
  USER_NOT_FOUND: {
    ru: "Аккаунт не найден. Проверьте почту или создайте новый профиль",
  },
  INVALID_PASSWORD: {
    ru: "Неверный пароль. Убедитесь, что не нажата клавиша Caps Lock",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    ru: "Неверная почта или пароль. Попробуйте ввести данные ещё раз",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    ru: "Аккаунт с такими данными не найден. Возможно, стоит зарегистрироваться?",
  },
  USER_ALREADY_EXISTS: {
    ru: "Похоже, у вас уже есть аккаунт. Попробуйте просто войти",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    ru: "Эта почта уже занята. Используйте другой адрес или войдите в существующий профиль",
  },

  // --- Безопасность и сессии ---
  SESSION_EXPIRED: {
    ru: "Время входа истекло. Пожалуйста, авторизуйтесь снова",
  },
  SESSION_NOT_FRESH: {
    ru: "Для этого действия нужно заново подтвердить, что это вы",
  },
  TOO_MANY_ATTEMPTS: {
    ru: "Слишком много попыток. Подождите немного и попробуйте снова",
  },
  CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: {
    ru: "Вход ограничен для вашей безопасности. Попробуйте войти напрямую через приложение",
  },
  INVALID_TOKEN: {
    ru: "Срок действия ссылки или токена истек. Запросите новый",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    ru: "Этот способ входа временно не поддерживается в приложении",
  },

  // --- Регистрация и личные данные ---
  FAILED_TO_CREATE_USER: {
    ru: "Не удалось создать аккаунт. Попробуйте повторить попытку через минуту",
  },
  FAILED_TO_UPDATE_USER: {
    ru: "Не получилось обновить данные. Проверьте интернет и попробуйте ещё раз",
  },
  PASSWORD_TOO_SHORT: {
    ru: "Слишком короткий пароль. Добавьте ещё несколько символов для защиты",
  },
  PASSWORD_TOO_LONG: {
    ru: "Пароль слишком длинный. Попробуйте сделать его немного короче",
  },
  USER_ALREADY_HAS_PASSWORD: {
    ru: "У вас уже установлен пароль для этого способа входа",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    ru: "Изменить почту в этом аккаунте нельзя по соображениям безопасности",
  },

  // --- Социальные сети и провайдеры ---
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    ru: "Этот профиль соцсети уже привязан к другой учётной записи",
  },
  PROVIDER_NOT_FOUND: { ru: "Выбранный способ входа временно недоступен" },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    ru: "Это ваш единственный способ входа, его нельзя удалить",
  },
  ACCOUNT_NOT_FOUND: { ru: "Мы не нашли информацию о вашей учётной записи" },
  LINKED_ACCOUNT_ALREADY_EXISTS: {
    ru: "Этот аккаунт уже привязан к вашему профилю",
  },

  // --- Подтверждение (Email/OTP) ---
  EMAIL_NOT_VERIFIED: {
    ru: "Пожалуйста, подтвердите вашу почту, чтобы пользоваться всеми функциями",
  },
  USER_EMAIL_NOT_FOUND: {
    ru: "Почта в вашем профиле не найдена. Попробуйте войти другим способом",
  },
  VERIFICATION_EMAIL_NOT_ENABLED: {
    ru: "Служба подтверждения сейчас недоступна. Мы уже чиним её",
  },
  EMAIL_ALREADY_VERIFIED: {
    ru: "Ваша почта уже была успешно подтверждена ранее",
  },
  EMAIL_MISMATCH: {
    ru: "Введенная почта не совпадает с той, что указана в настройках",
  },
  FAILED_TO_GET_USER_INFO: {
    ru: "Не удалось загрузить данные профиля. Обновите экран",
  },
  OTP_EXPIRED: {
    ru: "Время действия кода истекло. Пожалуйста, запросите новый",
  },
  INVALID_OTP: { ru: "Неверный код. Проверьте цифры из сообщения еще раз" },

  // --- Валидация и технические ошибки ---
  VALIDATION_ERROR: {
    ru: "Пожалуйста, проверьте, правильно ли заполнены все поля",
  },
  MISSING_FIELD: { ru: "Заполните это поле — оно обязательно для продолжения" },
  FIELD_NOT_ALLOWED: { ru: "Это поле защищено, его нельзя изменить вручную" },
  ASYNC_VALIDATION_NOT_SUPPORTED: {
    ru: "Ошибка проверки данных. Пожалуйста, повторите позже",
  },
  INVALID_EMAIL: { ru: "Проверьте формат почты. Например: name@example.ru" },
  FAILED_TO_CREATE_SESSION: {
    ru: "Ошибка авторизации. Попробуйте войти еще раз",
  },
  FAILED_TO_GET_SESSION: {
    ru: "Не удалось подтвердить вход. Перезапустите приложение",
  },
  FAILED_TO_CREATE_VERIFICATION: {
    ru: "Не удалось создать запрос на проверку. Попробуйте снова",
  },

  // --- URL и источники (внутренние ошибки) ---
  INVALID_ORIGIN: {
    ru: "Запрос пришел из ненадежного источника. Доступ отклонен",
  },
  INVALID_CALLBACK_URL: {
    ru: "Ошибка возврата в приложение. Попробуйте снова",
  },
  INVALID_REDIRECT_URL: {
    ru: "Ошибка перехода. Пожалуйста, вернитесь на главный экран",
  },
  INVALID_ERROR_CALLBACK_URL: {
    ru: "Не удалось обработать ошибку. Попробуйте перезагрузить страницу",
  },
  INVALID_NEW_USER_CALLBACK_URL: {
    ru: "Ошибка при создании профиля. Пожалуйста, повторите регистрацию",
  },
  MISSING_OR_NULL_ORIGIN: {
    ru: "Не удалось определить источник запроса. Повторите попытку",
  },
  CALLBACK_URL_REQUIRED: { ru: "Отсутствует путь для возврата в приложение" },

  // --- Резерв ---
  UNKNOWN_ERROR: {
    ru: "Что-то пошло не так. Проверьте интернет или попробуйте ещё раз",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "ru" = "ru") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return errorCodes.UNKNOWN_ERROR[lang];
};
