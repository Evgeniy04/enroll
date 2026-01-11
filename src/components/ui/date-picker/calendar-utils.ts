export const generateYearOptions = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => {
    const year = end - i;
    return { value: String(year), label: String(year) };
  });

export const generateMonthOptions = (monthLabels: string[]) =>
  monthLabels.map((label, idx) => ({ value: String(idx), label }));