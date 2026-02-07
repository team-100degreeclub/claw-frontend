// types/booking.ts
import { Camp } from "./camp";

export interface Booking {
  camp: Camp;
  documentsUploaded: boolean;
  refundInfo?: {
    amount: string;
    settlementDate: string;
    settlementId: string;
  };
  // Add any other booking-specific details here, e.g., bookingDate, numberOfTravelers, etc.
}
