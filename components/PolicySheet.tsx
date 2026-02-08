"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PolicySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicySheet({ isOpen, onClose }: PolicySheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="min-w-[600px] bg-zinc-900  text-zinc-300 border-l border-border rounded-l-2xl">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-2xl font-bold">Policy</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="w-6 h-6" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="p-4 text-zinc-400 space-y-4 overflow-y-auto h-full pb-20">
            <h3 className="text-xl font-bold mb-2">1. Ticket Refund Policy</h3>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>All bookings are non-refundable once the ticket is issued.</li>
                <li>Refunds are only allowed if the host cancels the event.</li>
                <li>If the event is cancelled: The full ticket amount (minus PG charges, card fees, and software charges) will be refunded to the customer.</li>
            </ol>
            <p className="text-sm italic mt-2">Refund may take 10 to 15 working days, depending on the bank/payment gateway.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">2. International Bookings</h3>
            <p>Refunds for international bookings will follow:</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>Payment gateway policy</li>
                <li>Currency conversion rules</li>
                <li>FX losses (if any) during refund will be borne by the customer.</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-2">3. Document Submission Policy</h3>
            <p>Seat is confirmed only after:</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>Ticket purchase</li>
                <li>Mandatory document submission (ID proof / consent forms)</li>
                <li>If documents are not submitted within the given time, the booking may be auto cancelled without a refund.</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-2">4. Safety & Liability Terms</h3>
            <p>100 Degree Club is only a technology partner connecting travellers and camp hosts. All camps are run by independent hosts responsible for:</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>Safety</li>
                <li>Execution</li>
                <li>On-ground management</li>
                <li>Travellers must follow all safety instructions provided by the camp team.</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-2">5. No-Show Policy</h3>
            <p>If the traveller does not show up for the camp, no refund or reschedule will be provided.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">6. Code of Conduct</h3>
            <p>Travellers must follow camp host rules</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>Local laws</li>
                <li>Safety guidelines</li>
                <li>Any behavioural violation may result in immediate removal from the camp without refund.</li>
            </ol>

            <h3 className="text-xl font-bold mt-6 mb-2">7. Force Majeure</h3>
            <p>No refunds or compensation if cancellation happens because of:</p>
            <ol className="list-decimal list-inside space-y-1 pl-4">
                <li>Natural disasters</li>
                <li>Weather issues</li>
                <li>Government restrictions</li>
                <li>Political unrest</li>
                <li>Any situation beyond our control</li>
            </ol>
            <p className="text-sm italic mt-2">However, we will help reschedule whenever possible.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">8. Dispute Resolution</h3>
            <p>All disputes will be handled under the jurisdiction of Mumbai, Maharashtra. Issues should first be raised through 100 Degree Club support, then escalated if needed.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">Full Forms / Abbreviations</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>PG</strong> = Payment Gateway</li>
                <li><strong>FX</strong> = Foreign Exchange</li>
                <li><strong>ID</strong> = Identity Proof</li>
                <li><strong>Software Charges</strong> = 100 Degree Club platform fee for managing</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-2">100 Degree Club – Privacy Policy</h3>
            <p>100 Degree Club is a software that collects user information, including name, contact details, identity documents, payment information, and app usage data, to process bookings, verify documents, ensure participant safety, and perform internal analytics to improve our services. All personal data is stored securely and is never sold. Information may be shared with hosts or payment processors solely to facilitate bookings or as required by law. Users have the right to access, correct, or request deletion of their personal data at any time.</p>
            <p className="mt-2">We use the data for internal analytics to improve software performance, user experience, and safety. In the event of a data breach, 100 Degree Club will take all necessary steps to investigate, contain, and remediate the breach, and inform affected users as required by applicable law.</p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Liability Disclaimer:</h4>
            <p>100 Degree Club connects travellers with independent hosts but does not control or supervise the actions, safety, or conduct of hosts or participants. Attendance at any camp is at the traveller’s own risk. Users must comply with all safety instructions and guidelines provided by hosts. 100 Degree Club shall not be liable for any accidents, injuries, losses, or damages incurred during participation in any camp.</p>
            <p className="mt-2">By using 100 Degree Club, users acknowledge and agree to this Privacy & Liability Policy.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}