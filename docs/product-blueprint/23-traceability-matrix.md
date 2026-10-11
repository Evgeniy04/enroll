# 23. Матрица трассируемости

Цепочка: **потребность → продуктовая цель → требование → сценарий → страница или компонент → операция и данные → проверка → критерий приёмки.**

## 1. Продуктовые цели

| Цель | Формулировка | Потребности | Метрика ([02](02-product-vision.md) §10) |
|---|---|---|---|
| G-1 | Запись без переписки и звонков | N-01, N-07 | Самостоятельные записи, конверсия записи |
| G-2 | График за минуты (≤ 15 мин до готовой страницы) | N-03 | Время до готовой страницы, активация |
| G-3 | Ноль двойных записей | N-05 | Двойные записи = 0 |
| G-4 | Меньше неявок | N-06 | Доля no-show |
| G-5 | Прозрачный день специалиста | N-02 | W4 retention |
| G-6 | Контроль правил записи | N-04 | — (качественно, интервью) |
| G-7 | Доверие и соответствие закону | N-09 | Инциденты = 0 |
| G-8 | Гибкость для клиента (перенос и отмена) | N-08 | Доля переносов к отменам |
| G-9 | Самопрезентация специалиста | N-10 | Конверсия «профиль → выбор времени» |

## 2. Функциональные требования (MVP)

| Требование | Потребности | Цели | Сценарии | Страницы и компоненты | API | Данные | Тесты | AC |
|---|---|---|---|---|---|---|---|---|
| AUTH-01 | N-07, N-09 | G-1, G-7 | UF-01, UF-06, UF-10 | P-02, P-03 | `/api/auth/email-otp/*`, `/sign-in/email-otp` | user, verification, session | TI-AUTH-1…4, E2E-01 | AC1–AC4 |
| AUTH-02 | N-09 | G-7 | UF-01 | P-29 | `/api/auth/sign-out`, `list-sessions`, `revoke-session` | session | TI-SES-1 | AC1–AC2 |
| AUTH-03 | N-10, N-03 | G-2, G-9 | UF-01 | P-04 | API-S1, API-P9, API-S5, API-S6, API-S8 | specialist_profile, service, day_template, work_day | E2E-01 | AC1–AC3 |
| AUTH-04 | N-09 | G-7 | UF-12 | P-29, P-31 | API-S20, API-M4 | user, specialist_profile, booking | E2E-12, TI-RET-1 | AC1–AC3 |
| PRF-01 | N-10, N-07 | G-1, G-9 | UF-05, UF-06 | P-10, Avatar | API-P1 | specialist_profile, service | E2E-01, Lighthouse CI | AC1–AC3 |
| PRF-02 | N-10 | G-9 | UF-05 | P-28 | API-S2, API-S3 | specialist_profile, slug_history | TI-PRF-1 | AC1–AC2 |
| SVC-01 | N-03, N-10 | G-2 | UF-02 | P-24, NumberStepper | API-S5 | service | E2E-02 | AC1–AC2 |
| SVC-02 | N-03 | G-2 | UF-02 | P-24 | API-S5 (`archive`, `DELETE`) | service | TI-SVC-1 | AC1 |
| TPL-01 | N-03 | G-2 | UF-03 | P-26, P-27 | API-S6 | day_template | E2E-02, E2E-03 | AC1 |
| TPL-02 | N-03, N-05 | G-2, G-3 | UF-03 | P-27, TemplateTimeline, TimeField | API-S6 | template_block | TS-TPL-1, E2E-03 | AC1–AC3 |
| SCH-01 | N-03 | G-2 | UF-04 | P-25, MonthGrid | API-S7, API-S8, API-S9 | work_day, work_day_block | E2E-04 | AC1–AC2 |
| SCH-02 | N-03 | G-2 | UF-04 | P-25, диалог правила | API-S10, API-S11 | work_day, work_day_block | TS-RULE-1, TS-RULE-2, E2E-04 | AC1–AC3 |
| SCH-03 | N-03, N-08 | G-2, G-8 | UF-11 | P-25 | API-S12 | work_day, booking | E2E-11 | AC1 |
| SCH-04 | N-04 | G-6 | UF-04 | P-29, P-25 | API-S4 | specialist_profile | TS-AVL-3 | AC1 |
| SCH-05 | N-04 | G-6 | UF-04, UF-07 | P-29 | API-S4 | specialist_profile | TS-AVL-3, E2E-07 | AC1 |
| AVL-01 | N-05, N-07 | G-1, G-3 | UF-06 | P-11, DayPill, SlotChip | API-P2 | work_day_block, booking, service | TS-AVL-1…4, TP-1 | AC1–AC3 |
| BKG-01 | N-07 | G-1 | UF-06 | P-11, P-12 | API-P3, API-P4, API-P5 | booking, client_contact, consent_record | E2E-05, E2E-13 | AC1–AC4 |
| BKG-02 | N-05 | G-3 | UF-06, UF-08, UF-09 | — | API-P3, API-P5, API-S15, API-S16 | booking (`booking_no_overlap`) | TI-BKG-1, TI-BKG-2, E2E-06, TP-2 | AC1 |
| BKG-03 | N-08 | G-8 | UF-07 | P-13, P-30 | API-P6, API-P7, API-M2 | booking, booking_event | E2E-07 | AC1–AC3 |
| BKG-04 | N-08 | G-8 | UF-07 | P-13, P-30 | API-P8, API-M3 | booking | TI-BKG-3, E2E-07 | AC1 |
| BKG-05 | N-02 | G-5 | UF-08 | P-22 | API-S16, API-S17 | booking, booking_event | E2E-08 | AC1 |
| BKG-06 | N-02 | G-5 | UF-09 | P-21 | API-S15 | booking, client_contact | E2E-09 | AC1 |
| BKG-07 | N-02, N-06 | G-4, G-5 | UF-08 | P-22, StatusBadge | API-S18 | booking | TS-SM-1 | AC1 |
| CAL-01 | N-02 | G-5 | UF-08 | P-21, CalendarWeek, SegmentedControl | API-S13 | booking, work_day | E2E-08 | AC1–AC3 |
| CAL-02 | N-02 | G-5 | UF-08 | P-22, Drawer | API-S14 | booking, booking_event | E2E-08 | AC1 |
| CLI-01 | N-02 | G-5 | UF-09 | P-23 | API-S19 | client_contact | TI-IDOR | AC1 |
| ME-01 | N-08 | G-8 | UF-10 | P-30 | API-M1 | booking | E2E-10 | AC1 |
| NTF-01 | N-06, N-07 | G-1, G-4 | UF-06 | Шаблоны писем | worker `send_booking_email` | notification | TI-NTF-1, E2E-05 | AC1–AC2 |
| NTF-02 | N-06 | G-4 | UF-06 | Шаблон письма | worker `send_reminder` | notification | TI-NTF-2 | AC1 |
| NTF-03 | N-08, N-02 | G-8, G-5 | UF-07, UF-08 | Шаблоны писем | worker | notification | E2E-07, E2E-08 | — |
| NTF-04 | N-06 | G-4 | UF-06 | P-12 | API-P10 | booking | E2E-05 | — |
| SET-01 | N-02 (комфорт ежедневной работы) | G-5 | — | P-28, P-31 | `PATCH` профиля пользователя | user.theme | Визуальная регрессия (2 темы) | — |
| LEG-01 | N-09 | G-7 | UF-06 | P-12, P-40 | API-P3 (`consent`) | consent_record | E2E-05 (проверка записи согласия) | — |
| LEG-02 | N-09 | G-7 | — | P-23 | API-S19 (`anonymize`) | client_contact, dsr_request | TI-RET-1 | — |
| LEG-03 | N-09 | G-7 | — | — | `/api/v1/analytics/events` | analytics_event | TI-LOG-1 | — |

## 3. Нефункциональные требования

| NFR | Цели | Где реализуется | Проверка |
|---|---|---|---|
| NFR-PERF-01, 03 | G-1 | SSR P-10…P-12, бюджеты бандла, CDN ([14](14-architecture.md) §9) | Lighthouse CI, RUM |
| NFR-PERF-02 | G-1, G-5 | API, индексы ([15](15-data-model.md) §3) | TP-1 |
| NFR-A11Y-01 | G-1, G-7 | Компоненты ([09](09-design-specification.md) §6), [08](08-ux-specification.md) §9 | axe в E2E, E2E-13, ручной аудит |
| NFR-REL-01…03 | G-3, G-4 | HA PG, очередь с повторами | Uptime, TR-1, TI-NTF-1 |
| NFR-SEC-01, 02 | G-7 | [17](17-security-and-compliance.md) §2–3 | ZAP, TI-IDOR, TI-AUTH-* |
| NFR-PRIV-01, 02 | G-7 | Хостинг в РФ ([19](19-infrastructure.md)), redaction | Архитектурный контроль, TI-LOG-1 |
| NFR-SCAL-01 | G-5 | [14](14-architecture.md) §11 | TP-1 ×3 |
| NFR-MAINT-01 | — | `packages/domain` | Покрытие в CI |
| NFR-COMP-01, 02 | G-1 | [09](09-design-specification.md) §5, §9 | E2E-14, устройства |
| NFR-OBS-01 | G-7 | [14](14-architecture.md) §10 | Проверка дашбордов перед релизом |
| NFR-I18N-01 | G-1 | ICU-словари | Lint |
| NFR-TIME-01 | G-3 | [15](15-data-model.md), движок окон | TS-AVL-4 |

## 4. Отложенные требования (для полноты)

| Требование | Цель | Зависит от |
|---|---|---|
| BKG-08 | G-5 | BKG-07 |
| BKG-09 | G-1 | AVL-01 |
| CLI-02 | G-5 | Правовая оценка (R-10) |
| NTF-05, NTF-06 | G-4 | H-3, H-6 |
| PAY-01, TEAM-01, REV-01, SYNC-01, DISC-01, PWA-01, IMP-01 | — | Результаты пилота |

## 5. Цепочка бренда

| Звено | Содержание | Документ |
|---|---|---|
| Суть продукта | Личная страница записи для соло-специалиста | [02](02-product-vision.md) |
| Аудитория и позиционирование | S1–S3 и их клиенты; «время, которое подходит обоим» | [03](03-target-audience.md), [10](10-brand-strategy.md) §1–2 |
| Стратегия нейминга | S-A…S-F, перегруженные слова, возможности | [11](11-naming-research.md) §1–2 |
| Кандидаты | Раунд 1 → отклонение «Впору» → раунд 2 с новым стоп-фактором (созвучия) → оценка по 7 критериям | [11](11-naming-research.md) §3–4 |
| Рыночная проверка | Конкуренты и занятые обозначения («Окошко» исключено) | [11](11-naming-research.md) §1, [12](12-naming-legal-review.md) §3 |
| Предварительная правовая оценка | Аккурат — средний риск (кириллица), латиница — повышенный (шрифт Akkurat); Точно — стоп-фактор; Роспатент не проверен | [12](12-naming-legal-review.md) |
| Визуальная концепция | Направления бренда → токены «Аккурат» → экраны | Артборды, [09](09-design-specification.md) |
| Рекомендация к утверждению | «Аккурат» при условиях §7 | [10](10-brand-strategy.md) §7, D-06 |

## 6. Обратная проверка
- Каждая потребность N-01…N-10 покрыта хотя бы одним требованием MVP (N-01 → G-1 → AVL-01, BKG-01, PRF-01).
- Каждый сценарий UF-01…UF-12 ссылается на ≥ 1 требование и ≥ 1 E2E-тест (UF-02/03 → E2E-02/03; UF-05 → E2E-01).
- Каждая страница P-xx ([07](07-information-architecture.md)) используется хотя бы одним требованием (P-01 — лендинг — входная точка UF-01; P-90 — системные состояния, проверяются E2E на 404/410).
