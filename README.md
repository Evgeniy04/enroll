# Enroll

Современный фулстек-проект на базе монорепозитория [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack). Единая кодовая база для Frontend и Backend с фокусом на типобезопасность и скорость разработки.

---

## 🚀 Быстрый старт (macOS)

Для первого запуска проекта достаточно выполнить одну команду в корне репозитория:

```bash
pnpm setup
```

Команда `pnpm setup` автоматически:

1. Определит ваш локальный IP-адрес для работы Expo
2. Создаст `.env` файл в `apps/native`:
   - Определит локальный IP (через `ifconfig`, интерфейс `en0`)
   - Запишет `EXPO_PUBLIC_SERVER_URL=http://<LOCAL_IP>:3000`
3. Создаст `.env` файл в `apps/server`:
   - Сгенерирует `BETTER_AUTH_SECRET`
   - Пропишет `BETTER_AUTH_URL`, `CORS_ORIGIN` и `DATABASE_URL`
4. Установит зависимости (`pnpm install`)
5. Проверит и при необходимости поднимет Docker-контейнер с базой данных (`pnpm db:start`)
6. Сгенерирует Prisma-клиент (`pnpm db:generate`)
7. Применит схему базы данных (`pnpm db:push`)
8. Запустит проект в dev-режиме (`pnpm dev`)

---

## 🛠 Технологический стек

- **[TypeScript](https://www.typescriptlang.org/)** — строгая типизация и улучшенный DX
- **[React Native](https://reactnative.dev/)** — разработка мобильных приложений
- **[Expo](https://expo.dev/)** — инструменты и инфраструктура для React Native
- **[TailwindCSS](https://tailwindcss.com/)** — utility‑first стилизация
- **[shadcn/ui](https://ui.shadcn.com/)** — переиспользуемые UI‑компоненты
- **[Hono](https://hono.dev/)** — лёгкий и быстрый backend‑фреймворк
- **[Node.js](https://nodejs.org/)** — среда выполнения
- **[pnpm](https://pnpm.io/)** — менеджер пакетов
- **[Prisma](https://www.prisma.io/)** — ORM с TypeScript‑first подходом
- **[PostgreSQL](https://www.postgresql.org/)** — база данных
- **[Better‑Auth](https://www.better-auth.com/)** — аутентификация
- **[Turborepo](https://turborepo.dev/)** — оптимизированная сборка монорепозитория

---

## 👌 Ручная настройка (если требуется)

Перед первым запуском проекта необходимо выполнить все шаги ниже по порядку.

### 1. Настройка `apps/native/.env`

1. Создайте файл `.env` в директории `apps/native`
2. Выполните команду:

```bash
ifconfig
```

3. Найдите сетевой интерфейс `en0` и скопируйте значение `inet`
4. Запишите в `.env`, **подставив IP вместо `<ip>`**:

```env
EXPO_PUBLIC_SERVER_URL=http://<ip>:3000
```

Пример:

```env
EXPO_PUBLIC_SERVER_URL=http://192.168.1.42:3000
```

### 2. Настройка `apps/server/.env`

1. Создайте файл `.env` в директории `apps/server`
2. Сгенерируйте секретный ключ:

```bash
openssl rand -base64 32
```

3. Скопируйте сгенерированное значение
4. Заполните `.env` следующим образом:

```env
BETTER_AUTH_SECRET=СГЕНЕРИРОВАННЫЙ_КЛЮЧ
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001

DATABASE_URL=postgresql://postgres:password@localhost:5432/enroll
```

Пример:

```env
BETTER_AUTH_SECRET=7o9TkGbyXq2CSbkHK7aETeWbxOchUt0w
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001

DATABASE_URL=postgresql://postgres:password@localhost:5432/enroll

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=no-reply@yourapp.com
```

### 3. Установка зависимостей

В корне проекта выполните:

```bash
pnpm install
```

### 4. База данных (Docker)

Если Docker-контейнер с базой данных **не запущен**, поднимите его:

```bash
pnpm db:start
```

### 5. Генерация Prisma‑клиента

```bash
pnpm db:generate
```

### 6. Применение схемы БД

```bash
pnpm db:push
```

### 7. Запуск проекта

```bash
pnpm dev
```

---

## 📂 Структура проекта

```
enroll/
├── apps/
│   ├── native/      # Мобильное приложение (Expo)
│   └── server/      # Backend API (Hono)
├── packages/
│   ├── api/         # API слой / бизнес логика
│   ├── auth/        # Конфигурация аутентификации & логика
│   └── db/          # Схема базы данных & запросы
└── scripts/         # Вспомогательные скрипты автоматизации
```

---

## 📱 Особенности мобильной разработки

Для того чтобы приложение Expo Go могло соединиться с сервером на вашем компьютере:

- Скрипт автоматизации записывает ваш локальный IP (например, 192.168.1.5) в apps/native/.env.
- Убедитесь, что ваш телефон и компьютер находятся в одной Wi-Fi сети.
- Сервер API будет доступен по адресу http://<ваш-ip>:3000.

---

## ⌨️ Основные команды

- `pnpm dev`: Запуск всех приложений в режиме разработки
- `pnpm build`: Сборка всех приложений
- `pnpm dev:native`: Запуск Expo сервера разработки
- `pnpm dev:server`: Запуск только Backend сервера
- `pnpm check-types`: Проверка типов TypeScript во всем проекте
- `pnpm db:push`: Отправляет изменения схемы в базу данных
- `pnpm db:studio`: Открытие панели БД (UI)
- `bash scripts/generate-auth-prisma.sh`: Создает схему, необходимую для Better Auth

---

## 🔗 Доступные сервисы

После запуска:

- Backend API: http://localhost:3000
- Web‑приложение: http://localhost:3001
- Mobile‑приложение: через Expo Go

---

## ⚠️ Примечания

- Проект рассчитан на использование pnpm
- Перед запуском mobile‑приложения убедитесь, что IP в `EXPO_PUBLIC_SERVER_URL` актуален
- Изменения схемы БД всегда сопровождайте `db:generate` и `db:push`
