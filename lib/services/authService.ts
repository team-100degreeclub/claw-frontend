// src/lib/services/authService.ts
import apiClient from '../apiClient';
import { EmailRequest, OTPVerifyRequest } from '../types/api';

const authService = {
  // Partner Auth
  sendPartnerOtp: (data: EmailRequest) => {
    return apiClient.post('/auth/partners/send-otp', data);
  },

  verifyPartnerOtp: (data: OTPVerifyRequest) => {
    return apiClient.post('/auth/partners/verify-otp', data);
  },

  // Traveller Auth
  sendTravellerOtp: (data: EmailRequest) => {
    return apiClient.post('/auth/travellers/send-otp', data);
  },

  verifyTravellerOtp: (data: OTPVerifyRequest) => {
    return apiClient.post('/auth/travellers/verify-otp', data);
  },

  // Logout
  logout: () => {
    return apiClient.post('/auth/logout');
  },
};

export default authService;
