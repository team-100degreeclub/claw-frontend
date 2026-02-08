"use client";

import React from "react";
import { cn } from "@/lib/utils";
import OperationBlueFreedom from "../OperationBlueFreedom";
import Stories from "../Stories";
import Insignia from "../camps/Insignia";

// --- Types & Constants ---


export default function Leaderboard() {
    const [selectedTab, setSelectedTab] = React.useState("stories");
  return (
    <div className="relative overflow-hidden w-full max-w-md bg-zinc-950/50 backdrop-blur-xl rounded-3xl border-white/5 shadow-2xl">
      {/* Decorative background flare */}
      <div className="flex flex-row justify-around">
      <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-transparent dark:border-zinc-800 flex flex-row w-fit">
        {/* <ToggleButton active={selectedTab === "operationBlueFreedom"} onClick={() => setSelectedTab("operationBlueFreedom")} label="Operation Blue Freedom" /> */}
        <ToggleButton active={selectedTab === "stories"} onClick={() => setSelectedTab("stories")} label="Stories" />
        <ToggleButton active={selectedTab === "insignia"} onClick={() => setSelectedTab("insignia")} label="Insignia" className="w-full" />
        <ToggleButton active={selectedTab === "past_camps"} onClick={() => setSelectedTab("past_camps")} label="Past Camps" className="w-full" />
      </div>
      </div>
      {/* {
        selectedTab === "operationBlueFreedom" && <OperationBlueFreedom />
      } */}
      {
        selectedTab === "stories" && <Stories />
      }
      {
        selectedTab === "insignia" && <Insignia />
      }
      {
        selectedTab === "past_camps" && <Insignia />
      }
      
    </div>
  );
}

function ToggleButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-1.5 rounded-full text-xs font-black transition-all",
        active
          ? "bg-white dark:bg-zinc-800 text-black dark:text-green-500 shadow-sm"
          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}