"use client";

import React, { useEffect, useState } from "react";
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
import { DataPoint, formatCompactNumber, InsightCard, LegendItem } from "./PerformanceDashboard";
import { MetricItem } from "./corporate/LeadInsights";
import { set } from "date-fns";

// --- MOCK DATA ---
const graphData = {
    week: [
        { time: "Mon", spirit: 72, land: 88, air: 76, water: 82 },
        { time: "Tue", spirit: 75, land: 90, air: 78, water: 80 },
        { time: "Wed", spirit: 70, land: 85, air: 74, water: 79 },
        { time: "Thu", spirit: 78, land: 92, air: 81, water: 84 },
        { time: "Fri", spirit: 80, land: 95, air: 83, water: 86 },
        { time: "Sat", spirit: 85, land: 100, air: 88, water: 90 },
        { time: "Sun", spirit: 90, land: 105, air: 92, water: 94 },
    ],

    month: [
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
    ],

    year: [
        { time: "2020", spirit: 40, land: 55, air: 60, water: 65 },
        { time: "2021", spirit: 50, land: 65, air: 70, water: 75 },
        { time: "2022", spirit: 60, land: 75, air: 80, water: 85 },
        { time: "2023", spirit: 70, land: 85, air: 90, water: 95 },
        { time: "2024", spirit: 85, land: 100, air: 95, water: 90 },
        { time: "2025", spirit: 100, land: 120, air: 110, water: 105 },
    ],

    lifetime: [
        { time: "2018", spirit: 30, land: 45, air: 50, water: 55 },
        { time: "2019", spirit: 35, land: 50, air: 55, water: 60 },
        { time: "2020", spirit: 40, land: 55, air: 60, water: 65 },
        { time: "2021", spirit: 50, land: 65, air: 70, water: 75 },
        { time: "2022", spirit: 60, land: 75, air: 80, water: 85 },
        { time: "2023", spirit: 70, land: 85, air: 90, water: 95 },
        { time: "2024", spirit: 85, land: 100, air: 95, water: 90 },
        { time: "2025", spirit: 100, land: 120, air: 110, water: 105 },
    ],
};

const travellerInsights = {
    week: {
        visited: 1200,
        unique: 930,
        repeat: 270,
    },

    month: {
        visited: 5200,
        unique: 4100,
        repeat: 1100,
    },

    quarter: {
        visited: 700000,
        unique: 6000,
        repeat: 1300,
    },

    year: {
        visited: 68400,
        unique: 52000,
        repeat: 16400,
    },

    lifetime: {
        visited: 320000,
        unique: 240000,
        repeat: 80000,
    },
};

const campCategoryBreakdown = {
    week: {
        "Spirit Roads": ["30%", "20", "80", "2", "5"],
        "Adventure - Land": ["30%", "30", "100", "4", "12"],
        "Adventure - Air": ["80%", "50", "10", "5", "12"],
        "Adventure - Water": ["68%", "15", "5", "5", "8"],
    },

    month: {
        "Spirit Roads": ["30%", "80", "320", "8", "20"],
        "Adventure - Land": ["30%", "120", "400", "16", "48"],
        "Adventure - Air": ["80%", "200", "40", "20", "48"],
        "Adventure - Water": ["68%", "60", "20", "20", "32"],
    },

    quarter: {
        "Spirit Roads": ["30%", "260", "1040", "26", "65"],
        "Adventure - Land": ["30%", "390", "1300", "52", "156"],
        "Adventure - Air": ["80%", "650", "130", "65", "156"],
        "Adventure - Water": ["68%", "195", "65", "65", "104"],
    },

    year: {
        "Spirit Roads": ["30%", "1040", "4160", "104", "260"],
        "Adventure - Land": ["30%", "1560", "5200", "208", "624"],
        "Adventure - Air": ["80%", "2600", "520", "260", "624"],
        "Adventure - Water": ["68%", "780", "260", "260", "416"],
    },

    lifetime: {
        "Spirit Roads": ["30%", "5200", "20800", "520", "1300"],
        "Adventure - Land": ["30%", "7800", "26000", "1040", "3120"],
        "Adventure - Air": ["80%", "13000", "2600", "1300", "3120"],
        "Adventure - Water": ["68%", "3900", "1300", "1300", "2080"],
    },
};

const liveCamps = {
    week: [
        {
            label: "Sunrise Trric / Kovalam, Tamil Nadu",
            values: [
                "Adventure - Land",
                "Rahul Mishra",
                "₹16,499",
                "20",
            ],
            status: "Completed",
        },
        {
            label: "Ocean Dive / Andaman Sea, Tamil Nadu",
            values: [
                "Adventure - Water",
                "Siddharth Mishra",
                "₹12,999",
                "10",
            ],
            status: "HousefulL",
        },
    ],

    month: [
        {
            label: "Sunrise Trric / Kovalam, Tamil Nadu",
            values: [
                "Adventure - Land",
                "Rahul Mishra",
                "₹16,499",
                "25",
            ],
            status: "low-sale",
        },
        {
            label: "Ocean Dive / Andaman Sea, Tamil Nadu",
            values: [
                "Adventure - Water",
                "Siddharth Mishra",
                "₹12,999",
                "15",
            ],
            status: "completed",
        },
    ],

    quarter: [
        {
            label: "Sunrise Trric / Kovalam, Tamil Nadu",
            values: [
                "Adventure - Land",
                "Rahul Mishra",
                "₹16,499",
                "15",
            ],
            status: "houseful",
        },
        {
            label: "Ocean Dive / Andaman Sea, Tamil Nadu",
            values: [
                "Adventure - Water",
                "Siddharth Mishra",
                "₹12,999",
                "20",
            ],
            status: "low-sale",
        },
    ],

    year: [
        {
            label: "Sunrise Trric / Kovalam, Tamil Nadu",
            values: [
                "Adventure - Land",
                "Rahul Mishra",
                "₹16,499",
                "30",
            ],
            status: "completed",
        },
        {
            label: "Ocean Dive / Andaman Sea, Tamil Nadu",
            values: [
                "Adventure - Water",
                "Siddharth Mishra",
                "₹12,999",
                "20",
            ],
            status: "housefull",
        },
    ],

    lifetime: [
        {
            label: "Sunrise Trric / Kovalam, Tamil Nadu",
            values: [
                "Adventure - Land",
                "Rahul Mishra",
                "₹16,499",
                "10",
            ],
            status: "low-sale",
        },
        {
            label: "Ocean Dive / Andaman Sea, Tamil Nadu",
            values: [
                "Adventure - Water",
                "Siddharth Mishra",
                "₹12,999",
                "20",
            ],
            status: "completed",
        },
    ],
};

export default function CampDashboard() {
    const [graphFilter, setGraphFilter] = useState("month");
    const [travellerInsightsFilter, setTravellerInsightsFilter] = useState("month")
    const [campCategoryBreakdownFIlter, setCampCategoryBreakdownFilter] = useState("month")
    const [liveCampsFilter, setLiveCampsFilter] = useState("month")
    const [liveCampStatusFilter, setLiveCampStatusFilter] = useState("all")
    const [liveCampSortFilter, setLiveCampSortFilter] = useState("high-to-low")
    const [liveCampsFilteredData, setLiveCampsFilteredData] = useState(liveCamps[liveCampsFilter as keyof typeof liveCamps])

    const handleLiveCampsFilter = (filter: string) => {
        setLiveCampsFilter(filter)
        setLiveCampsFilteredData(liveCamps[filter as keyof typeof liveCamps])
    }

    const handleLiveCampsStatusFilter = (filter: string) => {
        setLiveCampStatusFilter(filter)
        if(filter === "all") setLiveCampsFilteredData(liveCamps[liveCampsFilter as keyof typeof liveCamps])
        else setLiveCampsFilteredData(liveCampsFilteredData.filter((item) => item.status === filter))
    }
    const handleLiveCampsSort = (sort: string) => {
        setLiveCampSortFilter(sort)
        if (sort === "high-to-low") {
            setLiveCampsFilteredData(liveCampsFilteredData.sort((a, b) => parseInt(b.values[3]) - parseInt(a.values[3])))
        } else {
            setLiveCampsFilteredData(liveCampsFilteredData.sort((a, b) => parseInt(a.values[3]) - parseInt(b.values[3])))
        }
    }

    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">
            {/* 8. COMPARATIVE GROWTH GRAPH */}
            <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-cyan-500" />
                        <h3 className="text-lg font-bold text-white ">Performance</h3>
                    </div>
                    <Tabs defaultValue="month" onValueChange={setGraphFilter} value={graphFilter} className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                        <TabsList className="bg-transparent h-7 gap-1">
                            {["Week", "Month", "Year", "Lifetime"].map(t => (
                                <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
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
                        <LineChart data={graphData[graphFilter as keyof typeof graphData]} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" stroke="#ffffff" fontSize={15} axisLine={false} tickLine={false} />
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

            {/* 1. TOP SUMMARY: CAMPS FINANCIAL TABLE */}
            <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-6">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-cyan-500 inline-block" />
                    <h3 className="text-base font-black text-white inline-block">Financial Summary</h3>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/50 shadow-2xl">
                    <Table className="w-full">
                        <TableHeader className="bg-zinc-900/50">
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                {/* Anchor column on the far left */}
                                <TableHead className="py-5 text-base font-semibold text-white pl-8 w-[200px]">
                                    Category
                                </TableHead>
                                {/* Metric columns pushed to the right */}
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">&#x2211;{" "}Camps</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">&#x2211;{" "}Tickets</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">μ Tickets</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">μ Ticket Size</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">Gross</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0">Refund</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right px-0 pr-8">Net</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SummaryRow label="Spirit Roads" values={["30", "430", "10", 12000, 280000, 350000, 500000]} />
                            <SummaryRow label="Adventure - Land" values={["18", "300", "5", 15999, 105000, 210000, 300000]} />
                            <SummaryRow label="Adventure - Air" values={["12", "238", "8", 12899, 57000, 210000, 400000]} />
                            <SummaryRow label="Adventure - Water" values={["13", "430", "10", 14799, 57000, 350000, 600000]} />
                        </TableBody>
                    </Table>
                </div>
            </Card>


            {/* 2 & 3. TRAVELER INSIGHTS & AVERAGES */}
            <InsightCard title="Traveller Insights" showFilter currentFilter={travellerInsightsFilter} onFilterChange={setTravellerInsightsFilter}>
                <div className="flex justify-between">
                    <DataPoint label="Visited" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].visited).slice(1)} />
                    <DataPoint label="Unique" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].unique).slice(1)} />
                    <DataPoint label="Repeat" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].repeat).slice(1)} />
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
            <InsightCard title="Camps Category Breakdown" showFilter currentFilter={campCategoryBreakdownFIlter} onFilterChange={setCampCategoryBreakdownFilter}>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/50 shadow-2xl">
                    {/* table-fixed is essential here to enforce equal column widths */}
                    <Table className="w-full table-fixed border-collapse">
                        <TableHeader className="bg-zinc-900/50">
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white pl-8">
                                    Camp Type
                                </TableHead>
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white text-right px-0">Houseful</TableHead>
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white text-right px-0">Live</TableHead>
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white text-right px-0">Pre-Registration</TableHead>
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white text-right px-0">Refund</TableHead>
                                <TableHead className="w-1/6 py-5 text-base font-semibold text-white text-right px-0 pr-8">Completed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <SummaryRow label="Spirit Roads" values={campCategoryBreakdown[campCategoryBreakdownFIlter as keyof typeof campCategoryBreakdown]["Spirit Roads"]} />
                            <SummaryRow label="Adventure - Land" values={campCategoryBreakdown[campCategoryBreakdownFIlter as keyof typeof campCategoryBreakdown]["Adventure - Land"]} />
                            <SummaryRow label="Adventure - Air" values={campCategoryBreakdown[campCategoryBreakdownFIlter as keyof typeof campCategoryBreakdown]["Adventure - Air"]} />
                            <SummaryRow label="Adventure - Water" values={campCategoryBreakdown[campCategoryBreakdownFIlter as keyof typeof campCategoryBreakdown]["Adventure - Water"]} />
                        </TableBody>
                    </Table>
                </div>
            </InsightCard>

            {/* 5. MAIN CAMP LIFECYCLE TABLE */}
            <Card className="bg-zinc-950/50 border border-zinc-700 rounded-none p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-cyan-500" />
                        <h3 className="text-lg font-bold text-white ">Live Camps</h3>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Modernized Tabs: Removed font-black and tracking, used text-sm */}
                        <Tabs defaultValue="month" onValueChange={handleLiveCampsFilter} value={liveCampsFilter} className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                            <TabsList className="bg-transparent h-7 gap-1">
                                {["Week", "Month", "Year", "Lifetime"].map(t => (
                                    <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                                        {t}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        {/* Refined Select: Unified text-sm and zinc colors */}
                        <Select defaultValue="all" onValueChange={handleLiveCampsStatusFilter} value={liveCampStatusFilter}>
                            <SelectTrigger className="w-[180px] h-10 bg-zinc-900 border-zinc-800 text-sm text-zinc-300 rounded-xl focus:ring-zinc-700">
                                <SelectValue placeholder="Status Filter" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                <SelectItem value="all">All Camps</SelectItem>
                                <SelectItem value="live">Live</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="housefull">Housefull</SelectItem>
                                <SelectItem value="low-sale">{"< 10% Sold"}</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="high-to-low" onValueChange={handleLiveCampsSort} value={liveCampSortFilter}>
                            <SelectTrigger className="w-[180px] h-10 bg-zinc-900 border-zinc-800 text-sm text-zinc-300 rounded-xl focus:ring-zinc-700">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                <SelectItem value="high-to-low">High to Low</SelectItem>
                                <SelectItem value="low-to-high">Low to High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table: Applied table-fixed for equal column distribution */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                    <Table className="w-full table-fixed">
                        <TableHeader className="bg-zinc-900/50">
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="py-5 text-base font-semibold text-white pl-8 w-1/5">Camp & Location</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right w-1/5">Category</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right w-1/5">Host</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right w-1/5">Ticket Price</TableHead>
                                <TableHead className="py-5 text-base font-semibold text-white text-right pr-8 w-1/5">Slots</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {liveCampsFilteredData.map(c => (
                                <SummaryRow key={c.label} label={c.label} values={c.values} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
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
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 shadow-2xl">
                        <table className="w-full table-fixed border-collapse">
                            <thead className="bg-zinc-900/50">
                                <tr className="border-b border-zinc-800">
                                    <th className="w-1/4 py-5 px-6 text-base font-semibold text-white text-left">
                                        Camp Name
                                    </th>
                                    <th className="w-1/4 py-5 px-6 text-base font-semibold text-white text-right">
                                        Refund Amount
                                    </th>
                                    <th className="w-1/4 py-5 px-6 text-base font-semibold text-white text-right">
                                        Settlement Date
                                    </th>
                                    <th className="w-1/4 py-5 px-6 text-base font-semibold text-white text-right">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900">
                                {/* Row 1 */}
                                <tr className="group hover:bg-zinc-800/40 transition-all duration-200">
                                    <td className="py-5 px-6 text-sm font-medium text-zinc-300 group-hover:text-white truncate">
                                        Himalayan Endurance
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                        {formatCompactNumber(55000)}
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right text-zinc-300">
                                        12 Jan 2025
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right">
                                        <span className="inline-flex items-center text-emerald-400 font-medium">
                                            Completed
                                        </span>
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr className="group hover:bg-zinc-800/40 transition-all duration-200">
                                    <td className="py-5 px-6 text-sm font-medium text-zinc-300 group-hover:text-white truncate">
                                        Dinner With Me - Honest Stories
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                        {formatCompactNumber(80000)}
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right text-zinc-300">
                                        12 Mar 2026
                                    </td>
                                    <td className="py-5 px-6 text-sm text-right">
                                        <span className="inline-flex items-center text-amber-400 font-medium">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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


        </div>
    );
}

// --- REUSED & ADAPTED COMPONENTS ---

function SummaryRow({ label, values }: { label: string; values: (string | number)[] }) {
    return (
        <tr className="group border-b border-zinc-800 hover:bg-zinc-800/40 transition-all duration-200">
            {/* Label: text-sm, zinc-300, matching your other tables */}
            <td className="py-5 text-sm font-medium text-zinc-300 pl-8 group-hover:text-white transition-colors">
                {label}
            </td>

            {values.map((v, i) => {
                const isLast = i === values.length - 1;
                const isRefund = i === 5; // Index for Refund column

                return (
                    <td
                        key={i}
                        className={`py-5 text-sm text-right tabular-nums transition-colors ${isLast
                            ? 'text-emerald-400 font-bold pr-8' // Net Highlight
                            : 'text-zinc-300'
                            }`}
                    >
                        {typeof v === 'string' ? v : formatCompactNumber(v)}
                    </td>
                );
            })}
        </tr>
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

