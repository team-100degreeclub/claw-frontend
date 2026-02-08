import { Booking } from '@/types/booking';
import { MOCK_CAMPS } from './mockCamps';

export const MOCK_BOOKINGS: Booking[] = [
  {
    camp: MOCK_CAMPS[0],
    documentsUploaded: 'Verified',
  },
  {
    camp: MOCK_CAMPS[1],
    documentsUploaded: 'Pending',
    refundInfo: {
      amount: '₹10,000',
      settlementDate: '15th July 2024',
      settlementId: 'SETTLE12345',
    },
  },
  {
    camp: MOCK_CAMPS[2],
    documentsUploaded: 'Uploaded',
  },
];