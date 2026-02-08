"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, MapPin, CheckCircle2, Ticket, Clock, FileWarning, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Camp } from "@/types/camp";

export function CampCard({ camp, documentStatus }: { camp: Camp; documentStatus?: boolean }) {
  const router = useRouter();
  // Logic for the tactical status icon
  const getStatusContent = (status: string) => {
    switch (status.toLowerCase()) {
      case 'tickets available': return { icon: <Ticket className="w-3.5 h-3.5" />, text: status };
      case 'registrations open': return { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: status };
      default: return { icon: <Clock className="w-3.5 h-3.5" />, text: status || 'Upcoming event' };
    }
  };

  const statusInfo = getStatusContent(camp.status);

  return (
    <div
      className="group flex flex-col min-w-[300px] bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-900 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => router.push(`/camps/${camp.id}`)}
    >
      {/* 1. Tactical Visual Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={camp.image} 
          alt={camp.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Environment/Focus Badge - Overlaid like Red Bull partner logos */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-white/90 dark:bg-black/80 text-black dark:text-white border-none font-black text-[9px] tracking-widest px-2 py-1 backdrop-blur-sm">
            {camp.environment.toString() === "Conversation" ? "Conversation" : camp.environment + "/" + camp.specialization}
          </Badge>
        </div>
      </div>
      
      {/* 2. Mission Content Section */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-black leading-tight text-black dark:text-white tracking-tight group-hover:text-red-600 transition-colors">
            {camp.title}
          </h3>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-600 dark:text-zinc-400">
              <Calendar className="w-3.5 h-3.5" /> 
              {camp.date}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5" /> 
              {camp.location}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Red Bull Style Status Footer */}
      <div className="mt-auto border-t border-zinc-100 dark:border-zinc-900 px-5 py-3 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center justify-between gap-2 font-bold text-[13px] text-zinc-800 dark:text-zinc-300">
          <div className="flex items-center text-black dark:text-white font-semibold">
            {camp.seatsLeft}/{camp.totalSeats} <span className="ml-1">slots left</span>
          </div>
          <div className="flex items-center text-black dark:text-white">
            <IndianRupee className="w-3 h-3 mr-0.5" />
            {camp.price}
          </div>
        </div>
        {documentStatus !== undefined && (
          <div className={cn(
            "mt-2 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md",
            documentStatus ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
          )}>
            {documentStatus ? <CheckCircle className="w-4 h-4" /> : <FileWarning className="w-4 h-4" />}
            <span className="text-xs font-semibold">
              {documentStatus ? "Booking Confirmed" : "Missing Documents"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
 