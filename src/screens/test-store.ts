import { Service } from "./Settings/Work/tabs/Services/Services.types";
import { Template } from "./Settings/Work/tabs/Templates/Templates.types";

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
  activity: string;
  experienceYears: number;
  address: string;
}

export const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Иван Кузнецов',
    phone: '+7 (901) 234-56-01',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    activity: 'Персональный тренер',
    experienceYears: 1,
    address: 'г. Москва, ул. Тверская, д. 10',
  },
  {
    id: '2',
    name: 'Анна Морозова',
    phone: '+7 (902) 345-67-02',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    activity: 'Мастер по маникюру',
    experienceYears: 4,
    address: 'г. Санкт-Петербург, Невский проспект, д. 120',
  },
  {
    id: '3',
    name: 'Алексей Смирнов',
    phone: '+7 (903) 456-78-03',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    activity: 'Массажист',
    experienceYears: 9,
    address: 'г. Казань, ул. Баумана, д. 7',
  },
  {
    id: '4',
    name: 'Ольга Васильева',
    phone: '+7 (904) 567-89-04',
    avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
    activity: 'Косметолог',
    experienceYears: 7,
    address: 'г. Екатеринбург, ул. Ленина, д. 25',
  },
  {
    id: '5',
    name: 'Дмитрий Орлов',
    phone: '+7 (905) 678-90-05',
    avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
    activity: 'Автоинструктор',
    experienceYears: 0,
    address: 'г. Новосибирск, Красный проспект, д. 88',
  },
  {
    id: '6',
    name: 'Екатерина Павлова',
    phone: '+7 (906) 789-01-06',
    avatar: 'https://avatars.githubusercontent.com/u/6?v=4',
    activity: 'Парикмахер-стилист',
    experienceYears: 5,
    address: 'г. Самара, ул. Молодогвардейская, д. 15',
  },
  {
    id: '7',
    name: 'Сергей Волков',
    phone: '+7 (907) 890-12-07',
    avatar: 'https://avatars.githubusercontent.com/u/7?v=4',
    activity: 'Электрик',
    experienceYears: 11,
    address: 'г. Ростов-на-Дону, пр. Ворошиловский, д. 42',
  },
  {
    id: '8',
    name: 'Мария Фёдорова',
    phone: '+7 (908) 901-23-08',
    avatar: 'https://avatars.githubusercontent.com/u/8?v=4',
    activity: 'Визажист',
    experienceYears: 6,
    address: 'г. Краснодар, ул. Северная, д. 55',
  },
  {
    id: '9',
    name: 'Николай Соколов',
    phone: '+7 (909) 012-34-09',
    avatar: 'https://avatars.githubusercontent.com/u/9?v=4',
    activity: 'Фотограф',
    experienceYears: 4,
    address: 'г. Томск, пр. Ленина, д. 36',
  },
  {
    id: '10',
    name: 'Татьяна Белова',
    phone: '+7 (910) 123-45-10',
    activity: 'Репетитор по математике',
    experienceYears: 13,
    address: 'г. Москва, ул. Большая Ордынка, д. 18',
  },
  {
    id: '11',
    name: 'Андрей Михайлов',
    phone: '+7 (911) 234-56-11',
    avatar: 'https://avatars.githubusercontent.com/u/11?v=4',
    activity: 'Мастер по ремонту бытовой техники',
    experienceYears: 15,
    address: 'г. Пермь, Комсомольский проспект, д. 64',
  },
  {
    id: '12',
    name: 'Наталья Крылова',
    phone: '+7 (912) 345-67-12',
    activity: 'Клининговый специалист',
    experienceYears: 5,
    address: 'г. Воронеж, ул. Плехановская, д. 9',
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
    id: '0',
    name: 'Стрижка',
    duration: 30,
    breakAfter: 0,
  },
  {
    id: '1',
    name: 'Массаж',
    duration: 45,
    breakAfter: 15,
  },
]

export const templates: Template[] = [
  {
    id: '0',
    name: 'Будние дни',
    slots: [],
  },
  {
    id: '1',
    name: 'Выходные дни',
    slots: [],
  },
]
