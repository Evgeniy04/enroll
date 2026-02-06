#!/usr/bin/env bash

# -- Настройки безопасности --
set -euo pipefail

# -- Цвета для терминала --
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

info() { echo -e "${BLUE}${BOLD}[setup]${NC} $1"; }
warn() { echo -e "${YELLOW}${BOLD}[warn]${NC} $1"; }
err()  { echo -e "${RED}${BOLD}[error]${NC} $1" >&2; exit 1; }

# -- Проверка ОС --
[[ "$(uname -s)" != "Darwin" ]] && err "Этот скрипт предназначен только для macOS."

# -- Проверка зависимостей --
check_tool() {
  command -v "$1" >/dev/null 2>&1 || err "Утилита '$1' не найдена. Установите её перед запуском."
}

check_tool pnpm
check_tool openssl
check_tool docker

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NATIVE_ENV="$ROOT_DIR/apps/native/.env"
SERVER_ENV="$ROOT_DIR/apps/server/.env"

# -- 1. Определение IP через en0 (Wi-Fi/Ethernet) --
info "Определение локального IP..."
IP=$(ipconfig getifaddr en0 || true)

if [[ -z "$IP" ]]; then
  warn "Интерфейс en0 не активен, ищу альтернативный IP..."
  IP=$(ifconfig -l | xargs -n1 ipconfig getifaddr | head -n 1 || true)
fi

[[ -z "$IP" ]] && err "Не удалось получить IP-адрес. Проверьте подключение к сети."
info "Используем IP: ${GREEN}$IP${NC}"

# -- 2. Установка зависимостей и миграции --
info "Установка зависимостей (pnpm install)..."
pnpm install

# -- 3. Настройка apps/native/.env --
info "Настройка Native окружения..."
SERVER_URL="http://$IP:3000"

if [[ ! -f "$NATIVE_ENV" ]]; then
  echo "EXPO_PUBLIC_SERVER_URL=$SERVER_URL" > "$NATIVE_ENV"
else
  # На macOS sed требует пустую строку '' для флага -i
  sed -i '' "s|^EXPO_PUBLIC_SERVER_URL=.*|EXPO_PUBLIC_SERVER_URL=$SERVER_URL|" "$NATIVE_ENV" || \
  echo "EXPO_PUBLIC_SERVER_URL=$SERVER_URL" >> "$NATIVE_ENV"
fi

# -- 4. Настройка apps/server/.env --
info "Настройка Server окружения..."

if [[ ! -f "$SERVER_ENV" ]]; then
  info "Генерация BETTER_AUTH_SECRET через @better-auth/cli..."

  AUTH_SECRET=$(
    pnpm dlx @better-auth/cli@latest secret \
      | grep "^BETTER_AUTH_SECRET=" \
      | cut -d'=' -f2
  )

  if [[ -z "$AUTH_SECRET" ]]; then
    error "Не удалось сгенерировать BETTER_AUTH_SECRET"
    exit 1
  fi

  cat > "$SERVER_ENV" <<EOF
BETTER_AUTH_SECRET=$AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001

DATABASE_URL=postgresql://postgres:password@localhost:5432/enroll
EOF

else
  # Проверка критических переменных в существующем файле
  for VAR in BETTER_AUTH_SECRET BETTER_AUTH_URL CORS_ORIGIN DATABASE_URL; do
    grep -q "^$VAR=" "$SERVER_ENV" || warn "В .env сервера отсутствует переменная $VAR"
  done
fi

# -- 5. Миграции --
info "Подготовка базы данных..."

# Запуск базы данных --
if ! docker info >/dev/null 2>&1; then
  err "Docker запущен? Пожалуйста, запустите Docker Desktop."
fi

info "Запуск Docker-контейнеров..."
pnpm db:start || warn "Контейнеры уже запущены или произошла ошибка при старте."

pnpm db:generate
pnpm db:push

# -- 6. Запуск --
echo -e "\n${GREEN}${BOLD}✅ Настройка завершена успешно!${NC}"
info "Запускаю сервер разработки..."
pnpm dev