import { CampCard } from "./CampCard";
import { MOCK_CAMPS } from "@/lib/mockCamps";

export default function CampGrid({ isLetsTalkActive }: { isLetsTalkActive: boolean }) {
  const filteredCamps = isLetsTalkActive
    ? MOCK_CAMPS.filter((camp) => camp.environment === "Conversation")
    : MOCK_CAMPS;

  if (filteredCamps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
        <p className="text-zinc-500 font-bold tracking-widest text-sm">No Missions Found</p>
        <p className="text-zinc-600 text-xs mt-2">Try adjusting your tactical filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {filteredCamps.map((camp) => (
        <CampCard key={camp.id} camp={camp} />
      ))}
    </div>
  );
}