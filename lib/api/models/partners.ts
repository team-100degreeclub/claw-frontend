// src/lib/api/models/partners.ts

import { Gender } from './enums';

export interface PartnerProfileResponse {
  id: string; // UUID
  profile_code?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_image_url?: string | null;
  email: string;
  gender?: Gender | null;
  country_code?: string | null;
  contact_number?: string | null;
  bio?: string | null;
  aadhaar_url?: string | null;
  passport_url?: string | null;
}
