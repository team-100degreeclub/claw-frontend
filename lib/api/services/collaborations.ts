// src/lib/api/services/collaborations.ts

import { apiClient } from '../client';
import { CampCollaborationResponse } from '../models/camps';

export const collaborationService = {
  async getCampCollaborators(campId: string): Promise<CampCollaborationResponse[]> {
    return apiClient.get<CampCollaborationResponse[]>(`/camp-collaborations/camp/${campId}`);
  },
};
