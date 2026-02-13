#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="./apps/server/.env"

AUTH_FILE="./packages/auth/src/index.ts"
DB_SCHEMA="./packages/db/src/schema/auth.ts"

echo "▶ Используется файл окружения: $ENV_FILE"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Файл .env не найден по пути $ENV_FILE"
  exit 1
fi

# 1. Экспортируем переменные из .env
set -a
source "$ENV_FILE"
set +a

# 2. Генерация схемы better-auth
echo "▶ Выполняется генерация better-auth..."
pnpm dlx @better-auth/cli@latest generate --output $DB_SCHEMA --config $AUTH_FILE
