// src/lib/api/models/camps.ts

import { CampStatus, CollaborationStatus } from './enums';
import { PartnerProfileResponse } from './partners';


export interface CampListItem {
  id: string; // UUID
  slug: string;
  name: string;
  location: string;
  duration: number;
  spots_left: number;
  total_spots: number;
  cost: number;
  is_free?: boolean;
  video_url?: string;
  registration_last_date: string; // ISO 8601 date string
  status: CampStatus;
}

// Deprecated - to be removed after migration
export interface CampPitchResponse {
    yt_video_url: string;
    camp_brief: string;
    camp_checklist: string;
}

// Deprecated - to be removed after migration
export interface CampDetail {
    id: string; // UUID
    name: string;
    location: string;
    video_url?: string;
    // thumbnail_url?: string;
    price_per_seat: number;
    total_seats: number;
    registration_last_date: string; // ISO 8601 date string
    start_date?: string; // ISO 8601 date string
    end_date?: string; // ISO 8601 date string
    is_free?: boolean;
    status: string;
    partner: PartnerProfileResponse;
    duration: number;
}

// New interfaces based on backend instructions.md
export interface CampPitchDetailsResponse {
    yt_video_url?: string;
    camp_brief: string;
    camp_checklist: string;
    // thumbnail_url?: string;
}

export interface CampCollaborator {
    collaboration_id: string;
    first_name?: string;
    last_name?: string;
    bio?: string;
    profile_image_url?: string;
}

export interface CampDetailsResponse {
    id: string;
    name: string;
    location: string;
    camp_location_gmaps_url: string;
    meetup_location_gmaps_url: string;
    start_date: string; // date
    end_date: string; // date
    meetup_location_address: string;
    meetup_datetime: string; // datetime
    price_per_seat: number;
    total_seats: number;
    slots_remaining: number;
    is_free: boolean;
    min_age: number;
    max_age: number;
    gender: string[];
    status: CampStatus;
    collaborators: CampCollaborator[];
    pitch: CampPitchDetailsResponse;
}

export interface CampCollaborationResponse {
    id: string;
    camp_id: string;
    partner_profile_code: string;
    status: CollaborationStatus;
}
