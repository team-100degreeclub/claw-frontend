"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";



// Helper function to format numbers to Indian Rupee currency
const formatToIndianCurrency = (amount: number): string => {
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Assuming whole rupees for these displays
  });
};

// Mock data for the graph
const graphData = [
  { name: "Jan", revenue: 4000, travelers: 2400, camps: 24, corporate: 12 },
  { name: "Feb", revenue: 3000, travelers: 1398, camps: 22, corporate: 15 },
  { name: "Mar", revenue: 5000, travelers: 9800, camps: 29, corporate: 18 },
  { name: "Apr", revenue: 2780, travelers: 3908, camps: 20, corporate: 14 },
  { name: "May", revenue: 4890, travelers: 4800, camps: 31, corporate: 22 },
  { name: "Jun", revenue: 6390, travelers: 3800, camps: 35, corporate: 25 },
];

export default function PerformanceDashboard() {
  const normalizedData = graphData.map((d) => {
    const maxValues = {
      revenue: Math.max(...graphData.map(o => o.revenue)),
      travelers: Math.max(...graphData.map(o => o.travelers)),
      camps: Math.max(...graphData.map(o => o.camps)),
      corporate: Math.max(...graphData.map(o => o.corporate)),
    };

    return {
      ...d,
      normRev: (d.revenue / maxValues.revenue) * 100,
      normTrav: (d.travelers / maxValues.travelers) * 100,
      normCamp: (d.camps / maxValues.camps) * 100,
      normCorp: (d.corporate / maxValues.corporate) * 100,
    };
  });

  return (
    <div className="space-y-8 text-white pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* 1. TOP KPI SECTION: CORPORATE & CAMPS SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KPIGroup
          title="Corporate Summary"
          metrics={[
            { label: "Gross", value: 14500000, color: "text-white" },
            { label: "Expenses", value: 8000000, color: "text-red-400" },
            { label: "Net", value: 6500000, color: "text-cyan-400" }
          ]}
        />
        <KPIGroup
          title="Camps Summary"
          metrics={[
            { label: "Gross", value: 11400000, color: "text-white" },
            { label: "Expenses", value: 5200000, color: "text-red-400" },
            { label: "Net", value: 6200000, color: "text-emerald-400" }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">

        {/* 2. CORPORATE INSIGHTS */}
        <InsightCard title="Corporate Insights" showFilter>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-zinc-800 pb-8 mb-8">
            <DataPoint label="Leads" value="450" />
            <DataPoint label="Converted" value="120" />
            <DataPoint label="Canceled" value="2" />
            <DataPoint label="Conv. Rate" value="26.7%" highlight />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <StatList title="Pay" items={[
              { label: "Average", value: "120000"},
              { label: "High", value: "1500000", desc: "Facebook / California" },
              { label: "Low", value: "10500", desc: "Zerodha / Bangalore" }
            ]} />
            <StatList title="Time to Convert" items={[
              { label: "Average", value: "12 Days" },
              { label: "High", value: "90 Days", desc: "Google / New York" },
              { label: "Low", value: "24 Hours", desc: "Boeing / San Francisco" }
            ]} />
          </div>
        </InsightCard>

        {/* 3. CAMP INSIGHTS */}
        <InsightCard title="Camp Insights" showFilter>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <DataPoint label="Total Camps" value="210" />
            <DataPoint label="Total Travelers" value="8,542" />
            <DataPoint label="Avg Traveler/Camp" value="40" />
            <DataPoint label="Avg Ticket/Camp" value={500} highlight />
          </div>
          <div className="space-y-2">
            <p className="text-base font-black text-zinc-500 tracking-widest mb-4">Camp Breakdown</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[13px] text-zinc-500  font-bold border-b border-zinc-800">
                  <tr>
                    <th className="pb-2 w-[120px]">Type</th>
                    <th className="pb-2 text-right">Tickets Sold</th>
                    <th className="pb-2 text-right">Gross</th>
                    <th className="pb-2 text-right">Net</th>
                    <th className="pb-2 text-right">Avg</th>
                    <th className="pb-2 text-right">High</th>
                  <th className="pb-2 text-right">Low</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-zinc-900">
                  <CampTableRow type="Spirit Road" sold="20" gross={50000} net={30000} avg={2500} high={5000} low={1000} />
                  <CampTableRow type="Adventure-Land" sold="142" gross={284000} net={120000} avg={2000} high={4000} low={800} />
                  <CampTableRow type="Adventure-Air" sold="12" gross={144000} net={90000} avg={12000} high={15000} low={10000} />
                  <CampTableRow type="Adventure-Water" sold="36" gross={72000} net={40000} avg={2000} high={3000} low={1500} />
                </tbody>
              </table>
            </div>
          </div>
        </InsightCard>

        {/* 4. TEAM INSIGHTS */}
        <InsightCard title="Team Insights" showFilter>
          <div className="grid grid-cols-3 gap-6 border-b border-zinc-800 pb-8 mb-8">
            <DataPoint label="Total Members" value="15" />
            <DataPoint label="Total Payout" value={450000} />
            <DataPoint label="Avg/Person" value={30000} highlight />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-base text-zinc-500 font-bold border-b border-zinc-800">
                <tr>
                  <th className="pb-2"></th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Location</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-zinc-900 text-white">
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 font-bold text-emerald-500">Highest Payout</td>
                  <td className="py-3 font-black">{formatToIndianCurrency(19000)}</td>
                  <td className="py-3">Major Sandeep</td>
                  <td className="py-3">Everest Base Camp</td>
                </tr>
                <tr className="hover:bg-zinc-800/30 transition-colors text-white">
                  <td className="py-3 font-bold text-red-400">Lowest Payout</td>
                  <td className="py-3 font-black">{formatToIndianCurrency(2000)}</td>
                  <td className="py-3">Sgt. Miller</td>
                  <td className="py-3">Local Hike / MI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </InsightCard>

        {/* 5. TRAVELLER INSIGHTS */}
        <InsightCard title="Traveller Insights" showFilter>
          <div className="grid grid-cols-3 gap-6">
            <DataPoint label="Unique Travellers" value="7,000" />
            <DataPoint label="Repeat Travellers" value="1,542" />
            <DataPoint label="Repeat Rate" value="22.1%" highlight />
          </div>
          {/* <div className="mt-12 bg-zinc-900/50 p-6 rounded-sm border border-zinc-800 flex items-center justify-between">
            <p className="text-sm text-zinc-400">User Retention Score</p>
            <div className="text-right">
                <span className="text-2xl font-black text-emerald-500 ">High Integrity</span>
            </div>
          </div> */}
        </InsightCard>
      </div>

      {/* 6. TIME-BASED PERFORMANCE GRAPH */}
      <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h3 className="text-sm font-black text-white ">MoM Performance</h3>
          <div className="flex flex-wrap gap-4 text-[10px] font-black">
            <LegendItem color="bg-blue-500" label="Revenue" />
            <LegendItem color="bg-emerald-500" label="Travelers" />
            <LegendItem color="bg-amber-500" label="Camps" />
            <LegendItem color="bg-purple-500" label="Corporate" />
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#52525b"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickMargin={15}
              />
              {/* Y-Axis is hidden as data is normalized for trend visibility */}
              <YAxis hide domain={[0, 110]} />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#27272a', strokeWidth: 1 }} />

              <Line
                name="Revenue"
                type="monotone"
                dataKey="normRev"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#3b82f6' }}
              />
              <Line
                name="Travelers"
                type="monotone"
                dataKey="normTrav"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#10b981' }}
              />
              <Line
                name="Camps"
                type="monotone"
                dataKey="normCamp"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#f59e0b' }}
              />
              <Line
                name="Corporate"
                type="monotone"
                dataKey="normCorp"
                stroke="#a855f7"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-sm">
            <p className="text-xs text-emerald-500  font-black mb-2">Best Performing Months</p>
            <div className="flex gap-4">
              <span className="text-sm font-bold">June - August</span>
              {/* <span className="text-xs text-zinc-500">Peak Expedition Window / High Corp Volume</span> */}
            </div>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-sm">
            <p className="text-xs text-red-400  font-black mb-2">Weakest Performing Months</p>
            <div className="flex gap-4">
              <span className="text-sm font-bold">January - February</span>
              {/* <span className="text-xs text-zinc-500">Monsoon Cycles / Q1 Budget Re-calibration</span> */}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// --- UI HELPER COMPONENTS ---

export function KPIGroup({ title, metrics }: { title: string, metrics: { label: string; value: number; color: string }[] }) {
  return (
    <Card className="bg-zinc-900 border-zinc-700 rounded-sm p-6 overflow-hidden">
      <h3 className="text-lg  tracking-widest font-black text-white mb-6 ">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className={i !== 0 ? "border-l border-zinc-800 pl-4" : ""}>
            <p className="text-sm text-zinc-500  font-bold mb-1">{m.label}</p>
            <p className={`text-2xl font-black tracking-tighter ${m.color}`}>{formatToIndianCurrency(m.value)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function InsightCard({ title, children, showFilter, className }: { title: string, children: React.ReactNode, showFilter?: boolean, className?: string }) {
  return (
    <Card className={cn("bg-zinc-900/30 border border-zinc-700 rounded-sm p-8 flex flex-col", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500" />
          <h3 className="text-lg font-black text-white ">{title}</h3>
        </div>
        {showFilter && (
          <Tabs defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
            <TabsList className="bg-transparent h-7 gap-1">
              {["Week", "Month", "Year", "Lifetime"].map(t => (
                <TabsTrigger key={t} value={t.toLowerCase()} className="text-[9px]  font-black px-2 h-5">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
      {children}
    </Card>
  );
}

export function DataPoint({ label, value, highlight }: any) {
  const displayValue = typeof value === 'number' ? formatToIndianCurrency(value) : value;
  return (
    <div className="space-y-1">
      <p className="text-xs text-zinc-500  font-black tracking-widest">{label}</p>
      <p className={`text-2xl font-black ${highlight ? 'text-cyan-400' : 'text-white'}`}>{displayValue}</p>
    </div>
  );
}

function StatList({ title, items }: { title: string; items: { label: string; value: string; desc?: string }[] }) {
  return (
    <div className="space-y-5">
      <p className="text-[11px]  font-black text-zinc-500 tracking-widest">{title}</p>
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-start border-b border-zinc-800/50 pb-2">
            <div className="space-y-0.5">
              <p className="text-sm text-zinc-300 font-bold">{item.label}</p>
              {item.desc && <p className="text-[12px] text-zinc-500  font-bold tracking-tighter">{item.desc}</p>}
            </div>
            <p className="text-sm font-black text-white">{title == "Pay" ? formatToIndianCurrency(parseInt(item.value)) : item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampTableRow({ type, sold, gross, net, avg, high, low }: { type: string; sold: string; gross: number; net: number; avg: number; high: number; low: number }) {
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors">
      <td className="py-3 font-bold text-zinc-300">{type}</td>
      <td className="py-3 text-right font-black text-zinc-500">{sold}</td>
      <td className="py-3 text-right font-black">{formatToIndianCurrency(gross)}</td>
      <td className="py-3 text-right font-black text-emerald-500">{formatToIndianCurrency(net)}</td>
      <td className="py-3 text-right font-black">{formatToIndianCurrency(avg)}</td>
      <td className="py-3 text-right font-black text-white">{formatToIndianCurrency(high)}</td>
      <td className="py-3 text-right font-black text-zinc-500">{formatToIndianCurrency(low)}</td>
    </tr>
  );
}

export function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm backdrop-blur-xl ring-1 ring-white/10">
        <p className="text-sm font-black text-white mb-3 border-b border-zinc-800 pb-2">
          {label}
        </p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => {
            // Map normalized keys back to original keys for display
            const keyMap: Record<string, string> = {
              normRev: "revenue",
              normTrav: "travelers",
              normCamp: "camps",
              normCorp: "corporate"
            };
            const originalValue = entry.payload[keyMap[entry.dataKey]];
            
            return (
              <div key={index} className="flex items-center justify-between gap-12">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: entry.color, backgroundColor: entry.color }} />
                  <span className="text-[11px] font-black text-zinc-400">{entry.name}</span>
                </div>
                <span className="text-xs font-black text-white">
                  {entry.name === "Revenue" 
                    ? `₹${originalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` 
                    : originalValue.toLocaleString('en-IN')
                  }
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};