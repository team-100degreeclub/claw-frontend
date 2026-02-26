"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

export const formatCompactNumber = (number: number) => {
  if (number < 1000) return "₹" + number.toString();
  return "₹" + Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
};

// Mock data for the graph
const graphData = {
  week: [
    { name: "Mon", revenue: 1200, travelers: 320, camps: 4, corporate: 2 },
    { name: "Tue", revenue: 1500, travelers: 410, camps: 5, corporate: 3 },
    { name: "Wed", revenue: 1800, travelers: 500, camps: 6, corporate: 3 },
    { name: "Thu", revenue: 1400, travelers: 380, camps: 4, corporate: 2 },
    { name: "Fri", revenue: 2100, travelers: 620, camps: 7, corporate: 4 },
    { name: "Sat", revenue: 2500, travelers: 800, camps: 9, corporate: 5 },
    { name: "Sun", revenue: 2300, travelers: 720, camps: 8, corporate: 4 },
  ],

  month: [
    { name: "Jan 2025", revenue: 4000, travelers: 2400, camps: 24, corporate: 12 },
    { name: "Feb 2025", revenue: 3000, travelers: 1398, camps: 22, corporate: 15 },
    { name: "Mar 2025", revenue: 5000, travelers: 9800, camps: 29, corporate: 18 },
    { name: "Apr 2025", revenue: 2780, travelers: 3908, camps: 20, corporate: 14 },
    { name: "May 2025", revenue: 4890, travelers: 4800, camps: 31, corporate: 22 },
    { name: "Jun 2025", revenue: 6390, travelers: 3800, camps: 35, corporate: 25 },
    { name: "Jul 2025", revenue: 7200, travelers: 5200, camps: 38, corporate: 28 },
    { name: "Aug 2025", revenue: 6800, travelers: 4900, camps: 36, corporate: 26 },
    { name: "Sep 2025", revenue: 5900, travelers: 4300, camps: 30, corporate: 21 },
    { name: "Oct 2025", revenue: 6100, travelers: 4500, camps: 32, corporate: 23 },
    { name: "Nov 2025", revenue: 5300, travelers: 4100, camps: 28, corporate: 19 },
    { name: "Dec 2025", revenue: 8000, travelers: 6000, camps: 40, corporate: 30 },
  ],

  year: [
    { name: "2021", revenue: 54000, travelers: 42000, camps: 320, corporate: 210 },
    { name: "2022", revenue: 68000, travelers: 51000, camps: 410, corporate: 290 },
    { name: "2023", revenue: 75000, travelers: 58000, camps: 460, corporate: 340 },
    { name: "2024", revenue: 82000, travelers: 63000, camps: 520, corporate: 390 },
    { name: "2025", revenue: 93000, travelers: 69000, camps: 612, corporate: 450 },
  ],

  lifetime: [
    { name: "2021", revenue: 54000, travelers: 42000, camps: 320, corporate: 210 },
    { name: "2022", revenue: 68000, travelers: 51000, camps: 410, corporate: 290 },
    { name: "2023", revenue: 75000, travelers: 58000, camps: 460, corporate: 340 },
    { name: "2024", revenue: 82000, travelers: 63000, camps: 520, corporate: 390 },
    { name: "2025", revenue: 93000, travelers: 69000, camps: 612, corporate: 450 },
  ],
};

const campData = {
  week: [
    
    { type: "Spirit road", sold: 5, gross: 12500, net: 7500, avg: 2500, high: 3000, low: 2000 },
    { type: "Adventure-Land", sold: 28, gross: 56000, net: 24000, avg: 2000, high: 2500, low: 1500 },
    { type: "Adventure-Air", sold: 3, gross: 36000, net: 22000, avg: 12000, high: 13000, low: 11000 },
    { type: "Adventure-Water", sold: 8, gross: 16000, net: 9000, avg: 2000, high: 2500, low: 1500 }
  ],

  month: [
    { type: "Spirit road", sold: 20, gross: 50000, net: 30000, avg: 2500, high: 5000, low: 1000 },
    { type: "Adventure-Land", sold: 142, gross: 284000, net: 120000, avg: 2000, high: 4000, low: 800 },
    { type: "Adventure-Air", sold: 12, gross: 144000, net: 90000, avg: 12000, high: 15000, low: 10000 },
    { type: "Adventure-Water", sold: 36, gross: 72000, net: 40000, avg: 2000, high: 3000, low: 1500 }
  ],

  quarter: [
    { type: "Spirit road", sold: 60, gross: 150000, net: 90000, avg: 2500, high: 5200, low: 1000 },
    { type: "Adventure-Land", sold: 420, gross: 840000, net: 360000, avg: 2000, high: 4200, low: 800 },
    { type: "Adventure-Air", sold: 36, gross: 432000, net: 270000, avg: 12000, high: 16000, low: 9500 },
    { type: "Adventure-Water", sold: 108, gross: 216000, net: 120000, avg: 2000, high: 3200, low: 1400 }
  ],

  year: [
    { type: "Spirit road", sold: 240, gross: 600000, net: 360000, avg: 2500, high: 5500, low: 900 },
    { type: "Adventure-Land", sold: 1680, gross: 3360000, net: 1440000, avg: 2000, high: 4500, low: 750 },
    { type: "Adventure-Air", sold: 144, gross: 1728000, net: 1080000, avg: 12000, high: 17000, low: 9000 },
    { type: "Adventure-Water", sold: 432, gross: 864000, net: 480000, avg: 2000, high: 3500, low: 1300 }
  ],

  lifetime: [
    { type: "Spirit road", sold: 1200, gross: 3000000, net: 1800000, avg: 2500, high: 6000, low: 800 },
    { type: "Adventure-Land", sold: 8400, gross: 16800000, net: 7200000, avg: 2000, high: 5000, low: 700 },
    { type: "Adventure-Air", sold: 720, gross: 8640000, net: 5400000, avg: 12000, high: 18000, low: 8500 },
    { type: "Adventure-Water", sold: 2160, gross: 4320000, net: 2400000, avg: 2000, high: 4000, low: 1200 }
  ]
};

const campKPIs = {
  week: {
    totalCamps: 12,
    totalTravellers: 480,
    avgTravellersPerCamp: 40,
    avgTicketsPerCamp: 15000,
  },

  month: {
    totalCamps: 48,
    totalTravellers: 1920,
    avgTravellersPerCamp: 40,
    avgTicketsPerCamp: 17000,
  },

  quarter: {
    totalCamps: 144,
    totalTravellers: 5760,
    avgTravellersPerCamp: 40,
    avgTicketsPerCamp: 14000,
  },

  year: {
    totalCamps: 576,
    totalTravellers: 23040,
    avgTravellersPerCamp: 40,
    avgTicketsPerCamp: 16000,
  },

  lifetime: {
    totalCamps: 2880,
    totalTravellers: 115200,
    avgTravellersPerCamp: 40,
    avgTicketsPerCamp: 18000,
  },
};

const teamInsights = {
  week: {
    totalMembers: 15,
    totalPayout: 8000000,
    averagePayoutPerPerson: 60000,
  },

  month: {
    totalMembers: 18,
    totalPayout: 32000000,
    averagePayoutPerPerson: 177778,
  },

  quarter: {
    totalMembers: 22,
    totalPayout: 96000000,
    averagePayoutPerPerson: 436364,
  },

  year: {
    totalMembers: 30,
    totalPayout: 384000000,
    averagePayoutPerPerson: 12800000,
  },

  lifetime: {
    totalMembers: 45,
    totalPayout: 1200000000,
    averagePayoutPerPerson: 26666667,
  },
};

const travellerInsights = {
  week: {
    total: 1200,
    unique: 930,
    repeat: 270,
    repeatRate: "22.5%",
  },

  month: {
    total: 4800,
    unique: 3600,
    repeat: 1200,
    repeatRate: "25%",
  },

  quarter: {
    total: 14400,
    unique: 10500,
    repeat: 3900,
    repeatRate: "27.1%",
  },

  year: {
    total: 57600,
    unique: 40000,
    repeat: 17600,
    repeatRate: "30.5%",
  },

  lifetime: {
    total: 210000,
    unique: 140000,
    repeat: 70000,
    repeatRate: "33.3%",
  },
};

export default function PerformanceDashboard() {

  const [graphActiveTab, setGraphActiveTab] = React.useState("month");
  const [corporateFilter, setCorporateFilter] = useState("month");
  const [campFilter, setCampFilter] = useState("month");
  const [teamInsightsFilter, setTeamInsightsFilter] = useState("month");
  const [travellerInsightsFilter, setTravellerInsightsFilter] = useState("month");

  const normalizedData = graphData[graphActiveTab as keyof typeof graphData].map((d) => {
    const maxValues = {
      revenue: Math.max(...graphData[graphActiveTab as keyof typeof graphData].map(o => o.revenue)),
      travelers: Math.max(...graphData[graphActiveTab as keyof typeof graphData].map(o => o.travelers)),
      camps: Math.max(...graphData[graphActiveTab as keyof typeof graphData].map(o => o.camps)),
      corporate: Math.max(...graphData[graphActiveTab as keyof typeof graphData] .map(o => o.corporate)),
    };

    return {
      ...d,
      normRev: (d.revenue / maxValues.revenue) * 100,
      normTrav: (d.travelers / maxValues.travelers) * 100,
      normCamp: (d.camps / maxValues.camps) * 100,
      normCorp: (d.corporate / maxValues.corporate) * 100,
    };
  });

  const bestPerformingForEachRange = {
    week: "1 - 7 February",
    month: "January 2023",
    year: "2023",
    lifetime: "2023"
  }

  const worstPerformingForEachRange = {
    week: "1 - 7 December",
    month: "November 2021",
    year: "2021",
    lifetime: "2021"
  }

  const corporateData = {
    week: {
      leads: "50",
      converted: "10",
      canceled: "1",
      convRate: "20.0%",
      pay: {
        average: "100000",
        high: "200000",
        descHigh: "Apple, Cupertino",
        low: "5000",
        descLow: "Some Startup, Bangalore"
      },
      timeToConvert: {
        average: "3 Days",
        high: "7 Days",
        descHigh: "Netflix, Los Gatos",
        low: "1 Day",
        descLow: "Meta, Menlo Park"
      }
    },
    month: {
      leads: "450",
      converted: "120",
      canceled: "2",
      convRate: "26.7%",
      pay: {
        average: "120000",
        high: "1500000",
        descHigh: "Facebook, California",
        low: "10500",
        descLow: "Zerodha, Bangalore"
      },
      timeToConvert: {
        average: "12 Days",
        high: "90 Days",
        descHigh: "Google, New York",
        low: "24 Hours",
        descLow: "Boeing, San Francisco"
      }
    },
    quarter: {
      leads: "900",
      converted: "459",
      canceled: "4",
      convRate: "51.7%",
      pay: {
        average: "140000",
        high: "1500000",
        descHigh: "Facebook, California",
        low: "10500",
        descLow: "Zerodha, Bangalore"
      },
      timeToConvert: {
        average: "12 Days",
        high: "90 Days",
        descHigh: "Google, New York",
        low: "24 Hours",
        descLow: "Boeing, San Francisco"
      }
    },  
    year: {
      leads: "5000",
      converted: "1300",
      canceled: "50",
      convRate: "26.0%",
      pay: {
        average: "150000",
        high: "2500000",
        descHigh: "SpaceX, Hawthorne",
        low: "8000",
        descLow: "Local Firm, Delhi"
      },
      timeToConvert: {
        average: "25 Days",
        high: "120 Days",
        descHigh: "Amazon, Seattle",
        low: "12 Hours",
        descLow: "Flipkart, Bangalore"
      }
    },
    lifetime: {
      leads: "15000",
      converted: "4000",
      canceled: "200",
      convRate: "26.6%",
      pay: {
        average: "160000",
        high: "5000000",
        descHigh: "Microsoft, Redmond",
        low: "5000",
        descLow: "Small Biz, Mumbai"
      },
      timeToConvert: {
        average: "30 Days",
        high: "180 Days",
        descHigh: "Oracle, Austin",
        low: "6 Hours",
        descLow: "Cred, Bangalore"
      }
    }
  };

  const currentCorporateData = corporateData[corporateFilter as keyof typeof corporateData];

  return (
    <div className="space-y-8 text-white pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* 6. TIME-BASED PERFORMANCE GRAPH */}
      <Card className="bg-zinc-900/40 border border-zinc-700 rounded-none p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          {/* <h3 className="text-base text-white ">Growth Graph</h3> */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-cyan-500" />
            <h3 className="text-lg font-bold text-white ">Growth Graph</h3>
          </div>
          <Tabs value={graphActiveTab} onValueChange={setGraphActiveTab} defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
            <TabsList className="bg-transparent h-7 gap-1">
              {["Week", "Month", "Year", "Lifetime"].map(t => (
                <TabsTrigger key={t} value={t.toLowerCase()} onClick={() => setGraphActiveTab(t.toLowerCase())} className="text-xs px-2 h-5">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex flex-wrap gap-4 text-[10px] ">
            <LegendItem color="bg-blue-500" label="Revenue" />
            <LegendItem color="bg-emerald-500" label="Travelers" />
            <LegendItem color="bg-amber-500" label="Camps" />
            <LegendItem color="bg-purple-500" label="Corporate" />
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedData} margin={{ top: 20, right: 30, left: 40, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#ffffff"
                fontSize={15}
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
          <div className="bg-zinc-900 p-6 rounded-sm">
            <p className="text-base text-emerald-500 font-bold mb-2">Best Performing {graphActiveTab[0].toUpperCase() + graphActiveTab.slice(1)}</p>
            <div className="flex gap-4">
              <span className="text-sm font-bold">{bestPerformingForEachRange[graphActiveTab == "week" ? "week" : graphActiveTab == "month" ? "month" : graphActiveTab == "year" ? "year" : "lifetime"]}</span>
              {/* <span className="text-xs text-zinc-500">Peak Expedition Window / High Corp Volume</span> */}
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-sm">
            <p className="text-base text-red-400 font-bold mb-2">Weakest Performing {graphActiveTab[0].toUpperCase() + graphActiveTab.slice(1)}</p>
            <div className="flex gap-4">
              <span className="text-sm font-bold">{worstPerformingForEachRange[graphActiveTab == "week" ? "week" : graphActiveTab == "month" ? "month" : graphActiveTab == "year" ? "year" : "lifetime"]}</span>
              {/* <span className="text-xs text-zinc-500">Monsoon Cycles / Q1 Budget Re-calibration</span> */}
            </div>
          </div>
        </div>
      </Card>

      {/* 1. TOP KPI SECTION: CORPORATE & CAMPS SUMMARY */}
      <InsightCard title="Summary">
        <div className="space-y-2">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="px-4 py-3 text-base font-semibold text-white">Category</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">Gross</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">Net</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">Avg. Payout</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">High</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">Low</th>
                  <th className="px-4 py-3 text-base font-semibold text-white text-right">Cancelled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <KPIRow type="Corporate" gross={14500000} net={6500000} avg={6500000} high={6500000} low={6500000} cancel={6500000} />
                <KPIRow type="Camps" gross={11400000} net={6200000} avg={6200000} high={6200000} low={6200000} cancel={6200000} />
              </tbody>
            </table>
          </div>
        </div>
        {/* <p className="text-base  text-zinc-500 tracking-widest mt-4 -mb">Payout - Corporate</p> */}
        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50 text-base">
              <tr>
                <th className="px-4 py-3 font-semibold text-white">Payout - Corporate</th>
                <th className="px-4 py-3 font-semibold text-white">Organization</th>
                <th className="px-4 py-3 font-semibold text-white">Host</th>
                <th className="px-4 py-3 font-semibold text-white">Time To Convert</th>
                <th className="px-4 py-3 font-semibold text-white text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {/* Highest Payout Row */}
              <tr className="group hover:bg-zinc-800/40 transition-all duration-200 text-sm">
                <td className="px-4 py-4 text-zinc-300">Highest Payout</td>
                <td className="px-4 py-4 text-zinc-300">Boeing, USA
                </td>
                <td className="px-4 py-4 text-zinc-300">Major Sandeep</td>
                <td className="px-4 py-4 text-zinc-300">
                  <span className="py-1">12 days</span>
                </td>
                <td className="px-4 py-4 text-sm font-bold text-emerald-400 text-right tabular-nums">
                  {formatCompactNumber(19000)}
                </td>
              </tr>

              {/* Lowest Payout Row */}
              <tr className="group hover:bg-zinc-800/40 transition-all duration-200 text-sm">
                <td className="px-4 py-4 text-sm font-medium text-zinc-100">Lowest Payout</td>
                <td className="px-4 py-4 text-sm text-zinc-300">
                  Zerodha, India
                </td>
                <td className="px-4 py-4 text-zinc-300">Sgt. Miller</td>
                <td className="px-4 py-4 text-zinc-300">
                  <span className="py-1 ">10 days</span>
                </td>
                <td className="px-4 py-4 font-bold text-emerald-400 text-right tabular-nums">
                  {formatCompactNumber(2000)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <p className="text-base  text-zinc-500 tracking-widest mt-4 -mb">Payout - Camps</p> */}
        <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="px-4 py-3 font-semibold text-white">Payout - Camps</th>
                <th className="px-4 py-3 font-semibold text-white">Camp Name</th>
                <th className="px-4 py-3 font-semibold text-white">Host</th>
                <th className="px-4 py-3 font-semibold text-white">Time To Convert</th>
                <th className="px-4 py-3 font-semibold text-white text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {/* Highest Payout Row */}
              <tr className="group hover:bg-zinc-800/40 transition-all duration-200">
                <td className="px-4 py-4 text-zinc-300">Highest Payout</td>
                <td className="px-4 py-4 text-zinc-300">
                  Endurance (CLAW)
                </td>
                <td className="px-4 py-4 text-zinc-300">Major Sandeep</td>
                <td className="px-4 py-4">
                  <span className="px-2.5 py-1 tabular-nums">
                    18 days
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-bold text-emerald-400 text-right tabular-nums">
                  {formatCompactNumber(19000)}
                </td>
              </tr>

              {/* Lowest Payout Row */}
              <tr className="group hover:bg-zinc-800/40 transition-all duration-200">
                <td className="px-4 py-4 text-sm font-medium text-zinc-100">Lowest Payout</td>
                <td className="px-4 py-4 text-sm text-zinc-300">
                  Dive of the Day
                </td>
                <td className="px-4 py-4 text-sm text-zinc-300">Sgt. Miller</td>
                <td className="px-4 py-4 text-sm">
                  <span className="px-2.5 py-1 tabular-nums">
                    17 days
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-bold text-emerald-400 text-right tabular-nums">
                  {formatCompactNumber(2000)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


      </InsightCard>

      {/* <InsightCard title="Team Insights" showFilter>
          
        </InsightCard> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

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
      </div> */}

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
        {/* 2. CORPORATE INSIGHTS */}
        <InsightCard
          title="Corporate Insights"
          showFilter
          currentFilter={corporateFilter}
          onFilterChange={(value) => setCorporateFilter(value)}
        >
          <div className="flex justify-between border-b border-zinc-800 pb-8 mb-8">
            <DataPoint label="Leads" value={currentCorporateData.leads} />
            <DataPoint label="Converted" value={currentCorporateData.converted} />
            <DataPoint label="Canceled" value={currentCorporateData.canceled} />
            <DataPoint label="Conv. Rate" value={currentCorporateData.convRate} highlight />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <StatList title="Pay" items={[
              { label: "Average", value: currentCorporateData.pay.average },
              { label: "High", value: currentCorporateData.pay.high, desc: currentCorporateData.pay.descHigh },
              { label: "Low", value: currentCorporateData.pay.low, desc: currentCorporateData.pay.descLow }
            ]} />
            <StatList title="Time to Convert" items={[
              { label: "Average", value: currentCorporateData.timeToConvert.average },
              { label: "High", value: currentCorporateData.timeToConvert.high, desc: currentCorporateData.timeToConvert.descHigh },
              { label: "Low", value: currentCorporateData.timeToConvert.low, desc: currentCorporateData.timeToConvert.descLow }
            ]} />
          </div>
        </InsightCard>

        {/* 3. CAMP INSIGHTS */}
        <InsightCard title="Camp Insights" showFilter currentFilter={campFilter} onFilterChange={setCampFilter}>
          
          <div className="flex justify-between mb-8">
            <DataPoint label="Total Camps" value={formatCompactNumber(campKPIs[campFilter as keyof typeof campKPIs].totalCamps).slice(1)} />
            <DataPoint label="Total Travelers" value={formatCompactNumber(campKPIs[campFilter as keyof typeof campKPIs].totalTravellers).slice(1)} />
            <DataPoint label="Avg Traveler/Camp" value={formatCompactNumber(campKPIs[campFilter as keyof typeof campKPIs].avgTravellersPerCamp).slice(1)} />
            <DataPoint label="Avg Ticket/Camp" value={formatCompactNumber(campKPIs[campFilter as keyof typeof campKPIs].avgTicketsPerCamp)} highlight />
          </div>
          <div className="space-y-2">
            {/* <p className="border-t border-zinc-800"></p> */}
            <h2 className="text-xl font-semibold text-white my-4">Camp Breakdown</h2>
            <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800 bg-zinc-950/50">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-900/50 text-base">
                  <tr>
                    <th className="px-4 py-4 font-semibold text-white">Type</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">Tickets Sold</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">Gross</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">Net</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">Avg</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">High</th>
                    <th className="px-4 py-4 font-semibold text-white text-right">Low</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {campData[campFilter as keyof typeof campData].map((data) => <CampTableRow key={data.type} {...data} />)}
                </tbody>
              </table>
            </div>
          </div>
        </InsightCard>

        {/* 4. TEAM INSIGHTS */}
        <InsightCard title="Team Insights" showFilter currentFilter={teamInsightsFilter} onFilterChange={setTeamInsightsFilter}>
          <div className="flex justify-between pb-8 mb-8">
            <DataPoint label="Total Members" value={formatCompactNumber(teamInsights[teamInsightsFilter as keyof typeof teamInsights].totalMembers).slice(1)} />
            <DataPoint label="Total Payout" value={formatCompactNumber(teamInsights[teamInsightsFilter as keyof typeof teamInsights].totalPayout)} />
            <DataPoint label="Avg/Person" value={formatCompactNumber(teamInsights[teamInsightsFilter as keyof typeof teamInsights].averagePayoutPerPerson)} highlight />
          </div>
          {/* <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-base text-zinc-500 font-bold border-b border-zinc-800">
                <tr>
                  <th className="pb-2"></th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Camp Name / Org. Name</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-zinc-900 text-white">
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3">Highest Payout - Corporate</td>
                  <td className="py-3">{formatCompactNumber(19000)}</td>
                  <td className="py-3">Major Sandeep</td>
                  <td className="py-3">Boeing</td>
                </tr>
                <tr className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3">Highest Payout - Camps</td>
                  <td className="py-3">{formatCompactNumber(19000)}</td>
                  <td className="py-3">Major Sandeep</td>
                  <td className="py-3">Everest Base Camp</td>
                </tr>
                <tr className="hover:bg-zinc-800/30 transition-colors text-white">
                  <td className="py-3">Lowest Payout - Corporate</td>
                  <td className="py-3">{formatCompactNumber(2000)}</td>
                  <td className="py-3">Sgt. Miller</td>
                  <td className="py-3">Zerodha</td>
                </tr>
                <tr className="hover:bg-zinc-800/30 transition-colors text-white">
                  <td className="py-3">Lowest Payout - Camps</td>
                  <td className="py-3">{formatCompactNumber(2000)}</td>
                  <td className="py-3">Sgt. Miller</td>
                  <td className="py-3">Local Hike / MI</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </InsightCard>

        {/* 5. TRAVELLER INSIGHTS */}
        <InsightCard title="Traveller Insights" showFilter currentFilter={travellerInsightsFilter} onFilterChange={setTravellerInsightsFilter}>
          <div className="flex justify-between gap-6">
            <DataPoint label="Total Travellers" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].total).slice(1)} />
            <DataPoint label="Unique Travellers" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].unique).slice(1)} />
            <DataPoint label="Repeat Travellers" value={formatCompactNumber(travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].repeat).slice(1)} />
            <DataPoint label="Repeat Rate" value={travellerInsights[travellerInsightsFilter as keyof typeof travellerInsights].repeatRate} highlight />
          </div>
          {/* <div className="mt-12 bg-zinc-900/50 p-6 rounded-sm border border-zinc-800 flex items-center justify-between">
            <p className="text-sm text-zinc-400">User Retention Score</p>
            <div className="text-right">
                <span className="text-2xl  text-emerald-500 ">High Integrity</span>
            </div>
          </div> */}
        </InsightCard>
      </div>

      
    </div>
  );
}

// --- UI HELPER COMPONENTS ---

export function KPIGroup({ title, metrics }: { title: string, metrics: { label: string; value: number; color: string }[] }) {
  return (
    <Card className="bg-zinc-900 border-zinc-700 rounded-sm p-6 overflow-hidden">
      <h3 className="text-lg  tracking-widest  text-white mb-6 ">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className={i !== 0 ? "border-l border-zinc-800 pl-4" : ""}>
            <p className="text-sm text-zinc-500  font-bold mb-1">{m.label}</p>
            <p className={`text-2xl  tracking-tighter ${m.color}`}>{formatCompactNumber(m.value)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function InsightCard({ title, children, showFilter, showFilterTravellerDashboard, className, onFilterChange, currentFilter }: { title: string, children: React.ReactNode, showFilter?: boolean, showFilterTravellerDashboard?: boolean, className?: string, onFilterChange?: (value: string) => void, currentFilter?: string }) {
  const [graphActiveTab, setGraphActiveTab] = useState("spirit roads")
  return (
    <Card className={cn("bg-zinc-900/30 border border-zinc-700 rounded-sm p-8 flex flex-col", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-cyan-500" />
          <h3 className="text-lg font-bold text-white ">{title}</h3>
        </div>
        {showFilter && (
          <Tabs value={currentFilter} onValueChange={onFilterChange} defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
            <TabsList className="bg-transparent h-7 gap-1">
              {["Week", "Month", "Quarter", "Year", "Lifetime"].map(t => (
                <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* {showFilterTravellerDashboard && (
          <div className="flex gap-4 justify-between align-end">
            <Tabs defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
              <TabsList className="bg-transparent h-7 gap-1">
                {["Week", "Month", "Year", "Lifetime"].map(t => (
                  <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs   px-2 h-5">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Tabs defaultValue="solo" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
              <TabsList className="bg-transparent h-7 gap-1">
                {["Solo", "Couple", "Group"].map(t => (
                  <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs   px-2 h-5">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Tabs defaultValue="all" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
              <TabsList className="bg-transparent h-7 gap-1">
                {["Weekend Camps", "All"].map(t => (
                  <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Tabs defaultValue="spirit roads" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
              <TabsList className="bg-transparent h-7 gap-1" defaultValue={graphActiveTab}>
                {["Spirit Roads", "CLAW"].map(t => (
                  <TabsTrigger key={t} value={t.toLowerCase()} onClick={() => { setGraphActiveTab(t.toLowerCase()) }} className="text-xs px-2 h-5">
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {graphActiveTab == "claw" && (
              <Tabs defaultValue="all" className="bg-zinc-950 border border-zinc-800 p-1 rounded-sm">
                <TabsList className="bg-transparent h-7 gap-1">
                  {["Land", "Air", "Water"].map(t => (
                    <TabsTrigger key={t} value={t.toLowerCase()} className="text-xs px-2 h-5">
                      {t}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
        )} */}

        {

        }
      </div>
      {children}
    </Card>
  );
}

export function DataPoint({ label, value, highlight, className, highlightLabel }: any) {
  const displayValue = typeof value === 'number' ? formatCompactNumber(value) : value;
  return (
    <div className={cn("space-y-1", className)}>
      <p className={`text-base ${highlightLabel ? 'text-white text-lg font-bold' : 'text-zinc-300'}`}>{label}</p>
      <p className={`text-3xl font-bold ${highlight ? 'text-green-400' : 'text-white'}`}>{displayValue}</p>
    </div>
  );
}

function StatList({ title, items }: { title: string; items: { label: string; value: string; desc?: string }[] }) {
  return (
    <div className="space-y-6 px-1">
      {/* Section Title - Using text-base for prominence */}
      <h3 className="text-base font-semibold text-zinc-400 border-b border-zinc-800 pb-3">
        {title}
      </h3>

      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center group">
            <div className="flex flex-col">
              {/* Label - Using text-base for primary identification */}
              <span className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors">
                {item.label}
              </span>

              {/* Description - Using text-sm for secondary context */}
              {item.desc && (
                <span className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {item.desc}
                </span>
              )}
            </div>

            {/* Value - Highlighted in White and bold for readability */}
            <div className="text-right">
              <p className="text-base text-white tabular-nums">
                {title === "Pay" ? formatCompactNumber(parseInt(item.value)) : item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CampTableRow({ type, sold, gross, net, avg, high, low }: {
  type: string; sold: number; gross: number; net: number; avg: number; high: number; low: number
}) {
  return (
    <tr className="group hover:bg-zinc-800/40 transition-all duration-200 text-sm">
      {/* Primary Type - Bold and White */}
      <td className="px-4 py-4 text-zinc-100">
        {type}
      </td>

      {/* Metrics - Using zinc-400 for secondary numbers, tabular-nums for alignment */}
      <td className="px-4 py-4 text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(sold).slice(1)}
      </td>

      <td className="px-4 py-4 text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(gross)}
      </td>

      {/* Net - The "Success" metric in Emerald */}
      <td className="px-4 py-4 text-sm font-bold text-emerald-400 text-right tabular-nums">
        {formatCompactNumber(net)}
      </td>

      <td className="px-4 py-4 text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(avg)}
      </td>

      {/* High - Highlighted in White */}
      <td className="px-4 py-4 font-medium text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(high)}
      </td>

      <td className="px-4 py-4 text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(low)}
      </td>
    </tr>
  );
}

export function KPIRow({ type, gross, net, avg, high, low, cancel }: { type: string; gross: number; net: number, avg: number; high: number; low: number; cancel: number }) {
  return (
    <tr className="group hover:bg-zinc-800/40 transition-all duration-200">
      <td className="px-4 py-4 text-sm font-medium text-zinc-100">{type}</td>
      <td className="px-4 py-4 text-sm text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(gross)}
      </td>
      <td className="px-4 py-4 text-sm font-semibold text-emerald-400 text-right tabular-nums">
        {formatCompactNumber(net)}
      </td>
      <td className="px-4 py-4 text-sm text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(avg)}
      </td>
      <td className="px-4 py-4 text-sm text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(high)}
      </td>
      <td className="px-4 py-4 text-sm text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(low)}
      </td>
      <td className="px-4 py-4 text-sm text-zinc-300 text-right tabular-nums">
        {formatCompactNumber(cancel)}
      </td>
    </tr>
  );
}

export function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <span className="flex items-center text-sm gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/95 border border-zinc-700 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm backdrop-blur-xl ring-1 ring-white/10">
        <p className="text-sm  text-white mb-3 border-b border-zinc-800 pb-2">
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
                  <span className="text-[11px]  text-zinc-400">{entry.name}</span>
                </div>
                <span className="text-xs  text-white">
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