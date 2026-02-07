// lib/mockBookings.ts
import { Booking } from "@/types/booking";
import { MOCK_CAMPS } from "@/components/camps/CampGrid";

export const MOCK_BOOKINGS: Booking[] = [
  {
    camp: { ...MOCK_CAMPS[0], id: "booked-1" },
    documentsUploaded: true,
    refundInfo: {
        amount: "₹ 23,999",
        settlementDate: "2024-03-15",
        settlementId: "SETTLE-001-ABC",
    },
  },
  {
    camp: { ...MOCK_CAMPS[1], id: "booked-2" },
    documentsUploaded: false,
  },
  {
    camp: { ...MOCK_CAMPS[2], id: "booked-3" },
    documentsUploaded: true,
    refundInfo: {
        amount: "₹ 31,999",
        settlementDate: "2024-04-01",
        settlementId: "SETTLE-002-DEF",
    },
  },
  {
    camp: { ...MOCK_CAMPS[3], id: "booked-4" },
    documentsUploaded: false,
  },
];