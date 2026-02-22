import { Award, BookOpen, Crown, ExternalLink, Globe, Heart, Leaf, Medal, PlayCircle, Quote, Share2, Shield, ShieldCheck, Star, Youtube, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

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
                        "flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold  cursor-help transition-all duration-300 hover:-translate-y-0.5",
                        config.class
                    )}
                >
                    <Icon className="h-3 w-3 fill-current" />
                    {badge.tier === 'Tier5' && <span>{badge.name}</span>}
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-zinc-950 border-zinc-800 text-[10px] font-bold  px-3 py-2 shadow-xl bg-black">
                <p className="text-white">{badge.name}</p>
                <p className="text-zinc-500 text-[9px] mt-0.5">{badge.tier.replace("Tier", "Level ")}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default function Insignia() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl">
            {/* <div className="pt-3 pb-5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-6 h-[1px] bg-blue-600"></span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">Social Impact Venture</span>
                    </div>

                    <h1 className="text-2xl font-black text-white">
                        Operation Blue Freedom
                    </h1>
                </div> */}

            {/* 2. Featured Media */}
            <div className="px-4 py-5">
                <div className="relative aspect-video w-full mb-3 overflow-hidden group">
                    <iframe
                        src="https://www.youtube.com/embed/yN3g8CdRgss?autoplay=1"
                        title="Operation Blue Freedom: Team CLAW"
                        className="h-full w-full opacity-80 group-hover:opacity-100 transition-opacity"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>

            {/* 3. Blog Body */}
            <div className="p-8 pt-6 space-y-6">

                {/* Mission Intro */}
                <div className="space-y-4">
                    <p className="text-zinc-300 text-[13px] leading-relaxed font-light">
                        Launched in 2019 by CLAW Global, Operation Blue Freedom is a mission to help people with disabilities take part in adventure activities. Its aim is to improve their physical health and mental well-being through these experiences.
                    </p>

                    {/* <p className="text-zinc-300 text-[13px] leading-relaxed font-light  ">
                            It aims to shatter the common perception of pity and charity, recreating a narrative of <span className="text-white">dignity, freedom, and ability.</span>
                        </p> */}
                    <p className="text-zinc-300 text-[13px] leading-relaxed font-light">
                        Beyond adventure, the focus is to design and implement <strong className="text-zinc-200">sustainable large-scale employment solutions</strong>, specifically within the Environment Conservation and Sustainability space.
                    </p>
                </div>

                {/* Focus Section: Employment */}
                {/* <div className="space-y-3 pt-4">
                        <h3 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <Leaf className="w-3 h-3 text-green-500" /> Sustainability Focus
                        </h3>
                    </div> */}

                {/* 4. Interactive "Chapters" / Initiatives */}
                <section className="space-y-4">
                    {/* <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Media Coverage</h3> */}
                    <div className="grid gap-2">
                        <MediaLink
                            icon={<Youtube className="w-4 h-4" />}
                            label="The Ranveer Show (TRS) Podcast"
                            href="https://www.youtube.com/watch?v=FZ0GYxPXzao"
                        />
                        <MediaLink
                            icon={<Globe className="w-4 h-4" />}
                            label="Red Bull: Siachen Expedition"
                            href="https://www.redbull.com/in-en/conquer-land-air-water-operation-blue-freedom"
                        />
                        <MediaLink
                            icon={<ExternalLink className="w-4 h-4" />}
                            label="Official CLAW Website"
                            href="https://claw.global"
                        />
                    </div>
                </section>


                {/* 5. Footer/Social */}
                {/* <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-4">
                        <Share2 className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                        <BookOpen className="w-4 h-4 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
                        Support the Mission →
                    </button>
                </div> */}
            </div>
        </div>
    );
}

function RecordItem({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="space-y-1">
            <h4 className="text-[11px] font-bold text-white ">{title}</h4>
            <p className="text-[10px] text-zinc-500 leading-normal">{desc}</p>
        </div>
    );
}

function MediaLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-900 hover:border-zinc-700 transition-all rounded-md group"
        >
            <span className="text-zinc-500 group-hover:text-blue-500 transition-colors">{icon}</span>
            <span className="text-[10px] text-zinc-400 font-medium group-hover:text-white truncate">{label}</span>
        </a>
    );
}

function BlogLink({ title, category, icon }: { title: string; category: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
                <span className="text-zinc-500 group-hover:text-blue-500">{icon}</span>
                <span className="text-[11px] text-zinc-400 group-hover:text-white font-medium">{title}</span>
            </div>
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{category}</span>
        </div>
    );
}