"use client";

import React, { useState } from "react";
import { LeadInsights } from "./corporate/LeadInsights";
import { CorporateTables } from "./corporate/CorporateTables";
import { CorporateKanban } from "./corporate/CorporateKanban";
import { LeadDetailsSheet } from "./corporate/LeadDetailsSheet";

export default function CorporateLeadsDashboard() {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCardClick = (lead: any) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      {/* 1. LEAD INSIGHTS METRICS */}
      <LeadInsights />

      {/* 2 & 3. CORPORATE PERSONA & TEAM ENGAGEMENT TABLES */}
      <CorporateTables />

      {/* 4. SCRUM BOARD (KANBAN) */}
      {/* <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.2em] font-black text-white italic px-2">
          Deal Pipeline / Scrum Board
        </h3>
      </div> */}
        <CorporateKanban/>

      {/* DETAILED DATA SHEET */}
      <LeadDetailsSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
        lead={selectedLead} 
      />
    </div>
  );
}