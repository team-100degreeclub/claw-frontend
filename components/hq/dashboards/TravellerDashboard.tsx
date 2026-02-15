"use client";

import { Card, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, } from "recharts";
import { MetricItem } from "./corporate/LeadInsights";
import { InsightCard } from "./PerformanceDashboard";

// Mock Data for Demographics
const ageData = [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 25 },
    { name: "45+", value: 15 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

export default function TravellerDashboard() {
    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">

            {/* 1. CORE TRAVELLER METRICS */}
            <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricItem label="Total Registered" value="24,500" sub="All Time" text />
                    <MetricItem label="Active Per Day" value="1,240" sub="Avg. 24h" text />
                    <MetricItem label="Active (90D)" value="8,900" sub="Rolling window" text />
                    <MetricItem label="New vs Returning" value="42% / 58%" highlight text />
                </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* 2. GROWTH & GEOGRAPHY */}
                <InsightCard title="Growth & Geo-Analytics" className="xl:col-span-2">
                    <Table>
                        <TableHeader className="border-zinc-800">
                            <TableRow className="text-sm font-black text-zinc-500 ">
                                <TableHead>Location (Country/State)</TableHead>
                                <TableHead className="text-right">Total Travellers</TableHead>
                                <TableHead className="text-right">Growth Rate</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm">
                            <GeoRow country="India" state="Maharashtra" city="Mumbai" travellers="4,200" growth="+12%" revenue="8400000" />
                            <GeoRow country="India" state="Ladakh" city="Leh" travellers="1,800" growth="+24%" revenue="4200000" />
                            <GeoRow country="USA" state="California" city="San Fran" travellers="850" growth="+8%" revenue="₹12100000" />
                        </TableBody>
                    </Table>
                </InsightCard>

                {/* 3. CUSTOMER PERSONA: DEMOGRAPHICS */}
                <InsightCard title="Customer Persona">
                    <div className="space-y-8">
                        <div className="flex flex-col items-center">
                            <p className="text-[10px]  font-black text-zinc-500 mb-4 self-start">Age Distribution</p>
                            <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ageData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="name" stroke="#71717a" fontSize={10} axisLine={false} tickLine={false} />
                                        <YAxis hide />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#131314' }}/>
                                        <Bar dataKey="value" radius={[2, 2, 0, 0]} className="hover:bg-black">
                                            {ageData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-6">
                            <MiniStat label="Gender (M/F/O)" value="62% / 35% / 3%" />
                            <MiniStat label="Group Preference" value="Duo (45%)" sub="Solo: 20% | Group: 35%" />
                        </div>
                    </div>
                </InsightCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 5. TICKETS BOOKED TO ATTENDED */}
                <InsightCard title="Fulfillment: Booking vs Attendance">
                    <div className="space-y-4">
                        {/* <p className="text-base font-black text-zinc-500 ">Traveller Origin Proximity</p> */}
                        <AttendanceRow label="Same City" booked={450} attended={442} />
                        <AttendanceRow label="Same State" booked={1200} attended={1150} />
                        <AttendanceRow label="Different State" booked={800} attended={720} />
                        <AttendanceRow label="Different Country" booked={150} attended={142} />
                    </div>
                </InsightCard>

                {/* 6. CAMP PARTICIPATION COMPARISON */}
                <InsightCard title="Camp Participation">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-sm">
                                <p className="text-[10px]  font-black text-zinc-500 mb-1">Retention</p>
                                <p className="text-sm font-bold text-white leading-tight">Old Travellers Buying New Camps</p>
                                <p className="text-2xl font-black text-emerald-500 mt-2">68%</p>
                            </div>
                            <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-sm">
                                <p className="text-[10px]  font-black text-zinc-500 mb-1">Acquisition</p>
                                <p className="text-sm font-bold text-white leading-tight">New Travellers Buying Old Camps</p>
                                <p className="text-2xl font-black text-cyan-500 mt-2">32%</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-black text-zinc-500 mb-4">Repeat Booking Rate Per Category</p>
                            <div className="space-y-2">
                                <CategoryProgress label="Spirit Road" rate={45} color="bg-blue-500" />
                                <CategoryProgress label="Adventure Land" rate={78} color="bg-blue-500" />
                                <CategoryProgress label="Adventure Air" rate={12} color="bg-blue-500" />
                                <CategoryProgress label="Adventure Water" rate={34} color="bg-blue-500" />
                            </div>
                        </div>
                    </div>
                </InsightCard>
            </div>
        </div>
    );
}

// --- REFINED SUB-COMPONENTS ---

function GeoRow({ country, state, city, travellers, growth, revenue }: any) {
    return (
        <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
            <TableCell>
                <span className="block font-bold">{city}</span>
                <span className="text-xs  text-zinc-500">{state}, {country}</span>
            </TableCell>
            <TableCell className="text-right font-black">{travellers}</TableCell>
            <TableCell className="text-right text-emerald-500 font-bold">{growth}</TableCell>
            <TableCell className="text-right font-black text-white">{parseFloat(revenue).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</TableCell>
        </TableRow>
    );
}

function AttendanceRow({ label, booked, attended }: any) {
    const rate = ((attended / booked) * 100).toFixed(1);
    return (
        <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
            <span className="text-sm text-zinc-400 font-medium">{label}</span>
            <div className="flex items-center gap-8">
                <div className="text-right">
                    <span className="text-xs text-zinc-500  block">Booked / Attended</span>
                    <span className="text-sm font-black text-white">{booked} / {attended}</span>
                </div>
                <div className="w-16 text-right">
                    <span className="text-xs text-zinc-500  block">Ratio</span>
                    <span className="text-sm font-black text-emerald-500">{rate}%</span>
                </div>
            </div>
        </div>
    );
}

function CategoryProgress({ label, rate, color }: any) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm  font-bold tracking-tighter">
                <span className="text-zinc-400">{label}</span>
                <span className="text-white">{rate}%</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${rate}%` }} />
            </div>
        </div>
    );
}

function MiniStat({ label, value, sub }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[9px] text-zinc-500 uppercase font-black">{label}</p>
            <p className="text-sm font-black text-white">{value}</p>
            {sub && <p className="text-[10px] text-zinc-600 font-bold leading-tight">{sub}</p>}
        </div>
    );
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm backdrop-blur-xl ring-1 ring-white/10">
        {/* Header: Displays the Age Group Label */}
        <p className="text-[10px] font-black text-zinc-500 mb-3 border-b border-zinc-800 pb-2">
          Age Segment: {label}
        </p>

        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-2.5">
            {/* Legend Indicator matching the bar color */}
            {/* <div 
              className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" 
              style={{ backgroundColor: payload[0].color, color: payload[0].color }} 
            /> */}
            <span className="text-[11px] font-black text-zinc-400 tracking-tight">
              Total Travelers
            </span>
          </div>

          {/* Actual Count Display */}
          <span className="text-sm font-black text-white font-mono">
            {payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};