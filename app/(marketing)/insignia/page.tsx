"use client";

import React from "react";
import { Shield, MapPin, Calendar, Star, Compass } from "lucide-react";
import InsigniaSpotlight from "@/components/hq/dashboards/InsigniaSpotlight";

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
  { category: "Spirit Road", badges: [{ name: "Seeker", date: "Nov 10, 2025" }] },
];

const LEADERBOARD_DATA = [
  {
    name: "Tiju Lukose",
    location: "Mumbai, India",
    honors: ["Marshal", "Guardian", "Soul Of Steel"], // keys to render badge images
    levels: { land: "Explorer 3", air: "Master", water: "Explorer 1", sr: "Seeker" }
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

const BadgeImage = ({ earned = true, size = "h-8" }: { earned?: boolean; size?: string }) => (
  <img 
    src="/badge.png" 
    alt="CLAW Badge" 
    className={`${size} w-auto object-contain transition-all duration-500 ${earned ? "opacity-100 drop-shadow-[0_0_12px_rgba(37,99,235,0.8)]" : "opacity-10 grayscale"}`} 
  />
);

const BadgeProgressBox = ({ label, count, total, nextLevel, requirement }: any) => {
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
        <span className="text-sm font-bold text-white block">
            {label}
        </span>
        
            </div>
        {/* Improved readability for the instruction text */}
        <div className="text-center space-y-3 mt-6">
        <p className="text-xs leading-relaxed text-zinc-400 font-medium max-w-[160px] mx-auto">
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
    <div className="min-h-screen bg-black text-zinc-300 flex overflow-hidden font-sans">
      
      {/* LEFT SECTION */}
      <aside className="w-[380px] border-r border-zinc-900 overflow-y-auto no-scrollbar p-10 space-y-10 bg-zinc-950/30">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            {/* <Shield className="w-5 h-5 text-amber-600" /> */}
            <h1 className="text-xl font-bold text-white tracking-tighter leading-none">Insignia</h1>
          </div>
          <div className="aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden relative rounded-none">
            <iframe
              src="https://www.youtube.com/embed/yN3g8CdRgss"
              className="w-full h-full opacity-70"
              title="CLAW Badge System"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-bold text-white border-l-2 border-amber-600 pl-4">Understanding The CLAW Insignia</h2>
          {BADGE_DESCRIPTIONS.map((desc, i) => (
            <p key={i} className="text-xs leading-relaxed text-zinc-500 font-medium">{desc}</p>
          ))}
        </div>
      </aside>

      {/* RIGHT SECTION */}
      <main className="flex-1 overflow-y-auto p-12 space-y-16">

        {/* 3. Leaderboard */}
        <section className="space-y-10">
          {/* <div className="bg-zinc-900/10 border border-zinc-900 border-dashed flex items-center justify-center"> */}
            {/* <p className="text-[10px] text-zinc-700 font-bold  tracking-widest">Soul of Steel Hall of Fame</p> */}
            <InsigniaSpotlight />
          {/* </div> */}

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-white tracking-widest">Global Honor Board</h3>
            <div className="border border-zinc-900 bg-zinc-950">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/30 text-sm  font-bold text-zinc-600 border-b border-zinc-900">
                  <tr>
                    <th className="p-6">Honors</th>
                    <th className="p-6">Traveller</th>
                    <th className="p-6">Land</th>
                    <th className="p-6">Air</th>
                    <th className="p-6">Water</th>
                    <th className="p-6">Spirit Roads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {LEADERBOARD_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/10 transition-colors">
                      <td className="p-6">
                        <div className="flex gap-4">
                          {HONORS.map(h => (
                            <div key={h} className="relative group">
                              <BadgeImage earned={row.honors.includes(h)} size="h-10" />
                              {/* Simple text hint since labels were removed */}
                              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-amber-500 font-bold group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-bold text-white text-sm">{row.name}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-amber-600" /> {row.location}
                        </div>
                      </td>
                      <td className="p-6 text-xs text-zinc-500 font-medium">{row.levels.land}</td>
                      <td className="p-6 text-xs text-zinc-500 font-medium">{row.levels.air}</td>
                      <td className="p-6 text-xs text-zinc-500 font-medium">{row.levels.water}</td>
                      <td className="p-6 text-xs text-zinc-500 font-medium">{row.levels.sr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* 1. Progression Summary */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <BadgeProgressBox label="Explorer" {...USER_PROGRESSION.explorer} />
          <BadgeProgressBox label="Master" {...USER_PROGRESSION.master} />
          <BadgeProgressBox label="Legend" {...USER_PROGRESSION.legend} />
          <BadgeProgressBox label="Marshal" {...USER_PROGRESSION.marshal} />
          <BadgeProgressBox label="Guardian" {...USER_PROGRESSION.guardian} />
          
          <div className="flex flex-col items-center justify-around p-6 bg-amber-900/5 border border-amber-600/20">
            <BadgeImage earned={USER_PROGRESSION.soulOfSteel.earned} size="h-16" />
            <div className="text-center space-y-2 mt-4">
               <span className="text-sm font-bold text-amber-500 ">Soul of Steel</span>
               <p className="text-xs text-zinc-600 font-medium">Awarded for exceptional impact.</p>
            </div>
          </div>
        </section>

        {/* 2. My Insignia Section */}
        {/* <section className="space-y-6">
          <h3 className="text-xs font-bold text-zinc-600  tracking-widest flex items-center gap-2">
            <Compass className="w-4 h-4" /> Earned Insignias
          </h3>
          <div className="grid grid-cols-4 gap-6">
            {MY_INSIGNIAS.map((group) => (
              <div key={group.category} className="bg-zinc-950 border border-zinc-900 p-6 space-y-6">
                <h4 className="text-sm font-bold text-amber-600 ">{group.category}</h4>
                <div className="space-y-6">
                  {group.badges.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <BadgeImage size="h-8" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white leading-none">{b.name}</p>
                        <p className="text-[9px] text-zinc-600 font-mono">{b.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section> */}

        
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}