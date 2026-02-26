"use client";

import { Card, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, } from "recharts";
import { MetricItem } from "./corporate/LeadInsights";
import { formatCompactNumber, InsightCard, LegendItem } from "./PerformanceDashboard";
import { countries } from "@/lib/countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";


type TimeFilter = "week" | "month" | "year" | "lifetime";
type CampType = "all" | "weekend";
type Category = "all" | "spirit" | "land" | "air" | "water";

interface StateData {
    state: string;
    totalTravellers: number;
    genderRatio: string;
    ageBucket: string;
    avgSpending: number;
    revenue: number;
    growthRateRevenue: string;
    growthRateSpending: string;
    growthRateTraffic: string;
    net: number;
    netPercentChange: string;
    avgSpendPercentChange: string;
}

type TimeData = Record<TimeFilter, StateData[]>;

type CategoryData = Record<Category, TimeData>;

type CampTypeData = Record<CampType, CategoryData>;

type DetailedAnalysis = Record<string, CampTypeData>;

// Mock Data for Demographics
const ageData = [
    { name: "18-24", value: 15 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 25 },
    { name: "45+", value: 15 },
];
// Total Travellers,
// Gender Ratio,
// Age Bucket,
// μ Spending,
// Revenue,
// Growth Rate - Revenue,
// Growth Rate - Spending,
// Growth Rate - Traffic
const detailedAnalysis: DetailedAnalysis = {
  India: {
    all: {
      all: {
        week: [
          { state: "Maharashtra", totalTravellers: 100, genderRatio: "50:40:10", ageBucket: "25-34", avgSpending: 1000, revenue: 100000, growthRateRevenue: "10%", growthRateSpending: "20%", growthRateTraffic: "15%", net: 100000, netPercentChange: "10%", avgSpendPercentChange: "20%" },
          { state: "Tamil Nadu", totalTravellers: 150, genderRatio: "60:35:5", ageBucket: "35-44", avgSpending: 1200, revenue: 180000, growthRateRevenue: "14%", growthRateSpending: "18%", growthRateTraffic: "12%", net: 180000, netPercentChange: "14%", avgSpendPercentChange: "18%" }
        ],
        month: [
          { state: "Maharashtra", totalTravellers: 420, genderRatio: "50:40:10", ageBucket: "25-34", avgSpending: 1100, revenue: 462000, growthRateRevenue: "12%", growthRateSpending: "22%", growthRateTraffic: "18%", net: 462000, netPercentChange: "12%", avgSpendPercentChange: "22%" },
          { state: "Tamil Nadu", totalTravellers: 600, genderRatio: "60:35:5", ageBucket: "35-44", avgSpending: 1300, revenue: 780000, growthRateRevenue: "18%", growthRateSpending: "25%", growthRateTraffic: "20%", net: 780000, netPercentChange: "18%", avgSpendPercentChange: "25%" }
        ],
        year: [
          { state: "Maharashtra", totalTravellers: 5200, genderRatio: "52:38:10", ageBucket: "25-34", avgSpending: 1250, revenue: 6500000, growthRateRevenue: "18%", growthRateSpending: "28%", growthRateTraffic: "20%", net: 6500000, netPercentChange: "18%", avgSpendPercentChange: "28%" },
          { state: "Tamil Nadu", totalTravellers: 7800, genderRatio: "61:34:5", ageBucket: "35-44", avgSpending: 1400, revenue: 10920000, growthRateRevenue: "22%", growthRateSpending: "30%", growthRateTraffic: "24%", net: 10920000, netPercentChange: "22%", avgSpendPercentChange: "30%" }
        ],
        lifetime: [
          { state: "Maharashtra", totalTravellers: 26000, genderRatio: "53:37:10", ageBucket: "25-34", avgSpending: 1500, revenue: 39000000, growthRateRevenue: "25%", growthRateSpending: "35%", growthRateTraffic: "30%", net: 39000000, netPercentChange: "25%", avgSpendPercentChange: "35%" },
          { state: "Tamil Nadu", totalTravellers: 40000, genderRatio: "62:33:5", ageBucket: "35-44", avgSpending: 1600, revenue: 64000000, growthRateRevenue: "28%", growthRateSpending: "38%", growthRateTraffic: "32%", net: 64000000, netPercentChange: "28%", avgSpendPercentChange: "38%" }
        ]
      },
      spirit: {
        week: [{ state: "Uttar Pradesh", totalTravellers: 500, genderRatio: "45:45:10", ageBucket: "45-54", avgSpending: 400, revenue: 200000, growthRateRevenue: "5%", growthRateSpending: "2%", growthRateTraffic: "8%", net: 200000, netPercentChange: "5%", avgSpendPercentChange: "2%" }],
        month: [{ state: "Uttarakhand", totalTravellers: 2000, genderRatio: "48:42:10", ageBucket: "45-54", avgSpending: 500, revenue: 1000000, growthRateRevenue: "8%", growthRateSpending: "4%", growthRateTraffic: "12%", net: 1000000, netPercentChange: "8%", avgSpendPercentChange: "4%" }],
        year: [{ state: "Odisha", totalTravellers: 15000, genderRatio: "50:40:10", ageBucket: "55-64", avgSpending: 600, revenue: 9000000, growthRateRevenue: "10%", growthRateSpending: "5%", growthRateTraffic: "15%", net: 9000000, netPercentChange: "10%", avgSpendPercentChange: "5%" }],
        lifetime: [{ state: "Bihar", totalTravellers: 100000, genderRatio: "50:40:10", ageBucket: "45-54", avgSpending: 700, revenue: 70000000, growthRateRevenue: "15%", growthRateSpending: "10%", growthRateTraffic: "20%", net: 70000000, netPercentChange: "15%", avgSpendPercentChange: "10%" }]
      },
      land: {
        week: [{ state: "Rajasthan", totalTravellers: 250, genderRatio: "55:40:5", ageBucket: "25-34", avgSpending: 800, revenue: 200000, growthRateRevenue: "7%", growthRateSpending: "12%", growthRateTraffic: "10%", net: 200000, netPercentChange: "7%", avgSpendPercentChange: "12%" }],
        month: [{ state: "Himachal Pradesh", totalTravellers: 1200, genderRatio: "60:35:5", ageBucket: "18-24", avgSpending: 900, revenue: 1080000, growthRateRevenue: "11%", growthRateSpending: "15%", growthRateTraffic: "14%", net: 1080000, netPercentChange: "11%", avgSpendPercentChange: "15%" }],
        year: [{ state: "Madhya Pradesh", totalTravellers: 8000, genderRatio: "52:43:5", ageBucket: "25-34", avgSpending: 1000, revenue: 8000000, growthRateRevenue: "14%", growthRateSpending: "18%", growthRateTraffic: "16%", net: 8000000, netPercentChange: "14%", avgSpendPercentChange: "18%" }],
        lifetime: [{ state: "Gujarat", totalTravellers: 50000, genderRatio: "50:45:5", ageBucket: "35-44", avgSpending: 1200, revenue: 60000000, growthRateRevenue: "20%", growthRateSpending: "25%", growthRateTraffic: "22%", net: 60000000, netPercentChange: "20%", avgSpendPercentChange: "25%" }]
      },
      air: {
        week: [{ state: "Delhi", totalTravellers: 300, genderRatio: "50:45:5", ageBucket: "25-44", avgSpending: 5000, revenue: 1500000, growthRateRevenue: "15%", growthRateSpending: "25%", growthRateTraffic: "5%", net: 1500000, netPercentChange: "15%", avgSpendPercentChange: "25%" }],
        month: [{ state: "Karnataka", totalTravellers: 1500, genderRatio: "55:40:5", ageBucket: "25-44", avgSpending: 5500, revenue: 8250000, growthRateRevenue: "18%", growthRateSpending: "28%", growthRateTraffic: "8%", net: 8250000, netPercentChange: "18%", avgSpendPercentChange: "28%" }],
        year: [{ state: "Telangana", totalTravellers: 12000, genderRatio: "58:38:4", ageBucket: "25-44", avgSpending: 6000, revenue: 72000000, growthRateRevenue: "22%", growthRateSpending: "32%", growthRateTraffic: "12%", net: 72000000, netPercentChange: "22%", avgSpendPercentChange: "32%" }],
        lifetime: [{ state: "Delhi", totalTravellers: 80000, genderRatio: "55:40:5", ageBucket: "25-44", avgSpending: 7000, revenue: 560000000, growthRateRevenue: "30%", growthRateSpending: "40%", growthRateTraffic: "25%", net: 560000000, netPercentChange: "30%", avgSpendPercentChange: "40%" }]
      },
      water: {
        week: [{ state: "Kerala", totalTravellers: 80, genderRatio: "45:50:5", ageBucket: "35-44", avgSpending: 3000, revenue: 240000, growthRateRevenue: "9%", growthRateSpending: "12%", growthRateTraffic: "6%", net: 240000, netPercentChange: "9%", avgSpendPercentChange: "12%" }],
        month: [{ state: "Andaman", totalTravellers: 400, genderRatio: "50:45:5", ageBucket: "25-34", avgSpending: 4500, revenue: 1800000, growthRateRevenue: "14%", growthRateSpending: "18%", growthRateTraffic: "10%", net: 1800000, netPercentChange: "14%", avgSpendPercentChange: "18%" }],
        year: [{ state: "Goa", totalTravellers: 5000, genderRatio: "55:40:5", ageBucket: "18-34", avgSpending: 5000, revenue: 25000000, growthRateRevenue: "20%", growthRateSpending: "25%", growthRateTraffic: "18%", net: 25000000, netPercentChange: "20%", avgSpendPercentChange: "25%" }],
        lifetime: [{ state: "Kerala", totalTravellers: 30000, genderRatio: "48:48:4", ageBucket: "35-44", avgSpending: 6000, revenue: 180000000, growthRateRevenue: "35%", growthRateSpending: "45%", growthRateTraffic: "30%", net: 180000000, netPercentChange: "35%", avgSpendPercentChange: "45%" }]
      }
    },
    weekend: {
      all: {
        week: [{ state: "Goa", totalTravellers: 300, genderRatio: "55:35:10", ageBucket: "25-34", avgSpending: 1800, revenue: 540000, growthRateRevenue: "22%", growthRateSpending: "32%", growthRateTraffic: "27%", net: 540000, netPercentChange: "22%", avgSpendPercentChange: "32%" }],
        month: [{ state: "Goa", totalTravellers: 1300, genderRatio: "55:35:10", ageBucket: "25-34", avgSpending: 1900, revenue: 2470000, growthRateRevenue: "25%", growthRateSpending: "35%", growthRateTraffic: "30%", net: 2470000, netPercentChange: "25%", avgSpendPercentChange: "35%" }],
        year: [{ state: "Goa", totalTravellers: 16000, genderRatio: "56:34:10", ageBucket: "25-34", avgSpending: 2100, revenue: 33600000, growthRateRevenue: "28%", growthRateSpending: "40%", growthRateTraffic: "35%", net: 33600000, netPercentChange: "28%", avgSpendPercentChange: "40%" }],
        lifetime: [{ state: "Goa", totalTravellers: 85000, genderRatio: "58:32:10", ageBucket: "25-34", avgSpending: 2500, revenue: 212500000, growthRateRevenue: "35%", growthRateSpending: "50%", growthRateTraffic: "45%", net: 212500000, netPercentChange: "35%", avgSpendPercentChange: "50%" }]
      },
      spirit: {
        week: [{ state: "Punjab", totalTravellers: 400, genderRatio: "50:45:5", ageBucket: "35-54", avgSpending: 300, revenue: 120000, growthRateRevenue: "5%", growthRateSpending: "2%", growthRateTraffic: "10%", net: 120000, netPercentChange: "5%", avgSpendPercentChange: "2%" }],
        month: [{ state: "Punjab", totalTravellers: 1800, genderRatio: "50:45:5", ageBucket: "35-54", avgSpending: 350, revenue: 630000, growthRateRevenue: "7%", growthRateSpending: "4%", growthRateTraffic: "12%", net: 630000, netPercentChange: "7%", avgSpendPercentChange: "4%" }],
        year: [{ state: "Punjab", totalTravellers: 22000, genderRatio: "50:45:5", ageBucket: "35-54", avgSpending: 400, revenue: 8800000, growthRateRevenue: "10%", growthRateSpending: "6%", growthRateTraffic: "15%", net: 8800000, netPercentChange: "10%", avgSpendPercentChange: "6%" }],
        lifetime: [{ state: "Punjab", totalTravellers: 120000, genderRatio: "50:45:5", ageBucket: "35-54", avgSpending: 500, revenue: 60000000, growthRateRevenue: "12%", growthRateSpending: "8%", growthRateTraffic: "18%", net: 60000000, netPercentChange: "12%", avgSpendPercentChange: "8%" }]
      },
      land: {
        week: [{ state: "Sikkim", totalTravellers: 120, genderRatio: "60:35:5", ageBucket: "18-34", avgSpending: 1200, revenue: 144000, growthRateRevenue: "15%", growthRateSpending: "20%", growthRateTraffic: "18%", net: 144000, netPercentChange: "15%", avgSpendPercentChange: "20%" }],
        month: [{ state: "Sikkim", totalTravellers: 500, genderRatio: "60:35:5", ageBucket: "18-34", avgSpending: 1300, revenue: 650000, growthRateRevenue: "18%", growthRateSpending: "25%", growthRateTraffic: "22%", net: 650000, netPercentChange: "18%", avgSpendPercentChange: "25%" }],
        year: [{ state: "Sikkim", totalTravellers: 6000, genderRatio: "60:35:5", ageBucket: "18-34", avgSpending: 1500, revenue: 9000000, growthRateRevenue: "22%", growthRateSpending: "30%", growthRateTraffic: "28%", net: 9000000, netPercentChange: "22%", avgSpendPercentChange: "30%" }],
        lifetime: [{ state: "Sikkim", totalTravellers: 30000, genderRatio: "60:35:5", ageBucket: "18-34", avgSpending: 1800, revenue: 54000000, growthRateRevenue: "25%", growthRateSpending: "35%", growthRateTraffic: "32%", net: 54000000, netPercentChange: "25%", avgSpendPercentChange: "35%" }]
      },
      air: {
        week: [{ state: "Karnataka", totalTravellers: 200, genderRatio: "55:40:5", ageBucket: "25-34", avgSpending: 4000, revenue: 800000, growthRateRevenue: "12%", growthRateSpending: "20%", growthRateTraffic: "10%", net: 800000, netPercentChange: "12%", avgSpendPercentChange: "20%" }],
        month: [{ state: "Karnataka", totalTravellers: 900, genderRatio: "55:40:5", ageBucket: "25-34", avgSpending: 4200, revenue: 3780000, growthRateRevenue: "15%", growthRateSpending: "22%", growthRateTraffic: "14%", net: 3780000, netPercentChange: "15%", avgSpendPercentChange: "22%" }],
        year: [{ state: "Karnataka", totalTravellers: 11000, genderRatio: "55:40:5", ageBucket: "25-34", avgSpending: 4500, revenue: 49500000, growthRateRevenue: "18%", growthRateSpending: "25%", growthRateTraffic: "16%", net: 49500000, netPercentChange: "18%", avgSpendPercentChange: "25%" }],
        lifetime: [{ state: "Karnataka", totalTravellers: 50000, genderRatio: "55:40:5", ageBucket: "25-34", avgSpending: 5000, revenue: 250000000, growthRateRevenue: "22%", growthRateSpending: "30%", growthRateTraffic: "20%", net: 250000000, netPercentChange: "22%", avgSpendPercentChange: "30%" }]
      },
      water: {
        week: [{ state: "Puducherry", totalTravellers: 60, genderRatio: "45:45:10", ageBucket: "18-34", avgSpending: 2500, revenue: 150000, growthRateRevenue: "20%", growthRateSpending: "15%", growthRateTraffic: "25%", net: 150000, netPercentChange: "20%", avgSpendPercentChange: "15%" }],
        month: [{ state: "Puducherry", totalTravellers: 300, genderRatio: "45:45:10", ageBucket: "18-34", avgSpending: 2800, revenue: 840000, growthRateRevenue: "22%", growthRateSpending: "18%", growthRateTraffic: "28%", net: 840000, netPercentChange: "22%", avgSpendPercentChange: "18%" }],
        year: [{ state: "Puducherry", totalTravellers: 4000, genderRatio: "45:45:10", ageBucket: "18-34", avgSpending: 3200, revenue: 12800000, growthRateRevenue: "25%", growthRateSpending: "22%", growthRateTraffic: "30%", net: 12800000, netPercentChange: "25%", avgSpendPercentChange: "22%" }],
        lifetime: [{ state: "Puducherry", totalTravellers: 20000, genderRatio: "45:45:10", ageBucket: "18-34", avgSpending: 3800, revenue: 76000000, growthRateRevenue: "30%", growthRateSpending: "28%", growthRateTraffic: "35%", net: 76000000, netPercentChange: "30%", avgSpendPercentChange: "28%" }]
      }
    }
  }
};

const dummyData = {
    week: [
        { name: 'Mon', oldTrav: 45, newTrav: 120, revOld: 4500, revNew: 18000 },
        { name: 'Tue', oldTrav: 52, newTrav: 135, revOld: 5200, revNew: 20250 },
        { name: 'Wed', oldTrav: 48, newTrav: 128, revOld: 4800, revNew: 19200 },
        { name: 'Thu', oldTrav: 61, newTrav: 150, revOld: 6100, revNew: 22500 },
        { name: 'Fri', oldTrav: 70, newTrav: 180, revOld: 7000, revNew: 27000 },
        { name: 'Sat', oldTrav: 85, newTrav: 220, revOld: 8500, revNew: 33000 },
        { name: 'Sun', oldTrav: 78, newTrav: 200, revOld: 7800, revNew: 30000 },
    ],

    month: [
        { name: 'Jan 2025', oldTrav: 210, newTrav: 620, revOld: 21000, revNew: 93000 },
        { name: 'Feb 2025', oldTrav: 195, newTrav: 590, revOld: 19500, revNew: 88500 },
        { name: 'Mar 2025', oldTrav: 240, newTrav: 720, revOld: 24000, revNew: 108000 },
        { name: 'Apr 2025', oldTrav: 260, newTrav: 760, revOld: 26000, revNew: 114000 },
        { name: 'May 2025', oldTrav: 300, newTrav: 820, revOld: 30000, revNew: 123000 },
        { name: 'Jun 2025', oldTrav: 320, newTrav: 880, revOld: 32000, revNew: 132000 },
        { name: 'Jul 2025', oldTrav: 350, newTrav: 950, revOld: 35000, revNew: 142500 },
        { name: 'Aug 2025', oldTrav: 340, newTrav: 920, revOld: 34000, revNew: 138000 },
        { name: 'Sep 2025', oldTrav: 310, newTrav: 870, revOld: 31000, revNew: 130500 },
        { name: 'Oct 2025', oldTrav: 360, newTrav: 980, revOld: 36000, revNew: 147000 },
        { name: 'Nov 2025', oldTrav: 390, newTrav: 1050, revOld: 39000, revNew: 157500 },
        { name: 'Dec 2025', oldTrav: 420, newTrav: 1150, revOld: 42000, revNew: 172500 },
    ],

    quarter: [
        { name: 'Q1 2025', oldTrav: 645, newTrav: 1930, revOld: 64500, revNew: 289500 },
        { name: 'Q2 2025', oldTrav: 880, newTrav: 2460, revOld: 88000, revNew: 369000 },
        { name: 'Q3 2025', oldTrav: 1000, newTrav: 2740, revOld: 100000, revNew: 411000 },
        { name: 'Q4 2025', oldTrav: 1170, newTrav: 3180, revOld: 117000, revNew: 477000 },
    ],

    year: [
        { name: '2022', oldTrav: 8200, newTrav: 21000, revOld: 820000, revNew: 3150000 },
        { name: '2023', oldTrav: 9100, newTrav: 24500, revOld: 910000, revNew: 3675000 },
        { name: '2024', oldTrav: 10500, newTrav: 29000, revOld: 1050000, revNew: 4350000 },
        { name: '2025', oldTrav: 12600, newTrav: 36000, revOld: 1260000, revNew: 5400000 },
    ],

    lifetime: [
        { name: '2020', oldTrav: 32000, newTrav: 85000, revOld: 3200000, revNew: 12750000 },
        { name: '2021', oldTrav: 40200, newTrav: 106000, revOld: 4020000, revNew: 15900000 },
        { name: '2022', oldTrav: 48400, newTrav: 127000, revOld: 4840000, revNew: 19050000 },
        { name: '2023', oldTrav: 57500, newTrav: 151500, revOld: 5750000, revNew: 22725000 },
        { name: '2024', oldTrav: 68000, newTrav: 180500, revOld: 6800000, revNew: 27075000 },
        { name: '2025', oldTrav: 80600, newTrav: 216500, revOld: 8060000, revNew: 32475000 },
    ],
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

export default function TravellerDashboard() {
    const [travellerFilter, setTravellerFilter] = useState("month");
    const [travellerTypeFilter, setTravellerTypeFilter] = useState("all");
    const [graphTypeFilter, setGraphTypeFilter] = useState("spirit roads");
    const [clawFilter, setClawFilter] = useState("all");
    const [countryFilter, setCountryFilter] = useState("all");

    // const [filteredData, setFilteredData] = useState<Record<string, StateData[]>>({});

    const filteredData = useMemo<Record<string, StateData[]>>(() => {
        const result: Record<string, StateData[]> = {};

        const countriesToUse =
            countryFilter.toLowerCase() === "all"
                ? Object.keys(detailedAnalysis)
                : [countryFilter];

        countriesToUse.forEach((country) => {
            const campTypeKey: CampType =
                travellerTypeFilter === "weekend camps" ? "weekend" : "all";

            const categoryKey: Category =
                graphTypeFilter === "claw"
                    ? (clawFilter as Category)
                    : "spirit";

            const timeKey = travellerFilter as TimeFilter;

            result[country] =
                detailedAnalysis[country]?.[campTypeKey]?.[categoryKey]?.[timeKey] || [];
        });

        return result;
    }, [
        travellerTypeFilter,
        graphTypeFilter,
        clawFilter,
        countryFilter,
        travellerFilter,
    ]);

    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">

            <TravellerAnalysisGraph />
            <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
                <div className="flex justify-between">
                    <MetricItem label="Total Registered" value={formatCompactNumber(24500).slice(1)} className="w-1/6" text />
                    <MetricItem label="Total Active" value={formatCompactNumber(14240).slice(1)} className="w-1/6" text />
                    <MetricItem label="Active Per Day" value={formatCompactNumber(8000).slice(1)} className="w-1/6" text />
                    <MetricItem label="Active 15th Day" value={formatCompactNumber(6000).slice(1)} className="w-1/6" text />
                    <MetricItem label="Active 30th Day" value={formatCompactNumber(5000).slice(1)} className="w-1/6" text />
                    <MetricItem label="Active 90th Day" value={formatCompactNumber(4000).slice(1)} className="w-1/6" text />
                    <MetricItem label="DAU / MAU" value={formatCompactNumber(10).slice(1)} className="w-1/6" text />
                </div>
            </Card>

            <div className="grid gap-8">
                <InsightCard title="Detailed Analysis" className="xl:col-span-2" showFilterTravellerDashboard>
                    <div className="flex flex-col gap-4 justify-between align-end">
                        <div className="flex  justify-end gap-4">
                            <Tabs value={travellerFilter} onValueChange={setTravellerFilter} defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                                <TabsList className="bg-transparent h-7 gap-1">
                                    {["Week", "Month", "Year", "Lifetime"].map(t => (
                                        <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs   px-2 h-5">
                                            {t}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                            <Tabs value={travellerTypeFilter} onValueChange={setTravellerTypeFilter} defaultValue="all" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                                <TabsList className="bg-transparent h-7 gap-1">
                                    {["Weekend Camps", "All"].map(t => (
                                        <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                                            {t}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                            <Tabs value={graphTypeFilter} onValueChange={setGraphTypeFilter} defaultValue="spirit roads" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                                <TabsList className="bg-transparent h-7 gap-1" defaultValue={graphTypeFilter}>
                                    {["Spirit Roads", "CLAW"].map(t => (
                                        <TabsTrigger key={t} value={t.toLowerCase()} onClick={() => { setGraphTypeFilter(t.toLowerCase()) }} className="text-xs px-2 h-5">
                                            {t}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                            {graphTypeFilter == "claw" && (
                                <Tabs value={clawFilter} onValueChange={setClawFilter} defaultValue="all" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                                    <TabsList className="bg-transparent h-7 gap-1">
                                        {["Land", "Air", "Water"].map(t => (
                                            <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                                                {t}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </Tabs>
                            )}
                            <div className="flex items-center gap-4">
                                <p className="text-sm font-black text-zinc-500">Country:</p>
                                <Select defaultValue="all" onValueChange={setCountryFilter} value={countryFilter}>
                                    <SelectTrigger className="bg-zinc-900 border border-zinc-700 rounded-none p-2">
                                        <SelectValue />
                                        <ChevronsUpDown size={16} className="ml-1" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border border-zinc-700 rounded-none p-2">
                                        <SelectItem value="all">All</SelectItem>
                                        {countries.map(country => (
                                            <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 shadow-2xl">
                            <Table className="w-full border-collapse">
                                <TableHeader className="bg-zinc-900/50">
                                    <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-left">State</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">Travellers</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">Gender M:F:T</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">Age Bucket</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">Revenue</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">Net</TableHead>
                                        <TableHead className="py-5 px-6 text-base font-semibold text-white text-right">μ Spending</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(filteredData).flat().map((item, index) => (
                                        <TableRow key={index} className="group border-b border-zinc-900 hover:bg-zinc-800/40 transition-colors">
                                            {/* State Column */}
                                            <TableCell className="py-5 px-6 text-sm font-medium text-zinc-300 group-hover:text-white">
                                                {item.state}
                                            </TableCell>

                                            {/* Travellers Column */}
                                            <TableCell className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                                <div className="flex flex-col items-end">
                                                    <span>{formatCompactNumber(item.totalTravellers).slice(1)}</span>
                                                    <span className={`text-sm font-bold ${parseFloat(item.growthRateTraffic) > 0 ? 'text-emerald-400' : 'text-rose-400'
                                                        }`}>
                                                        {parseFloat(item.growthRateTraffic) > 0 ? '+' : ''}{item.growthRateTraffic}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Gender Ratio */}
                                            <TableCell className="py-5 px-6 text-sm text-right text-zinc-300 tabular-nums">
                                                {item.genderRatio}
                                            </TableCell>

                                            {/* Age Bucket */}
                                            <TableCell className="py-5 px-6 text-sm text-right text-zinc-300">
                                                {item.ageBucket}
                                            </TableCell>

                                            {/* Revenue Column */}
                                            <TableCell className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                                <div className="flex flex-col items-end">
                                                    <span>{formatCompactNumber(item.revenue)}</span>
                                                    <span className={`text-[sm font-bold ${parseFloat(item.growthRateRevenue) > 0 ? 'text-emerald-400' : 'text-rose-400'
                                                        }`}>
                                                        {parseFloat(item.growthRateRevenue) > 0 ? '+' : ''}{item.growthRateRevenue}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Net Column */}
                                            <TableCell className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                                <div className="flex flex-col items-end">
                                                    <span className="font-semibold text-zinc-100">
                                                        {formatCompactNumber(item.net)}
                                                    </span>
                                                    <span className={`text-sm font-bold ${parseFloat(item.netPercentChange) > 0 ? 'text-emerald-400' : 'text-rose-400'
                                                        }`}>
                                                        {parseFloat(item.netPercentChange) > 0 ? '+' : ''}{item.netPercentChange}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Avg Spending Column */}
                                            <TableCell className="py-5 px-6 text-sm text-right tabular-nums text-zinc-300">
                                                <div className="flex flex-col items-end">
                                                    <span>
                                                        {formatCompactNumber(item.avgSpending)}
                                                    </span>
                                                    <span className={`text-sm font-bold ${parseFloat(item.avgSpendPercentChange) > 0 ? 'text-emerald-400' : 'text-rose-400'
                                                        }`}>
                                                        {parseFloat(item.avgSpendPercentChange) > 0 ? '+' : ''}{item.avgSpendPercentChange}
                                                    </span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </InsightCard>

                {/* 3. CUSTOMER PERSONA: DEMOGRAPHICS */}
                {/* <InsightCard title="Customer Persona">
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
                </InsightCard> */}
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> */}
            {/* 5. TICKETS BOOKED TO ATTENDED */}
            {/* <InsightCard title="Fulfillment: Booking vs Attendance">
                    <div className="space-y-4">
                        <p className="text-base font-black text-zinc-500 ">Traveller Origin Proximity</p>
                        <AttendanceRow label="Same City" booked={450} attended={442} />
                        <AttendanceRow label="Same State" booked={1200} attended={1150} />
                        <AttendanceRow label="Different State" booked={800} attended={720} />
                        <AttendanceRow label="Different Country" booked={150} attended={142} />
                    </div>
                </InsightCard> */}

            {/* 6. CAMP PARTICIPATION COMPARISON */}
            {/* <InsightCard title="Camp Participation">
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
                </InsightCard> */}
            {/* </div> */}



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
            <p className="text-[9px] text-zinc-500  font-black">{label}</p>
            <p className="text-sm font-black text-white">{value}</p>
            {sub && <p className="text-[10px] text-zinc-600 font-bold leading-tight">{sub}</p>}
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    (payload)
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-950 border border-zinc-800 p-4 shadow-2xl rounded-none">
                <p className="text-[10px] font-black text-zinc-500 mb-2  tracking-widest">{label}</p>
                <div className="space-y-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-[11px] font-bold text-zinc-300">{entry.name}:</span>
                            </div>
                            <span className="text-[11px] font-black text-white">
                                {entry.name.includes('Revenue') ? `$${entry.value.toLocaleString()}` : entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// const LegendItem = ({ color, label }: { color: string, label: string }) => (
//     <div className="flex items-center gap-2">
//         <div className={`w-2 h-2 rounded-full ${color}`} />
//         <span className="text-zinc-400">{label}</span>
//     </div>
// );

const TravellerAnalysisGraph = () => {
    const [range, setRange] = useState('month');

    return (
        <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-cyan-500" />
                    <h3 className="text-lg font-black text-white ">Retention vs Acquisition</h3>
                </div>

                <Tabs defaultValue="month" onValueChange={setRange} value={range} className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                    <TabsList className="bg-transparent h-7 gap-1">
                        {["Week", "Month", "Quarter", "Year", "Lifetime"].map(t => (
                            <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                                {t}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-black  tracking-tight">
                    <LegendItem color="bg-blue-500" label="Old Travellers" />
                    {/* <LegendItem color="bg-indigo-400" label="Rev (Old)" /> */}
                    <LegendItem color="bg-emerald-500" label="New Travellers" />
                    {/* <LegendItem color="bg-teal-400" label="Rev (New)" /> */}
                </div>
            </div>

            {/* Chart Section */}
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dummyData[range as keyof typeof dummyData]} margin={{ top: 5, right: 30, left: 30, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="0" stroke="#18181b" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="white"
                            fontSize={15}
                            fontWeight="bold"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={15}
                        />
                        <YAxis hide domain={['auto', 'auto']} />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                        />

                        {/* Visible Lines */}
                        <Line
                            name="Old Travellers"
                            dataKey="oldTrav"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#3b82f6' }}
                        />
                        <Line
                            name="New Travellers"
                            dataKey="newTrav"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#10b981' }}
                        />

                        {/* Hidden "Ghost" Lines for Revenue */}
                        {/* We set stroke to transparent and hide the dots/activeDots */}
                        {/* <Line
              name="Revenue (Old)"
              dataKey="revOld"
              stroke="transparent"
              strokeWidth={0}
              dot={false}
              activeDot={false}
              legendType="none"
            /> */}
                        {/* <Line
              name="Revenue (New)"
              dataKey="revNew"
              stroke="transparent"
              strokeWidth={0}
              dot={false}
              activeDot={false}
              legendType="none"
            /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Summary Footer */}
            {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-950/50 border border-zinc-800 p-5">
          <p className="text-[10px] text-zinc-500 font-black mb-1 ">Top Growth Driver</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-500">New Acquisitions</span>
            <span className="text-[10px] text-zinc-600 font-bold">+24% vs Prev {range}</span>
          </div>
        </div>
        <div className="bg-zinc-950/50 border border-zinc-800 p-5">
          <p className="text-[10px] text-zinc-500 font-black mb-1 ">Retention Revenue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-blue-500">$12.4k</span>
            <span className="text-[10px] text-zinc-600 font-bold">LTV Stabilized</span>
          </div>
        </div>
      </div> */}
        </Card>
    );
};