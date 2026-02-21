"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch"; // npx shadcn-ui@latest add switch
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { HDTooltip } from "./InsigniaDashboard";
import { useParams } from "next/navigation";
import { HOST_DATA } from "@/components/hq/team/TeamSidebar";
import { InsightCard, LegendItem } from "./PerformanceDashboard";
import { cn } from "@/lib/utils";

export default function HostInsightsView({ teamView = false }: { teamView?: boolean }) {
  const { view } = useParams();
  const [isAvailable, setIsAvailable] = useState(true);

  const host = HOST_DATA.find(h => h.id === view) || HOST_DATA[0];

  return (
    <div className="space-y-8 pb-20 text-white animate-in fade-in duration-500">

      {/* 1. HEADER & AVAILABILITY TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl font-black   tracking-tighter">
            Welcome {host.rank} {host.name.split(' ').slice(1).join(' ')}
          </h1>

          <p className="text-xs text-zinc-500 font-bold mt-3">
            CLAW Collaboration ID: <span className="text-zinc-300">#SF-{host.id.split('-')[0].toUpperCase()}</span>
          </p>
        </div>
        <div className="flex flex-col items-end align-end">
          <div className="flex items-center gap-4 p-3 rounded-md w-fit">
            <div className="text-right">
              {/* <p className="text-[10px]  font-black text-zinc-500">Current Status</p> */}
              <p className={"text-xs font-bold"}>
                Status: <span className={`text-xs font-bold ${isAvailable ? 'text-emerald-500' : 'text-amber-500'}`}>{isAvailable ? 'Available' : 'On Holiday / Busy'}</span>
              </p>
            </div>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
          <p className="text-xs text-zinc-500 font-bold">
            On CLAW Global Since <span className="text-zinc-300">{host.joined.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
          </p>

        </div>
      </div>
      <div className="bg-zinc-900/20 rounded-sm lg:col-span-2">
        <p className="text-sm font-black text-zinc-500 mb-2 tracking-widest ">Vision</p>
        <p className="text-sm leading-relaxed text-zinc-300  font-medium">
          To bridge the gap between elite survivalist training and civilian resilience.
          My mission is to cultivate a tribe of travelers who find strength in the wild
          and discipline in the spirit of the special forces.
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <ProfileDetail label="Nationality" value={host.nationality} />
        <ProfileDetail label="Contact" value={`${host.id}@claw.mission, +91 ${host.phone}`} />
        <ProfileDetail label="Present Location" value={host.location} />
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-4"> */}

      <div >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black text-zinc-500 mb-2 tracking-widest">
            Service Record
          </h2>
          {/* <div className="h-px flex-1 bg-zinc-900 ml-4" /> */}
        </div>

        <div className="space-y-0">
          {/* Entry 1 */}
          <div className="relative pl-8 pb-10 border-l border-zinc-800 group">
            {/* Timeline Node - White/Black contrast */}
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-zinc-950 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

            <div className="flex flex-col gap-2 -mt-1">
              {/* Date Range as a primary anchor */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-white bg-zinc-800 px-2 py-0.5 rounded-sm">
                  1999 — 2025
                </span>
                <div className="h-[1px] w-4 bg-zinc-800" />
                <span className="text-[10px] font-black text-zinc-500">
                  12 yrs
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-tight">
                  Major
                </span>
                <span className="text-xs font-bold text-zinc-500 tracking-wide">
                  9 Para SF
                  {/* <span className="text-zinc-800 mx-1">/</span> REGIMENTAL COMMAND */}
                </span>
              </div>
            </div>
          </div>

          {/* Entry 2 */}
          <div className="relative pl-8 pb-2 border-l border-zinc-800 group">
            {/* Timeline Node - Dimmed for past record */}
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-700 ring-4 ring-zinc-950 transition-all duration-300 group-hover:bg-zinc-400 group-hover:scale-125" />

            <div className="flex flex-col gap-2 -mt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-white bg-zinc-800 px-2 py-0.5 rounded-sm">
                  1992 — 1999
                </span>
                <div className="h-[1px] w-4 bg-zinc-900" />
                <span className="text-[10px] font-black text-zinc-600">
                  8 yrs
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-black text-zinc-400 tracking-tight">
                  Lieutenant
                </span>
                <span className="text-xs font-bold text-zinc-600 tracking-wide">
                  9 Para SF
                  {/* <span className="text-zinc-800 mx-1">/</span> SPECIAL OPERATIONS */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Vision / Bio */}
      {/* </div> */}

      {/* 2. TOP METRICS (DASHBOARD) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricBox label="Monthly Revenue" value="₹12,00,000" sub="+12% vs last month" highlight />
        <MetricBox label="Corporate Revenue(Net)" value="₹8,50,000" sub="Average: ₹7,50,000" />
        <MetricBox label="Camp Revenue(Net)" value="₹1,50,000" sub="Average: ₹1,50,000" />
        <MetricBox label="Avg Pay / Corp Event" value="₹7,50,000" />
        <MetricBox label="Avg Pay / Camp" value="₹1,50,000" />
        <MetricBox label="Avg Ticket Size" value="₹45,000" />
        <MetricBox label="Avg Camps / Month" value="6" sub="Avg Bookings Per Camp: 42" />
        <MetricBox label="Avg Seats" value="42" />
        <MetricBox label="Repeat Travelers" value="18%" highlight sub="+5% vs last month" />
      </div> */}
      {!teamView &&
        <InsightCard title="Deal" className="xl:col-span-2" showFilter>
          <div className="flex flex-col gap-2">
            <MetricBox label="Corporate Revenue(Net)" value="₹8,50,000" />
            {/* <div className="p-4 flex flex-row">
            <span className="text-xl font-black inline-block">Corporate Net:</span>
            <span className="text-xl ml-1 font-black text-white inline-block">₹6,50,000</span>
          </div> */}
            {/* <PerformanceTable
            title=""
            headers={["Company / Location", "Schedule", "Other Speakers", "Net"]}
            rows={[
              ["Tech Corp / London", "12 Feb - 14 Feb", "John Doe, Jane Smith", "₹2,92,000"],
              ["Global Inc / NY", "20 Mar - 22 Mar", "Jane Smith, John Doe", "₹7,36,000"],
            ]}
          /> */}
            <InsightTable
              title="Corporate Insights"
              headers={["Company / Location", "Collab", "Net"]}
              data={[
                ["Tech Corp / London", "John Doe, Jane Smith", "₹2,92,000"],
                ["Global Inc / NY", "Jane Smith, John Doe", "₹7,36,000"],
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <MetricBox label="Camp Revenue(Net)" value="₹1,50,000" />
            <InsightTable
              title="Camp Insights"
              headers={["Camp Name / Location", "Type", "Collab", "Target Audience", "Ticket Size", "Net"]}
              data={[
                ["Himalayan Endurance / India", "Spirit Roads", "Major Karan", "18 - 40", "₹45,000", "₹30,56,000"],
                ["Deep Dive / New York", "Adventure - Water", "Capt. Sameer S.", "18 - 40", "₹74,000", "₹74,40,000"],
              ]}
            />
          </div>
        </InsightCard>
      }
      <InsightCard title="Camp Audience" className="xl:col-span-2">
        <InsightTable
          title="Camp Audience"
          headers={["Age Group", "Gender", "Location"]}
          data={[
            ["25-34", "Male", "Mumbai, India"],
            ["35-44", "Female", "Bangalore, India"],
          ]}
          classname="border-0"
        />
      </InsightCard>

      {/* 3. PERFORMANCE TABLES (CORP & CAMPS) */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
        {/* <PerformanceTable 
          title="Corporate Performance" 
          headers={["Org. Name / Location", "Net"]}
          rows={[
            ["Alpha Corp / New Delhi", "₹180K"],
            ["Innovate Inc. / San Francisco", "₹95K"],
          ]}
        /> */}
        {/* <PerformanceTable
          title="Overall Performance"
          headers={["", "Revenue", "Houseful", "Canceled", "Refunded"]}
          rows={[
            ["Spirit Roads", "₹6,50,000", "8", "0", "2"],
            ["Adventure - Land", "₹11,00,000", "14", "2", "4"],
            ["Adventure - Air", "₹14,00,000", "5", "1", "1"],
            ["Adventure - Water", "₹6,00,000", "9", "0", "0"],
            ["Corporate", "₹6,00,000", "9", "0", "0"],
          ]}
        /> */}
      </div>

      {/* 4. AUDIENCE & CORPORATE INSIGHTS */}
      {/* <InsightTable
        title="Corporate Insights"
        headers={["Company / Location", "Schedule", "Other Speakers", "Net"]}
        data={[
          ["Tech Corp / London", "12 Feb - 14 Feb", "John Doe, Jane Smith", "₹2,92,000"],
          ["Global Inc / NY", "20 Mar - 22 Mar", "Jane Smith, John Doe", "₹7,36,000"],
        ]}
      />
      <InsightTable
        title="Camp Insights"
        headers={["Camp Name / Location", "Schedule", "Net", "Refunded Amount"]}
        data={[
          ["Himalayan Endurance / India", "12 Feb - 14 Feb", "₹30,56,000", "₹5,64,000"],
          ["Deep Dive / New York", "20 Mar - 22 Mar", "₹74,40,000", "₹22,72,000"],
        ]}
      /> */}



      {/* 5. ADDITIONAL ANALYTICS */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MiniDataPoint label="Avg Ticket Size" value="₹4,500" />
        <MiniDataPoint label="Avg Seats" value="42" />
        <MiniDataPoint label="Avg Camps / Month" value="6" />
        <MiniDataPoint label="Repeat Travelers" value="18%" highlight />
      </div> */}

      {/* 6. MONTHLY REVENUE TREND */}
      {/* <Card className="bg-zinc-900/40 border border-zinc-800 rounded-none p-8">
      <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-6 bg-cyan-500" />
          <h3 className="text-lg font-black text-white ">Revenue Trend</h3>
        </div>
        <div className="h-[300px] w-full"> */}
      <InsightCard title="Traveller Traffic" className="xl:col-span-2" showFilter>
        <div className="self-end flex flex-wrap gap-4 text-[10px] font-black">
          <LegendItem color="bg-blue-500" label="New" />
          <LegendItem color="bg-green-500" label="Repeat" />
        </div>
        <div className="h-[300px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              {
                name: 'Mar 25',
                newTravellers: 120,
                repeatTravellers: 45,
                growthRateNew: 15,
                growthRateRepeat: 10
              },
              {
                name: 'Apr 25',
                newTravellers: 110,
                repeatTravellers: 42,
                growthRateNew: 8,
                growthRateRepeat: 6
              },
              {
                name: 'May 25',
                newTravellers: 130,
                repeatTravellers: 50,
                growthRateNew: 18,
                growthRateRepeat: 12
              },
              {
                name: 'Jun 25',
                newTravellers: 140,
                repeatTravellers: 55,
                growthRateNew: 22,
                growthRateRepeat: 15
              },
              {
                name: 'Jul 25',
                newTravellers: 150,
                repeatTravellers: 60,
                growthRateNew: 25,
                growthRateRepeat: 18
              },
              {
                name: 'Aug 25',
                newTravellers: 160,
                repeatTravellers: 65,
                growthRateNew: 28,
                growthRateRepeat: 20
              },
              {
                name: 'Sept 25',
                newTravellers: 170,
                repeatTravellers: 70,
                growthRateNew: 31,
                growthRateRepeat: 22
              },
              {
                name: 'Oct 25',
                newTravellers: 180,
                repeatTravellers: 75,
                growthRateNew: 34,
                growthRateRepeat: 24
              },
              {
                name: 'Nov 25',
                newTravellers: 190,
                repeatTravellers: 80,
                growthRateNew: 37,
                growthRateRepeat: 26
              },
              {
                name: 'Dec 25',
                newTravellers: 200,
                repeatTravellers: 85,
                growthRateNew: 40,
                growthRateRepeat: 28
              },
              {
                name: 'Jan 26',
                newTravellers: 210,
                repeatTravellers: 90,
                growthRateNew: 43,
                growthRateRepeat: 30
              },
              {
                name: 'Feb 26',
                newTravellers: 220,
                repeatTravellers: 95,
                growthRateNew: 46,
                growthRateRepeat: 32
              }
            ]}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis dataKey="newTravellers" stroke="#52525b" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const growthRateNew = data.growthRateNew ? `${parseInt(data.growthRateNew) > 0 ? '+' : parseInt(data.growthRateNew) < 0 ? '-' : ''}${data.growthRateNew}%` : 'N/A';
                    const growthRateRepeat = data.growthRateRepeat ? `${parseInt(data.growthRateRepeat) > 0 ? '+' : parseInt(data.growthRateRepeat) < 0 ? '-' : ''}${data.growthRateRepeat}%` : 'N/A';
                    // console.log(data);
                    // console.log(growthRateNew);
                    // console.log(growthRateRepeat);

                    return (
                      <TrafficTooltip
                        active={active}
                        label={label}
                        newTravellers={data.newTravellers}
                        repeatTravellers={data.repeatTravellers}
                        growthRateNew={growthRateNew}
                        growthRateRepeat={growthRateRepeat}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="newTravellers" stroke="#06b6d4" strokeWidth={4} dot={false} />
              <Line type="monotone" dataKey="repeatTravellers" stroke="#10b981" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </InsightCard>
      {!teamView &&
        <InsightCard title="Revenue Trend" className="xl:col-span-2" showFilter>
          <div className="self-end flex flex-wrap gap-4 text-[10px] font-black">
            {/* <LegendItem color="bg-blue-500" label="New" />
            <LegendItem color="bg-green-500" label="Repeat" /> */}
            <LegendItem color="bg-blue-500" label="Corporate" />
            <LegendItem color="bg-green-500" label="Spirit Roads" />
            <LegendItem color="bg-violet-500" label="Adventure - Land" />
            <LegendItem color="bg-yellow-500" label="Adventure - Air" />
            <LegendItem color="bg-red-500" label="Adventure - Water" />
          </div>
          <div className="h-[500px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { name: 'Mar 25', total: 100000, corporate: 40000, spiritRoads: 20000, land: 15000, air: 15000, water: 10000 },
                  { name: 'Apr 25', total: 95000, corporate: 35000, spiritRoads: 25000, land: 12000, air: 13000, water: 10000 },
                  { name: 'May 25', total: 110000, corporate: 45000, spiritRoads: 22000, land: 18000, air: 15000, water: 10000 },
                  { name: 'Jun 25', total: 105000, corporate: 42000, spiritRoads: 21000, land: 16000, air: 16000, water: 10000 },
                  { name: 'Jul 25', total: 120000, corporate: 48000, spiritRoads: 28000, land: 20000, air: 14000, water: 10000 },
                  { name: 'Aug 25', total: 115000, corporate: 46000, spiritRoads: 26000, land: 19000, air: 15000, water: 9000 },
                  { name: 'Sep 25', total: 130000, corporate: 52000, spiritRoads: 30000, land: 22000, air: 16000, water: 10000 },
                  { name: 'Oct 25', total: 140000, corporate: 55000, spiritRoads: 35000, land: 24000, air: 16000, water: 10000 },
                  { name: 'Nov 25', total: 155000, corporate: 60000, spiritRoads: 38000, land: 25000, air: 20000, water: 12000 },
                  { name: 'Dec 25', total: 180000, corporate: 70000, spiritRoads: 45000, land: 30000, air: 25000, water: 10000 },
                  { name: 'Jan 26', total: 170000, corporate: 65000, spiritRoads: 42000, land: 28000, air: 22000, water: 13000 },
                  { name: 'Feb 26', total: 210000, corporate: 80000, spiritRoads: 50000, land: 35000, air: 30000, water: 15000 }
                ]}
                margin={{ top: 10, right: 10, left: 30, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis
                  stroke="#52525b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                />
                <Tooltip content={<HDTooltip />} />

                {/* Individual Category Lines */}
                <Line name="Corporate" type="monotone" dataKey="corporate" stroke="#06b6d4" strokeWidth={3} dot={false} />
                <Line name="Spirit Roads" type="monotone" dataKey="spiritRoads" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line name="Adventure-Land" type="monotone" dataKey="land" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line name="Adventure-Air" type="monotone" dataKey="air" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line name="Adventure-Water" type="monotone" dataKey="water" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </InsightCard>
      }
      {/* </div>
      </Card> */}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MetricBox({ label, value, sub, highlight }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none">
      <p className="text-sm font-black text-zinc-500 tracking-widest">{label}</p>
      <h3 className={`text-3xl font-black mt-2 tracking-tighter ${highlight ? 'text-green-400' : 'text-white'}`}>
        {value}
      </h3>
      {sub && <p className="text-xs text-zinc-600 font-bold mt-1 ">{sub}</p>}
    </Card>
  );
}


function PerformanceTable({ title, headers, rows }: { title: string, headers: string[], rows: any[][] }) {
  console.log(rows[0]);
  return (
    <Card className="bg-zinc-900/20 border border-zinc-800 rounded-none p-6">
      {/* <h3 className="text-base font-black text-zinc-500 mb-6  tracking-widest">{title}</h3> */}
      <div className="flex items-center gap-3">
        {/* <div className="w-1 h-6 bg-cyan-500" /> */}
        <h3 className="text-lg font-black text-white ">{title}</h3>
      </div>
      <Table>
        <TableHeader className="border-zinc-800">
          <TableRow className="text-sm text-zinc-900 hover:bg-transparent">
            {headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {rows.map((row: any[], index: number) => <TableRow key={`${row[0]}-${index}`}>
            {Array.isArray(row) ? row.map((cell: string, index: number) => <TableCell key={index} className="text-sm">{cell}</TableCell>) : <TableCell key={0} className="text-sm">{row}</TableCell>}
          </TableRow>)}
        </TableBody>
      </Table>
    </Card>
  );
}

function InsightTable({ title, headers, data, classname }: { title: string, headers: string[], data: string[][], classname?: string }) {
  return (
    <Card className={cn("bg-dark border-0 rounded-none ring-0 pt-0", classname)}>
      {/* <h3 className="text-xs  font-black text-cyan-500 mb-6  tracking-widest">{title}</h3> */}
      {/* <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-cyan-500" />
        <h3 className="text-lg font-black text-white ">{title}</h3>
      </div> */}
      <Table>
        <TableHeader>
          <TableRow className={cn("text-sm font-bold text-zinc-500 hover:bg-transparent", `w-1/${headers.length}`)}>
            {headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm text-zinc-300">
          {data.map((row: any[], index: number) => <TableRow key={`${row[0]}-${index}`}>
            {Array.isArray(row) ? row.map((cell: string, index: number) => <TableCell key={index} className="text-sm">{cell}</TableCell>) : <TableCell key={0} className="text-sm">{row}</TableCell>}
          </TableRow>)}
        </TableBody>
      </Table>
    </Card>
  );
}

function MiniDataPoint({ label, value, highlight }: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-none">
      <p className="text-xs  font-black text-zinc-600 tracking-widest">{label}</p>
      <p className={`text-xl font-black mt-1 ${highlight ? 'text-emerald-500 ' : 'text-white'}`}>{value}</p>
    </div>
  );
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-zinc-900 pb-2">
      <span className="text-xs  font-black text-zinc-500 tracking-widest">{label}</span>
      <span className="text-sm font-bold text-white mt-1">{value}</span>
    </div>
  );
}

export const TrafficTooltip = ({
  active,
  label,
  newTravellers,
  repeatTravellers,
  growthRateNew,
  growthRateRepeat
}: any) => {
  if (active) {
    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] rounded-sm backdrop-blur-xl ring-1 ring-white/10 min-w-[220px] animate-in fade-in zoom-in-95 duration-200">

        {/* Tooltip Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <p className="text-xs font-black text-white capitalize">
            {label}
          </p>
          <span className="text-[10px] font-bold text-zinc-500">
            Traffic
          </span>
        </div>

        {/* Data Points */}
        <div className="space-y-4">

          {/* New Travellers Row */}
          <div className="flex items-center justify-between gap-6 group">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-zinc-400 tracking-tight">New</span>
                <span className="text-[9px] font-bold">{growthRateNew} Growth</span>
              </div>
            </div>
            <span className="text-sm font-black text-white ">
              {newTravellers?.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Repeat Travellers Row */}
          <div className="flex items-center justify-between gap-6 group">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-zinc-400 tracking-tight">Repeat</span>
                <span className="text-[9px] font-bold">{growthRateRepeat} Growth</span>
              </div>
            </div>
            <span className="text-sm font-black text-white ">
              {repeatTravellers?.toLocaleString('en-IN')}
            </span>
          </div>

        </div>
      </div>
    );
  }
  return null;
};