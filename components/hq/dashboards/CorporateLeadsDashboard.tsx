"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

// Reuse sub-components from Performance Dashboard
import { InsightCard, DataPoint, KPIGroup } from "./PerformanceDashboard";

export default function CorporateLeadsDashboard() {
  const [selectedLead, setSelectedLead] = useState<any>(null);

  return (
    <div className="space-y-8 text-white pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* 1. LEAD INSIGHTS (REUSING KPIGROUP) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KPIGroup 
          title="Lead Volume" 
          metrics={[
            { label: "Total Deal", value: 840, color: "text-white" },
            { label: "Success", value: 120, color: "text-emerald-400" },
            { label: "Discussion", value: 310, color: "text-amber-400" },
            { label: "Canceled", value: 12, color: "text-red-500" }
          ]} 
        />
        <KPIGroup 
          title="Financial Intelligence" 
          metrics={[
            { label: "Avg Deal", value: 120000, color: "text-white" },
            { label: "Gross", value: 14500000, color: "text-white" },
            { label: "Net", value: 12300000, color: "text-cyan-400" },
            { label: "Conv Rate", value: 14, color: "text-zinc-500" }
          ]} 
        />
      </div>

      {/* 2. SCRUM BOARD (DiceUI Kanban Implementation) */}
      <InsightCard title="Lead Acquisition Scrum Board">
        <div className="flex gap-4 overflow-x-auto pb-4 h-[600px]">
          {["Lead", "Discussion", "Assign", "Status", "Live", "Completed", "Canceled"].map((column) => (
            <div key={column} className="flex-shrink-0 w-80 bg-zinc-950/50 rounded-sm border border-zinc-800 p-4">
              <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 italic">{column}</span>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full">4</span>
              </div>
              
              <div className="space-y-3">
                {/* SCRUM CARD */}
                <LeadScrumCard 
                  company="Google Inc" 
                  location="Zurich" 
                  deal="$250,000" 
                  schedule="Sept 12, 2026" 
                  onClick={() => setSelectedLead({ company: "Google Inc" })}
                />
                <LeadScrumCard 
                  company="Rolex SA" 
                  location="Geneva" 
                  deal="$1.2M" 
                  schedule="Oct 04, 2026"
                  onClick={() => setSelectedLead({ company: "Rolex SA" })}
                />
              </div>
            </div>
          ))}
        </div>
      </InsightCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 3. CORPORATE PERSONA TABLE */}
        <InsightCard title="Corporate Persona">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800">
                <tr>
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Location</th>
                  <th className="pb-2 text-right">Gross</th>
                  <th className="pb-2 text-right">Net</th>
                  <th className="pb-2 text-center">Repeat</th>
                  <th className="pb-2 text-right">Contact</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-zinc-900">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 font-bold text-zinc-200">Tesla Giga Berlin</td>
                    <td className="py-3 text-zinc-500">DE / Brandenburg</td>
                    <td className="py-3 text-right font-black">$450K</td>
                    <td className="py-3 text-right font-black text-emerald-500">$382K</td>
                    <td className="py-3 text-center"><span className="px-2 py-0.5 bg-zinc-800 rounded-full text-[9px]">YES</span></td>
                    <td className="py-3 text-right text-zinc-500 font-mono">hr@tesla.de</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InsightCard>

        {/* 4. TEAM ENGAGEMENT TABLE */}
        <InsightCard title="Team Engagement">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800">
                <tr>
                  <th className="pb-2">Team Name</th>
                  <th className="pb-2">Current Project</th>
                  <th className="pb-2 text-right">Deal Size</th>
                  <th className="pb-2 text-right">Net Contribution</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-zinc-900">
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 font-bold text-white">Sgt. Alex "Ghost"</td>
                  <td className="py-3 text-zinc-400">Microsoft Leadership Camp</td>
                  <td className="py-3 text-right font-black">$120K</td>
                  <td className="py-3 text-right font-black text-cyan-500">$18K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InsightCard>
      </div>

      {/* 5. EDITABLE LEAD FORM (Sheet) */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent className="w-[600px] bg-zinc-950 border-l border-zinc-800 p-0 sm:max-w-[600px]">
          <ScrollArea className="h-screen p-8">
            <SheetHeader className="mb-8 border-b border-zinc-800 pb-6">
              <p className="text-[10px] uppercase font-black text-cyan-500 italic tracking-[0.2em]">Lead Modification</p>
              <SheetTitle className="text-3xl font-black text-white">{selectedLead?.company}</SheetTitle>
            </SheetHeader>

            <form className="space-y-8 pb-10">
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Inquiry Date" type="date" />
                <FormGroup label="Company Name" defaultValue={selectedLead?.company} />
                <FormGroup label="Event Location" placeholder="e.g. Himalayas" />
                <FormGroup label="Schedule" type="date" />
                <FormGroup label="Time" type="time" />
              </div>

              <div className="space-y-4">
                <p className="text-[11px] uppercase font-black text-zinc-500">Point of Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <FormGroup label="Phone" placeholder="+41 78..." />
                  <FormGroup label="Email" placeholder="corp@biz.com" />
                </div>
              </div>

              <FormGroup label="Purpose" textarea placeholder="Mission goals..." />
              
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Request Speaker" placeholder="Commander X" />
                <FormGroup label="Team Available" placeholder="Alpha / Bravo" />
              </div>

              {/* FINANCIALS SECTION */}
              <div className="bg-zinc-900/50 p-6 border border-zinc-800 rounded-sm space-y-4">
                <p className="text-[11px] uppercase font-black text-zinc-500 italic">Deal Economics</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-zinc-400">Gross Amount</span>
                    <Input className="w-32 h-8 bg-zinc-950 text-right" defaultValue="$250,000" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">CLAW Management Fee (15%)</span>
                    <span className="text-white">$37,500</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Taxes</span>
                    <span className="text-white">$12,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                    <span className="text-sm uppercase font-black text-cyan-500">Net Receivable</span>
                    <span className="text-xl font-black text-white font-mono">$200,500</span>
                  </div>
                </div>
              </div>

              <FormGroup label="Assign Speaker" placeholder="Select Unit Leader..." />
              <FormGroup label="Documents Link" placeholder="https://drive.google.com/..." />

              <Button className="w-full bg-white text-black font-black uppercase tracking-widest h-12 hover:bg-zinc-200">
                Update Lead intelligence
              </Button>
            </form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function LeadScrumCard({ company, location, deal, schedule, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="bg-zinc-900 p-4 border border-zinc-800 rounded-sm hover:border-zinc-500 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">{company}</h4>
        <Badge className="bg-zinc-950 text-zinc-500 text-[9px] border-zinc-800">{deal}</Badge>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold">
          <span className="uppercase italic">{location}</span>
        </div>
        <div className="text-[10px] text-zinc-400 uppercase tracking-tighter">
          Schedule: <span className="text-white">{schedule}</span>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, type = "text", textarea, defaultValue, placeholder }: any) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{label}</Label>
      {textarea ? (
        <textarea 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-zinc-700" 
          placeholder={placeholder}
        />
      ) : (
        <Input 
          type={type} 
          defaultValue={defaultValue} 
          placeholder={placeholder}
          className="bg-zinc-900 border-zinc-800 text-white rounded-sm h-10 focus-visible:ring-zinc-700" 
        />
      )}
    </div>
  );
}

function Badge({ children, className }: any) {
    return (
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${className}`}>
            {children}
        </span>
    )
}