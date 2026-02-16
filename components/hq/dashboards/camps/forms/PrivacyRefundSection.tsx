"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Undo2,
  ShieldCheck,
  DollarSign,
  Receipt,
  XCircle,
  ShieldAlert,
  Lock,
  Gavel,
  BookText,
} from "lucide-react";
import { CampFormValues } from "@/lib/types/api";

export type PolicyTab =
  | "money"
  | "settlement"
  | "cancellation"
  | "compliance"
  | "safety"
  | "fraud"
  | "privacy"
  | "disputes";

interface PrivacyRefundSectionProps {
  onCreateCamp: () => void;
  isLoading: boolean;
  isUpdateMode: boolean;
}

const moneyContent = (
  <div className="space-y-6 text-zinc-100">
    <h4 className="font-bold text-xl text-white">
      100 Degree Club
    </h4>
    <p className="text-zinc-400">
      These terms explain how money, cancellations, documents, safety, privacy,
      and settlements work on the 100 Degree Club software. Clear, simple, and
      built for trust.
    </p>
    <div>
      <h4 className="font-semibold text-white">
        Money From Traveler Booking
      </h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>
          When a traveler books a seat, the software receives the amount{" "}
          <strong className="text-white">minus</strong>:
          <ul className="list-[circle] pl-6 mt-1 space-y-1 text-zinc-400">
            <li>PG / Card fees</li>
            <li>FX rate (for international bookings)</li>
            <li>Software fees: 10%</li>
            <li>GST (collected and paid by 100 Degree Club)</li>
          </ul>
        </li>
        <li>
          Money stays in the software until document verification and compliance
          checks are completed.
        </li>
        <li>
          If the same buyer purchases multiple tickets, each seat is confirmed
          only after documents are uploaded for each traveler.
        </li>
        <li>
          A camp can go live only after the camp host profile is fully
          completed and approved.
        </li>
        <li>
          Every camp has a <strong className="text-white">mandatory 48-hour edit buffer</strong> before
          going live. (This allows hosts to update details before the camp
          becomes visible.)
        </li>
      </ul>
    </div>
  </div>
);

const settlementContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">
        Host Settlement & Refunds
      </h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>
          Host Settlement = Booking Amount − PG fees − Software fees (10%) −
          GST.
        </li>
        <li>
          All settlements are made in <strong className="text-white">INR</strong>, using the applicable
          FX rate for international bookings.
        </li>
        <li>
          Settlement reports include:
          <ul className="list-[circle] pl-6 mt-1 space-y-1 text-zinc-400">
            <li>Payment breakdown</li>
            <li>PG charges</li>
            <li>GST (domestic)</li>
            <li>Software fees (10%)</li>
          </ul>
        </li>
        <li>
          If a camp is cancelled: Refund = Ticket price − PG fees - FX −
          Software fees (10%) − GST.
        </li>
        <li>
          For international refunds, any FX loss is borne by the traveler.
        </li>
        <li>
          If settlement has already reached the host's bank account before
          cancellation, the host must return the amount within <span className="text-white">2 working days</span>.
        </li>
        <li>
          Standard host payout timeline is <span className="text-white">7 to 10 working days</span> after camp
          completion and compliance approval.
        </li>
      </ul>
    </div>
  </div>
);

const cancellationContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">Cancellation Policy</h4>
      <div className="pl-6 mt-2 space-y-3 text-zinc-300">
        <div>
          <h5 className="font-medium text-zinc-200">Host Cancellations</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2">
            <li>Must be reported immediately at <span className="text-white underline decoration-zinc-700">support@100degree.host</span>.</li>
            <li>
              Delay in returning funds may result in withheld settlements or
              compliance action.
            </li>
            <li>Repeated cancellations may lead to temporary suspension.</li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-zinc-200">Traveler Cancellations / No-Show</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2">
            <li>Travelers cannot cancel once a ticket is booked.</li>
            <li>Refunds are issued only if the host cancels.</li>
            <li>No refunds or reschedules for no-shows.</li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-zinc-200">International Bookings</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2 text-zinc-400">
            <li>All refunds follow PG rules and FX rates.</li>
            <li>No GST applies on international bookings.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const complianceContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">Document Compliance</h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>
          A seat is confirmed only after ticket purchase <strong className="text-white">and</strong>{" "}
          document submission.
        </li>
        <li>
          Missing or incorrect documents may result in{" "}
          <strong className="text-white">automatic cancellation without refund</strong>.
        </li>
        <li>
          Missing or incorrect documents can result in{" "}
          <strong className="text-white">auto-cancellation without refund</strong>.
        </li>
      </ul>
    </div>
  </div>
);

const safetyContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">
        Safety, Liability & Conduct
      </h4>
      <div className="pl-6 mt-2 space-y-3 text-zinc-300">
        <div>
          <h5 className="font-medium text-zinc-200">Safety & Liability</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2">
            <li>
              Hosts are fully responsible for:
              <ul className="list-[circle] pl-6 mt-1 space-y-1 text-zinc-400">
                <li>Safety</li>
                <li>Staff & equipment</li>
                <li>Logistics & on-ground management</li>
                <li>Basic insurance coverage for high-risk activities</li>
              </ul>
            </li>
            <li>
              Travelers must follow all instructions shared by the host.
            </li>
            <li>
              Travelers are responsible for their medical fitness, reporting any
              health conditions, and carrying personal medication.
            </li>
            <li>
              100 Degree Club is not responsible or liable for any incident,
              injury, damage, or loss that occurs during the camp.
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-zinc-200">Code of Conduct</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2">
            <li>
              Travelers must follow camp rules, local laws, and safety
              instructions.
            </li>
            <li>
              Misconduct may result in immediate removal from the camp without
              refund.
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-zinc-200">Force Majeure</h5>
          <ul className="list-decimal pl-6 mt-1 space-y-2">
            <li>
              No refunds for natural disasters, weather, government
              restrictions, political situations, or events beyond control.
            </li>
            <li>
              The software may assist with rescheduling only with host
              approval.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const fraudContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">
        Fraud & Misuse Prevention
      </h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>
          Suspicious bookings may be paused, investigated, or have settlements
          withheld.
        </li>
        <li>
          Patterns showing unusual activity or repeated transactions may trigger
          manual verification.
        </li>
        <li>
          Travelers and hosts must report any suspicious or fraudulent
          activity.
        </li>
      </ul>
    </div>
  </div>
);

const privacyContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">Data & Privacy</h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>
          Data is used only for bookings, payments, compliance, and internal
          analytics.
        </li>
        <li>
          Data is never sold or shared with third parties for marketing.
        </li>
        <li>
          In case of any data-related issue or breach, 100 Degree Club will
          investigate, fix, and notify affected users.
        </li>
      </ul>
    </div>
  </div>
);

const disputesContent = (
  <div className="space-y-6 text-zinc-100">
    <div>
      <h4 className="font-semibold text-white">
        Dispute Resolution & Jurisdiction
      </h4>
      <ul className="list-decimal pl-6 mt-2 space-y-2 text-zinc-300">
        <li>All disputes fall under Mumbai jurisdiction.</li>
        <li>
          Users must first raise an issue via platform support before taking
          legal action.
        </li>
        <li>
          All settlement logs and payment records generated by the software are
          treated as final and binding.
        </li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-white">Abbreviations</h4>
      <ul className="list-disc pl-6 mt-2 space-y-1 text-zinc-400">
        <li>
          <strong className="text-white">PG</strong> = Payment Gateway
        </li>
        <li>
          <strong className="text-white">FX</strong> = Foreign Exchange
        </li>
        <li>
          <strong className="text-white">ID</strong> = Identity Proof
        </li>
        <li>
          <strong className="text-white">Software Fees</strong> = 10% software charge for managing
          bookings
        </li>
        <li>
          <strong className="text-white">GST</strong> = Goods and Services Tax collected and paid by 100
          Degree Club
        </li>
      </ul>
    </div>
  </div>
);

export function PrivacyRefundSection({
  onCreateCamp,
  isLoading,
  isUpdateMode,
}: PrivacyRefundSectionProps) {
  const [activeTab, setActiveTab] = React.useState<PolicyTab>("money");

  const { control, setValue } = useFormContext<CampFormValues>();

  const isAgreed = useWatch({
    control,
    name: "privacy.agreed",
    defaultValue: false,
  });

  const handleAgreeChange = (checked: boolean) => {
    setValue("privacy.agreed", checked, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const tabs = [
    { id: "money", label: "Traveler Money", icon: DollarSign },
    { id: "settlement", label: "Settlement", icon: Receipt },
    { id: "cancellation", label: "Cancellations", icon: XCircle },
    { id: "compliance", label: "Compliance", icon: FileText },
    { id: "safety", label: "Safety & Conduct", icon: ShieldCheck },
    { id: "fraud", label: "Fraud Prevention", icon: ShieldAlert },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "disputes", label: "Disputes", icon: Gavel },
  ];

  return (
    <div className="bg-zinc-950 mb-8 space-y-8 flex flex-col h-full text-zinc-100">
      <div>
        <h3 className="text-xl font-bold text-white">
          Platform Policies
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          At least one team member must agree to the terms, refund, and privacy
          policies. Once “I agree” is ticked, it can’t be unticked.
        </p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden">
        <nav className="flex flex-col gap-2 w-56 flex-shrink-0">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              variant="ghost"
              className={`w-full justify-start h-11 text-sm font-bold rounded-lg transition-all
                ${activeTab === tab.id
                  ? "bg-white text-black shadow-lg shadow-white/5"
                  : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900"
                }`}
              onClick={() => setActiveTab(tab.id as PolicyTab)}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </nav>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <Card className="bg-zinc-900/40 border-zinc-900 flex-1 rounded-xl">
            <CardContent className="p-0">
              <ScrollArea className="h-full w-full">
                <div className="px-6 py-4 text-sm">
                  {activeTab === "money" && moneyContent}
                  {activeTab === "settlement" && settlementContent}
                  {activeTab === "cancellation" && cancellationContent}
                  {activeTab === "compliance" && complianceContent}
                  {activeTab === "safety" && safetyContent}
                  {activeTab === "fraud" && fraudContent}
                  {activeTab === "privacy" && privacyContent}
                  {activeTab === "disputes" && disputesContent}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-0 bg-zinc-950 pt-4 -mx-8 px-8 border-t border-zinc-900 z-10">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agree"
                checked={isAgreed || isUpdateMode}
                onCheckedChange={handleAgreeChange}
                className="mt-0.5 border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
                disabled={isUpdateMode}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agree"
                  className="text-sm font-bold text-zinc-100 cursor-pointer"
                >
                  I Agree to All Terms
                </label>
                <p className="text-xs text-zinc-500">
                  I have read and understood the policies.
                </p>
              </div>
            </div>

            <Button
              type="button"
              className={`w-full h-11 text-sm font-bold transition-all
                ${isAgreed
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              disabled={!isAgreed || isLoading || isUpdateMode}
              onClick={onCreateCamp}
            >
              {isLoading ? "Publishing..." : "Publish & Go Live"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
