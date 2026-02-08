"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  Copy,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  CheckCircle2,
  AlertCircle,
  ReceiptText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

// --- Simple Professional Data ---
const CAMP_BOOKINGS = [
  {
    id: "c1",
    name: "Himalayan Winter Camp",
    startDate: "2026-12-10",
    endDate: "2026-12-15",
    location: "Leh, Ladakh",
    meetingPoint: "Leh Airport Arrival Terminal",
    meetingTime: "2026-12-10T09:00:00",
    totalSeats: 4,
    confirmedSeats: 2,
    documentLink: "https://100degree.club/upload/c1-user-123",
    travellers: [
      { ticket: "T-8821", name: "Abhishek Verma", age: 29, gender: "Male", status: "Confirmed", hasDocs: true },
      { ticket: "T-8822", name: "Tiju Lukose", age: 31, gender: "Male", status: "Pending", hasDocs: false },
    ],
    payment: {
      basePrice: 45000,
      totalTickets: 2,
      pg: "1.5%",
      softwarCharges: "10%",
      tax: "18%",
      discount: 0,
      total: 116000
    }
  },
  {
    id: "c2",
    name: "Desert Adventure Event",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    location: "Jaisalmer, Rajasthan",
    meetingPoint: "The Golden Fort Entrance",
    meetingTime: "2026-11-05T06:00:00",
    totalSeats: 2,
    confirmedSeats: 2,
    documentLink: "https://100degree.club/upload/c2-user-456",
    travellers: [
      { ticket: "T-7740", name: "Sarah Jenkins", age: 27, gender: "Female", status: "Confirmed", hasDocs: true },
    ],
    payment: {
      basePrice: 32000,
      totalTickets: 1,
      pg: "1.5%",
      softwarCharges: "10%",
      tax: "18%",
      discount: 0,
      total: 42102.40
    }
  }
];

export default function TicketDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24 ">
      {/* Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b border-zinc-800 px-40 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Tickets</h1>
        </div>
        <div className="flex items-center gap-2">
          {/*
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
          <Share2 className="h-4 w-4 mr-2" /> Share all details
          </Button> */}
          <p className="text-sm text-zinc-500">Filter by:</p>
          <Toggle className={cn(
            // Base Styling (Light Mode & General)
            "px-6 py-2 h-auto rounded-full font-black text-[12px] transition-all duration-300",
            "border-2 border-zinc-200 bg-transparent text-white hover:bg-zinc-100 hover:text-black",

            // Dark Mode Styling
            "dark:border-zinc-800 dark:text-white",
            "dark:hover:bg-zinc-800 dark:hover:text-white ",

            // Active/Pressed State (Red Bull / CLAW Red)
            "data-[state=on]:bg-blue-600 data-[state=on]:border-blue-600 data-[state=on]:text-white dark:data-[state=on]:text-white",
            "dark:data-[state=on]:hover:text-white",
            "data-[state=on]:scale-110 data-[state=on]:zoom-in-95 data-[state=on]:duration-300",

            "hover:cursor-pointer",
          )}>Past</Toggle>
          <Toggle className={cn(
            // Base Styling (Light Mode & General)
            "px-6 py-2 h-auto rounded-full font-black text-[12px] transition-all duration-300",
            "border-2 border-zinc-200 bg-transparent text-white hover:bg-zinc-100 hover:text-black",

            // Dark Mode Styling
            "dark:border-zinc-800 dark:text-white",
            "dark:hover:bg-zinc-800 dark:hover:text-white ",

            // Active/Pressed State (Red Bull / CLAW Red)
            "data-[state=on]:bg-blue-600 data-[state=on]:border-blue-600 data-[state=on]:text-white dark:data-[state=on]:text-white",
            "dark:data-[state=on]:hover:text-white",
            "data-[state=on]:scale-110 data-[state=on]:zoom-in-95 data-[state=on]:duration-300",

            "hover:cursor-pointer",
          )}>Live</Toggle>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 space-y-20">
        {CAMP_BOOKINGS.map((camp) => (
          <div key={camp.id} className="space-y-8">
            {/* Header Area */}
            <div className="flex items-end justify-between border-b border-zinc-800 pb-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">{camp.name}</h2>
                <div className="flex gap-6 text-sm text-zinc-400 font-light">
                  <div className="flex items-center gap-2 text-blue-500 hover:cursor-pointer underline"><MapPin className="h-4 w-4 text-zinc-500" /> {camp.location}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-zinc-500" /> {new Date(camp.startDate).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</div>
                </div>
              </div>
              <Button variant="link" className="text-zinc-400 hover:text-white p-0 h-auto">
                Visit camp page <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar: Details and Payment (Left 1/4) */}
              <div className="lg:col-span-1 space-y-6">

                {/* Check-in Details */}
                {/* <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xs font-semibold text-zinc-5  00 mb-5 tracking-wide">Camp information</h3>
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div className="p-2.5 bg-zinc-800 rounded-xl h-fit"><Clock className="h-4 w-4 text-zinc-400" /></div>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-medium">Meeting time</p>
                        <p className="text-sm font-medium">{new Date(camp.meetingTime).toLocaleTimeString([], { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" })}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2.5 bg-zinc-800 rounded-xl h-fit"><MapPin className="h-4 w-4 text-zinc-400" /></div>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-medium">Meeting point</p>
                        <p className="text-sm font-medium text-blue-500 hover:cursor-pointer underline">{camp.meetingPoint}</p>
                      </div>
                    </div>
                  </div>
                </Card> */}

                {/* Payment Breakdown */}
                <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <ReceiptText className="h-4 w-4 text-zinc-500" />
                    <h3 className="text-xs font-semibold text-zinc-500 tracking-wide">Payment breakdown</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Ticket Price</span>
                      <span>₹{camp.payment.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Total Tickets</span>
                      <span>{camp.payment.totalTickets}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Payment Gateway Charges</span>
                      <span>{camp.payment.pg}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Software Charges</span>
                      <span>{camp.payment.softwarCharges}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Taxes (GST)</span>
                      <span>{camp.payment.tax.toLocaleString()}</span>
                    </div>
                    {camp.payment.discount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-500">
                        <span>Discount applied</span>
                        <span>- ₹{camp.payment.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 mt-3 border-t border-zinc-800 flex justify-between items-end">
                      <span className="text-sm font-medium">Total paid</span>
                      <span className="text-xl font-bold text-green-500">₹{camp.payment.total.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main Content: Travellers Table (Right 3/4) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-800/40 text-zinc-500 text-[11px] font-semibold border-b border-zinc-800">
                      <tr>
                        <th className="px-8 py-5">Ticket id</th>
                        <th className="px-8 py-5">Traveller name</th>
                        <th className="px-8 py-5">Verification</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {camp.travellers.map((t, i) => (
                        <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                          <td className="px-8 py-5 font-mono text-xs text-zinc-500">{t.ticket}</td>
                          <td className="px-8 py-5">
                            <p className="font-medium text-zinc-200">{t.name}</p>
                            <p className="text-[11px] text-zinc-500 mt-0.5">{t.age} years • {t.gender}</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${t.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                              {t.status === 'Confirmed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                              {t.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            {t.hasDocs ? (
                              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                <Download className="h-4 w-4 mr-2" /> Ticket
                              </Button>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/5">
                                    <AlertCircle className="h-4 w-4 mr-2" /> Upload docs
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                                  <DialogHeader>
                                    <DialogTitle>Complete traveller details</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-6 space-y-4">
                                    <p className="text-sm text-zinc-400 font-light">Share this link with {t.name} to upload their identification documents.</p>
                                    <div className="flex gap-2">
                                      <Input readOnly value={camp.documentLink} className="bg-zinc-950 border-zinc-800 h-11" />
                                      <Button variant="outline" className="border-zinc-800 h-11 px-4"><Copy className="h-4 w-4" /></Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Section Footer Buttons */}
                {/* <div className="flex items-center justify-between px-2">
                  <div className="flex gap-4">
                    <Button className="bg-zinc-100 text-zinc-950 hover:bg-white font-semibold rounded-xl px-6">
                      <Ticket className="h-4 w-4 mr-2" /> Book more seats
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-400 rounded-xl px-6">
                      Download all invoices
                    </Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}