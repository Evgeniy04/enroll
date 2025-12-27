export const CONTACTS = [
  { id: '1', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', avatar: 'https://github.com/shadcn.png' },
  { id: '2', name: 'Анна Сидорова', phone: '+7 (900) 555-35-35', avatar: '' },
  { id: '3', name: 'Алексей Петров', phone: '+7 (911) 000-11-22', avatar: 'https://github.com/expo.png' },
  { id: '4', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', avatar: 'https://github.com/shadcn.png' },
  { id: '5', name: 'Анна Сидорова', phone: '+7 (900) 555-35-35', avatar: '' },
  { id: '6', name: 'Алексей Петров', phone: '+7 (911) 000-11-22', avatar: 'https://github.com/expo.png' },
  { id: '7', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', avatar: 'https://github.com/shadcn.png' },
  { id: '8', name: 'Анна Сидорова', phone: '+7 (900) 555-35-35', avatar: '' },
  { id: '9', name: 'Алексей Петров', phone: '+7 (911) 000-11-22', avatar: 'https://github.com/expo.png' },
  { id: '10', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', avatar: 'https://github.com/shadcn.png' },
  { id: '11', name: 'Анна Сидорова', phone: '+7 (900) 555-35-35', avatar: '' },
  { id: '12', name: 'Алексей Петров', phone: '+7 (911) 000-11-22', avatar: 'https://github.com/expo.png' },
];

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
}