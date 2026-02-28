"use client";

import React from "react";
import {
  ShieldCheck,
  Trophy,
  Medal,
  Flame,
  Waves,
  Wind,
  Mountain,
  Zap,
  ChevronRight,
  PlayCircle,
  Badge,
  Info,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";
import InsigniaSpotlight from "./InsigniaSpotlight";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GlobalLeaderboard from "./GlobalLeaderboard";
import { BadgeImage, BadgeProgressBox } from "@/app/(marketing)/insignia/page";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import InsigniaDetails from "./InsigniaDetails";

// --- Types ---
interface Badge {
  id: string;
  type: 'land' | 'air' | 'water' | 'spirit';
  name: string;
  date: string;
}

interface Participant {
  name: string;
  campsCompleted: number;
  marshalLevel: number;
  isGuardian: boolean;
  hasSoulOfSteel: boolean;
  recentBadges: Badge[];
  level: string;
}

// --- Dummy Data ---
const MOCK_PARTICIPANT: Participant = {
  name: "Roshan Sharma",
  campsCompleted: 14,
  marshalLevel: 3,
  isGuardian: false,
  hasSoulOfSteel: true,
  level: "Marshal 2",
  recentBadges: [
    { id: '1', type: 'land', name: 'Himalayan Endurance', date: 'Feb 2026' },
    { id: '2', type: 'air', name: 'High Altitude Jump', date: 'Jan 2026' },
    { id: '3', type: 'spirit', name: 'Inner Resilience', date: 'Dec 2025' },
    { id: '4', type: 'water', name: 'Deep Sea Survival', date: 'Nov 2025' },
  ]
};

const BADGE_DESCRIPTIONS = [
  "Traveller,",

  "At CLAW, every camp you complete earns you an insignia. These insignias represent your courage, learning, and the journey you take through Land, Air, Water, and Spirit Road.",
  "Here's what each badge represents:",

  "Explorer: Complete your first camp to earn your Explorer insignia.",
  "Master: Complete 5 camps in a single tier, for example Land, to earn the title of Master.",
  "Legend: Earn 5 Master badges to become a Legend of that tier.",
  "Marshal: Complete all 4 tiers i.e Land, Air, Water, and Spirit Road to earn your Marshal insignia.",
  "Guardian: Travellers who earn 5 Marshal badges become Guardians.",
  "Soul of Steel: The highest honor, personally awarded by Major Vivek Jacob, Para SF 9, Indian Special Forces and Founder of CLAW. This is given only to travellers who have made a real positive impact in the world. Even if it’s a small impact, as long as it makes the world a better place, we will invite you personally to the Den.",

  "Every insignia you earn is added to your Insignia Board, recorded on your profile, and couriered to you so you can wear them with pride. Each insignia tells the story of your journey, showing what you have achieved and how you have grown.",

  "We are proud to be on this journey with you.",

  "Team CLAW",
];

const USER_PROGRESSION = {
  explorer: { count: 3, total: 5, nextLevel: "Master", requirement: "Complete a camp in any path." },
  master: { count: 1, total: 5, nextLevel: "Legend", requirement: "Complete 5 camps in the same path." },
  legend: { count: 0, total: 5, nextLevel: "Marshal", requirement: "Earn 5 Master badges in a specific path." },
  marshal: { count: 1, total: 5, nextLevel: "Guardian", requirement: "Master all four elemental paths." },
  guardian: { count: 0, total: 5, nextLevel: "Soul of Steel", requirement: "Earn 5 Marshal badges." },
  soulOfSteel: { earned: true }
};

const MY_INSIGNIAS = [
  { category: "Land", badges: [{ name: "Explorer 1", date: "Jan 12, 2025" }, { name: "Explorer 2", date: "Mar 05, 2025" }] },
  { category: "Air", badges: [{ name: "Master 2", date: "Dec 20, 2025" }] },
  { category: "Water", badges: [{ name: "Captain 2", date: "Feb 15, 2026" }] },
  { category: "Spirit Road", badges: [{ name: "Explorer 1", date: "Nov 10, 2025" }] },
];

const LEADERBOARD_DATA = [
  {
    name: "Tiju Lukose",
    location: "Mumbai, India",
    honors: ["Marshal", "Guardian", "Soul Of Steel"], // keys to render badge images
    levels: { land: "Explorer 3", air: "Master", water: "Explorer 1", sr: "Explorer 1" }
  },
  {
    name: "Sandeep Kumar",
    location: "Delhi, India",
    honors: ["Soul Of Steel"],
    levels: { land: "Master", air: "Legend", water: "Explorer 4", sr: "Master" }
  }
];

const HONORS = [
  "Marshal", "Guardian", "Soul of Steel"
]

const getRank = (count: number) => {
  if (count > 15) return "Legend";
  if (count >= 11) return "Master";
  if (count >= 6) return "Captain";
  return "Explorer";
};



export default function InsigniaDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 flex flex-col font-sans overflow-y-auto">

      {/* TOP SECTION (Former Aside) */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
        <div className="max-w-[1400px] mx-auto">
          {/* <div className="flex items-center gap-3 mb-10">
            <h1 className="text-2xl font-bold text-white tracking-tighter leading-none">Insignia</h1>
          </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ">
            {/* Left Column: Video */}
            <div className="space-y-6">
              <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden relative rounded-xl shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/yN3g8CdRgss"
                  className="w-full h-full opacity-80"
                  title="CLAW Badge System"
                  allowFullScreen
                />
              </div>
              {/* <p className="text-sm font-semibold text-amber-500 tracking-tight">Official CLAW Insignia Guide</p> */}
            </div>

            {/* Right Column: Scrollable Text */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-l-4 border-amber-600 pl-4">
                Understanding The CLAW Insignia
              </h2>
              {/* Added 'always-show-scrollbar' class */}
              <div className="h-[280px] overflow-y-scroll pr-4 space-y-6 scrollbar-thin">
                {/* {BADGE_DESCRIPTIONS.map((desc, i) => (
                  <p key={i} className="text-base leading-relaxed text-zinc-400 font-medium">
                    {desc}
                  </p>
                ))} */}
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  Traveller,
                </p>
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  At CLAW, every camp you complete earns you an insignia. These insignias represent your courage, learning, and the journey you take through Land, Air, Water, and Spirit Road.
                </p>
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  Here’s what each badge represents:
                </p>
                <ul className="list-disc list-inside text-base leading-relaxed text-zinc-400 font-medium space-y-2">
                  <li>
                    Explorer: Complete your first camp to earn your Explorer insignia.
                  </li>
                  <li>
                    Master: Complete 5 camps in a single tier, for example Land, to earn the title of Master.
                  </li>
                  <li>
                    Legend: Earn 5 Master badges to become a Legend of that tier.
                  </li>
                  <li>
                    Marshal: Complete all 4 tiers i.e Land, Air, Water, and Spirit Road to earn your Marshal insignia.
                  </li>
                  <li>
                    Guardian: Travellers who earn 5 Marshal badges become Guardians.
                  </li>
                  <li>
                    Soul of Steel: The highest honor, personally awarded by Major Vivek Jacob, Para SF 9, Indian Special Forces and Founder of CLAW. This is given only to travellers who have made a real positive impact in the world. Even if it’s a small impact, as long as it makes the world a better place, we will invite you personally to the Den.
                  </li>
                </ul>
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  Every insignia you earn is added to your Insignia Board, recorded on your profile, and couriered to you so you can wear them with pride. Each insignia tells the story of your journey, showing what you have achieved and how you have grown.
                </p>
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  We are proud to be on this journey with you.
                </p>
                <p className="text-base leading-relaxed text-zinc-400 font-medium">
                  Team CLAW
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BOTTOM SECTION (Main Content) */}
      <main className="flex-1 p-8 md:p-12 space-y-20 max-w-[1400px] mx-auto w-full">

        {/* 1. Global Honor Board */}
        <section className="space-y-8">
          <InsigniaSpotlight />

          {/* 2. Progression Summary Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Your Progression</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="link" className="text-amber-500 font-bold hover:text-amber-400 p-0 flex items-center gap-1 group">
                    View Detailed Progress <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="min-w-2xl sm:max-w-3xl p-0 border-zinc-900 bg-black">
                  <InsigniaDetails />
                </SheetContent>
              </Sheet>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <BadgeProgressBox label="Explorer" {...USER_PROGRESSION.explorer} />
              <BadgeProgressBox label="Master" {...USER_PROGRESSION.master} />
              <BadgeProgressBox label="Legend" {...USER_PROGRESSION.legend} />
              <BadgeProgressBox label="Marshal" {...USER_PROGRESSION.marshal} />
              <BadgeProgressBox label="Guardian" {...USER_PROGRESSION.guardian} />

              <div className="flex flex-col items-center justify-center gap-6 p-8 bg-amber-950/10 border border-amber-600/20 rounded-[32px] shadow-lg">
                <BadgeImage earned={USER_PROGRESSION.soulOfSteel.earned} size="h-20" />
                <div className="text-center space-y-2">
                  <span className="text-base font-bold text-amber-500 block">Soul of Steel</span>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                    Awarded for exceptional impact.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white tracking-widest">Global Honor Board</h3>
            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-900/50 text-base font-bold text-white border-b border-zinc-900">
                    <tr>
                      <th className="p-6">Honors</th>
                      <th className="p-6">Traveller</th>
                      <th className="p-6">Land</th>
                      <th className="p-6">Air</th>
                      <th className="p-6">Water</th>
                      <th className="p-6">Spirit Roads</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/50">
                    {LEADERBOARD_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/20 transition-all duration-200 group">
                        <td className="p-6">
                          <div className="flex gap-4">
                            {HONORS.map(h => (
                              <div key={h} className="relative group/badge">
                                <BadgeImage earned={row.honors.includes(h)} size="h-10" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-[10px] text-amber-500 font-bold opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {h}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="font-bold text-white text-base">{row.name}</div>
                          <div className="text-xs text-zinc-300 flex items-center gap-1.5 mt-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" /> {row.location}
                          </div>
                        </td>
                        <td className="p-6 text-sm text-zinc-300 font-medium tabular-nums">{row.levels.land}</td>
                        <td className="p-6 text-sm text-zinc-300 font-medium tabular-nums">{row.levels.air}</td>
                        <td className="p-6 text-sm text-zinc-300 font-medium tabular-nums">{row.levels.water}</td>
                        <td className="p-6 text-sm text-zinc-300 font-medium tabular-nums">{row.levels.sr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

// --- UI COMPONENTS ---

function BadgeCategoryCard({ icon: Icon, label, count, color }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-700 p-6 flex flex-col items-center text-center hover:bg-zinc-800 transition-all group">
      <div className={`p-3 rounded-full bg-zinc-950 border border-zinc-800 mb-4 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={24} />
      </div>
      <p className="text-sm font-black text-zinc-500">{label}</p>
      <h3 className="text-2xl font-black mt-1 text-white">{count}</h3>
    </Card>
  );
}

function JoinerRow({ name, level, status, progress, badges }: any) {
  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
      <TableCell className="font-bold text-white">{name}</TableCell>
      <TableCell className="text-zinc-400 font-medium ">{level}</TableCell>
      <TableCell>
        <Badge className={status === "Full-Time" ? "bg-cyan-500/10 text-cyan-500" : "bg-zinc-500/10 text-zinc-500"}>
          {status}
        </Badge>
      </TableCell>
      {/* <TableCell className="w-48">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-bold text-zinc-500">{progress}%</span>
        </div>
      </TableCell> */}
      <TableCell className="text-right font-black text-white">{badges}</TableCell>
    </TableRow>
  );
}

export const HDTooltip = ({ active, payload, label, currencyCols }: any) => {
  console.log(currencyCols)
  console.log(payload)
  if (active && payload && payload.length) {
    const displayLabel = label || payload[0].name;

    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] rounded-sm backdrop-blur-xl ring-1 ring-white/10 min-w-[200px] animate-in fade-in zoom-in-95 duration-200">

        {/* Tooltip Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          {/* <p className="text-[10px] font-black text-zinc-500  tracking-[0.2em] ">
            Data Stream
          </p> */}
          <p className="text-xs font-black text-white  ">
            {displayLabel}
          </p>
        </div>

        {/* Data Points */}
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => {
            // Logic to handle both normalized and raw keys
            // If data was normalized (starts with 'norm'), we look for the raw value in the payload
            const dataKey = entry.dataKey;
            const isNormalized = typeof dataKey === 'string' && dataKey.startsWith('norm');
            const rawKey = isNormalized ? dataKey.replace('norm', '').toLowerCase() : dataKey;

            // Fallback to value if mapping fails
            const displayValue = entry.payload[rawKey] ?? entry.value;

            return (
              <div key={index} className="flex items-center justify-between gap-8 group">
                <div className="flex items-center gap-2.5">
                  {/* Status Indicator */}
                  <div
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-transform group-hover:scale-125"
                    style={{ color: entry.color, backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-zinc-400">
                    {entry.name[0].toUpperCase() + entry.name.slice(1)}
                  </span>
                </div>

                {/* Tactical Value Readout */}
                <span className="text-xs text-white  ">
                  {typeof displayValue === 'number'
                    ? (entry.name == "revenue" || currencyCols.includes(entry.dataKey)) ? displayValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }) : displayValue.toLocaleString('en-IN')
                    : displayValue
                  }
                </span>
              </div>
            );
          })}
        </div>

        {/* Subtle Footer (Optional) */}
        {/* <div className="mt-4 pt-2 border-t border-zinc-900 flex justify-end">
          <div className="h-1 w-8 bg-zinc-800 rounded-full" />
        </div> */}
      </div>
    );
  }
  return null;
};