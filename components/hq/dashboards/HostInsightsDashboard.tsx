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

export default function HostInsightsView() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="space-y-8 pb-20 text-white animate-in fade-in duration-500">
      
      {/* 1. HEADER & AVAILABILITY TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl font-black   tracking-tighter">
            Welcome <span className="text-blue-500 ml-2">Major</span> Arjun Mehta
          </h1>
          <p className="text-xs text-zinc-500 font-bold  tracking-widest mt-2">
            CLAW Collaboration ID: #SF-992-ALPHA
          </p>
        </div>

        <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-3 rounded-md">
          <div className="text-right">
            <p className="text-[10px]  font-black text-zinc-500">Current Status</p>
            <p className={`text-xs font-bold ${isAvailable ? 'text-emerald-500' : 'text-amber-500'}`}>
              {isAvailable ? 'Available' : 'On Holiday / Busy'}
            </p>
          </div>
          <Switch 
            checked={isAvailable} 
            onCheckedChange={setIsAvailable}
            className="data-[state=checked]:bg-emerald-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <div className="space-y-6">
          <ProfileDetail label="Email Address" value="arjun.mehta@claw.mission" />
          <ProfileDetail label="Nationality" value="Indian" />
          <ProfileDetail label="Present Location" value="Leh, Ladakh Sector" />
        </div>

        {/* Service Record Table */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-sm">
          <p className="text-[10px] uppercase font-black text-zinc-500 mb-4 tracking-widest italic">Service Record</p>
          <Table>
            <TableHeader className="border-b border-zinc-800">
              <TableRow className="hover:bg-transparent text-[9px] uppercase font-bold text-zinc-500">
                <TableHead className="h-8">Rank</TableHead>
                <TableHead className="h-8">Unit</TableHead>
                <TableHead className="h-8 text-right">Service Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-none text-xs font-bold">
                <TableCell>Major</TableCell>
                <TableCell>9 Para SF</TableCell>
                <TableCell className="text-right">12 Years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Host Vision / Bio */}
        <div className="bg-zinc-900/20 border-l-2 border-cyan-500 p-6 rounded-sm lg:col-span-2">
          <p className="text-[10px] uppercase font-black text-cyan-500 mb-2 tracking-widest italic">Vision</p>
          <p className="text-sm leading-relaxed text-zinc-300 italic font-medium">
            "To bridge the gap between elite survivalist training and civilian resilience. 
            My mission is to cultivate a tribe of travelers who find strength in the wild 
            and discipline in the spirit of the special forces."
          </p>
        </div>
      </div>

      {/* 2. TOP METRICS (DASHBOARD) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricBox label="Monthly Revenue" value="₹1.2M" sub="+12% vs last month" highlight />
        <MetricBox label="Corporate Net" value="₹850K" sub="Gross: ₹1.1M" />
        <MetricBox label="Avg Pay / Camp" value="₹15,000" />
        <MetricBox label="Avg Pay / Corp Event" value="₹75,000" />
      </div>

      {/* 3. PERFORMANCE TABLES (CORP & CAMPS) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <PerformanceTable 
          title="Corporate Performance" 
          headers={["Sectors", "Gross", "Net", "Houseful", "Canceled"]}
          rows={[
            { name: "Alpha Corp", gross: "₹250K", net: "₹180K", h: "12", c: "1" },
            { name: "Innovate Inc.", gross: "₹120K", net: "₹95K", h: "4", c: "0" },
          ]}
        />
        <PerformanceTable 
          title="Camp Performance" 
          headers={["Sectors", "Gross", "Net", "Houseful", "Canceled"]}
          rows={[
            { name: "Spirit Roads", gross: "₹90K", net: "₹65K", h: "8", c: "0" },
            { name: "Adventure Land", gross: "₹150K", net: "₹110K", h: "14", c: "2" },
            { name: "Adventure Air", gross: "₹210K", net: "₹140K", h: "5", c: "1" },
            { name: "Adventure Water", gross: "₹85K", net: "₹60K", h: "9", c: "0" },
          ]}
        />
      </div>

      {/* 4. AUDIENCE & CORPORATE INSIGHTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <InsightTable 
          title="Corporate Insights" 
          headers={["Company", "Name", "Location", "Gross", "Net"]}
          data={[
            { c: "Tech Corp", n: "John Doe", l: "London", g: "₹45K", net: "₹38K" },
            { c: "Global Inc", n: "Jane Smith", l: "NY", g: "₹120K", net: "₹92K" },
          ]}
        />
        <InsightTable 
          title="My Audience" 
          headers={["Name", "Age", "Gender", "Location"]}
          data={[
            { c: "Rahul S.", n: "28", l: "Male", g: "Mumbai", net: "" },
            { c: "Sarah P.", n: "34", l: "Female", g: "Bangalore", net: "" },
          ]}
        />
      </div>

      {/* 5. ADDITIONAL ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MiniDataPoint label="Avg Ticket Size" value="₹4,500" />
        <MiniDataPoint label="Avg Seats" value="42" />
        <MiniDataPoint label="Avg Camps / Month" value="6" />
        <MiniDataPoint label="Repeat Travelers" value="18%" highlight />
      </div>

      {/* 6. MONTHLY REVENUE TREND */}
      <Card className="bg-zinc-900/40 border border-zinc-800 rounded-none p-8">
        <h3 className="text-xs  tracking-widest font-black text-zinc-500 mb-8 ">Revenue Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { name: 'Mar 25', revenue: 40000 }, { name: 'Apr 25', revenue: 30000 }, { name: 'May 25', revenue: 60000 },
              { name: 'Jun 25', revenue: 40000 }, { name: 'Jul 25', revenue: 30000 }, { name: 'Aug 25', revenue: 60000 },
              { name: 'Sept 25', revenue: 40000 }, { name: 'Oct 25', revenue: 30000 }, { name: 'Nov 25', revenue: 60000 },
              { name: 'Dec 25', revenue: 80000 }, { name: 'Jan 26', revenue: 70000 }, { name: 'Feb 26', revenue: 120000 }
            ]}
            margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis
                dataKey="revenue"
                stroke="#52525b"
                fontSize={12}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
              />
              <Tooltip content={<HDTooltip />} />
              <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={4} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MetricBox({ label, value, sub, highlight }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none">
      <p className="text-sm font-black text-zinc-500 tracking-widest">{label}</p>
      <h3 className={`text-3xl font-black mt-2 tracking-tighter ${highlight ? 'text-cyan-400' : 'text-white'}`}>
        {value}
      </h3>
      {sub && <p className="text-xs text-zinc-600 font-bold mt-1 ">{sub}</p>}
    </Card>
  );
}

function PerformanceTable({ title, headers, rows }: any) {
  return (
    <Card className="bg-zinc-900/20 border border-zinc-800 rounded-none p-6">
      {/* <h3 className="text-base font-black text-zinc-500 mb-6  tracking-widest">{title}</h3> */}
      <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500" />
          <h3 className="text-lg font-black text-white ">{title}</h3>
        </div>
      <Table>
        <TableHeader className="border-zinc-800">
          <TableRow className="text-sm font-bold text-zinc-900 hover:bg-transparent">
            {headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {rows.map((r: any, i: number) => (
            <TableRow key={i} className="border-zinc-800 hover:bg-zinc-800/20">
              <TableCell className="font-bold text-white">{r.name}</TableCell>
              <TableCell>{r.gross}</TableCell>
              <TableCell className="text-emerald-500">{r.net}</TableCell>
              <TableCell>{r.h}</TableCell>
              <TableCell className="text-red-500">{r.c}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function InsightTable({ title, headers, data }: any) {
    return (
      <Card className="bg-zinc-900/20 border border-zinc-800 rounded-none p-6">
        {/* <h3 className="text-xs  font-black text-cyan-500 mb-6  tracking-widest">{title}</h3> */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500" />
          <h3 className="text-lg font-black text-white ">{title}</h3>
        </div>
        <Table>
          <TableHeader className="border-zinc-800">
            <TableRow className="text-sm  font-bold text-zinc-500 hover:bg-transparent">
              {headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm text-zinc-300">
            {data.map((r: any, i: number) => (
              <TableRow key={i} className="border-zinc-800">
                <TableCell className="font-bold">{r.c}</TableCell>
                <TableCell>{r.n}</TableCell>
                <TableCell>{r.l}</TableCell>
                <TableCell>{r.g}</TableCell>
                <TableCell className="text-white font-bold">{r.net}</TableCell>
              </TableRow>
            ))}
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
      <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">{label}</span>
      <span className="text-sm font-bold text-white mt-1">{value}</span>
    </div>
  );
}