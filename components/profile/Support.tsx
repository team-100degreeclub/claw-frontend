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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Ticket } from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  details: string;
  createdAt: Date;
  status: "Open" | "Closed";
}

export default function Support() {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      subject: "Access to Siachen Module",
      category: "Technical",
      details: "Unable to load the high-altitude training video.",
      createdAt: new Date("2026-02-20T10:30:00"),
      status: "Open",
    },
    {
      id: "2",
      subject: "Registration Query",
      category: "General",
      details: "Wanted to know the last date for volunteer sign-ups.",
      createdAt: new Date("2026-02-18T02:15:00"),
      status: "Closed",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newTicket: SupportTicket = {
      id: Math.random().toString(36).substr(2, 9),
      subject: formData.get("subject") as string,
      category: formData.get("category") as string,
      details: formData.get("details") as string,
      createdAt: new Date(),
      status: "Open",
    };

    setTickets([newTicket, ...tickets]);
    setIsOpen(false);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-zinc-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Support
            </h1>
            {/* <p className="text-sm text-zinc-500">Your Tickets.</p> */}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-none">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">New Support Ticket</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Subject</label>
                    <Input name="subject" placeholder="Brief summary of the issue" className="bg-zinc-900 border-zinc-800 text-white rounded-none" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Category</label>
                    <Select name="category" required>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white rounded-none">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Details</label>
                    <Textarea name="details" placeholder="Describe your issue in detail" className="bg-zinc-900 border-zinc-800 text-white rounded-none min-h-[100px]" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-none w-full">
                    Submit Ticket
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tickets Table */}
        <div className="border border-zinc-900 rounded-none overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 font-bold">Subject</TableHead>
                <TableHead className="text-zinc-400 font-bold">Category</TableHead>
                <TableHead className="text-zinc-400 font-bold">Created At</TableHead>
                <TableHead className="text-zinc-400 font-bold text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} className="border-zinc-900 hover:bg-zinc-950/50 transition-colors cursor-default">
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{ticket.subject}</div>
                      <div className="text-xs text-zinc-500 max-w-md truncate">{ticket.details}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-zinc-400">{ticket.category}</TableCell>
                  <TableCell className="text-xs text-zinc-400">{ticket.createdAt.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })}</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === "Open" 
                        ? "text-yellow-400" 
                        : "text-green-500"
                    }`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {tickets.length === 0 && (
            <div className="py-20 text-center text-zinc-600 text-sm">
              No tickets found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}