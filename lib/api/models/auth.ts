// src/lib/api/models/auth.ts

import { Gender } from './enums';

export interface EmailRequest {
  email: string;
}

export interface OTPVerifyRequest {
  email: string;
  otp: string;
  first_name?: string | null;
  last_name?: string | null;
}

export interface DocumentUpload {
  document_type_id: string;
  document_url: string;
}

export interface PaymentForProfile {
  camp_name: string;
  created_at: string; // Assuming ISO 8601 string format for datetime
  amount_gross: number;
  status: string;
}

export interface RefundForProfile {
  camp_name: string;
  created_at: string; // Assuming ISO 8601 string format for datetime
  amount: number;
  status: string;
}

export interface SupportTicketForProfile {
  subject: string;
  message: string;
  category: string;
  status: string;
}

export interface TravellerDocumentResponse {
    id: string;
    document_type_id: string; // uuid.UUID
    document_name: string;
    document_url: string;
}

export interface TravellerProfileResponse {
  id: string; // UUIDs are typically represented as strings
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  country_code?: string | null;
  contact_number?: string | null;
  date_of_birth?: string | null; // Assuming ISO 8601 date string format
  gender?: Gender | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  aadhaar_url?: string | null;
  passport_url?: string | null;
  profile_image_url?: string | null;
  payments: PaymentForProfile[];
  refunds: RefundForProfile[];
  support_tickets: SupportTicketForProfile[];
  documents: TravellerDocumentResponse[];
  created_at: string;
  updated_at: string;
}
