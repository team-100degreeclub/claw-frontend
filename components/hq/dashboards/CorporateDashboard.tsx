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

// Mock data for individual host's corporate deals
const CORPORATE_DEALS = [
  { 
    id: "1", 
    company: "Tech Corp Inc.", 
    location: "London, UK", 
    date: "12 Mar 2026", 
    gross: "₹2,50,000", 
    net: "₹1,85,000", 
    status: "Completed" 
  },
  { 
    id: "2", 
    company: "Global Logistics", 
    location: "New York, USA", 
    date: "25 Mar 2026", 
    gross: "₹1,80,000", 
    net: "₹1,42,000", 
    status: "Canceled" 
  },
];

export default function CorporateDashboard() {
  return (
    <div className="space-y-8 text-white animate-in fade-in duration-500 p-4 pt-6  rounded-xl">
      
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-black tracking-tighter text-white">
          Corporate Engagements
        </h2>
      </div>

      {/* Corporate Deals Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-zinc-900/80">
            <TableRow className="border-zinc-800 text-xs font-black text-zinc-500 tracking-widest hover:bg-transparent">
              <TableHead className="py-4">Company Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead >Gross</TableHead>
              <TableHead className="text-cyan-400">Net</TableHead>
              <TableHead className="w-[180px]">Status</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs font-medium">
            {CORPORATE_DEALS.map((deal) => (
              <TableRow key={deal.id} className="border-zinc-800 hover:bg-zinc-800/40 transition-colors">
                <TableCell className="font-bold text-white py-5">{deal.company}</TableCell>
                <TableCell className="text-zinc-400">{deal.location}</TableCell>
                <TableCell className="text-zinc-500">{deal.date}</TableCell>
                <TableCell className="font-black text-zinc-300">{deal.gross}</TableCell>
                <TableCell className="font-black text-emerald-400">{deal.net}</TableCell>
                <TableCell>
                  <Select defaultValue={deal.status}>
                    <SelectTrigger className="h-9 bg-zinc-950 border-zinc-800 text-xs text-zinc-200 ring-offset-zinc-950 focus:ring-1 focus:ring-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800 text-white shadow-2xl">
                      <SelectItem value="Completed" className="text-xs focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer">
                        Completed
                      </SelectItem>
                      <SelectItem value="Canceled" className="text-xs focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                        Canceled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-zinc-600 hover:text-cyan-400 hover:bg-zinc-900 rounded-full transition-all"
                    title="More Information"
                  >
                    <Info size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}