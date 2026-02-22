"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileText, Scale, AlertCircle } from "lucide-react";

export function TravelerPolicy() {
  return (
    <div className="bg-black text-zinc-300">
      <Card className="mx-auto bg-zinc-950">
        <CardHeader className="px-10 border-b border-zinc-900 bg-zinc-900/20">
          <CardTitle className="text-4xl font-bold text-white mb-4">
            100 Degree Club - Traveller
          </CardTitle>
          <p className="text-sm text-zinc-500 leading-relaxed">
            These terms outline the refund, document, safety, and conduct policies,
            and privacy statement for travellers using the 100 Degree Club software.
          </p>
        </CardHeader>

        <CardContent className="p-10 space-y-12">
          
          {/* Section 1: Ticket Refund Policy */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">01.</span>
              <h3 className="text-lg font-bold text-white">Ticket Refund Policy</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>All bookings are non-refundable once the ticket is issued.</li>
                    <li>Refunds are only allowed if the camp partner cancels the event.</li>
                    <li>If the event is cancelled: The full ticket amount (minus PG charges, card fees, and software charges) will be refunded to the customer.</li>
                </ol>
                <p className="text-xs text-zinc-500 mt-2 block">Refund may take 10 to 15 working days, depending on the bank/payment gateway.</p>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 2: International Bookings */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">02.</span>
              <h3 className="text-lg font-bold text-white">International Bookings</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">Refunds for international bookings will follow:</p>
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Payment gateway policy</li>
                    <li>Currency conversion rules</li>
                    <li>FX losses (if any) during refund will be borne by the customer.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 3: Document Submission Policy */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">03.</span>
              <h3 className="text-lg font-bold text-white">Document Submission Policy</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">Seat is confirmed only after:</p>
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Ticket purchase</li>
                    <li>Mandatory document submission (ID proof / consent forms)</li>
                    <li>If documents are not submitted within the given time, the booking may be auto cancelled without a refund.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 4: Safety & Liability Terms */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">04.</span>
              <h3 className="text-lg font-bold text-white">Safety & Liability Terms</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">100 Degree Club is only a technology partner connecting travellers and camp partners. All camps are run by independent partners responsible for:</p>
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Safety</li>
                    <li>Execution</li>
                    <li>On-ground management</li>
                    <li>Travellers must follow all safety instructions provided by the camp team.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 5: No-Show Policy */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">05.</span>
              <h3 className="text-lg font-bold text-white">No-Show Policy</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">If the traveller does not show up for the camp, no refund or reschedule will be provided.</p>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 6: Code of Conduct */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">06.</span>
              <h3 className="text-lg font-bold text-white">Code of Conduct</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">Travellers must follow camp partner rules</p>
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Local laws</li>
                    <li>Safety guidelines</li>
                    <li>Any behavioural violation may result in immediate removal from the camp without refund.</li>
                </ol>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 7: Force Majeure */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">07.</span>
              <h3 className="text-lg font-bold text-white">Force Majeure</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">No refunds or compensation if cancellation happens because of:</p>
                <ol className="list-decimal pl-4 text-zinc-400 space-y-1">
                    <li>Natural disasters</li>
                    <li>Weather issues</li>
                    <li>Government restrictions</li>
                    <li>Political unrest</li>
                    <li>Any situation beyond our control</li>
                </ol>
                <p className="text-xs text-zinc-500 mt-2 block">However, we will help reschedule whenever possible.</p>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Section 8: Dispute Resolution */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-bold text-sm">08.</span>
              <h3 className="text-lg font-bold text-white">Dispute Resolution</h3>
            </div>
            <div className="pl-6 space-y-4 border-l border-zinc-900 text-sm">
                <p className="text-zinc-400">All disputes will be handled under the jurisdiction of Mumbai, Maharashtra. Issues should first be raised through 100 Degree Club support, then escalated if needed.</p>
            </div>
          </section>

          <Separator className="bg-zinc-900" />

          {/* Abbreviations & Privacy Policy */}
          <section className="grid md:grid-cols-1 gap-10 pt-4 text-sm text-zinc-500">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <FileText className="w-4 h-4 text-cyan-600" /> 
                <span className="font-bold">Abbreviations</span>
              </div>
              <ul className="text-sm space-y-1">
                <li>PG: Payment Gateway</li>
                <li>FX: Foreign Exchange</li>
                <li>ID: Identity Proof</li>
                <li>Software Charges: 100 Degree Club platform fee for managing</li>
              </ul>
            </div>
            <Separator className="bg-zinc-900" />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span className="font-bold">Privacy Policy</span>
              </div>
              <p className="text-zinc-400">100 Degree Club is a software that collects user information, including name, contact details, identity documents, payment information, and app usage data, to process bookings, verify documents, ensure participant safety, and perform internal analytics to improve our services. All personal data is stored securely and is never sold. Information may be shared with camp partners or payment processors solely to facilitate bookings or as required by law. Users have the right to access, correct, or request deletion of their personal data at any time.</p>
              <p className="text-zinc-400 mt-2">We use the data for internal analytics to improve software performance, user experience, and safety. In the event of a data breach, 100 Degree Club will take all necessary steps to investigate, contain, and remediate the breach, and inform affected users as required by applicable law.</p>
              <h4 className="font-bold text-white mb-2 mt-4">Liability Disclaimer:</h4>
              <p className="text-zinc-400">100 Degree Club connects travellers with independent camp partners but does not control or supervise the actions, safety, or conduct of camp partners or participants. Attendance at any camp is at the traveller’s own risk. Users must comply with all safety instructions and guidelines provided by camp partners. 100 Degree Club shall not be liable for any accidents, injuries, losses, or damages incurred during participation in any camp.</p>
              <p className="text-zinc-400 mt-2">By using 100 Degree Club, users acknowledge and agree to this Privacy & Liability Policy.</p>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}