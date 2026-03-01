"use client";

import React from "react";
import { cn } from "@/lib/utils";
import OperationBlueFreedom from "../OperationBlueFreedom";
import Stories from "../Stories";
import Insignia from "../camps/Insignia";
import PastCamps from "../camps/PastCamps";

// --- Types & Constants ---


export default function Leaderboard() {
  const [selectedTab, setSelectedTab] = React.useState("stories");
  return (
    <div className="relative overflow-hidden w-full max-w-md bg-zinc-950/50 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl h-[100%] flex flex-col">
      
      {/* 1. Sticky Header Container */}
      <div className="sticky top-0 z-50 bg-zinc-950/80">
        <div className="flex flex-row justify-around">
          <div className="flex bg-zinc-100 p-1 dark:bg-zinc-900 rounded-full border border-transparent dark:border-zinc-800 flex-row w-full justify-between">
            <ToggleButton active={selectedTab === "stories"} onClick={() => setSelectedTab("stories")} label="Stories" className="text-left" />
            <ToggleButton active={selectedTab === "insignia"} onClick={() => setSelectedTab("insignia")} label="Op. Blue Freedom" className="text-left" />
            <ToggleButton active={selectedTab === "past_camps"} onClick={() => setSelectedTab("past_camps")} label="Past Camps" className="text-left" />
          </div>
        </div>
      </div>

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        {selectedTab === "stories" && <Stories />}
        {selectedTab === "insignia" && <Insignia />}
        {selectedTab === "past_camps" && <PastCamps />}
      </div>
      
    </div>
  );
}

function ToggleButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full font-bold text-xs transition-all",
        active
          ? "bg-white dark:bg-zinc-800 text-black dark:text-green-500 shadow-sm"
          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}