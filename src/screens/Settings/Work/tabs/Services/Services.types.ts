export interface Service {
  id: string;
  name: string;
  duration: number; // в минутах
  breakAfter: number; // перерыв после услуги в минутах
}
