import { Service } from "./settings/Work/tabs/Services/Services.types";
import { Template } from "./settings/Work/tabs/Templates/Templates.types";

export interface User {
  id: string;
  image?: string | null | undefined;
  username?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  firstName: string;
  lastName: string;
  about: string;
}

export const USERS: User[] = [
  {
    id: "1",
    image: "https://avatars.githubusercontent.com/u/1?v=4",
    username: "ivan.kuznetsov",
    phoneNumber: "+79160000001",
    firstName: "Иван",
    lastName: "Кузнецов",
    about: "Персональный тренер, опыт 1 год, г. Москва, ул. Тверская, д. 10",
  },
  {
    id: "2",
    image: "https://avatars.githubusercontent.com/u/2?v=4",
    username: "anna.morozova",
    phoneNumber: "+79210000002",
    firstName: "Анна",
    lastName: "Морозова",
    about:
      "Мастер по маникюру, опыт 4 года, г. Санкт-Петербург, Невский проспект, д. 120",
  },
  {
    id: "3",
    image: "https://avatars.githubusercontent.com/u/3?v=4",
    username: "aleksey.smirnov",
    phoneNumber: "+78430000003",
    firstName: "Алексей",
    lastName: "Смирнов",
    about: "Массажист, опыт 9 лет, г. Казань, ул. Баумана, д. 7",
  },
  {
    id: "4",
    image: "https://avatars.githubusercontent.com/u/4?v=4",
    username: "olga.vasileva",
    phoneNumber: "+73430000004",
    firstName: "Ольга",
    lastName: "Васильева",
    about: "Косметолог, опыт 7 лет, г. Екатеринбург, ул. Ленина, д. 25",
  },
  {
    id: "5",
    image: "https://avatars.githubusercontent.com/u/5?v=4",
    username: "dmitry.orlov",
    phoneNumber: "+73830000005",
    firstName: "Дмитрий",
    lastName: "Орлов",
    about:
      "Автоинструктор, опыт 0 лет, г. Новосибирск, Красный проспект, д. 88",
  },
  {
    id: "6",
    image: "https://avatars.githubusercontent.com/u/6?v=4",
    username: "ekaterina.pavlova",
    phoneNumber: "+78460000006",
    firstName: "Екатерина",
    lastName: "Павлова",
    about:
      "Парикмахер-стилист, опыт 5 лет, г. Самара, ул. Молодогвардейская, д. 15",
  },
  {
    id: "7",
    image: "https://avatars.githubusercontent.com/u/7?v=4",
    username: "sergey.volkov",
    phoneNumber: "+78630000007",
    firstName: "Сергей",
    lastName: "Волков",
    about: "Электрик, опыт 11 лет, г. Ростов-на-Дону, пр. Ворошиловский, д. 42",
  },
  {
    id: "8",
    image: "https://avatars.githubusercontent.com/u/8?v=4",
    username: "maria.fedorova",
    phoneNumber: "+78610000008",
    firstName: "Мария",
    lastName: "Фёдорова",
    about: "Визажист, опыт 6 лет, г. Краснодар, ул. Северная, д. 55",
  },
  {
    id: "9",
    image: "https://avatars.githubusercontent.com/u/9?v=4",
    username: "nikolay.sokolov",
    phoneNumber: "+73820000009",
    firstName: "Николай",
    lastName: "Соколов",
    about: "Фотограф, опыт 4 года, г. Томск, пр. Ленина, д. 36",
  },
  {
    id: "10",
    image: null,
    username: "tatyana.belova",
    phoneNumber: "+79160000010",
    firstName: "Татьяна",
    lastName: "Белова",
    about:
      "Репетитор по математике, опыт 13 лет, г. Москва, ул. Большая Ордынка, д. 18",
  },
  {
    id: "11",
    image: "https://avatars.githubusercontent.com/u/11?v=4",
    username: "andrey.mikhailov",
    phoneNumber: "+73420000011",
    firstName: "Андрей",
    lastName: "Михайлов",
    about:
      "Мастер по ремонту бытовой техники, опыт 15 лет, г. Пермь, Комсомольский проспект, д. 64",
  },
  {
    id: "12",
    image: null,
    username: "natalya.krylova",
    phoneNumber: "+74730000012",
    firstName: "Наталья",
    lastName: "Крылова",
    about:
      "Клининговый специалист, опыт 5 лет, г. Воронеж, ул. Плехановская, д. 9",
  },
];

export const EVENTS = [
  {
    id: 1,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 6, 30),
    end: new Date(2025, 11, 10, 8, 0),
    color: "#4caf50",
  },
  {
    id: 2,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 8, 0),
    end: new Date(2025, 11, 10, 9, 30),
    color: "#4caf50",
  },
  {
    id: 3,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 9, 30),
    end: new Date(2025, 11, 10, 11, 0),
    color: "#4caf50",
  },
  {
    id: 4,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 11, 0),
    end: new Date(2025, 11, 10, 12, 30),
    color: "#4caf50",
  },
  {
    id: 5,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 12, 30),
    end: new Date(2025, 11, 10, 14, 0),
    color: "#4caf50",
  },
  {
    id: 6,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 14, 0),
    end: new Date(2025, 11, 10, 15, 30),
    color: "#4caf50",
  },
  {
    id: 7,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 15, 30),
    end: new Date(2025, 11, 10, 17, 0),
    color: "#4caf50",
  },
  {
    id: 8,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 17, 0),
    end: new Date(2025, 11, 10, 18, 30),
    color: "#4caf50",
  },
  {
    id: 9,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 18, 30),
    end: new Date(2025, 11, 10, 20, 0),
    color: "#4caf50",
  },
  {
    id: 10,
    title: "Никита Белянин",
    start: new Date(2025, 11, 9, 18, 30),
    end: new Date(2025, 11, 9, 20, 0),
    color: "#ff4d00ff",
  },
];

export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export const services: Service[] = [
  {
    id: "0",
    name: "Стрижка",
    duration: 30,
    breakAfter: 0,
  },
  {
    id: "1",
    name: "Очень длинное название услуги для теста",
    duration: 45,
    breakAfter: 15,
  },
];

export const templates: Template[] = [
  {
    id: "t1",
    name: "Стандартный день",
    slots: [
      {
        id: "sl1",
        serviceId: "s2",
        startTime: { hours: 9, minutes: 0 },
        count: 4,
      },
      {
        id: "sl2",
        serviceId: "s1",
        startTime: { hours: 14, minutes: 0 },
        count: 3,
      },
    ],
  },
  {
    id: "t2",
    name: "Интенсивный день",
    slots: [
      {
        id: "sl3",
        serviceId: "s2",
        startTime: { hours: 9, minutes: 0 },
        count: 6,
      },
      {
        id: "sl4",
        serviceId: "s5",
        startTime: { hours: 16, minutes: 0 },
        count: 2,
      },
    ],
  },
  {
    id: "t3",
    name: "Короткий день",
    slots: [
      {
        id: "sl5",
        serviceId: "s1",
        startTime: { hours: 10, minutes: 0 },
        count: 3,
      },
      {
        id: "sl6",
        serviceId: "s5",
        startTime: { hours: 12, minutes: 0 },
        count: 2,
      },
    ],
  },
  {
    id: "t4",
    name: "VIP день",
    slots: [
      {
        id: "sl7",
        serviceId: "s4",
        startTime: { hours: 10, minutes: 0 },
        count: 3,
      },
    ],
  },
  {
    id: "t5",
    name: "Утренняя смена",
    slots: [
      {
        id: "sl8",
        serviceId: "s2",
        startTime: { hours: 8, minutes: 0 },
        count: 4,
      },
    ],
  },
  {
    id: "t6",
    name: "Вечерняя смена",
    slots: [
      {
        id: "sl9",
        serviceId: "s2",
        startTime: { hours: 16, minutes: 0 },
        count: 4,
      },
    ],
  },
];
