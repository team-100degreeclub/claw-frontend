"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area 
} from "recharts";
import { 
  Mountain, Wind, Droplets, Flame, Shield, 
  Users, MapPin, TrendingUp, Trophy, 
  Medal
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataPoint, InsightCard } from "./PerformanceDashboard";
import { MetricItem } from "./corporate/LeadInsights";

// --- MOCK DATA ---
const badgeDistribution = [
  { name: "Land", value: 450, color: "#10b981" },
  { name: "Air", value: 300, color: "#3b82f6" },
  { name: "Water", value: 280, color: "#06b6d4" },
  { name: "Spirit Roads", value: 150, color: "#f59e0b" },
  { name: "Soul of Steel", value: 45, color: "#ef4444" },
];

const timelineData = [
  { name: "Week 1", badges: 400, active: 1200 },
  { name: "Week 2", badges: 600, active: 1400 },
  { name: "Week 3", badges: 500, active: 1100 },
  { name: "Week 4", badges: 900, active: 1800 },
];

export default function InsigniaDashboard() {
  return (
    <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">
      
      {/* 1. SYMBOLIZE BADGES & TOTALS */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <BadgeCategoryCard icon={Medal} label="Total" count="3,572" color="text-white" />
        <BadgeCategoryCard icon={Mountain} label="Land" count="1,240" color="text-emerald-500" />
        <BadgeCategoryCard icon={Wind} label="Air" count="850" color="text-blue-500" />
        <BadgeCategoryCard icon={Droplets} label="Water" count="920" color="text-cyan-500" />
        <BadgeCategoryCard icon={Flame} label="Spirit Roads" count="450" color="text-amber-500" />
        <BadgeCategoryCard icon={Shield} label="Soul of Steel" count="112" color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 2. TIME DIMENSION & TRENDS */}
        <InsightCard title="Badge Trend" className="xl:col-span-2" showFilter>
          <div className="h-[300px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBadge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<HDTooltip />} cursor={{ stroke: '#27272a', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="badges" stroke="#06b6d4" fillOpacity={1} fill="url(#colorBadge)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-zinc-800 pt-6">
            <DataPoint label="MoM Growth" value="+22.4%" highlight />
            <DataPoint label="YoY Growth" value="+114%" highlight />
            <DataPoint label="Active Travelers" value="4,240" />
            <DataPoint label="Inactive (30D)" value="152" color="text-red-400" />
          </div>
        </InsightCard>

        {/* PIE BADGE NUMBERS */}
        <InsightCard title="Badge Composition">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={badgeDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {badgeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<HDTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {badgeDistribution.map((b) => (
              <div key={b.name} className="flex justify-between items-center text-xs font-bold ">
                <span className="text-zinc-500">{b.name}</span>
                <span className="text-white">{b.value}</span>
              </div>
            ))}
          </div>
        </InsightCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* 3. GEOGRAPHIC INSIGHTS & LEADERBOARD */}
        <InsightCard title="Geographic Distribution">
          {/* <div className="bg-zinc-950 border border-zinc-800 rounded-sm h-[300px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <MapPin className="text-cyan-500 w-12 h-12 animate-pulse" />
            <p className="text-[10px]  font-black text-zinc-600 tracking-widest mt-16 absolute">Mapping Active Nodes...</p>
          </div> */}
          <Table>
            <TableHeader>
              <TableRow className="text-xs font-bold text-zinc-500 border-zinc-800">
                <TableHead>Traveler</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Camp Type</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow className="border-zinc-800">
                <TableCell className="font-bold">Vikram Raut</TableCell>
                <TableCell>Mumbai, MH</TableCell>
                <TableCell><Badge className="bg-amber-500/10 text-amber-500 text-[9px]">Spirit Roads</Badge></TableCell>
                <TableCell className="text-right text-zinc-500">14 Feb 2026</TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="font-bold">Vikram Raut</TableCell>
                <TableCell>Mumbai, MH</TableCell>
                <TableCell><Badge className="bg-amber-500/10 text-amber-500 text-[9px]">Spirit Roads</Badge></TableCell>
                <TableCell className="text-right text-zinc-500">14 Feb 2026</TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="font-bold">Vikram Raut</TableCell>
                <TableCell>Mumbai, MH</TableCell>
                <TableCell><Badge className="bg-amber-500/10 text-amber-500 text-[9px]">Spirit Roads</Badge></TableCell>
                <TableCell className="text-right text-zinc-500">14 Feb 2026</TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="font-bold">Vikram Raut</TableCell>
                <TableCell>Mumbai, MH</TableCell>
                <TableCell><Badge className="bg-amber-500/10 text-amber-500 text-[9px]">Spirit Roads</Badge></TableCell>
                <TableCell className="text-right text-zinc-500">14 Feb 2026</TableCell>
              </TableRow>
              <TableRow className="border-zinc-800">
                <TableCell className="font-bold">Vikram Raut</TableCell>
                <TableCell>Mumbai, MH</TableCell>
                <TableCell><Badge className="bg-amber-500/10 text-amber-500 text-[9px]">Spirit Roads</Badge></TableCell>
                <TableCell className="text-right text-zinc-500">14 Feb 2026</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </InsightCard>

        {/* 4. LEADERBOARD */}
        <InsightCard title="Top Performers / High Command">
          <div className="space-y-4">
            {[
              { name: "Rajesh Kumar", badges: 12, level: "Elite", team: "Alpha Squad" },
              { name: "Arjun Mehta", badges: 9, level: "Veteran", team: "Lone Wolf" },
              { name: "Sarah Jenkins", badges: 8, level: "Veteran", team: "Echo Team" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-sm hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-zinc-800">0{i+1}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    {/* <p className="text-[9px]  font-bold text-zinc-500">{p.team}</p> */}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-cyan-400">{p.badges}</p>
                  <p className="text-xs  font-bold text-zinc-600">Badges</p>
                </div>
              </div>
            ))}
          </div>
        </InsightCard>
      </div>

      {/* 5. CLAW CONTRIBUTION / MISSION JOINERS */}
      <InsightCard title="C.L.A.W. Mission Recruitment Tracker" showFilter>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MetricItem label="Total Joined" value="84" sub="+5 This Month" highlight text/>
          <MetricItem label="Full-Time" value="32" sub="Qualified Ops" text/>
          <MetricItem label="Part-Time" value="52" sub="Specialists" text/>
        </div>
        
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 text-[10px]  font-black text-zinc-500">
              <TableHead>Name</TableHead>
              <TableHead>Qualification Level</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Camp Progress</TableHead> */}
              <TableHead className="text-right">Badges</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            <JoinerRow name="Karan Kumar" level="Soul of Steel" status="Full-Time" progress={92} badges={14} />
            <JoinerRow name="Amit Singhania" level="Spirit Road" status="Part-Time" progress={65} badges={7} />
            <JoinerRow name="Neha Sharma" level="Land/Water" status="Part-Time" progress={40} badges={4} />
          </TableBody>
        </Table>
      </InsightCard>
    </div>
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
                    ? (entry.name == "revenue" || currencyCols.includes(entry.dataKey))? displayValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }) : displayValue.toLocaleString('en-IN') 
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