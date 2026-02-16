"use client";

import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { CampTable } from "./camps/CampTable";

// Mock data for the host's assigned camps
const CAMP_DATA = [
  { 
    id: "1", 
    name: "Spirit Road Alpha", 
    location: "Ladakh, IN", 
    collaboration: "Solo", 
    scheduled: "22 Mar 2026", 
    status: "Live", 
    tickets: "45/50" 
  },
  { 
    id: "2", 
    name: "Vertical Air Drop", 
    location: "Bir Billing, IN", 
    collaboration: "Major Karan", 
    scheduled: "05 Apr 2026", 
    status: "Pre-registration", 
    tickets: "12/100" 
  },
  { 
    id: "3", 
    name: "Deep Water Survival", 
    location: "Andaman, IN", 
    collaboration: "Solo", 
    scheduled: "15 Jan 2026", 
    status: "Completed", 
    tickets: "50/50" 
  },
];


export default function HostCampsDashboard() {
  return (
    <CampTable profile={null}/>
  )
  return (
    <div className="space-y-8 pb-20 text-white animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="border-b border-zinc-800 pb-6">
        <h2 className="text-2xl font-black   tracking-tighter">
          Camps
        </h2>
        {/* <p className="text-xs text-zinc-500 font-bold  tracking-widest mt-1">
          Personal Schedule & Ticket Allocation Intelligence
        </p> */}
      </div>

      {/* Camps Table */}
      <div className="bg-zinc-900/20 border border-zinc-700 rounded-none overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 text-[10px]  font-black text-zinc-500 tracking-widest hover:bg-transparent">
              <TableHead>Camp Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Collaboration</TableHead>
              <TableHead>Scheduled</TableHead>
              <TableHead className="w-[180px]">Status</TableHead>
              <TableHead className="text-right">Tickets Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs font-medium">
            {CAMP_DATA.map((camp) => (
              <TableRow key={camp.id} className="border-zinc-800 hover:bg-zinc-800/20 transition-colors">
                <TableCell className="font-bold text-white py-4 ">{camp.name}</TableCell>
                <TableCell className="text-zinc-400">{camp.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px]  border-zinc-700 text-zinc-400 rounded-none">
                    {camp.collaboration}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-400">{camp.scheduled}</TableCell>
                <TableCell>
                    {camp.status}
                  {/* <Select defaultValue={camp.status}>
                    <SelectTrigger className="h-8 bg-zinc-950 border-zinc-800 text-[10px]  font-black tracking-tighter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="Pre-registration" className="text-[10px]  font-bold">Pre-registration</SelectItem>
                      <SelectItem value="Live" className="text-[10px]  font-bold text-cyan-400">Live</SelectItem>
                      <SelectItem value="Completed" className="text-[10px]  font-bold text-emerald-400">Completed</SelectItem>
                      <SelectItem value="Canceled" className="text-[10px]  font-bold text-red-400">Canceled</SelectItem>
                    </SelectContent>
                  </Select> */}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-black text-white">{camp.tickets}</span>
                    {/* <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${(parseInt(camp.tickets.split('/')[0]) / parseInt(camp.tickets.split('/')[1])) * 100}%` }}
                      />
                    </div> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}