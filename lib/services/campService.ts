// src/lib/services/campService.ts
import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';
import {
  Camp,
  CampCreate,
  CampResponse,
  CampListItem,
  CampRegistrationCreate,
  CampRegistrationOrderResponse,
  PaymentVerificationRequest,
  CampRegistrationResponse,
  CampDBView,
  CampFormValues,
  CampRequestCallback,
} from '../types/api';

const campService = {
  createCamp: (data: FormData): Promise<CampFormValues> => {
    return apiClient.post('/camps/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAllCamps: (params?: {
    location?: string;
    date?: string;
    min_cost?: number;
    max_cost?: number;
    min_age?: number;
    max_age?: number;
  }): Promise<CampListItem[]> => {
    return apiClient.get('/camps/', { params }).then(res => res.data);
  },

  getCampById: (campId: string): Promise<CampFormValues> => {
    return apiClient.get(`/camps/${campId}`).then(res => res.data);
  },

  updateCamp: (campId: string, data: FormData): Promise<CampFormValues> => {
    return apiClient.patch(`/camps/${campId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },

  updateCampStatus: (campId: string, status: string): Promise<any> => {
    return apiClient.post(`/camps/${campId}/status`, { status }).then(res => res.data);
  },

  registerForCamp: (data: CampRegistrationCreate): Promise<CampRegistrationOrderResponse> => {
    return apiClient.post('/camp-registrations/register', data).then(res => res.data);
  },

  verifyPayment: (data: PaymentVerificationRequest): Promise<CampRegistrationResponse> => {
    return apiClient.post('/camp-registrations/verify-payment', data).then(res => res.data);
  },

  getCampsForDashboard: (): Promise<CampDBView[]> => {
    return apiClient.get('/camps/db').then(res => res.data);
  },

  getCampDbById: (campId: string): Promise<CampFormValues> => {
    return apiClient.get(`/camps/db/${campId}`).then(res => res.data);
  },

  cancelCamp: (campId: string, message: string): Promise<any> => {
    const formData = new FormData();
    formData.append('message', message);
    return apiClient.post(`/camps/${campId}/cancel`, formData);
  },

  deleteCamp: (campId: string): Promise<any> => {
    return apiClient.delete(`/camps/${campId}`);
  },

  completeCamp: (campId: string, data: FormData): Promise<any> => {
    return apiClient.post(`/camps/${campId}/post-update`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  requestCallback: (data: CampRequestCallback): Promise<any> => {
    return apiClient.post('/camps/request-callback', data);
  },

  getCampTravellerDataPDF: (campId: string): Promise<AxiosResponse<Blob>> => {
    return apiClient.get(`/camps/${campId}/download-traveller-data`, { responseType: 'blob' });
  }
};

export default campService;
