"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileText, Scale, AlertCircle } from "lucide-react";

export function HostPolicy() {
  return (
    <div className="bg-black text-zinc-300">
      <Card className="mx-auto bg-zinc-950">
        <CardHeader className="px-10 border-b border-zinc-900 bg-zinc-900/20">
          {/* <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-cyan-600" />
            <span className="text-xs font-bold text-cyan-600">Platform Governance</span>
          </div> */}
          <CardTitle className="text-4xl font-bold text-white mb-4">
            100 Degree Club
          </CardTitle>
          <p className="text-sm text-zinc-500 leading-relaxed">
            These terms explain how money, cancellations, documents, safety, privacy, and settlements work on the 100 Degree Club software. Clear, simple, and built for trust.
          </p>
        </CardHeader>

        <CardContent className="p-10 space-y-12">
          
          {/* Section 1 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">01.</span>
              <h3 className="text-lg font-bold text-white">Money From Traveler Booking</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900">
              <p className="text-sm">When a traveler books a seat, the software receives the amount <strong>minus</strong>:</p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                <li className="bg-zinc-900 p-3">PG / Card fees</li>
                <li className="bg-zinc-900 p-3">FX rate (for international bookings)</li>
                <li className="bg-zinc-900 p-3">Software fees: 10%</li>
                <li className="bg-zinc-900 p-3">GST (collected and paid by 100 Degree Club)</li>
              </ul>
              <ol className="list-decimal list-outside pl-4 space-y-3 text-sm leading-relaxed">
                <li>Money stays in the software until document verification and compliance checks are completed.</li>
                <li>If the same buyer purchases multiple tickets, each seat is confirmed only after documents are uploaded for each traveler.</li>
                <li>A camp can go live only after the host profile, is fully completed and approved.</li>
                <li>Every camp has a <strong>mandatory 48-hour edit buffer</strong> before going live.
                  <p className="text-xs text-zinc-500 mt-2 block">(This allows hosts to update details before the camp becomes visible.)</p>
                </li>
              </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 2 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">02.</span>
              <h3 className="text-lg font-bold text-white">Host Settlement & Refunds</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900">
              <div className="bg-cyan-900/10 border border-cyan-900/20 p-4">
                <p className="text-sm text-cyan-400 font-bold">Host Settlement = Booking Amount − PG fees − Software fees (10%) − GST.</p>
              </div>
              <ol className="list-decimal list-outside pl-4 space-y-3 text-sm leading-relaxed">
                <li>All settlements are made in <strong>INR</strong>, using the applicable FX rate for international bookings.</li>
                <li>Settlement reports include:
                    <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                        <li>Payment breakdown</li>
                        <li>PG charges</li>
                        <li>GST (domestic)</li>
                        <li>Software fees: 10%</li>
                    </ul>
                </li>
                <li>If a camp is cancelled: <strong>Refund = Ticket price − PG fees - FX − Software fees (10%) − GST.</strong></li>
                <li>For international refunds, any FX loss is borne by the traveler.</li>
                <li>If settlement has already reached the host's bank account before cancellation, the host must return the amount within 2 working days.</li>
                <li>Standard host payout timeline is 7 to 10 working days after camp completion and compliance approval.</li>
              </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 3 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">03.</span>
              <h3 className="text-lg font-bold text-white">Cancellation Policy</h3>
            </div>
            <div className="pl-6 space-y-8 border-l border-zinc-900">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-100">Host Cancellations</h4>
                <ul className="list-disc pl-4 text-sm text-zinc-400 space-y-1">
                  <li>Must be reported immediately at support@100degree.host.</li>
                  <li>Delay in returning funds may result in withheld settlements or compliance action.</li>
                  <li>Repeated cancellations may lead to temporary suspension.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-100">Traveler Cancellations / No-Show</h4>
                <ul className="list-disc pl-4 text-sm text-zinc-400 space-y-1">
                  <li>Travelers cannot cancel once a ticket is booked.</li>
                  <li>Refunds are issued only if the host cancels.</li>
                  <li>No refunds or reschedules for no-shows.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-zinc-100">International Bookings</h4>
                <ul className="list-disc pl-4 text-sm text-zinc-400 space-y-1">
                  <li>All refunds follow PG rules and FX rates.</li>
                  <li>No GST applies on international bookings.</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 4 */}
          <section className="space-y-6">
             <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">04.</span>
              <h3 className="text-lg font-bold text-white">Document Compliance</h3>
            </div>
            <div className="pl-6 space-y-6 border-l border-zinc-900 text-sm">
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>A seat is confirmed only after ticket purchase <strong>and</strong> document submission.</li>
                    <li>Missing or incorrect documents may result in <strong>automatic cancellation without refund</strong>.</li>
                    <li>Missing or incorrect documents can result in <strong>auto-cancellation without refund</strong>.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 5 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">05.</span>
              <h3 className="text-lg font-bold text-white">Safety, Liability & Conduct</h3>
            </div>
            <div className="pl-6 space-y-8 border-l border-zinc-900">
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-100">5.1 Safety & Liability</h4>
                    <ol className="list-decimal pl-4 text-sm text-zinc-400 space-y-1">
                        <li>Hosts are fully responsible for:
                            <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                                <li>Safety</li>
                                <li>Staff & equipment</li>
                                <li>Logistics & on-ground management</li>
                                <li>Basic insurance coverage for high-risk activities</li>
                            </ul>
                        </li>
                        <li>Travelers must follow all instructions shared by the host.</li>
                        <li>Travelers are responsible for their medical fitness, reporting any health conditions, and carrying personal medication.</li>
                        <li><p className="text-zinc-200 font-bold inline">100 Degree Club is not responsible or liable for any incident, injury, damage, or loss that occurs during the camp.</p></li>
                    </ol>
                </div>
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-100">5.2 Code of Conduct</h4>
                    <ol className="list-decimal pl-4 text-sm text-zinc-400 space-y-1">
                        <li>Travelers must follow camp rules, local laws, and safety instructions.</li>
                        <li>Misconduct may result in immediate removal from the camp without refund.</li>
                    </ol>
                </div>
                <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-100">5.3 Force Majeure</h4>
                    <ol className="list-decimal pl-4 text-sm text-zinc-400 space-y-1">
                        <li>No refunds for natural disasters, weather, government restrictions, political situations, or events beyond control.</li>
                        <li>The software may assist with rescheduling only with host approval.</li>
                    </ol>
                </div>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 6 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">06.</span>
              <h3 className="text-lg font-bold text-white">Fraud & Misuse Prevention</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Suspicious bookings may be paused, investigated, or have settlements withheld.</li>
                    <li>Patterns showing unusual activity or repeated transactions may trigger manual verification.</li>
                    <li>Travelers and hosts must report any suspicious or fraudulent activity.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 7 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">07.</span>
              <h3 className="text-lg font-bold text-white">Data & Privacy</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Data is used only for bookings, payments, compliance, and internal analytics.</li>
                    <li>Data is never sold or shared with third parties for marketing.</li>
                    <li>In case of any data-related issue or breach, 100 Degree Club will investigate, fix, and notify affected users.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 8 */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">08.</span>
              <h3 className="text-lg font-bold text-white">Dispute Resolution & Jurisdiction</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>All disputes fall under Mumbai jurisdiction.</li>
                    <li>Users must first raise an issue via platform support before taking legal action.</li>
                    <li>All settlement logs and payment records generated by the software are treated as final and binding.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Abbreviations */}
          <section className="grid md:grid-cols-1 gap-10 pt-4 text-sm text-zinc-500">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <Scale className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">Jurisdiction</span>
              </div>
              <p>All disputes fall under Mumbai jurisdiction. Users must first raise an issue via platform support before taking legal action.</p>
            </div>
            <Separator className="bg-zinc-900" />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">Abbreviations</span>
              </div>
              <ul className="text-sm space-y-1">
                <li>PG: Payment Gateway</li>
                <li>FX: Foreign Exchange</li>
                <li>ID: Identity Proof</li>
                <li>Software Fees: 10% software charge for managing bookings</li>
                <li>GST: Goods and Services Tax collected and paid by 100 Degree Club</li>
              </ul>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}