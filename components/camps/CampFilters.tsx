"use client";

import * as React from "react";
import { Brain, Activity, HeartPulse, Target, Filter, X, MapPin, Users, Calendar, Menu } from "lucide-react";
import { TacticalCascadeFilter } from "./TacticalCascadeFilter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider"; // Ensure Shadcn Slider is installed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LOCATION_DATA = [
  {
    label: "India", value: "in", children: [
      { label: "Maharashtra", value: "Maharashtra", children: [{ label: "Mumbai", value: "Mumbai" }, { label: "Pune", value: "Pune" }] },
      { label: "Ladakh", value: "Ladakh", children: [{ label: "Leh", value: "leh" }, { label: "Nubra", value: "Nubra" }] },
    ]
  },
  { label: "France", value: "fr" },
];

const FOCUS_AREAS = [
  { label: "Mental", value: "mental", icon: <Brain className="w-3.5 h-3.5" /> },
  { label: "Physical", value: "physical", icon: <Activity className="w-3.5 h-3.5" /> },
  { label: "Medical", value: "medical", icon: <HeartPulse className="w-3.5 h-3.5" /> },
];

export default function CampFilters() {
  const [locations, setLocations] = React.useState<string[]>(["India"]);
  const [domain, setDomain] = React.useState("Land");
  const [focus, setFocus] = React.useState<string[]>([]);
  const [timeframe, setTimeframe] = React.useState("upcoming");

  // New Filter States
  const [ageRange, setAgeRange] = React.useState([18, 60]);
  const [gender, setGender] = React.useState("all");

  return (
    <div className="flex items-center gap-6 bg-white dark:bg-zinc-950 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 w-full transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-[10px] font-black tracking-widest text-zinc-900 dark:text-white">
          Conquer
        </span>

        {/* Primary Domain Toggles */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-transparent dark:border-zinc-800">
          <ToggleButton active={domain === "Land"} onClick={() => setDomain("Land")} label="Land" />
          <ToggleButton active={domain === "Air"} onClick={() => setDomain("Air")} label="Air" />
          <ToggleButton active={domain === "Water"} onClick={() => setDomain("Water")} label="Water" />
        </div>

        <TacticalCascadeFilter
          title="Focus Area"
          icon={Target}
          data={FOCUS_AREAS}
          selection={focus}
          onSelect={setFocus}
        />

        <Dialog>
          <DialogTrigger asChild >
            <Button variant="outline" className="h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 px-4 font-black text-[10px] tracking-widest gap-2 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              {/* <Filter className="w-3.5 h-3.5" /> */}
              <Menu />
              {/* Filters */}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden">
            <DialogHeader className="p-6 bg-zinc-50 dark:bg-zinc-900 border-b dark:border-zinc-800">
              <DialogTitle className="text-xl font-bold tracking-[0.05em] flex items-center gap-2">
                Filters
              </DialogTitle>
            </DialogHeader>

            <div className="p-8 space-y-10">

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold">Age</label>
                  <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    {ageRange[0]} - {ageRange[1]} YRS
                  </span>
                </div>
                <Slider
                  defaultValue={[18, 60]}
                  max={80}
                  min={10}
                  step={1}
                  value={ageRange}
                  onValueChange={setAgeRange}
                  className="py-4"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="w-full h-12 border-2 dark:border-zinc-800 font-bold text-xs mt-2" >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-950 dark:border-zinc-800 mt-2">
                    <SelectItem value="all" className="font-bold text-[10px]" defaultChecked>All</SelectItem>
                    <SelectItem value="male" className="font-bold text-[10px]">Male </SelectItem>
                    <SelectItem value="female" className="font-bold text-[10px]">Female</SelectItem>
                    <SelectItem value="female" className="font-bold text-[10px]">Transgender</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pb-4">
                <label className="text-sm font-semibold">Location</label>
                <div className="w-full mt-2">
                  <TacticalCascadeFilter
                    title="Location"
                    icon={MapPin}
                    data={LOCATION_DATA}
                    selection={locations}
                    onSelect={setLocations}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t dark:border-zinc-800">
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>

                  <Button className="w-full bg-zinc-200/90 hover:bg-zinc-200/60 hover:cursor-pointer text-black font-black tracking-[0.2em] h-12">
                    Apply
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="h-8 w-[1px] bg-zinc-100 dark:bg-zinc-800 mx-2" />

      {/* Status Toggles */}
      <div className="ml-auto flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-transparent dark:border-zinc-800">
        <ToggleButton active={timeframe === "upcoming"} onClick={() => setTimeframe("upcoming")} label="Upcoming" />
        <ToggleButton active={timeframe === "live"} onClick={() => setTimeframe("live")} label="Live" />
        <ToggleButton active={timeframe === "past"} onClick={() => setTimeframe("past")} label="Past" />
      </div>

      <Button
          variant="default"
            className="flex items-center border-0 bg-green-600/60 hover:bg-green-600/80 hover:cursor-pointer gap-2 text-sm font-bold tracking-widest text-white transition-colors hover:text-white px-4"
          >
            Volunteer
          </Button>
    </div>
  );
}

function ToggleButton({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all",
        active
          ? "bg-white dark:bg-zinc-800 text-black dark:text-green-500 shadow-sm"
          : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}