// src/lib/api/services/bookings.ts

import { apiClient } from '../client';
import { BookingSummary } from '../models/bookings';

export const bookingService = {
  async getMyBookings(): Promise<BookingSummary[]> {
    return apiClient.get<BookingSummary[]>('/travellers/me/bookings');
  },
};
