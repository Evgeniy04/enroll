#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

ENV_FILE="$ROOT_DIR/apps/server/.env"

AUTH_FILE="$ROOT_DIR/packages/auth/src/index.ts"
DB_SCHEMA="$ROOT_DIR/packages/db/prisma/schema/auth.prisma"

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

# 3. Подготовка целевой директории
mkdir -p "$(dirname "$DB_SCHEMA")"

# 4. Копируем ТОЛЬКО модели (без generator / datasource)
echo "▶ Обновление моделей в схеме базы данных..."

# 5. Создаём временный файл
TMP_FILE="$(mktemp)"

awk '
  BEGIN { skip = 0 }
  /^generator / { skip = 1 }
  /^datasource / { skip = 1 }
  /^\}/ { if (skip) { skip = 0; next } }
  !skip { print }
' "$DB_SCHEMA" > "$TMP_FILE"

# 6. Убираем пустые строки в начале файла
sed -i '' -e '/./,$!d' $TMP_FILE 2>/dev/null || true

# 7. Перезаписываем исходный файл
mv "$TMP_FILE" "$DB_SCHEMA"

echo "✅ Схема базы данных обновлена: $DB_SCHEMA"