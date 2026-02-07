import { CampCard } from "./CampCard";

export const MOCK_CAMPS = [
  {
    id: "1",
    title: "Himalayan Winter Survival",
    environment: "Land",
    specialization: "Physical",
    location: "Leh, Ladakh",
    date: "12 - 20 March",
    status: "Registrations Open",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=800",
    price: "23,999",
    seatsLeft: "10",
    totalSeats: "20",
  },
  {
    id: "2",
    title: "High-Altitude HALO Prep",
    environment: "Air",
    specialization: "Mental",
    location: "Pondicherry, IN",
    date: "5 April",
    status: "Live",
    image: "https://images.unsplash.com/photo-1664494130837-14e0473ed284?q=80&w=2670&auto=format&fit=crop&q=80&w=800",
    price: "19,999",
    seatsLeft: "5",
    totalSeats: "10",
  },
  {
    id: "3",
    title: "Deep Sea Tactical Breath-Hold",
    environment: "Water",
    specialization: "Medical",
    location: "Netrani, IN",
    date: "22 - 25 April",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    price: "31,999",
    seatsLeft: "5",
    totalSeats: "10",
  },
  {
    id: "4",
    title: "Urban Evasion & Survival",
    environment: "Land",
    specialization: "Mental",
    location: "Mumbai, IN",
    date: "10 May",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800",
    price: "12,999",
    seatsLeft: "5",
    totalSeats: "10",
  },
];

export default function CampGrid() {
  const camps = MOCK_CAMPS; 

  if (camps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-500 font-bold tracking-widest text-sm">No Missions Found</p>
        <p className="text-zinc-600 text-xs mt-2">Try adjusting your tactical filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {camps.map((camp) => (
        <CampCard key={camp.id} camp={camp} />
      ))}
    </div>
  );
}