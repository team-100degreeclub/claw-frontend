// src/lib/api/models/tickets.ts

import { Gender, TicketStatus } from './enums';

export enum SupportCategory {
    ACCOUNT = "account",
    PAYMENT = "payment",
    CAMP = "camp",
    TECHNICAL = "technical",
    OTHER = "other",
}

export enum SupportStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed",
}

export interface SupportTicketCreate {
    subject: string;
    message: string;
    category: SupportCategory;
}

export interface SupportTicketResponse {
    id: string;
    user_id: string;
    subject: string;
    message: string;
    category: SupportCategory;
    status: SupportStatus;
    created_at: string; // ISO 8601 datetime string
}


export interface BookingDetail {
  ticket_number: string;
  name: string;
  age?: number | null;
  gender?: Gender | null;
  ticket_status: TicketStatus;
  documents: string[];
  booked_at: string; // ISO 8601 datetime string
}

export interface BookingGroup {
  booked_at: string; // ISO 8601 datetime string
  bookings: BookingDetail[];
}

export interface PaymentSummary {
  sub_total_amount: number;
  gst: number;
  total_amount: number;
  other_charges: number;
}

export interface CampTicketDetailsResponse {
  total_slots_booked: number;
  total_slots_confirmed: number;
  url_to_confirm_slot: string;
  camp_name: string;
  camp_start_date: string; // ISO 8601 date string
  camp_end_date: string; // ISO 8601 date string
  camp_location: string;
  meetup_location?: string | null;
  meetup_time?: string | null; // ISO 8601 datetime string
  booking_groups: BookingGroup[];
  payment_summary?: PaymentSummary;
}
