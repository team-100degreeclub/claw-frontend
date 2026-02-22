"use client";

import React, { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DataPoint, InsightCard, LegendItem } from "./PerformanceDashboard";
import { MetricItem } from "./corporate/LeadInsights";

// --- MOCK DATA ---
const graphData = [
    { time: "Feb 26", spirit: 45, land: 65, air: 55, water: 70 },
    { time: "Mar 25", spirit: 40, land: 60, air: 70, water: 50 },
    { time: "Apr 25", spirit: 45, land: 65, air: 55, water: 70 },
    { time: "May 25", spirit: 50, land: 70, air: 60, water: 55 },
    { time: "Jun 25", spirit: 55, land: 75, air: 65, water: 60 },
    { time: "Jul 25", spirit: 60, land: 80, air: 70, water: 65 },
    { time: "Aug 25", spirit: 65, land: 85, air: 75, water: 70 },
    { time: "Sep 25", spirit: 70, land: 90, air: 80, water: 75 },
    { time: "Oct 25", spirit: 75, land: 95, air: 85, water: 80 },
    { time: "Nov 25", spirit: 80, land: 100, air: 90, water: 85 },
    { time: "Dec 25", spirit: 85, land: 105, air: 95, water: 90 },
    { time: "Jan 26", spirit: 100, land: 120, air: 40, water: 78 },
];

export default function CampDashboard() {
    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">

            {/* 1. TOP SUMMARY: CAMPS FINANCIAL TABLE */}
            <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-6">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-cyan-500 inline-block" />
                    <h3 className="text-base font-black text-white inline-block">Financial Summary</h3>
                </div>
                <Table>
                    <TableHeader className="border-b border-zinc-800">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[150px]"></TableHead>
                            {/* <TableHead className="text-right text-xs font-bold text-zinc-400">Spirit Roads</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400">Land</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400">Air</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400">Water</TableHead> */}
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">&#x2211; Camps</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">&#x2211; Tickets</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">μ Tickets</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">μ Ticket Size</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">Gross</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">Refund</TableHead>
                            <TableHead className="text-right text-xs font-bold text-zinc-400 w-1/7">Net</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* <SummaryRow label="Gross" values={["$700K", "$400K", "$500K", "$750K"]} />
                        <SummaryRow label="Refund" values={["$20K", "$15K", "$30K", "$10K"]} color="text-red-400" />
                        <SummaryRow label="Net" values={["$20K", "$85K", "$30K", "$80K"]} color="text-emerald-500" highlight /> */}
                        <SummaryRow label="Spirit Roads" values={[30, 430, 10, "₹12,000", "₹2,80,000", "₹3,50,000", "₹5,00,000"]} />
                        <SummaryRow label="Adventure - Land" values={[18, 300, 5, "₹15,999", "₹1,05,000", "₹2,10,000", "₹3,00,000"]} />
                        <SummaryRow label="Adventure - Air" values={[12, 238, 8, "₹12,899", "₹5,70,000", "₹2,10,000", "₹4,00,000"]} />
                        <SummaryRow label="Adventure - Water" values={[13, 430, 10, "₹14,799", "₹5,70,000", "₹3,50,000", "₹6,00,000"]} />
                    </TableBody>
                </Table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

                {/* 2 & 3. TRAVELER INSIGHTS & AVERAGES */}
                <InsightCard title="Traveller Insights" showFilter>
                    <div className="grid grid-cols-3 gap-6">
                        <DataPoint label="Visited" value="15,000" />
                        <DataPoint label="Unique" value="12,000" />
                        <DataPoint label="Repeat" value="3,000" highlight />
                    </div>
                    {/* <div className="space-y-4">
                        <p className="text-[10px]  font-black text-zinc-500 tracking-widest">Average Data</p>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricItem label="Avg Tickets Sold Per Camp" value="45" text />
                            <MetricItem label="Avg Slots Filled Per Camp" value="40" text />
                            <MetricItem label="Avg Traveler Visits Per Camp" value="30" text />
                            <MetricItem label="Avg Slots Sold Per Camp" value="40" text />
                        </div>
                    </div> */}
                </InsightCard>

                {/* 4. CAMPS CATEGORY STATUS TABLE */}
                <InsightCard title="Camps Category Breakdown" showFilter>
                    <Table>
                        <TableHeader className="border-zinc-800">
                            <TableRow className="text-sm font-bold text-zinc-500">
                                {/* <TableHead>Category</TableHead>
                                <TableHead>Spirit</TableHead>
                                <TableHead>Land</TableHead>
                                <TableHead>Air</TableHead>
                                <TableHead>Water</TableHead> */}
                                <TableHead className="w-1/6 text-right"></TableHead>
                                <TableHead className="w-1/6 text-right">Houseful</TableHead>
                                <TableHead className="w-1/6 text-right">Live</TableHead>
                                <TableHead className="w-1/6 text-right">Pre-Registration</TableHead>
                                <TableHead className="w-1/6 text-right">Refund</TableHead>
                                <TableHead className="w-1/6 text-right">Completed</TableHead>
                                {/* <TableHead className="w-1/6 text-right">Fast Filler</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm font-bold">
                            {/* <CategoryRow label="Houseful" values={["30", "20", "80", "5"]} />
                            <CategoryRow label="Live" values={["30", "30", "100", "12"]} />
                            <CategoryRow label="Pre-Registration" values={["100", "50", "10", "12"]} />
                            <CategoryRow label="Completed" values={["12", "15", "5", "8"]} />
                            <CategoryRow label="Fast Filler" values={["Yes", "No", "Yes", "Yes"]} /> */}
                            <SummaryRow label="Spirit Roads" values={["30%", "20", "80", "2", "5"]} />
                            <SummaryRow label="Adventure - Land" values={["30%", "30", "100", "4", "12"]} />
                            <SummaryRow label="Adventure - Air" values={["80%", "50", "10", "5", "12"]} />
                            <SummaryRow label="Adventure - Water" values={["68%", "15", "5", "5", "8"]} />
                        </TableBody>
                    </Table>
                </InsightCard>
            </div>

            {/* 5. MAIN CAMP LIFECYCLE TABLE */}
            <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-cyan-500 inline-block" />
                        <h3 className="text-base font-black text-white inline-block">Live Camps</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Tabs value={""} defaultValue="week" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                            <TabsList className="bg-transparent h-7 gap-1">
                                {["Week", "Month", "Year", "Lifetime"].map(t => (
                                    <TabsTrigger key={t} value={t.toLowerCase()} className="text-[9px]  font-black px-2 h-5">
                                        {t}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px] bg-zinc-950 border-zinc-800 text-[10px]  font-bold">
                                <SelectValue placeholder="Status Filter" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                                <SelectItem value="all">All Camps</SelectItem>
                                <SelectItem value="all">Live</SelectItem>
                                <SelectItem value="all">Completed</SelectItem>
                                <SelectItem value="housefull">Housefull Camps</SelectItem>
                                <SelectItem value="low-sale">{"< 10% Tickets Sold"}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="high-to-low">
                            <SelectTrigger className="w-[180px] bg-zinc-950 border-zinc-800 text-[10px]  font-bold">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                                <SelectItem value="high-to-low">High to Low (Traveler)</SelectItem>
                                <SelectItem value="low-to-high">Low to High (Ticket)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-zinc-900/50">
                        <TableRow className="border-zinc-800 text-sm  font-black text-zinc-500">
                            <TableHead className="w-1/5 text-left">Camp Name / Location</TableHead>
                            <TableHead className="w-1/5 text-right">Category</TableHead>
                            <TableHead className="w-1/5 text-right">Host</TableHead>
                            <TableHead className="w-1/5 text-right">Ticket Price</TableHead>
                            <TableHead className="w-1/5 text-right">Slots</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-sm">
                        <SummaryRow
                            label="Sunrise Trric / Kovalam, Tamil Nadu"
                            values={[
                                "Adventure - Land",
                                "Rahul Mishra",
                                "₹16,499",
                                "100",
                            ]}
                        />
                        <SummaryRow
                            label="Ocean Dive / Andaman Sea, Tamil Nadu"
                            values={[
                                "Adventure - Water",
                                "Siddharth Mishra",
                                "₹12,999",
                                "80",
                            ]}
                        />
                    </TableBody>
                </Table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                {/* 6. REFUND MONITOR */}
                <InsightCard title="Refund Status">
                    {/* <div className="space-y-6">
                        <div>
                            <p className="text-[10px]  font-black text-emerald-500 mb-2 tracking-widest">Completed</p>
                            <div className="bg-zinc-950 p-4 border border-zinc-800 flex justify-between items-center">
                                <span className="text-sm font-bold">Himalayan Endurance</span>
                                <span className="text-sm font-black">{(55000).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px]  font-black text-amber-500 mb-2 tracking-widest">Pending</p>
                            <div className="bg-zinc-950 p-4 border border-zinc-800 flex justify-between items-center">
                                <div className="space-y-0.5">
                                    <span className="text-sm font-bold block">Dinner With Me - Honest Stories</span>
                                    <span className="text-xs font-bold text-zinc-600">Expected: By Friday</span>
                                </div>
                                <span className="text-sm font-black">{(80000).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                            </div>
                        </div>
                    </div> */}
                    <Table>
                        <TableHeader className="bg-zinc-900/50">
                            <TableRow className="border-zinc-800 text-sm  font-black text-zinc-500">
                                <TableHead className="w-1/4 px-2">Camp Name</TableHead>
                                <TableHead className="w-1/4">Refund Amount</TableHead>
                                <TableHead className="w-1/4">Settlement Date</TableHead>
                                <TableHead className="w-1/4">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm">
                            <TableRow className="border-zinc-800">
                                <TableCell>Himalayan Endurance</TableCell>
                                <TableCell>{(55000).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>Completed</TableCell>
                            </TableRow>
                            <TableRow className="border-zinc-800">
                                <TableCell>Dinner With Me - Honest Stories</TableCell>
                                <TableCell>{(80000).toLocaleString("en-IN", { style: "currency", currency: "INR" })}</TableCell>
                                <TableCell>Expected: By Friday</TableCell>
                                <TableCell>Pending</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </InsightCard>

                {/* 7. HOST / TEAM */}
                {/* <InsightCard title="Host - Team Insights">
                    <div className="grid grid-cols-1 gap-4">
                        <MetricItem label="Fastest Filler" value="Major Sandeep" text />
                        <MetricItem label="Active Dead" value="Sector 7 Ops" text />
                        <MetricItem label="Primary Location" value="Himalayan Base" text />
                    </div>
                </InsightCard> */}
            </div>

            {/* 8. COMPARATIVE GROWTH GRAPH */}
            <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-cyan-500 inline-block" />
                        <h3 className="text-base font-black text-white inline-block">Performance</h3>
                    </div>
                    <Tabs value={""} defaultValue="week" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                        <TabsList className="bg-transparent h-7 gap-1">
                            {["Week", "Month", "Year", "Lifetime"].map(t => (
                                <TabsTrigger key={t} value={t.toLowerCase()} className="text-[9px]  font-black px-2 h-5">
                                    {t}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <div className="flex flex-wrap gap-4 text-[10px] font-black">
                        {/* <LegendItem color="bg-blue-500" label="Revenue" />
                        <LegendItem color="bg-emerald-500" label="Travelers" />
                        <LegendItem color="bg-amber-500" label="Camps" />
                        <LegendItem color="bg-purple-500" label="Corporate" /> */}
                        <LegendItem color="bg-blue-500" label="Spirit Roads" />
                        <LegendItem color="bg-green-500" label="Land" />
                        <LegendItem color="bg-amber-500" label="Air" />
                        <LegendItem color="bg-red-500" label="Water" />
                    </div>
                </div>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graphData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" stroke="#71717a" fontSize={12} axisLine={false} tickLine={false} />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="spirit" stroke="#3b82f6" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="land" stroke="#10b981" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="air" stroke="#f59e0b" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="water" stroke="#ef4444" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}

// --- REUSED & ADAPTED COMPONENTS ---

function SummaryRow({ label, values, color = "text-white", highlight }: any) {
    return (
        <TableRow className="border-zinc-800/50 hover:bg-zinc-800/20">
            <TableCell className="text-xs  font-black text-zinc-500 py-4">{label}</TableCell>
            {values.map((v: string, i: number) => (
                <TableCell key={i} className={`text-right text-sm ${highlight ? color : 'text-zinc-300'} ${i === values.length - 1 && highlight ? 'text-green-400' : ''}`}>
                    {v}
                </TableCell>
            ))}
        </TableRow>
    );
}

function CategoryRow({ label, values }: any) {
    return (
        <TableRow className="border-zinc-800/50 hover:bg-zinc-800/10">
            <TableCell className="text-zinc-400 py-3">{label}</TableCell>
            {values.map((v: string, i: number) => (
                <TableCell key={i} className="text-white">{v}</TableCell>
            ))}
        </TableRow>
    );
}

function DetailTableRow({ name, loc, type, ticket, slot, collab, status }: any) {
    const statusColors: any = {
        "Completed": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        "Live": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        "Canceled": "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
        <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
            <TableCell className="py-4">
                <span className="block font-bold text-white">{name}</span>
                <span className="text-xs text-zinc-500 font-bold">{loc}</span>
            </TableCell>
            <TableCell className="text-zinc-400 font-medium">{type}</TableCell>
            <TableCell className="font-black text-white">{ticket}</TableCell>
            <TableCell className="text-zinc-400">{slot}</TableCell>
            <TableCell className="text-zinc-400 ">{collab}</TableCell>
            <TableCell className="text-right">
                <Badge variant="outline" className={`text-xs font-black ${statusColors[status] || 'border-zinc-700'}`}>
                    {status}
                </Badge>
            </TableCell>
        </TableRow>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm backdrop-blur-xl ring-1 ring-white/10">
                {/* Header: Displays the X-Axis Label (Time/Sector) */}
                <p className="text-sm font-black text-white mb-3 border-b border-zinc-800 pb-2">
                    {label}
                </p>

                <div className="space-y-3">
                    {payload.map((entry: any, index: number) => {
                        /** * Logic: 
                         * Even if we plot normalized data (e.g., 'normSpirit'), 
                         * we access the original raw value (e.g., 'spirit') 
                         * directly from the data point payload.
                         */
                        const dataKey = entry.dataKey; // e.g., 'normSpirit'
                        const originalKey = dataKey.replace('norm', '').toLowerCase();
                        const rawValue = entry.payload[originalKey];
                        if (entry.name == "spirit") entry.name = "Spirit Roads"
                        if (entry.name == "land") entry.name = "Land"
                        if (entry.name == "air") entry.name = "Air"
                        if (entry.name == "water") entry.name = "Water"

                        return (
                            <div key={index} className="flex items-center justify-between gap-12">
                                {/* Sector Name and Legend Indicator */}
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                                        style={{ color: entry.color, backgroundColor: entry.color }}
                                    />
                                    <span className="text-[11px] font-black text-zinc-400">
                                        {entry.name}
                                    </span>
                                </div>

                                {/* Raw Value Display */}
                                <span className="text-xs font-black text-white">
                                    {/* Formats currency if the value is Gross/Net/Ticket, otherwise standard number */}
                                    {entry.name.toLowerCase().includes('gross') || entry.name.toLowerCase().includes('net')
                                        ? `₹${rawValue.toLocaleString('en-IN')}`
                                        : rawValue.toLocaleString('en-IN')
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
