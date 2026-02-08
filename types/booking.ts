// types/booking.ts
import { Camp } from './camp';

export interface Booking {
  camp: Camp;
  documentsUploaded: 'Pending' | 'Uploaded' | 'Verified' | 'Rejected';
  refundInfo?: {
    amount: string;
    settlementDate: string;
    settlementId: string;
  };
}