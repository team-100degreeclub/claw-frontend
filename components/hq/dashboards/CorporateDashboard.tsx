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
    <div className="space-y-8 pb-20 text-white animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="border-b border-zinc-800 pb-6">
        <h2 className="text-2xl font-black   tracking-tighter">
          Corporate Engagements
        </h2>
        {/* <p className="text-xs text-zinc-500 font-bold  tracking-widest mt-1">
          Individual Deal Tracking & Status Management
        </p> */}
      </div>

      {/* Corporate Deals Table */}
      <div className="bg-zinc-900/20 border border-zinc-700 rounded-none overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 text-[10px]  font-black text-zinc-500 tracking-widest hover:bg-transparent">
              <TableHead>Company Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Gross</TableHead>
              <TableHead className="text-right text-cyan-500">Net</TableHead>
              <TableHead className="w-[180px]">Status</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs font-medium">
            {CORPORATE_DEALS.map((deal) => (
              <TableRow key={deal.id} className="border-zinc-800 hover:bg-zinc-800/20 transition-colors">
                <TableCell className="font-bold text-white py-4">{deal.company}</TableCell>
                <TableCell className="text-zinc-400">{deal.location}</TableCell>
                <TableCell className="text-zinc-400 font-mono">{deal.date}</TableCell>
                <TableCell className="text-right font-black">{deal.gross}</TableCell>
                <TableCell className="text-right font-black text-emerald-500">{deal.net}</TableCell>
                <TableCell>
                  <Select defaultValue={deal.status}>
                    <SelectTrigger className="h-8 bg-zinc-950 border-zinc-800 text-[10px]  font-black tracking-tighter ring-offset-zinc-950 focus:ring-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                      <SelectItem value="Completed" className="text-[10px]  font-bold focus:bg-emerald-500/20 focus:text-emerald-400">
                        Completed
                      </SelectItem>
                      <SelectItem value="Canceled" className="text-[10px]  font-bold focus:bg-red-500/20 focus:text-red-400">
                        Canceled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-zinc-500 hover:text-cyan-400 hover:bg-zinc-800"
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