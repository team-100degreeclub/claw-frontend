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
  // New Camps from instructions.md
  {
    id: "5",
    title: "Talk under the stars",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1527871899604-f1425bcce779?auto=format&fit=crop&q=80&w=800",
    price: "25,000", // Fixed price
    seatsLeft: "8",
    totalSeats: "15",
  },
  {
    id: "6",
    title: "Five shots, five deaths",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1551847609-5aaf21a58ebc?auto=format&fit=crop&q=80&w=800",
    price: "30,000", // Fixed price
    seatsLeft: "5",
    totalSeats: "10",
  },
  {
    id: "7",
    title: "Lost my buddy",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    price: "18,500", // Fixed price
    seatsLeft: "12",
    totalSeats: "18",
  },
  {
    id: "8",
    title: "Dinner at my home",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1569435998017-abb5d562dedf?auto=format&fit=crop&q=80&w=800",
    price: "35,000", // Fixed price
    seatsLeft: "7",
    totalSeats: "12",
  },
  {
    id: "9",
    title: "50 is the new 20",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1610070835951-156b6921281d?auto=format&fit=crop&q=80&w=800",
    price: "20,000", // Fixed price
    seatsLeft: "9",
    totalSeats: "15",
  },
  {
    id: "10",
    title: "Stories from the field",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "28,000", // Fixed price
    seatsLeft: "6",
    totalSeats: "10",
  },
  {
    id: "11",
    title: "Trekking the Himalayas",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "38,000", // Fixed price
    seatsLeft: "4",
    totalSeats: "8",
  },
  {
    id: "12",
    title: "Gardening at my farm",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "16,000", // Fixed price
    seatsLeft: "10",
    totalSeats: "15",
  },
  {
    id: "13",
    title: "By the river",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "22,000", // Fixed price
    seatsLeft: "11",
    totalSeats: "18",
  },
  {
    id: "14",
    title: "Cycling the North East",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "33,000", // Fixed price
    seatsLeft: "3",
    totalSeats: "5",
  },
  {
    id: "15",
    title: "Cleaning Ladakh",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "27,000", // Fixed price
    seatsLeft: "8",
    totalSeats: "12",
  },
  {
    id: "16",
    title: "A journey within",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "19,000", // Fixed price
    seatsLeft: "15",
    totalSeats: "18",
  },
  {
    id: "17",
    title: "Let’s cook together",
    environment: "Conversation",
    specialization: "Conversation",
    location: "Various",
    date: "Ongoing",
    status: "Open",
    image: "https://images.unsplash.com/photo-1533107871321-c30c82252a17?auto=format&fit=crop&q=80&w=800",
    price: "26,000", // Fixed price
    seatsLeft: "7",
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