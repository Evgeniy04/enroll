export const generateMonthLabels = (locale: string) =>
  Array.from({ length: 12 }, (_, month) =>
    new Date(2025, 11 - month, 1)
      .toLocaleString(locale, { month: 'long' })
      .replace(/^./, (c) => c.toUpperCase())
  );

export const generateYearOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => {
    const year = end - i;
    return { value: String(year), label: String(year) };
  });

export const generateMonthOptions = (monthLabels: string[]) =>
  monthLabels.map((label, idx) => ({ value: String(idx), label }));