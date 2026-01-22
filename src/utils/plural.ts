/**
 * Возвращает правильную форму слова для указанного числа
 * и языка. Цифра не включается, возвращается только слово.
 *
 * @param count Количество единиц
 * @param forms Массив из 3 форм слова: [единственное, двойное, множественное]
 *              Например для русского: ["день", "дня", "дней"]
 * @param locale Язык в формате BCP-47, по умолчанию 'ru-RU'
 * @returns Строка с правильной формой слова, например: "день", "дня", "дней"
 */
export function getPluralWord(count: number, forms: [string, string, string]): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return forms[2];
  if (lastDigit === 1) return forms[0];
  if (lastDigit >= 2 && lastDigit <= 4) return forms[1];
  return forms[2];
}