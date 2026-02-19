import { BriefcaseBusiness, CarIcon, MapPin } from "lucide-react-native";
import type { Section } from "./types";

export const MOCK_SECTIONS: Section[] = [
  {
    id: "section-professional",
    title: "Профессиональная информация",
    icon: BriefcaseBusiness,
    fields: [
      {
        id: "f-activity",
        label: "Вид деятельности",
        value: "Мастер производственного обучения",
      },
      {
        id: "f-license-cat",
        label: "Категория водительских прав",
        value: "A, B, C",
      },
      { id: "f-experience", label: "Водительский стаж", value: "15 лет" },
    ],
  },
  {
    id: "section-car",
    title: "Автомобиль",
    icon: CarIcon,
    fields: [
      { id: "f-marque", label: "Марка и модель", value: "Toyota Corolla" },
      {
        id: "f-transmission",
        label: "Тип трансмиссии",
        value: "Автоматическая",
      },
      { id: "f-year", label: "Год выпуска", value: "2020" },
      { id: "f-reg", label: "Регистрационный номер", value: "О900ОО 70" },
      {
        id: "f-extra",
        label: "Дополнительно",
        value: "Дублирующие педали, кондиционер, камера заднего вида",
      },
    ],
    photoUri:
      "https://hips.hearstapps.com/hmg-prod/images/2023-range-rover-se-p400-lwb-105-1650304551.jpg?crop=0.960xw:0.810xh;0,0.115xh&resize=2048:*",
  },
  {
    id: "section-place",
    title: "Место",
    icon: MapPin,
    fields: [
      { id: "f-address", label: "Адрес", value: "г. Томск, пр. Мира, 118 б" },
      {
        id: "f-place-extra",
        label: "Дополнительно",
        value: "Автошкола и прилегающие районы, экзаменационные маршруты",
      },
    ],
  },
];
