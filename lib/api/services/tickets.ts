// src/lib/api/services/tickets.ts

import { apiClient } from '../client';
import { CampTicketDetailsResponse, SupportTicketCreate, SupportTicketResponse } from '../models/tickets';

export const ticketService = {
  async getCampTicketDetails(campId: string): Promise<CampTicketDetailsResponse> {
    return apiClient.get<CampTicketDetailsResponse>(`/tickets/${campId}`);
  },

  async createSupportTicket(ticketData: SupportTicketCreate): Promise<SupportTicketResponse> {
    const response = await apiClient.post<SupportTicketResponse>('/support/', ticketData);
    return response;
  },

  async getMyTickets(): Promise<SupportTicketResponse[]> {
    const response = await apiClient.get<SupportTicketResponse[]>('/support/my-tickets');
    return response;
  },
};
