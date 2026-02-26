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
  Share2,
  Download,
  ExternalLink,
  Copy,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ReceiptText,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// --- Data Stays Identical ---
const CAMP_BOOKINGS = [
  {
    id: "c1",
    name: "Himalayan Winter Camp",
    startDate: "2026-12-10",
    endDate: "2026-12-15",
    location: "Leh, Ladakh",
    MeetingTime: "2026-12-10T09:00:00",
    travellers: [
      { ticket: "T-8821", name: "Abhishek Verma", age: 29, gender: "Male", status: "Confirmed", hasDocs: true },
      { ticket: "T-8822", name: "Tiju Lukose", age: 31, gender: "Male", status: "Pending", hasDocs: false },
    ],
    payment: { basePrice: 45000, totalTickets: 2, pg: "1.5%", softwarCharges: "10%", tax: "18%", discount: 0, total: 116000 },
    refund: { hasRefund: true, amount: 12000, status: "Processing", requestedDate: "2026-10-15", reason: "Partial cancellation (1 Traveller)" }
  },
  {
    id: "c2",
    name: "Desert Adventure Event",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    location: "Jaisalmer, Rajasthan",
    travellers: [
      { ticket: "T-7740", name: "Sarah Jenkins", age: 27, gender: "Female", status: "Confirmed", hasDocs: true },
    ],
    payment: { basePrice: 32000, totalTickets: 1, pg: "1.5%", softwarCharges: "10%", tax: "18%", discount: 0, total: 42102.40 },
    refund: { hasRefund: false }
  }
];

export default function TicketDashboard() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans pb-24 selection:bg-blue-900">
      {/* Refined Sticky Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-zinc-800/50 px-6 md:px-20 py-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">Your Tickets</h1>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
          <Toggle className="px-5 py-1.5 h-auto rounded-lg text-sm font-medium transition-all data-[state=on]:bg-zinc-800 data-[state=on]:text-white">Past</Toggle>
          <Toggle className="px-5 py-1.5 h-auto rounded-lg text-sm font-medium transition-all data-[state=on]:bg-zinc-800 data-[state=on]:text-white" defaultPressed>Live</Toggle>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 space-y-24">
        {CAMP_BOOKINGS.map((camp) => (
          <section key={camp.id} className="space-y-10 animate-in fade-in duration-700">
            {/* Camp Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/50 pb-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-white tracking-tight">{camp.name}</h2>
                <div className="flex flex-wrap gap-6 text-sm font-medium text-zinc-500">
                  <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer underline">
                    <MapPin className="h-4 w-4" /> {camp.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> 
                    {new Date(camp.startDate).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl px-4" onClick={() => router.push(`/camps/${camp.id}`)}>
                Visit camp page <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
              {/* Sidebar: Financials */}
              <div className="xl:col-span-1 space-y-6">
                <Card className="bg-zinc-950/50 border-zinc-800 rounded-[24px] p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    {/* <ReceiptText className="h-4 w-4 text-zinc-500" /> */}
                    <h3 className="text-base font-semibold text-white">Payment Breakdown</h3>
                  </div>
                  <div className="space-y-4 text-sm font-medium text-zinc-300">
                    <div className="flex justify-between"><span>Base Price</span><span className="text-zinc-200 tabular-nums">₹{camp.payment.basePrice.toLocaleString("en-IN", {currency: "INR"})}</span></div>
                    <div className="flex justify-between"><span>Tickets</span><span className="text-zinc-200 tabular-nums">{camp.payment.totalTickets}</span></div>
                    <div className="flex justify-between"><span>Gateway Fee</span><span className="text-zinc-200 tabular-nums">{camp.payment.pg}</span></div>
                    <div className="flex justify-between"><span>Service Fee</span><span className="text-zinc-200 tabular-nums">{camp.payment.softwarCharges}</span></div>
                    <div className="flex justify-between"><span>GST</span><span className="text-zinc-200 tabular-nums">{camp.payment.tax}</span></div>
                    <div className="pt-4 mt-4 border-t border-zinc-800 flex justify-between items-end">
                      <span className="text-zinc-100">Total Paid</span>
                      <span className="text-2xl font-bold text-emerald-400 tabular-nums">₹{camp.payment.total.toLocaleString("en-IN", {currency: "INR"})}</span>
                    </div>
                  </div>
                </Card>

                {camp.refund.hasRefund && (
                  <Card className="bg-zinc-950/50 border-zinc-800 p-6 rounded-[24px] shadow-sm animate-in zoom-in-95">
                    <div className="flex items-center gap-2 mb-4">
                      {/* <RotateCcw className="h-4 w-4 text-amber-500" /> */}
                      <h3 className="text-sm font-semibold text-white">Refund Status</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-zinc-400">Amount</span>
                        <span className="text-xl font-bold text-zinc-100 tabular-nums">₹{camp.refund.amount?.toLocaleString("en-IN", {currency: "INR"})}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-zinc-500">Processing Status</span>
                         <span className={cn(
                           "text-xs py-1 rounded-full font-bold",
                           camp.refund.status === "Processing" ? "text-amber-500" : "text-emerald-500"
                         )}>
                           {camp.refund.status}
                         </span>
                      </div>
                      {/* <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-4">
                        {camp.refund.reason}
                      </p> */}
                    </div>
                  </Card>
                )}
              </div>

              {/* Main Table: Travellers */}
              <div className="xl:col-span-3">
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-[24px] overflow-hidden shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-900/50 text-white text-base border-b border-zinc-800">
                      <tr>
                        <th className="px-8 py-5 font-normal">Ticket ID</th>
                        <th className="px-8 py-5 font-normal">Traveller</th>
                        <th className="px-8 py-5 font-normal">Status</th>
                        <th className="px-8 py-5 font-normal text-right pr-11">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {camp.travellers.map((t, i) => (
                        <tr key={i} className="hover:bg-zinc-800/30 text-zinc-300 transition-all duration-200 group">
                          <td className="px-8 py-6 text-sm group-hover:text-zinc-300">{t.ticket}</td>
                          <td className="px-8 py-6">
                            <p className="text-sm">{t.name}</p>
                            <p className="text-sm mt-1 font-medium">{t.age} yrs • {t.gender}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "inline-flex items-center gap-2 py-1 rounded-lg text-sm transition-all",
                              t.status === 'Confirmed' ? 'text-emerald-400' : 'text-zinc-300'
                            )}>
                              {/* {t.status === 'Confirmed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />} */}
                              {t.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            {t.hasDocs ? (
                              <Button variant="ghost" size="sm" className="h-10 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl">
                                {/* <Download className="h-4 w-4 mr-2" />  */}
                                Download Ticket
                              </Button>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-10 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-all">
                                    <AlertCircle className="h-4 w-4 mr-2" /> Upload Docs
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-950 border-zinc-800 rounded-[24px] text-white shadow-3xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-xl font-bold">Verification Required</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-6 space-y-6">
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                      {t.name}'s profile is incomplete. Share this secure link for document upload.
                                    </p>
                                    <div className="flex gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                                      <Input readOnly value={"http://localhost:3000/confirm-slot/11"} className="bg-transparent border-0 h-10 text-zinc-400 focus-visible:ring-0" />
                                      <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 h-10 px-4 rounded-lg">
                                        <Copy className="h-4 w-4" />
                                      </Button>
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
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}