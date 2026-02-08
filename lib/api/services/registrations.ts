// src/lib/api/services/registrations.ts

import { apiClient } from '../client';
import { 
  PendingTravellerDetails, 
  TravellerUpdateSchema, 
  CampRegistrationCreate, 
  CampRegistrationOrderResponse,
  PaymentVerificationRequest,
  CampRegistrationResponse
} from '../models/registrations';

interface ConfirmSlotData {
  traveller_details: TravellerUpdateSchema;
  document_files?: File[];
  document_type_ids?: string[];
}

export const registrationService = {
  async getPendingTravellers(token: string): Promise<PendingTravellerDetails[]> {
    return apiClient.get<PendingTravellerDetails[]>(`/camp-registrations/confirm-slot/${token}`);
  },

  async confirmSlot(token: string, { traveller_details, document_files, document_type_ids }: ConfirmSlotData): Promise<any> {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('traveller_details_json', JSON.stringify(traveller_details));

    if (document_files && document_type_ids) {
      document_files.forEach(file => {
          formData.append('document_files', file);
      });
      document_type_ids.forEach(id => {
          formData.append('document_type_ids', id);
      });
    }

    return apiClient.postFormData(`/camp-registrations/confirm-slot`, formData);
  },

  async registerForCamp(data: CampRegistrationCreate): Promise<CampRegistrationOrderResponse> {
    return apiClient.post<CampRegistrationOrderResponse>(`/camp-registrations/register`, data);
  },

  async verifyPayment(data: PaymentVerificationRequest): Promise<CampRegistrationResponse> {
    return apiClient.post<CampRegistrationResponse>(`/camp-registrations/verify-payment`, data);
  },
};
