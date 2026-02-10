"use client";

// app/my-bookings/page.tsx
import { CampCard } from "@/components/camps/CampCard";
import { MOCK_BOOKINGS } from "@/lib/mockBookings";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyBookingsPage() {
  const bookings = MOCK_BOOKINGS;
  const refunds = MOCK_BOOKINGS.filter(booking => booking.refundInfo);
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500 font-bold tracking-widest text-sm">No Bookings Found</p>
          <p className="text-zinc-600 text-xs mt-2">Looks like you haven't booked any camps yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {bookings.map((booking) => (
            <CampCard 
              key={booking.camp.id} 
              camp={booking.camp} 
              documentStatus={booking.documentsUploaded}
              onCardClick={() => router.push("/tickets")}
            />
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-16 mb-6">Refund Information</h2>

      {refunds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500 font-bold tracking-widest text-sm">No Refunds to Display</p>
          <p className="text-zinc-600 text-xs mt-2">Check back later for any refund updates.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-400">Camp Name</TableHead>
                <TableHead className="text-zinc-400">Refund Amount</TableHead>
                <TableHead className="text-zinc-400">Settlement Date</TableHead>
                <TableHead className="text-zinc-400">Settlement ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-zinc-950">
              {refunds.map((booking) => (
                <TableRow key={booking.camp.id} className="border-zinc-800">
                  <TableCell className="font-medium text-zinc-100">{booking.camp.title}</TableCell>
                  <TableCell className="text-zinc-200">{booking.refundInfo?.amount}</TableCell>
                  <TableCell className="text-zinc-200">{booking.refundInfo?.settlementDate}</TableCell>
                  <TableCell className="text-zinc-200">{booking.refundInfo?.settlementId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}