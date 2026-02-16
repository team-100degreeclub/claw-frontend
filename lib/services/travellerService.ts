// src/lib/services/travellerService.ts
import apiClient from '../apiClient';
import { TravellerProfileResponse, TravellerProfileUpdate } from '../types/api';

const travellerService = {
  getMyProfile: (): Promise<TravellerProfileResponse> => {
    return apiClient.get('/travellers/me').then(res => res.data);
  },

  updateMyProfile: (data: FormData): Promise<TravellerProfileResponse> => {
    return apiClient.patch('/travellers/me/profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(res => res.data);
  },
};

export default travellerService;
