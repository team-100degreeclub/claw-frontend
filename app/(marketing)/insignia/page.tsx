"use client";

import React from "react";
import { Shield, MapPin, Calendar, Star, Compass } from "lucide-react";
import InsigniaSpotlight from "@/components/hq/dashboards/InsigniaSpotlight";
import InsigniaDashboard from "@/components/hq/dashboards/InsigniaDashboard";

// --- Data Configuration ---

const BADGE_DESCRIPTIONS = [
  "Traveller,",

  "Every camp you complete at CLAW earns you an insignia. These insignias represent your courage, learning, and the journey you take through Land, Air, Water and Spirit Road.",
  "Your journey begins as an Explorer when you complete your first camp. As you continue and complete five camps in the same path, you earn the title of Master. After earning five Master badges, you become a Legend.",
  "When you complete all four paths Land, Air, Water and Spirit Road you earn the Marshal insignia. Travellers who achieve five Marshal badges earn the title of Guardian.",
  "At the very top is the Soul of Steel insignia. This is personally awarded by Major Vivek Jacob, Para SF 9, Indian Special Forces and Founder of CLAW. It is given only to travellers whose actions create a real positive impact in the world.",
  "Every insignia you earn is added to your Insignia Board and recorded on your profile. Major milestones are also couriered to you so you can wear them with pride.",
  "Each badge tells the story of your journey, a mark of something you have achieved and something that made you stronger.",
  "-  Team CLAW"
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
  { category: "Air", badges: [{ name: "Master", date: "Dec 20, 2025" }] },
  { category: "Water", badges: [{ name: "Captain", date: "Feb 15, 2026" }] },
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

// --- Sub-Components ---

export const BadgeImage = ({ earned = true, size = "h-8" }: { earned?: boolean; size?: string }) => (
  <img
    src="/badge.png"
    alt="CLAW Badge"
    className={`${size} w-auto object-contain transition-all duration-500 ${earned ? "opacity-100 drop-shadow-[0_0_12px_rgba(37,99,235,0.8)]" : "opacity-10 grayscale"}`}
  />
);

export const BadgeProgressBox = ({ label, count, total, nextLevel, requirement }: any) => {
  const remaining = total - count;

  return (
    <div className="flex flex-col items-center justify-between p-6 bg-zinc-950 border border-zinc-900 h-full min-h-[220px]">
      <div className="text-center space-y-3 mt-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {[...Array(total)].map((_, i) => (
            <BadgeImage key={i} earned={i < count} size="h-10" />
          ))}
        </div>

        {/* Increased font size and contrast for the Badge Label */}
        <span className="text-base font-bold text-white block">
          {label}
        </span>

      </div>
      {/* Improved readability for the instruction text */}
      <div className="text-center space-y-3 mt-6">
        <p className="text-sm leading-relaxed text-zinc-400 font-medium max-w-[160px] mx-auto">
          {count > 0
            ? <>Obtain <span className="text-amber-400 font-bold">{remaining} more</span> to reach <span className="text-white">{nextLevel}</span> status.</>
            : <><span className="text-zinc-300">{requirement}</span></>}
        </p>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function InsigniaPage() {
  return (
    <InsigniaDashboard />
  )
  return (
    <div className="min-h-screen bg-black text-zinc-300 flex flex-col font-sans overflow-y-auto">

      {/* TOP SECTION (Former Aside) */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <h1 className="text-2xl font-bold text-white tracking-tighter leading-none">Insignia</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
            {/* Right Column: Scrollable Text */}
            <div className="space-y-6">
              <h2 className="text-base font-bold text-white border-l-4 border-amber-600 pl-4">
                Understanding The CLAW Insignia
              </h2>
              {/* Added 'always-show-scrollbar' class */}
              <div className="h-84 overflow-y-scroll pr-4 space-y-6 always-show-scrollbar">
                {BADGE_DESCRIPTIONS.map((desc, i) => (
                  <p key={i} className="text-sm leading-relaxed text-zinc-400 font-medium">
                    {desc}
                  </p>
                ))}
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

          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-white">Global Honor</h3>
            <div className="border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-900/50 text-xs font-bold text-zinc-500 border-b border-zinc-900 uppercase tracking-wider">
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
                          <div className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" /> {row.location}
                          </div>
                        </td>
                        <td className="p-6 text-sm text-zinc-400 font-medium tabular-nums">{row.levels.land}</td>
                        <td className="p-6 text-sm text-zinc-400 font-medium tabular-nums">{row.levels.air}</td>
                        <td className="p-6 text-sm text-zinc-400 font-medium tabular-nums">{row.levels.water}</td>
                        <td className="p-6 text-sm text-zinc-400 font-medium tabular-nums">{row.levels.sr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Progression Summary Grid */}
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
      </main>
    </div>
  );
}