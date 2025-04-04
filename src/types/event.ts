export interface Event {
  _id: string;
  id?: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  location?: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
} 