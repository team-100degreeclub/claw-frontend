// src/lib/api/services/profile.ts

import { apiClient } from '../client';
import { TravellerProfileResponse } from '../models/auth';
import { DocumentType, TravellerProfileUpdate } from '../models/profile';

interface UpdateProfileData {
    profile_data: TravellerProfileUpdate;
    profile_image?: File | null;
    document_files?: File[];
    document_type_ids?: string[];
}

export const profileService = {
  async updateTravellerProfile({ profile_data, profile_image, document_files, document_type_ids }: UpdateProfileData): Promise<TravellerProfileResponse> {
    const formData = new FormData();

    formData.append('profile_data_json', JSON.stringify(profile_data));

    if (profile_image) {
      formData.append('profile_image', profile_image);
    }

    if (document_files && document_type_ids) {
        document_files.forEach(file => {
            formData.append('document_files', file);
        });
        document_type_ids.forEach(id => {
            formData.append('document_type_ids', id);
        });
    }

    return apiClient.patchFormData<TravellerProfileResponse>('/travellers/me/profile', formData);
  },

  async getDocumentTypes(): Promise<DocumentType[]> {
    return apiClient.get<DocumentType[]>('/document-types');
  }
};