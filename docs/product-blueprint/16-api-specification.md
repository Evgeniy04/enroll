# 16. API-спецификация

**Стиль:** процедуры **oRPC** (D-09). Каждая процедура объявляется один раз со схемами Zod и метаданными маршрута (метод и путь ниже) и доступна двумя способами:
- **RPC** (`/api/rpc/*`) — для собственного фронтенда (TanStack Query) и Server Components (серверный клиент без HTTP); внутренний контракт;
- **REST/OpenAPI** (`/api/v1/*`) — только staging (документация, контрактные тесты). Мобильного приложения не будет; виджет, если появится, — iframe страницы записи. Публичный внешний API в production не открывается (D-09, D-35).

Пути в таблицах ниже — REST-представление процедур; для внутренних процедур они служат документацией и тестами.
Аутентификация — `/api/auth/*` (Better Auth, D-13).
- **Контракт:** Zod-схемы в `packages/contracts` — единственный источник истины; из них генерируется OpenAPI 3.1 (публикуется на `/api/v1/openapi.json` в staging).
- **Совместимость и версионирование:** добавление полей и эндпоинтов обратно совместимо. Удаление или переименование — только в `/api/v2`, старая версия поддерживается ≥ 6 месяцев после объявления (заголовок `Deprecation`).

## 1. Общие правила

| Правило | Значение |
|---|---|
| Формат | `Content-Type: application/json; charset=utf-8`. Не-JSON для небезопасных методов → 415 |
| Время | ISO 8601 с зоной (`2026-10-15T14:30:00+03:00`) на выходе; на входе — с зоной или `Z` |
| Даты дня | `YYYY-MM-DD` в часовом поясе специалиста |
| Идентификаторы | uuid |
| Идемпотентность | Заголовок `Idempotency-Key` (uuid) для `POST` создания записи и hold; хранится 24 ч |
| Конкурентность | `If-Match: "<version>"` для изменения записей и рабочих дней → 412 / 409 `version_conflict` |
| Пагинация | Курсорная: `?limit=50&cursor=…` → `{ items, nextCursor }`; limit ≤ 100 |
| Фильтры и сортировка | Явные параметры у каждой операции (ниже); сортировка `?sort=starts_at` / `-starts_at` |
| Rate limit | Заголовки `RateLimit-Limit`, `RateLimit-Remaining`, `Retry-After` при 429 |
| Авторизация | Сессионная cookie; токен записи — в пути `/public/bookings/by-token/{token}` |
| Трассировка | `X-Request-Id` в ответе |

## 2. Аутентификация (Better Auth, `/api/auth`)

| Операция | Метод и путь | Вход | Выход |
|---|---|---|---|
| Запросить код | `POST /api/auth/email-otp/send-verification-otp` | `{ email, type: "sign-in" }` | 200 (одинаково для любых email) |
| Войти по коду | `POST /api/auth/sign-in/email-otp` | `{ email, otp }` | 200 + `Set-Cookie`, `{ user }` |
| Сессия | `GET /api/auth/get-session` | — | `{ user, session } \| null` |
| Выйти | `POST /api/auth/sign-out` | — | 200 |
| Сессии | `GET /api/auth/list-sessions`, `POST /api/auth/revoke-session` | — / `{ token }` | — |

Лимиты: отправка — 2/60 с и 10/ч на email и IP; вход — 5/60 с.

## 3. Ошибки

`application/problem+json`:

```json
{
  "type": "https://akkurat.ru/errors/slot_taken",
  "title": "Это время уже занято",
  "status": 409,
  "code": "slot_taken",
  "detail": "Выберите другое время",
  "requestId": "01J…",
  "errors": [{ "path": "start", "code": "slot_taken" }],
  "alternatives": [{ "start": "2026-10-15T16:00:00+03:00" }]
}
```

| HTTP | `code` | Когда |
|---|---|---|
| 400 | `validation_failed` | Zod-ошибки (`errors[]` с путями) |
| 400 | `otp_invalid`, `otp_expired`, `otp_attempts_exceeded` | Код |
| 401 | `unauthenticated` | Нет сессии |
| 403 | `forbidden` | Есть сессия, нет роли (например, не специалист) |
| 404 | `not_found` | Нет ресурса **или** чужой ресурс |
| 409 | `slot_taken`, `outside_horizon`, `too_late`, `booking_disabled`, `invalid_transition`, `version_conflict`, `slug_taken`, `template_overlap`, `service_in_use`, `hold_expired` | Конфликты домена |
| 410 | `gone` | Удалённый профиль |
| 412 | `precondition_failed` | Неверный `If-Match` |
| 413 | `payload_too_large` | Аватар |
| 415 | `unsupported_media_type` | — |
| 422 | `rule_preview_stale` | Предпросмотр правила устарел |
| 429 | `rate_limited`, `too_many_active_bookings` | Лимиты |
| 500 | `internal` | — |

## 4. Публичные операции (без аутентификации или с сессией клиента)

| ID | Операция | Метод и путь | Вход (схема) | Выход | Требования |
|---|---|---|---|---|---|
| API-P1 | Профиль специалиста | `GET /public/specialists/{slug}` | — | `PublicProfile { slug, displayName, profession, about, address, addressNote, phonePublic?, avatarUrl, timezone, bookingEnabled, services: PublicService[], nextSlot? }` | PRF-01 |
| API-P2 | Окна | `GET /public/specialists/{slug}/availability?serviceId=&from=YYYY-MM-DD&to=YYYY-MM-DD` (≤ 31 день) | `AvailabilityQuery` | `{ timezone, days: [{ date, isWorkday, slots: [{ start, end }] }] }` | AVL-01 |
| API-P3 | Создать hold (гость) | `POST /public/specialists/{slug}/holds` | `CreateHold { serviceId, start, client: { name, email, phone? }, comment?, consent: { documentVersion, accepted: true } }` + `Idempotency-Key` | 201 `{ holdId, expiresAt }`; письмо с кодом | BKG-01, LEG-01 |
| API-P4 | Подтвердить hold | `POST /public/holds/{holdId}/confirm` | `{ email, otp }` | 200 `{ booking: PublicBooking, manageUrl }` + клиентская сессия | BKG-01 |
| API-P5 | Создать запись (клиент с сессией) | `POST /public/specialists/{slug}/bookings` | `CreateHold` без email (из сессии) | 201 `{ booking, manageUrl }` | BKG-01 |
| API-P6 | Запись по токену | `GET /public/bookings/by-token/{token}` | — | `PublicBooking { id, status, specialist{slug, displayName, address}, service{name, durationMin, price?}, start, end, canChange, changeDeadline }` | BKG-03 |
| API-P7 | Отменить по токену | `POST /public/bookings/by-token/{token}/cancel` | `{ reason? }` | 200 `PublicBooking` | BKG-03 |
| API-P8 | Перенести по токену | `POST /public/bookings/by-token/{token}/reschedule` | `{ start }` + `Idempotency-Key` | 200 `{ booking: PublicBooking (новая), manageUrl }` | BKG-04 |
| API-P9 | Проверка slug | `GET /public/slugs/{slug}/availability` | — | `{ available, suggestions[] }` (только для аутентифицированных, rate limit) | AUTH-03 |
| API-P10 | Календарный файл | `GET /public/bookings/by-token/{token}/ics` | — | `text/calendar` | NTF-04 |

**Схемы валидации (выдержка):**
```ts
const Slug = z.string().regex(/^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])$/).refine(notReserved)
const ClientContact = z.object({
  name: z.string().trim().min(1).max(60),
  email: z.email().max(256),
  phone: z.string().regex(/^\+7\d{10}$/).optional(),   // E.164 RU в MVP
})
const CreateHold = z.object({
  serviceId: z.uuid(),
  start: z.iso.datetime({ offset: true }),
  client: ClientContact,
  comment: z.string().trim().max(300).optional(),
  consent: z.object({ documentVersion: z.string(), accepted: z.literal(true) }),
})
```

## 5. Клиентский кабинет (сессия)

| ID | Операция | Метод и путь | Выход | Требования |
|---|---|---|---|---|
| API-M1 | Мои записи | `GET /me/bookings?scope=upcoming\|past&cursor=` | `Page<PublicBooking>` | ME-01 |
| API-M2 | Отменить | `POST /me/bookings/{id}/cancel` | `PublicBooking` | BKG-03 |
| API-M3 | Перенести | `POST /me/bookings/{id}/reschedule` | `{ booking }` | BKG-04 |
| API-M4 | Удалить аккаунт | `DELETE /me` (с подтверждением кодом `{ otp }`) | 204 | AUTH-04 |

## 6. Кабинет специалиста (сессия + профиль; `403 forbidden` без профиля)

| ID | Операция | Метод и путь | Вход | Выход | Требования |
|---|---|---|---|---|---|
| API-S1 | Создать профиль (онбординг) | `POST /specialist/profile` | `{ slug, displayName, profession?, timezone }` | 201 `Profile` | AUTH-03 |
| API-S2 | Получить и изменить профиль | `GET`, `PATCH /specialist/profile` | частичный `Profile` | `Profile` | PRF-02 |
| API-S3 | Аватар | `PUT /specialist/profile/avatar` (`multipart/form-data`, ≤ 10 МБ) | файл | `{ avatarUrl }` | PRF-02 |
| API-S4 | Правила записи | `PATCH /specialist/booking-policy` | `{ horizon: {mode, days?, until?}, minNoticeMin, cancelCutoffMin, remindersEnabled }` | `Policy` | SCH-04, SCH-05 |
| API-S5 | Услуги | `GET /specialist/services?includeArchived=`; `POST`; `PATCH /{id}`; `POST /{id}/archive`; `DELETE /{id}` (409 `service_in_use`); `PUT /specialist/services/order` `{ ids[] }` | `ServiceInput { name, description?, durationMin, bufferAfterMin, priceKopecks?, priceIsFrom?, isVisible }` | `Service` | SVC-01, SVC-02 |
| API-S6 | Шаблоны | `GET /specialist/templates`; `POST`; `PUT /{id}` (шаблон целиком с блоками); `DELETE /{id}?daysPolicy=keep\|clear`; `POST /{id}/duplicate` | `TemplateInput { name, colorKey, code, blocks: [{ serviceId, startMin, count }] }` | `Template { …, summary: { startMin, endMin, slots, totalMin } }`; 409 `template_overlap` | TPL-01, TPL-02 |
| API-S7 | Месяц расписания | `GET /specialist/schedule?month=YYYY-MM` | — | `{ days: [{ date, workDay?: { id, sourceTemplateId, isModified, blocks, version }, bookingsCount }] }` | SCH-01 |
| API-S8 | Назначить шаблон на даты (кисть) | `POST /specialist/schedule/assign` | `{ dates: string[] (≤ 62), templateId \| null }` | `{ changed: n, conflicts: [{ date, droppedSlots }] }` | SCH-01, SCH-03 |
| API-S9 | Правка дня | `PUT /specialist/schedule/days/{date}` + `If-Match` | `{ blocks[] }` | `WorkDay` | SCH-01 |
| API-S10 | Предпросмотр правила | `POST /specialist/schedule/rules/preview` | `Rule { type: period\|weekdays\|shifts, from, to, templateId, weekdays?: (1..7)[], shift?: { work, off, anchor }, mode: fillEmpty\|overwrite }` | `{ previewHash, dates: [{date, action}], summary: { days, slots, daysWithBookings } }` | SCH-02 |
| API-S11 | Применить правило | `POST /specialist/schedule/rules/apply` | `Rule + previewHash` | `{ changed }`; 422 `rule_preview_stale` | SCH-02 |
| API-S12 | Выходные на диапазон | `POST /specialist/schedule/clear` | `{ from, to, bookings: keep\|cancel, reason? }` | `{ clearedDays, cancelledBookings }` | SCH-03 |
| API-S13 | Записи (календарь) | `GET /specialist/bookings?from=&to=&status=` (≤ 62 дня) | — | `{ items: Booking[] }` | CAL-01 |
| API-S14 | Запись | `GET /specialist/bookings/{id}` | — | `Booking` + `events[]` | CAL-02 |
| API-S15 | Ручная запись | `POST /specialist/bookings` + `Idempotency-Key` | `{ serviceId, start, clientContactId? \| client{name, phone?, email?}, notifyClient }` | 201 `Booking` | BKG-06 |
| API-S16 | Перенос | `POST /specialist/bookings/{id}/reschedule` + `If-Match` | `{ start, notifyClient }` | `Booking` | BKG-05 |
| API-S17 | Отмена | `POST /specialist/bookings/{id}/cancel` + `If-Match` | `{ reason }` | `Booking` | BKG-05 |
| API-S18 | Неявка | `POST /specialist/bookings/{id}/no-show` | — | `Booking` | BKG-07 |
| API-S19 | Клиенты | `GET /specialist/clients?q=&cursor=`; `GET /{id}`; `PATCH /{id}` `{ name, phone }`; `POST /{id}/anonymize` | — | `Page<Client>` / `Client { …, stats, upcoming[], past[] }` | CLI-01, LEG-02 |
| API-S20 | Удалить аккаунт специалиста | `DELETE /specialist` `{ otp, bookings: cancel }` | — | 204 | AUTH-04 |

`Booking` (для специалиста) = `PublicBooking` + `client { id, name, email?, phone? }`, `source`, `comment`, `cancelReason`, `version`.

## 7. Служебные

| Путь | Назначение | Доступ |
|---|---|---|
| `GET /healthz` | Liveness | Публично (без деталей) |
| `GET /readyz` | БД и очередь | Внутренняя сеть |
| `POST /api/v1/analytics/events` | События продукта `{ name, props }` (allowlist имён) | Публично, rate limit, без ПД |

## 8. Чего нет намеренно
- Нет эндпоинта поиска специалистов (DISC-01 — Future).
- Нет массового экспорта клиентов в MVP (IMP-01 и риски ПД).
- Нет API-ключей для третьих лиц (Next, после стабилизации контракта).
