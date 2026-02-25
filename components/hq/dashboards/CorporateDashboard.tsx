"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { format } from "date-fns";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { KanbanForm, LeadData } from "./corporate/CorporateKanban";
import { formatCompactNumber } from "./PerformanceDashboard";

// Mock data for individual host's corporate deals
const CORPORATE_DEALS = [
  {
    id: "1",
    company: "Tech Corp Inc.",
    location: "London, UK",
    date: "12 Mar 2026",
    time: "10:00 AM",
    collab: ["Dr. Sarah Chen", "Marcus Thorne"],
    net: 185000,
    status: "Completed"
  },
  {
    id: "2",
    company: "Global Logistics",
    location: "New York, USA",
    date: "25 Mar 2026",
    time: "11:00 AM",
    collab: ["Robert P.", "Emily Rivera"],
    net: 142000,
    status: "Canceled"
  },
];

const DUMMY_LEADS: Record<string, LeadData[]> = {
  Lead: [
    {
      id: "d1", column: "Lead", inquiryDate: "2026-02-10", company: "TechNova Solutions", location: "San Francisco, CA",
      startDate: "2026-05-15", startTime: "10:00", endDate: "2026-05-15", endTime: "12:00", phone: "555-0123", email: "contact@technova.io",
      message: "Keynote on AI ethics and future of work.", requestSpeaker: "Dr. Sarah Chen",
      teamAvailable: "A-Team", gross: 15000, fee: 2250.00, taxes: 1200, net: 11550.00,
      assignSpeaker: ["sarah-chen"], docsLink: "https://drive.google.com/docs/1", status: "Live", speakerAllocations: []
    },
    {
      id: "d2", column: "Lead", inquiryDate: "2026-02-12", company: "GreenGrid Energy", location: "Austin, TX",
      startDate: "2026-06-20", startTime: "14:30", endDate: "2026-06-20", endTime: "17:00", phone: "555-0987", email: "events@greengrid.com",
      message: "Sustainability summit closing session.", requestSpeaker: "Marcus Thorne",
      teamAvailable: "B-Team", gross: 8000, fee: 1200.00, taxes: 640, net: 6160.00,
      assignSpeaker: [], docsLink: "", status: "Live", speakerAllocations: []
    }
  ],
  Discussion: [
    {
      id: "d3", column: "Discussion", inquiryDate: "2026-01-25", company: "Global Finance Inc.", location: "New York, NY",
      startDate: "2026-04-05", startTime: "09:00", endDate: "2026-04-07", endTime: "13:00", phone: "555-4433", email: "hr@globalfinance.com",
      message: "Leadership workshop for C-suite executives.", requestSpeaker: "John Maxwell Style",
      teamAvailable: "Gold Tier", gross: 25000, fee: 3750.00, taxes: 2000, net: 19250.00,
      assignSpeaker: ["robert-p"], docsLink: "https://dropbox.com/s/proposal-v2", status: "Live", speakerAllocations: []
    }
  ],
  // Assign: [],
  Deal: [
    {
      id: "d4", column: "Deal", inquiryDate: "2026-01-10", company: "Creative Minds Agency", location: "Remote",
      startDate: "2026-02-25", startTime: "11:00", endDate: "2026-02-30", endTime: "12:30", phone: "555-7788", email: "hello@creativeminds.com",
      message: "Monthly inspiration webinar.", requestSpeaker: "Emily Rivera",
      teamAvailable: "Web-Team", gross: 500000, fee: 750.00, taxes: 400, net: 3850.00,
      assignSpeaker: ["emily-rivera", "jordan-lee"], docsLink: "https://zoom.us/webinar/123", status: "Completed", speakerAllocations: [{ speakerId: "emily-rivera", amount: 500 }, { speakerId: "jordan-lee", amount: 250 }]
    }
  ],
  // Completed: [],
  // Canceled: [],
};

export default function CorporateDashboard() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);

  const onSave = (data: Partial<LeadData>) => {
    if (selectedLead) {
      const colId = selectedLead.column;
      // setColumns((prev) => ({
      //     ...prev,
      //     [colId]: prev[colId].map((i) => (i.id === selectedLead.id ? { ...i, ...data } : i)),
      // }));
    } else {
      const id = Math.random().toString(36).substring(2, 9);
      const newLead = { ...data, id, column: "Lead" } as LeadData;
      // setColumns((prev) => ({ ...prev, Lead: [...prev.Lead, newLead] }));
    }
    setIsSheetOpen(false);
  };

  const handleEditTask = (lead: LeadData) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };
  return (
    <div className="space-y-8 text-white animate-in fade-in duration-500 p-4 pt-6  rounded-xl">

      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-black tracking-tighter text-white">
          Corporate Engagements
        </h2>
      </div>


      {/* Corporate Deals Table */}
      <div className="overflow-hidden rounded-[24px] border border-zinc-800 bg-zinc-950/50 shadow-2xl">
        <Table className="w-full">
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="py-5 px-6 text-base font-semibold text-white">Company & Location</TableHead>
              <TableHead className="py-5 text-base font-semibold text-white">Event Date & Time</TableHead>
              <TableHead className="py-5 text-base font-semibold text-white">Collaboration</TableHead>
              <TableHead className="py-5 text-base font-semibold text-white">Net Pay</TableHead>
              <TableHead className="py-5 text-base font-semibold text-white w-[180px]">Action</TableHead>
              <TableHead className="py-5 text-base font-semibold text-white text-center">More Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CORPORATE_DEALS.map((deal) => (
              <TableRow key={deal.id} className="border-zinc-900 hover:bg-zinc-800/40 transition-colors group">
                {/* Company Name & Location */}
                <TableCell className="px-6 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {deal.company}, {deal.location}
                </TableCell>

                {/* Date & Time */}
                <TableCell className="text-sm font-medium text-zinc-300 ">
                  {format(new Date(deal.date), "dd MMM yyyy, hh:mm a")}
                </TableCell>

                {/* Collaboration Tags */}
                <TableCell className="text-sm font-medium text-zinc-300">
                  {deal.collab.length > 2
                    ? `${deal.collab.slice(0, 2).join(", ")} + ${deal.collab.length - 2} more`
                    : deal.collab.join(", ")}
                </TableCell>

                {/* Net Pay Highlight */}
                <TableCell className="py-5 text-sm font-bold text-emerald-400 tabular-nums">
                  {formatCompactNumber(deal.net)}
                </TableCell>

                {/* Status Action */}
                <TableCell className="py-5">
                  <Select defaultValue={deal.status}>
                    <SelectTrigger className="h-10 bg-zinc-900 border-zinc-800 text-sm text-zinc-300 rounded-xl focus:ring-zinc-700 transition-all">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl shadow-2xl">
                      <SelectItem value="Completed" className="text-sm focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer">
                        Completed
                      </SelectItem>
                      <SelectItem value="Canceled" className="text-sm focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer">
                        Canceled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Info Button */}
                <TableCell className="py-5 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 rounded-full transition-all"
                    title="More Information"
                    onClick={() => handleEditTask(DUMMY_LEADS.Deal[0])}
                  >
                    <Info size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {/* INCREASED WIDTH TO 800PX */}
        <SheetContent className="sm:max-w-4xl min-w-3xl bg-zinc-950 border-zinc-800 text-zinc-100 overflow-y-auto p-0">
          <KanbanForm
            initialData={selectedLead}
            onSave={onSave}
            onCancel={() => setIsSheetOpen(false)}
            speakerView={true}
            speakerId={"emily-rivera"}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}