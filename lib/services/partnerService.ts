// src/lib/services/partnerService.ts
import apiClient from '../apiClient';
import { CampCollaborationCreate, PartnerProfileResponse, PartnerProfileUpdate } from '../types/api';

const partnerService = {
  getMyProfile: (): Promise<PartnerProfileResponse> => {
    return apiClient.get('/partners/me').then(res => res.data);
  },

  getPartnerByEmail: (email: string): Promise<PartnerProfileResponse> => {
    return apiClient.get(`/partners/${email}`).then(res => res.data);
  },

  updateMyProfile: (data: FormData): Promise<PartnerProfileResponse> => {
    return apiClient.patch('/partners/me/profile', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(res => res.data);
  },

  invitePartner: (data: FormData): Promise<any> => {
    
    return apiClient.post('/camp-collaborations', Object.fromEntries(data)).then(res => res.data);
  },


  removePartnerInvite: (id: string): Promise<any> => {
    
    const obj = new FormData();
    obj.append("status", "removed");
    return apiClient.patch("/camp-collaborations/" + id, Object.fromEntries(obj)).then(res => res.data);
  },

  request: (data: { email: string; message: string }): Promise<any> => {
    return apiClient.post('/partners/request', data).then(res => res.data);
  }
};

export default partnerService;
