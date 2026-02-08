// src/lib/api/models/bookings.ts

export interface BookingSummary {
  id: string; // The ID of the CampRegistration
  camp_id: string;
  slug: string;
  camp_name: string;
  camp_location: string;
  camp_start_date: string; // ISO 8601 date string
  days_left: number;
  ticket_count: number;
  documents_missing: boolean;
  pitch_video_url: string;
}
