"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Trophy,
  Medal,
  Flame,
  Waves,
  Wind,
  Mountain,
  Zap,
  Calendar,
  Lock,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { BadgeImage } from "@/app/(marketing)/insignia/page";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BadgeLevel {
  level: number;
  earnedOn: string;
  campsCompleted?: number;
}

interface BadgeProgress {
  totalEarned: number;
  levels: BadgeLevel[];
}

interface TierBadgeProgress {
  tier: "Land" | "Air" | "Water" | "Spirit_Road";
  totalEarned: number;
  levels: BadgeLevel[];
}

interface HonoraryBadge {
  title: string;
  awardedBy: string;
  awardedOn: string;
  citation: string;
}

interface InsigniaBoard {
  explorer: BadgeProgress;
  masters: TierBadgeProgress[];
  legends: BadgeProgress;
  marshals: BadgeProgress;
  guardians: BadgeProgress;
  soulOfSteel?: HonoraryBadge;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_BOARD: InsigniaBoard = {
  explorer: {
    totalEarned: 1,
    levels: [{ level: 1, earnedOn: "2022-03-14" }],
  },
  masters: [
    {
      tier: "Land",
      totalEarned: 5,
      levels: [
        { level: 1, earnedOn: "2022-08-10", campsCompleted: 5 },
        { level: 2, earnedOn: "2023-02-18", campsCompleted: 10 },
        { level: 3, earnedOn: "2023-09-05", campsCompleted: 15 },
        { level: 4, earnedOn: "2024-03-22", campsCompleted: 20 },
        { level: 5, earnedOn: "2024-10-11", campsCompleted: 25 },
      ],
    },
    {
      tier: "Air",
      totalEarned: 5,
      levels: [
        { level: 1, earnedOn: "2022-09-15", campsCompleted: 5 },
        { level: 2, earnedOn: "2023-04-12", campsCompleted: 10 },
        { level: 3, earnedOn: "2023-11-08", campsCompleted: 15 },
        { level: 4, earnedOn: "2024-05-19", campsCompleted: 20 },
        { level: 5, earnedOn: "2024-12-02", campsCompleted: 25 },
      ],
    },
    {
      tier: "Water",
      totalEarned: 5,
      levels: [
        { level: 1, earnedOn: "2022-10-01", campsCompleted: 5 },
        { level: 2, earnedOn: "2023-06-21", campsCompleted: 10 },
        { level: 3, earnedOn: "2023-12-14", campsCompleted: 15 },
        { level: 4, earnedOn: "2024-07-09", campsCompleted: 20 },
        { level: 5, earnedOn: "2025-01-18", campsCompleted: 25 },
      ],
    },
    {
      tier: "Spirit_Road",
      totalEarned: 5,
      levels: [
        { level: 1, earnedOn: "2022-11-05", campsCompleted: 5 },
        { level: 2, earnedOn: "2023-07-29", campsCompleted: 10 },
        { level: 3, earnedOn: "2024-01-17", campsCompleted: 15 },
        { level: 4, earnedOn: "2024-08-26", campsCompleted: 20 },
        { level: 5, earnedOn: "2025-02-01", campsCompleted: 25 },
      ],
    },
  ],
  legends: {
    totalEarned: 5,
    levels: [
      { level: 1, earnedOn: "2023-03-01" },
      { level: 2, earnedOn: "2023-12-01" },
      { level: 3, earnedOn: "2024-06-01" },
      { level: 4, earnedOn: "2024-11-01" },
      { level: 5, earnedOn: "2025-02-10" },
    ],
  },
  marshals: {
    totalEarned: 5,
    levels: [
      { level: 1, earnedOn: "2023-01-10" },
      { level: 2, earnedOn: "2023-09-10" },
      { level: 3, earnedOn: "2024-04-10" },
      { level: 4, earnedOn: "2024-10-10" },
      { level: 5, earnedOn: "2025-02-15" },
    ],
  },
  guardians: {
    totalEarned: 5,
    levels: [
      { level: 1, earnedOn: "2023-05-01" },
      { level: 2, earnedOn: "2024-01-01" },
      { level: 3, earnedOn: "2024-07-01" },
      { level: 4, earnedOn: "2024-12-15" },
      { level: 5, earnedOn: "2025-02-20" },
    ],
  },
  soulOfSteel: {
    title: "Soul of Steel",
    awardedBy: "Major Vivek Jacob, Para SF 9",
    awardedOn: "2025-02-25",
    citation:
      "For leading a rural education initiative impacting over 300 children.",
  },
};

const TIER_META = {
  Land: {
    Icon: Mountain,
    color: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    glow: "rgba(249,115,22,0.12)",
    label: "Land",
  },
  Air: {
    Icon: Wind,
    color: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/5",
    glow: "rgba(56,189,248,0.12)",
    label: "Air",
  },
  Water: {
    Icon: Waves,
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    glow: "rgba(34,211,238,0.12)",
    label: "Water",
  },
  Spirit_Road: {
    Icon: Flame,
    color: "text-rose-400",
    border: "border-rose-500/20",
    bg: "bg-rose-500/5",
    glow: "rgba(251,113,133,0.12)",
    label: "Spirit Road",
  },
};

// ─── Progression Codex data ───────────────────────────────────────────────────

const PROGRESSION_RANKS = [
  {
    rank: "I",
    title: "Explorer",
    icon: Star,
    accent: "text-zinc-300",
    accentBorder: "border-zinc-600/40",
    accentBg: "bg-zinc-800/40",
    requirement: "Complete your first camp.",
    description:
      "Every journey begins with a single step. Your Explorer insignia is proof that you showed up — and that changes everything.",
  },
  {
    rank: "II",
    title: "Master",
    icon: Award,
    accent: "text-cyan-400",
    accentBorder: "border-cyan-500/25",
    accentBg: "bg-cyan-500/5",
    requirement: "Complete 5 camps in a single tier — Land, Air, Water, or Spirit Road.",
    description:
      "A Master has gone deep into one path. You don't just visit a terrain, you understand it. Each tier — Land, Air, Water, Spirit Road — has its own Master title.",
  },
  {
    rank: "III",
    title: "Legend",
    icon: Medal,
    accent: "text-purple-400",
    accentBorder: "border-purple-500/25",
    accentBg: "bg-purple-500/5",
    requirement: "Earn 5 Master badges across any tiers.",
    description:
      "Legends are rare. They've walked multiple terrains, sat across the fire from veterans, and come out the other side changed. This badge is earned, not given.",
  },
  {
    rank: "IV",
    title: "Marshal",
    icon: Trophy,
    accent: "text-amber-400",
    accentBorder: "border-amber-500/25",
    accentBg: "bg-amber-500/5",
    requirement: "Complete all 4 tiers — Land, Air, Water, and Spirit Road.",
    description:
      "The Marshal has covered every terrain. You've pushed through land, air, water, and the road of the spirit. Few ever make it this far. You did.",
  },
  {
    rank: "V",
    title: "Guardian",
    icon: ShieldCheck,
    accent: "text-emerald-400",
    accentBorder: "border-emerald-500/25",
    accentBg: "bg-emerald-500/5",
    requirement: "Earn 5 Marshal badges.",
    description:
      "Guardians don't just protect their own journey — they become a reference point for others. You carry the weight of this community with honour.",
  },
  {
    rank: "★",
    title: "Soul of Steel",
    icon: Zap,
    accent: "text-amber-300",
    accentBorder: "border-amber-400/40",
    accentBg: "bg-amber-500/8",
    requirement: "Personally awarded by Major Vivek Jacob, Para SF 9, Founder of CLAW.",
    description:
      "The highest honour CLAW can bestow. Given only to those who have made a real, positive impact in the world — however small, as long as it makes the world a better place. You will be personally invited to the CLAW HQ.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function totalBadges(board: InsigniaBoard) {
  const masterTotal = board.masters.reduce((a, m) => a + m.totalEarned, 0);
  return (
    board.explorer.totalEarned +
    masterTotal +
    board.legends.totalEarned +
    board.marshals.totalEarned +
    board.guardians.totalEarned +
    (board.soulOfSteel ? 1 : 0)
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zinc-800" />
      <span className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zinc-800" />
    </div>
  );
}

function EarnedPip({ earned }: { earned: boolean }) {
  return (
    <span
      className={`w-2 h-2 rounded-full shrink-0 ${
        earned
          ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
          : "bg-zinc-800"
      }`}
    />
  );
}

function BadgeRow({
  label,
  earnedOn,
  level,
}: {
  label: string;
  earnedOn?: string;
  level: number;
}) {
  const earned = !!earnedOn;
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
        earned
          ? "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900"
          : "border-dashed border-zinc-800/40 opacity-35"
      }`}
    >
      <div className="flex items-center gap-3">
        <EarnedPip earned={earned} />
        <div>
          <p
            className={`text-sm font-bold ${earned ? "text-white" : "text-zinc-600"}`}
          >
            {label}
          </p>
          {earned && (
            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" />
              {fmtDate(earnedOn!)}
            </p>
          )}
        </div>
      </div>
      {earned ? (
        <BadgeImage earned size="h-9" />
      ) : (
        <Lock className="w-4 h-4 text-zinc-800" />
      )}
    </div>
  );
}

function ProgressionCard({
  rank,
}: {
  rank: (typeof PROGRESSION_RANKS)[number];
}) {
  const [open, setOpen] = useState(false);
  const Icon = rank.icon;

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${rank.accentBorder} ${
        open ? rank.accentBg : "bg-transparent hover:bg-white/[0.015]"
      }`}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-4">
          {/* Rank badge */}
          <div
            className={`w-9 h-9 rounded-xl border ${rank.accentBorder} ${rank.accentBg} flex items-center justify-center shrink-0`}
          >
            <Icon className={`w-4 h-4 ${rank.accent}`} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-black tracking-[0.2em] ${rank.accent} opacity-60`}
              >
                RANK {rank.rank}
              </span>
            </div>
            <p className="text-base font-bold text-white leading-tight">
              {rank.title}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-zinc-600 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-600 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-white/[0.05]">
          <div className="pt-4">
            <p className={`text-xs font-bold tracking-[0.15em] uppercase ${rank.accent} opacity-70 mb-1`}>
              How to earn it
            </p>
            <p className="text-sm font-semibold text-white/80">{rank.requirement}</p>
          </div>
          <p className="text-sm text-zinc-400 leading-[1.8]">{rank.description}</p>
          {/* {rank.title === "Soul of Steel" && (
            <div className="mt-2 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <p className="text-xs text-amber-400/70 italic leading-relaxed">
                "Even if it's a small impact — as long as it makes the world a better place, we will invite you personally to the den."
                <br />
                <span className="not-italic text-amber-500/40 font-semibold">— Major Vivek Jacob, Para SF 9</span>
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function InsigniaDetails() {
  const total = totalBadges(MOCK_BOARD);
  const allMastersDone = MOCK_BOARD.masters.every((m) => m.totalEarned === 5);

  return (
    <div
      className="min-h-screen text-zinc-300 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #0c0b09 0%, #080807 100%)" }}
    >
      {/* ── Ambient top glow ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(161,98,7,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-10 space-y-12">

        {/* ══════════════════════════════════════════
            HERO — Hall of Fame header
        ══════════════════════════════════════════ */}
        <header className="text-center space-y-5 pb-2">
          {/* Top citation ribbon */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/20">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)] animate-pulse" /> */}
            <span className="text-xs font-bold tracking-[0.2em] text-amber-400/80 uppercase">
              Hall of Record
            </span>
          </div>

          <h1
            className="text-white leading-[0.96] tracking-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2.4rem, 7vw, 3.6rem)",
              fontWeight: 900,
            }}
          >
            Your Record of<br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #92400e 0%, #d97706 40%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Courage &amp; Craft
            </span>
          </h1>

          <p className="text-zinc-400 text-sm leading-[1.9] max-w-md mx-auto">
            Every insignia here was earned in the field — through terrain, trial, and honest conversation. This is your story, told in metal and merit.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-0 mt-4">
            {[
              { value: total, label: "Insignias Earned" },
              { value: MOCK_BOARD.masters.reduce((a, m) => a + m.totalEarned, 0), label: "Master Badges" },
              { value: "5 / 5", label: "Tiers Conquered", raw: true },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-zinc-800 mx-5" />}
                <div className="text-center">
                  <p className="text-xl font-black text-white tabular-nums">
                    {s.raw ? s.value : s.value}
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5 tracking-wide">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ══════════════════════════════════════════
            SOUL OF STEEL — The pinnacle
        ══════════════════════════════════════════ */}
        {MOCK_BOARD.soulOfSteel && (
          <>
            <SectionDivider label="Highest Honour" />
            <div
              className="relative rounded-2xl border border-amber-600/25 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(120,53,15,0.20) 0%, rgba(10,9,7,0.90) 60%)",
                boxShadow: "0 0 60px rgba(180,83,9,0.12), inset 0 1px 0 rgba(251,191,36,0.06)",
              }}
            >
              {/* Corner watermark */}
              <div className="absolute top-4 right-4 opacity-[0.3] pointer-events-none">
                {/* <Zap className="w-24 h-24 text-amber-400" /> */}
                <BadgeImage earned size="h-38" />
              </div>

              <div className="relative z-10 p-7 space-y-5">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
                      {/* <Zap className="w-5 h-5 text-amber-400" /> */}
                      <BadgeImage earned size="h-14" />
                    </div>
                  <div>
                    {/* <span className="text-xs font-bold tracking-[0.2em] text-amber-500/50 uppercase block mb-1">
                      Honorary Distinction · Personally Awarded
                    </span> */}
                    <h2
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {MOCK_BOARD.soulOfSteel.title}
                    </h2>
                  </div>
                </div>

                <blockquote
                  className="text-sm text-zinc-300 italic leading-[1.9] border-l-2 border-amber-600/40 pl-4"
                >
                  &ldquo;{MOCK_BOARD.soulOfSteel.citation}&rdquo;
                </blockquote>

                <div className="flex items-end justify-between gap-4 pt-1">
                  {/* <div>
                    <p className="text-sm font-bold text-white">{MOCK_BOARD.soulOfSteel.awardedBy}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Founder, CLAW · {fmtDate(MOCK_BOARD.soulOfSteel.awardedOn)}
                    </p>
                  </div> */}
                  {/* <BadgeImage earned size="h-14" /> */}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            GUARDIAN & MARSHAL & LEGEND
        ══════════════════════════════════════════ */}
        <SectionDivider label="Insignias" />
        <div className="space-y-5">
          {[
            {
              title: "Guardian",
              subtitle: "Protector of the Path",
              Icon: ShieldCheck,
              accent: "text-emerald-400",
              border: "border-emerald-500/20",
              bg: "bg-emerald-500/5",
              glow: "rgba(52,211,153,0.08)",
              progress: MOCK_BOARD.guardians,
            },
            {
              title: "Marshal",
              subtitle: "Conqueror of All Terrains",
              Icon: Trophy,
              accent: "text-amber-400",
              border: "border-amber-500/20",
              bg: "bg-amber-500/5",
              glow: "rgba(251,191,36,0.08)",
              progress: MOCK_BOARD.marshals,
            },
            {
              title: "Legend",
              subtitle: "Five-fold Master",
              Icon: Medal,
              accent: "text-purple-400",
              border: "border-purple-500/20",
              bg: "bg-purple-500/5",
              glow: "rgba(192,132,252,0.08)",
              progress: MOCK_BOARD.legends,
            },
          ].map((section) => (
            <div
              key={section.title}
              className={`rounded-2xl border ${section.border} overflow-hidden`}
              style={{ boxShadow: `0 0 40px ${section.glow}` }}
            >
              {/* Header */}
              <div className={`px-6 py-4 ${section.bg} flex items-center justify-between border-b ${section.border}`}>
                <div className="flex items-center gap-3">
                  <section.Icon className={`w-5 h-5 ${section.accent}`} />
                  <div>
                    <h3 className="text-base font-bold text-white">{section.title}</h3>
                    <p className="text-xs text-zinc-500">{section.subtitle}</p>
                  </div>
                </div>
                <div className={`text-sm font-black ${section.accent} tabular-nums`}>
                  {section.progress.totalEarned} <span className="text-zinc-700 font-normal">/ 5</span>
                </div>
              </div>

              {/* Level rows */}
              <div className="p-4 space-y-2">
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const earned = section.progress.levels.find((l) => l.level === lvl);
                  return (
                    <BadgeRow
                      key={lvl}
                      label={`${section.title} ${lvl}`}
                      earnedOn={earned?.earnedOn}
                      level={lvl}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            MASTER TIERS — 2-col grid
        ══════════════════════════════════════════ */}
        <SectionDivider label="Master Tiers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MOCK_BOARD.masters.map((master) => {
            const meta = TIER_META[master.tier];
            const Icon = meta.Icon;
            return (
              <div
                key={master.tier}
                className={`rounded-2xl border ${meta.border} overflow-hidden`}
                style={{ boxShadow: `0 0 30px ${meta.glow}` }}
              >
                {/* Header */}
                <div className={`px-5 py-3.5 ${meta.bg} border-b ${meta.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${meta.color}`} />
                    <span className="text-sm font-bold text-white">{meta.label}</span>
                  </div>
                  <span className={`text-sm font-black ${meta.color} tabular-nums`}>
                    {master.totalEarned} <span className="text-zinc-700 font-normal">/ 5</span>
                  </span>
                </div>

                {/* Levels */}
                <div className="p-3 space-y-1.5 bg-zinc-950/40">
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const earned = master.levels.find((l) => l.level === lvl);
                    return (
                      <div
                        key={lvl}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all ${
                          earned
                            ? "bg-zinc-900/50 border-zinc-800/60 hover:border-zinc-700/70"
                            : "border-dashed border-zinc-800/30 opacity-30"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <EarnedPip earned={!!earned} />
                          <div>
                            <p className={`text-sm font-bold ${earned ? "text-white" : "text-zinc-700"}`}>
                              {meta.label} Master {lvl}
                            </p>
                            {earned && (
                              <p className="text-xs text-zinc-500 mt-0.5">{fmtDate(earned.earnedOn)}</p>
                            )}
                          </div>
                        </div>
                        {earned ? (
                          <BadgeImage earned size="h-7" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-zinc-800" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════
            EXPLORER
        ══════════════════════════════════════════ */}
        <SectionDivider label="Origin" />
        <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <BadgeImage earned size="h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Explorer</p>
              <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3 h-3" />
                {fmtDate(MOCK_BOARD.explorer.levels[0].earnedOn)}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5 italic">Where every journey begins.</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 tracking-widest uppercase">
            Earned
          </span>
        </div>

        {/* ══════════════════════════════════════════
            PROGRESSION CODEX — How to earn each rank
        ══════════════════════════════════════════ */}
        <SectionDivider label="Progression Codex" />
        <div className="space-y-3">
          <div className="text-center space-y-2 mb-6">
            <h2
              className="text-xl font-black text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The Path Forward
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Each insignia is a record of what you&apos;ve walked through. Here is what each rank demands — and what it means.
            </p>
          </div>
          {PROGRESSION_RANKS.map((rank) => (
            <ProgressionCard key={rank.title} rank={rank} />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            CLOSING — from Team CLAW
        ══════════════════════════════════════════ */}
        <div
          className="rounded-2xl border border-zinc-800/50 px-7 py-8 text-center space-y-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,18,14,0.9) 0%, rgba(12,11,9,0.95) 100%)",
          }}
        >
          <p className="text-zinc-400 text-sm leading-[2] max-w-md mx-auto">
            Every insignia you earn is added to your Insignia Board, recorded permanently on your profile, and{" "}
            <span className="text-white font-semibold">physically couriered to you</span> — so you can wear them with pride.
          </p>
          <div className="w-12 h-px bg-zinc-800 mx-auto" />
          <div>
            <p className="text-sm text-zinc-500 italic">
              &ldquo;Each insignia tells the story of your journey — what you&apos;ve achieved and how you&apos;ve grown. We are proud to be on this journey with you.&rdquo;
            </p>
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase mt-2">
              — Team CLAW
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}