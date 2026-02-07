// types/camp.ts
export type Environment = 'Land' | 'Air' | 'Water';
export type Specialization = 'Mental' | 'Physical' | 'Medical';

export interface Camp {
  id: string;
  title: string;
  environment: Environment;
  specialization: Specialization;
  location: string;
  date: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  image: string;
}