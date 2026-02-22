"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Shield, FileCheck, ArrowRight } from "lucide-react";

export default function PlatformContract() {
  const [hasAgreed, setHasAgreed] = useState(false);

  return (
    <div className="bg-black text-zinc-300">
      <Card className="mx-auto bg-zinc-950 shadow-2xl relative overflow-hidden">
        
        {/* Background Watermark */}
        {/* <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Shield className="w-64 h-64 text-white" />
        </div> */}

        <CardHeader className="p-12 border-b border-zinc-900">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              {/* <div className="flex items-center gap-2 text-cyan-600">
                <FileCheck className="w-5 h-5" />
                <span className="text-xs font-bold">Official Agreement</span>
              </div> */}
              <h1 className="text-3xl font-bold text-white leading-tight">
                Contract<br /> 
                <span className="text-zinc-500 text-xl font-medium">C.L.A.W. Global & Host</span>
              </h1>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm">Contract ID: CLAW-2026-001</p>
              {/* <p className="text-sm text-zinc-600">Status: Awaiting Consent</p> */}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-12 space-y-10">
          
          {/* Parties Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-white">Parties involved</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              This agreement is entered into between <strong className="text-white">C.L.A.W. Global</strong> (the "Platform") and the <strong className="text-white">Registered Host</strong> (the "Partner"). By checking the box below, the Partner acknowledges full understanding and acceptance of the operational and financial terms.
            </p>
          </section>

          {/* Clause 1.0 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-cyan-600 font-bold text-sm">1.0</span>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Scope of Services</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The Platform provides technical infrastructure, global booking management, and document compliance. The Partner is exclusively responsible for on-ground execution, safety, and insurance of all participants.
                </p>
              </div>
            </div>
          </section>

          {/* Clause 2.0 */}
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-cyan-600 font-bold text-sm">2.0</span>
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white">Financial & Settlements</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  A 10% software fee applies to all bookings. Settlements are disbursed 7-10 working days after camp completion, provided all compliance documents are verified.
                </p>
              </div>
            </div>
          </section>

          {/* New Section Placeholder */}
          {/* <div className="py-12 border-y border-dashed border-zinc-900 flex flex-col items-center justify-center text-zinc-700">
            <p className="text-xs font-medium">Operational details and performance metrics to be appended.</p>
          </div> */}

          {/* Interactive Consent Section */}
          <section className="pt-8 space-y-8">
            <div 
              className={`flex items-start space-x-4 p-6 transition-colors rounded-none border ${
                hasAgreed ? "bg-cyan-900/10 border-cyan-900/40" : "bg-zinc-900/20 border-zinc-900"
              }`}
            >
              <Checkbox 
                id="terms" 
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked as boolean)}
                className="mt-1 border-zinc-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium text-zinc-300 leading-relaxed cursor-pointer select-none"
                >
                  I agree with all the terms of the contract and understand that this serves as a legally binding electronic agreement with C.L.A.W. Global.
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                disabled={!hasAgreed}
                className={`rounded-none px-8 py-6 h-auto text-xs font-bold transition-all ${
                  hasAgreed 
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                    : "bg-zinc-900 text-zinc-600 opacity-50 cursor-not-allowed"
                }`}
              >
                Complete Registration <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </section>

          {/* Footer Metadata */}
          <footer className="flex justify-between items-center text-[10px] text-zinc-400">
            <p>© 2026 C.L.A.W. Global. Confidential Document.</p>
            {/* <div className="flex gap-4">
              <span>Digital Consent Finalized in Mumbai</span>
            </div> */}
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}