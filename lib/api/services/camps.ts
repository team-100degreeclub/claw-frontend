// src/lib/api/services/camps.ts
import { apiClient } from '../client';
import { CampListItem, CampDetailsResponse } from '../models/camps';
import { CampFilters } from '@/context/CampFilterContext';
import { format } from 'date-fns';

export const campService = {
  async getAllCamps(filters?: CampFilters): Promise<CampListItem[]> {
    const params = new URLSearchParams();
    if (filters?.location) params.append('location', filters.location);
    if (filters?.date) params.append('date', format(filters.date, 'yyyy-MM-dd'));
    if (filters?.min_cost !== null) params.append('min_cost', filters ? filters.min_cost.toString() : "");
    if (filters?.max_cost !== null) params.append('max_cost', filters ? filters.max_cost.toString() : "");
    if (filters?.min_age !== null) params.append('min_age', filters ? filters.min_age.toString() : "");
    if (filters?.max_age !== null) params.append('max_age', filters ? filters.max_age.toString() : "");

    const queryString = params.toString();
    const path = queryString ? `/camps/?${queryString}` : '/camps/';
    return apiClient.get<CampListItem[]>(path);
  },

  async getCampById(campId: string): Promise<CampDetailsResponse> {
    return apiClient.get<CampDetailsResponse>(`/camps/${campId}`);
  },
};
