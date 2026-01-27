import dayjs from "dayjs";
import "dayjs/locale/ru";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isTodayPlugin from "dayjs/plugin/isToday";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import { LocaleConfig } from "react-native-calendars";

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isTodayPlugin);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);

dayjs.updateLocale("ru", {
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
});
dayjs.locale("ru");

/**
 * Конфигурация локали для календарей
 * Использует dayjs как источник данных
 */
export const configureCalendarLocale = () => {
  LocaleConfig.locales.ru = {
    monthNames: dayjs.months(),
    monthNamesShort: dayjs.monthsShort(),
    dayNames: dayjs.weekdays(),
    dayNamesShort: dayjs.weekdaysShort(),
    today: "Сегодня",
  };

  LocaleConfig.defaultLocale = "ru";
};
