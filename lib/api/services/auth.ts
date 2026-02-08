// src/lib/api/services/auth.ts

import { apiClient } from '../client';
import { EmailRequest, OTPVerifyRequest, TravellerProfileResponse } from '../models/auth';

export const authService = {
  async sendTravellerOtp(data: EmailRequest): Promise<any> {
    return apiClient.post('/auth/travellers/send-otp', data);
  },

  async verifyTravellerOtp(data: OTPVerifyRequest): Promise<any> {
    // The backend sets an HTTP-only cookie on successful verification,
    // so the response body itself might be simple, e.g., { message: "Authenticated successfully" }
    return apiClient.post('/auth/travellers/verify-otp', data);
  },

  async getTravellerProfile(): Promise<TravellerProfileResponse> {
    return apiClient.get('/travellers/me');
  },

  async logout(): Promise<any> {
    return apiClient.post('/auth/logout', {});
  },
};
