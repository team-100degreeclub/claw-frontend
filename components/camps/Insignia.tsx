import { Award, Crown, Medal, ShieldCheck, Star, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

export type BadgeTier = 'Tier1' | 'Tier2' | 'Tier3' | 'Tier4' | 'Tier5';

const BADGE_CONFIG: Record<BadgeTier, { class: string; icon: React.ElementType }> = {
  Tier1: { class: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20", icon: Medal },
  Tier2: { class: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", icon: Medal },
  Tier3: { class: "text-blue-400 bg-blue-400/10 border-blue-500/20", icon: ShieldCheck },
  Tier4: { class: "text-purple-400 bg-purple-400/10 border-purple-500/20", icon: Zap },
  Tier5: { 
    class: "text-red-500 bg-red-500/10 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.2)] animate-pulse-slow", 
    icon: Star 
  },
};

const TRAVELLERS = [
  {
    name: "Arjun S.",
    rank: "Land Lead",
    badges: [
      { name: "Soul of Steel", tier: "Tier5" },
      { name: "Ground Master", tier: "Tier3" },
      { name: "Amphibious Operator", tier: "Tier4" },
      { name: "Endurance March", tier: "Tier1" },
    ],
  },
  {
    name: "Vikram K.",
    rank: "Air Specialist",
    badges: [
      { name: "Air Master", tier: "Tier3" },
      { name: "Air-Ground Operator", tier: "Tier4" },
      { name: "Freefall Qualified", tier: "Tier1" },
    ],
  },
  {
    name: "Sarah J.",
    rank: "Water Operator",
    badges: [
      { name: "Maritime Master", tier: "Tier3" },
      { name: "Surface Ops", tier: "Tier1" },
      { name: "Dive Qualified", tier: "Tier1" },
    ],
  },
];

// --- Components ---

const BadgeItem = ({ badge }: { badge: { name: string; tier: string } }) => {
  const config = BADGE_CONFIG[badge.tier as BadgeTier] || BADGE_CONFIG.Tier1;
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold tracking-tight cursor-help transition-all duration-300 hover:-translate-y-0.5",
            config.class
          )}
        >
          <Icon className="h-3 w-3 fill-current" />
          {badge.tier === 'Tier5' && <span>{badge.name}</span>}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-zinc-950 border-zinc-800 text-[10px] font-bold tracking-widest px-3 py-2 shadow-xl bg-black">
        <p className="text-white">{badge.name}</p>
        <p className="text-zinc-500 text-[9px] mt-0.5">{badge.tier.replace("Tier", "Level ")}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default function Insignia() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl">
            <div className="p-8 relative">
                <header className="flex items-end justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black tracking-tighter text-white">
                            Elite <span className="text-red-600">Operators</span>
                        </h3>
                        <p className="text-[10px] font-bold text-zinc-500 tracking-widest">
                            Live Field Rankings
                        </p>
                    </div>
                    {/* <div className="text-right">
             <span className="text-[10px] font-bold text-zinc-600 tracking-[0.2em]">02.2026</span>
          </div> */}
                </header>

                <div className="space-y-6">
                    <TooltipProvider delayDuration={100}>
                        {TRAVELLERS.map((user, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-5 p-3 -mx-3 rounded-2xl hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Rank Avatar Logic */}
                                <div className="relative flex-none h-12 w-12 flex items-center justify-center">
                                    <span className={cn(
                                        "text-2xl font-black italic transition-all duration-500 group-hover:scale-110",
                                        i === 0 ? "text-yellow-500" : "text-zinc-800"
                                    )}>
                                        {i + 1}
                                    </span>
                                    {i === 0 && <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 -rotate-12" />}
                                </div>

                                {/* Identity */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col mb-2">
                                        <h4 className="text-sm font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                                            {user.name}
                                        </h4>
                                        <span className="text-[10px] font-medium text-zinc-500 tracking-widest italic">
                                            {user.rank}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {user.badges.map((badge, idx) => (
                                            <BadgeItem key={idx} badge={badge} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TooltipProvider>
                </div>

                {/* Footer Progress */}
                <footer className="mt-10">
                    <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/80">
                            <div className="h-10 w-10 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20 shrink-0">
                                <Award className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black text-white tracking-widest mb-0.5 ">
                                    Upcoming Deployment
                                </p>
                                <p className="text-[11px] text-zinc-400 font-medium">
                                    Complete <span className="text-emerald-400 font-bold">Route Recon</span> to advance.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}