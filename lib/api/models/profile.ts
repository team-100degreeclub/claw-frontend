// src/lib/api/models/profile.ts

import { Gender } from './enums';

export interface TravellerProfileUpdate {
  first_name?: string | null;
  last_name?: string | null;
  country_code?: string | null;
  contact_number?: string | null;
  date_of_birth?: string | null; // ISO 8601 date string
  gender?: Gender | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

export interface DocumentType {
  id: string; // UUID
  document_type_code: string;
  document_name: string;
}