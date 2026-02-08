// types/camp.ts
export type Environment = 'Land' | 'Air' | 'Water' | 'Conversation';
export type Specialization = 'Mental' | 'Physical' | 'Medical' | 'Conversation';

export interface Camp {
  id: string;
  title: string;
  environment: Environment;
  specialization: Specialization;
  location: string;
  date: string;
  status: 'Live' | 'Upcoming' | 'Completed' | 'Open' | 'Registrations Open';
  image: string;
  price: string;
  seatsLeft: string;
  totalSeats: string;
}