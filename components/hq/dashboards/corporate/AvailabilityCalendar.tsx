import { Calendar as CalendarIcon, Info, Users, Search, Check } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// --- Dummy Data for Availability ---
const SPEAKER_SCHEDULES: Record<string, string[]> = {
  "2026-02-15": ["Dr. Sarah Chen", "Marcus Thorne", "Jordan Lee", "Alex Morgan"],
  "2026-02-16": ["Marcus Thorne", "Emily Rivera"],
  "2026-02-17": ["Dr. Sarah Chen", "Robert P.", "Alex Morgan"],
  // Assume other dates have a random subset
};

// --- Sub-Component: Availability Sheet & Calendar ---
export default function AvailabilityCalendar({ onSelectTeam }: { onSelectTeam: (val: string) => void }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Simplified Calendar Generator for Feb 2026
  const days = Array.from({ length: 28 }, (_, i) => `2026-02-${String(i + 1).padStart(2, '0')}`);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const filteredSpeakers = (date: string) => {
    const speakers = SPEAKER_SCHEDULES[date] || ["No speakers listed"];
    return speakers.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="flex flex-col h-full p-8 space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-white">Speaker Availability</h2>
        <p className="text-zinc-500 text-sm">Select a date to view and assign available team members.</p>
      </div>

      <div className="grid grid-cols-7 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="bg-zinc-900 p-4 text-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
            {day}
          </div>
        ))}
        {days.map(date => {
          const available = SPEAKER_SCHEDULES[date] || [];
          return (
            <TooltipProvider key={date}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => handleDateClick(date)}
                    className="bg-zinc-950 h-32 p-3 border-zinc-900 hover:bg-zinc-900 transition-colors flex flex-col items-start gap-2 relative group"
                  >
                    <span className="text-sm font-medium text-zinc-400 group-hover:text-white">{date.split('-')[2]}</span>
                    {available.length > 0 && (
                      <div className="flex flex-col gap-1 w-full">
                        {available.slice(0, 3).map((s, idx) => (
                          <div key={idx} className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded truncate w-full text-left">
                            {s}
                          </div>
                        ))}
                        {available.length > 3 && (
                          <span className="text-[9px] text-emerald-500 font-bold">+{available.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-zinc-800 border-zinc-700 text-white p-3 shadow-xl">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 mb-2">AVAILABLE ({available.length})</p>
                    {available.map((s, i) => <p key={i} className="text-xs">{s}</p>)}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Detailed Search Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Available Speakers - {selectedDate}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Search speakers..." 
                className="pl-9 bg-zinc-900 border-zinc-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
              {selectedDate && filteredSpeakers(selectedDate).map((speaker, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors group">
                  <span className="text-sm">{speaker}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => {
                      onSelectTeam(`${speaker} (${selectedDate})`);
                      setIsDialogOpen(false);
                    }}
                  >
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}