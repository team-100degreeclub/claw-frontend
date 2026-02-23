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

const travellerTrafficData = {
  week: [
    { name: 'Mon', newTravellers: 28, repeatTravellers: 12, growthRateNew: 5, growthRateRepeat: 2 },
    { name: 'Tue', newTravellers: 32, repeatTravellers: 15, growthRateNew: 14, growthRateRepeat: 25 },
    { name: 'Wed', newTravellers: 45, repeatTravellers: 20, growthRateNew: 40, growthRateRepeat: 33 },
    { name: 'Thu', newTravellers: 38, repeatTravellers: 18, growthRateNew: -15, growthRateRepeat: -10 },
    { name: 'Fri', newTravellers: 55, repeatTravellers: 25, growthRateNew: 44, growthRateRepeat: 38 },
    { name: 'Sat', newTravellers: 72, repeatTravellers: 40, growthRateNew: 30, growthRateRepeat: 60 },
    { name: 'Sun', newTravellers: 65, repeatTravellers: 35, growthRateNew: -9, growthRateRepeat: -12 },
  ],
  month: [
    { name: 'Mar 25', newTravellers: 120, repeatTravellers: 45, growthRateNew: 15, growthRateRepeat: 10 },
    { name: 'Apr 25', newTravellers: 110, repeatTravellers: 42, growthRateNew: -8, growthRateRepeat: -6 },
    { name: 'May 25', newTravellers: 130, repeatTravellers: 50, growthRateNew: 18, growthRateRepeat: 12 },
    { name: 'Jun 25', newTravellers: 140, repeatTravellers: 55, growthRateNew: 22, growthRateRepeat: 15 },
    { name: 'Jul 25', newTravellers: 150, repeatTravellers: 60, growthRateNew: 25, growthRateRepeat: 18 },
    { name: 'Aug 25', newTravellers: 160, repeatTravellers: 65, growthRateNew: 28, growthRateRepeat: 20 },
    { name: 'Sept 25', newTravellers: 170, repeatTravellers: 70, growthRateNew: 31, growthRateRepeat: 22 },
    { name: 'Oct 25', newTravellers: 180, repeatTravellers: 75, growthRateNew: 34, growthRateRepeat: 24 },
    { name: 'Nov 25', newTravellers: 190, repeatTravellers: 80, growthRateNew: 37, growthRateRepeat: 26 },
    { name: 'Dec 25', newTravellers: 200, repeatTravellers: 85, growthRateNew: 40, growthRateRepeat: 28 },
    { name: 'Jan 26', newTravellers: 210, repeatTravellers: 90, growthRateNew: 43, growthRateRepeat: 30 },
    { name: 'Feb 26', newTravellers: 220, repeatTravellers: 95, growthRateNew: 46, growthRateRepeat: 32 },
  ],
  quarter: [
    { name: 'Q1 25', newTravellers: 360, repeatTravellers: 137, growthRateNew: 12, growthRateRepeat: 8 },
    { name: 'Q2 25', newTravellers: 410, repeatTravellers: 165, growthRateNew: 13, growthRateRepeat: 20 },
    { name: 'Q3 25', newTravellers: 480, repeatTravellers: 195, growthRateNew: 17, growthRateRepeat: 18 },
    { name: 'Q4 25', newTravellers: 570, repeatTravellers: 240, growthRateNew: 18, growthRateRepeat: 23 },
    { name: 'Q1 26', newTravellers: 640, repeatTravellers: 280, growthRateNew: 12, growthRateRepeat: 16 },
  ],
  year: [
    { name: '2022', newTravellers: 1100, repeatTravellers: 400, growthRateNew: 0, growthRateRepeat: 0 },
    { name: '2023', newTravellers: 1450, repeatTravellers: 580, growthRateNew: 31, growthRateRepeat: 45 },
    { name: '2024', newTravellers: 1820, repeatTravellers: 720, growthRateNew: 25, growthRateRepeat: 24 },
    { name: '2025', newTravellers: 2150, repeatTravellers: 980, growthRateNew: 18, growthRateRepeat: 36 },
  ],
  lifetime: [
    { name: '2022', newTravellers: 1100, repeatTravellers: 400, growthRateNew: 0, growthRateRepeat: 0 },
    { name: '2023', newTravellers: 2550, repeatTravellers: 980, growthRateNew: 131, growthRateRepeat: 145 },
    { name: '2024', newTravellers: 4370, repeatTravellers: 1700, growthRateNew: 71, growthRateRepeat: 73 },
    { name: '2025', newTravellers: 6520, repeatTravellers: 2680, growthRateNew: 49, growthRateRepeat: 57 },
  ]
};

const revenueData = {
  week: [
    { name: 'Mon', total: 12000, corporate: 5000, spiritRoads: 3000, land: 1500, air: 1500, water: 1000 },
    { name: 'Tue', total: 11000, corporate: 4500, spiritRoads: 2500, land: 1200, air: 1800, water: 1000 },
    { name: 'Wed', total: 14500, corporate: 6000, spiritRoads: 3500, land: 2000, air: 2000, water: 1000 },
    { name: 'Thu', total: 13000, corporate: 5500, spiritRoads: 3000, land: 1800, air: 1700, water: 1000 },
    { name: 'Fri', total: 19000, corporate: 7000, spiritRoads: 5000, land: 3000, air: 2500, water: 1500 },
    { name: 'Sat', total: 24000, corporate: 8000, spiritRoads: 7000, land: 4000, air: 3000, water: 2000 },
    { name: 'Sun', total: 22000, corporate: 7500, spiritRoads: 6500, land: 3500, air: 2500, water: 2000 },
  ],
  month: [
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
  ],
  quarter: [
    { name: 'Q1 25', total: 305000, corporate: 120000, spiritRoads: 67000, land: 45000, air: 43000, water: 30000 },
    { name: 'Q2 25', total: 335000, corporate: 135000, spiritRoads: 71000, land: 54000, air: 45000, water: 30000 },
    { name: 'Q3 25', total: 365000, corporate: 146000, spiritRoads: 84000, land: 61000, air: 45000, water: 29000 },
    { name: 'Q4 25', total: 475000, corporate: 185000, spiritRoads: 118000, land: 79000, air: 61000, water: 32000 },
    { name: 'Q1 26', total: 580000, corporate: 225000, spiritRoads: 150000, land: 100000, air: 75000, water: 30000 }
  ],
  year: [
    { name: '2022', total: 850000, corporate: 350000, spiritRoads: 200000, land: 120000, air: 110000, water: 70000 },
    { name: '2023', total: 1100000, corporate: 450000, spiritRoads: 280000, land: 150000, air: 140000, water: 80000 },
    { name: '2024', total: 1450000, corporate: 580000, spiritRoads: 390000, land: 190000, air: 180000, water: 110000 },
    { name: '2025', total: 1800000, corporate: 720000, spiritRoads: 510000, land: 240000, air: 210000, water: 120000 },
  ],
  lifetime: [
    { name: '2022', total: 850000, corporate: 350000, spiritRoads: 200000, land: 120000, air: 110000, water: 70000 },
    { name: '2023', total: 1950000, corporate: 800000, spiritRoads: 480000, land: 270000, air: 250000, water: 150000 },
    { name: '2024', total: 3400000, corporate: 1380000, spiritRoads: 870000, land: 460000, air: 430000, water: 260000 },
    { name: '2025', total: 5200000, corporate: 2100000, spiritRoads: 1380000, land: 700000, air: 640000, water: 380000 },
  ]
};

const dealData = {
  week: {
    corporateNet: "₹1,12,000",
    campNet: "₹1,45,000",
    corporateRows: [
      ["Startup Hub / Pune", "Self", "₹62,000"],
      ["Innovate Ltd / Delhi", "Jane Smith", "₹50,000"],
    ],
    campRows: [
      ["Weekend Survival / Lonavala", "Spirit Roads", "Major Karan", "20 - 35", "₹8,000", "₹1,45,000"],
    ]
  },
  month: {
    corporateNet: "₹4,50,000",
    campNet: "₹6,00,000",
    corporateRows: [
      ["Tech Corp / London", "John Doe, Jane Smith", "₹2,00,000"],
      ["Global Inc / NY", "Jane Smith, John Doe", "₹2,50,000"],
    ],
    campRows: [
      ["Himalayan Endurance / India", "Spirit Roads", "Major Karan", "18 - 40", "₹20,000", "₹4,20,000"],
      ["Deep Dive / New York", "Adventure - Water", "Capt. Sameer S.", "18 - 40", "₹15,000", "₹1,80,000"],
    ]
  },
  quarter: {
    corporateNet: "₹14,20,000",
    campNet: "₹18,50,000",
    corporateRows: [
      ["Tech Corp / London", "Multiple", "₹6,40,000"],
      ["Global Inc / NY", "Jane Smith", "₹4,80,000"],
      ["Euro Finance / Paris", "John Doe", "₹3,00,000"],
    ],
    campRows: [
      ["Alpine Summit / Swiss", "Spirit Roads", "Major Karan", "25 - 50", "₹45,000", "₹9,50,000"],
      ["Desert Trail / Dubai", "CLAW - Land", "Capt. Sameer S.", "21 - 45", "₹30,000", "₹5,20,000"],
      ["Island Survival / Bali", "CLAW - Water", "Major Karan", "18 - 35", "₹25,000", "₹3,80,000"],
    ]
  },
  year: {
    corporateNet: "₹52,00,000",
    campNet: "₹74,00,000",
    corporateRows: [
      ["Tech Corp / London", "Global Team", "₹22,00,000"],
      ["Global Inc / NY", "Jane Smith", "₹18,50,000"],
      ["Asian Tech / Singapore", "John Doe", "₹11,50,000"],
    ],
    campRows: [
      ["Himalayan Series", "Spirit Roads", "Major Karan", "18 - 50", "Varies", "₹35,00,000"],
      ["Global Adventure Tour", "CLAW", "Capt. Sameer", "18 - 40", "Varies", "₹24,00,000"],
      ["Specialized Training", "Internal", "Major Karan", "25 - 45", "Varies", "₹15,00,000"],
    ]
  },
  lifetime: {
    corporateNet: "₹1,85,00,000",
    campNet: "₹2,40,00,000",
    corporateRows: [
      ["Top 5 Clients", "Global Collab", "₹1,20,00,000"],
      ["SME Sector", "Direct", "₹65,00,000"],
    ],
    campRows: [
      ["Spirit Roads Portfolio", "Legacy", "Major Karan", "All", "Varies", "₹1,60,00,000"],
      ["CLAW Portfolio", "New Age", "Capt. Sameer", "All", "Varies", "₹80,00,000"],
    ]
  }
};

export default function HostInsightsView({ teamView = false }: { teamView?: boolean }) {
  const { view } = useParams();
  const [isAvailable, setIsAvailable] = useState(true);
  const [dealFilter, setDealFilter] = useState("week")
  const [travellerTrafficFilter, setTravellerTrafficFilter] = useState("week")
  const [revenueFilter, setRevenueFilter] = useState("week")

  const currentDealData = dealData[dealFilter == "week" ? "week" : dealFilter == "month" ? "month" : dealFilter == "quarter" ? "quarter" : dealFilter == "year" ? "year" : "lifetime"];
  const currentTrafficData = travellerTrafficData[travellerTrafficFilter == "week" ? "week" : travellerTrafficFilter == "month" ? "month" : travellerTrafficFilter == "quarter" ? "quarter" : revenueFilter == "year" ? "year" : "lifetime"];
  const currentRevenueData = revenueData[revenueFilter == "week" ? "week" : revenueFilter == "month" ? "month" : revenueFilter == "quarter" ? "quarter" : revenueFilter == "year" ? "year" : "lifetime"];
  const host = HOST_DATA.find(h => h.id === view) || HOST_DATA[0];

  return (
    <div className="space-y-8 pb-20 text-white animate-in fade-in duration-500">

      {/* 1. HEADER & AVAILABILITY TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl font-black   tracking-tighter">
            Welcome {host.rank} {host.name.split(' ').slice(1).join(' ')}
          </h1>

          {/* <p className="text-xs text-zinc-500 font-bold mt-3">
            CLAW Collaboration ID: <span className="text-zinc-300">#SF-{host.id.split('-')[0].toUpperCase()}</span>
          </p>
          <p className="text-xs text-zinc-500 font-bold">
            On CLAW Global Since <span className="text-zinc-300">{host.joined.toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
          </p> */}
        </div>
        <div className="flex flex-col items-end align-end">
          <div className="flex items-center gap-4 p-3 rounded-md w-fit">
            <div className="text-right">
              {/* <p className="text-[10px]  font-black text-zinc-500">Current Status</p> */}
              <p className={"text-xs font-bold"}>
                Status: <span className={`text-xs font-bold ${isAvailable ? 'text-emerald-500' : 'text-amber-500'}`}>{isAvailable ? 'Available' : 'On a Holiday'}</span>
              </p>
            </div>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>


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
        <ProfileDetail label="Email" value={`${host.id}@claw.mission`} />
        <ProfileDetail label="Phone" value={`+91 ${host.phone}`} />
        <ProfileDetail label="Right Now At" value={host.location} />
        <ProfileDetail label="Collab ID" value={"SF-2323"} />
        <ProfileDetail label="On CLAW Since" value={"May 2023"} />
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-4"> */}

      <InsightCard title="Service Record">
        <div >
          {/* Section Header */}
          {/* <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black text-zinc-500 mb-2 tracking-widest">
            Service Record
          </h2>
          <div className="h-px flex-1 bg-zinc-900 ml-4" />
        </div> */}

          <div className="space-y-0 flex gap-5">
            {/* Entry 1 */}
            <div className="relative pl-8 pb-10 border-l border-zinc-800 group">
              {/* Timeline Node - White/Black contrast */}
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-zinc-950 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]" />

              <div className="flex flex-col gap-2 -mt-1">
                {/* Date Range as a primary anchor */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white bg-zinc-800 px-2 py-0.5 rounded-sm">
                    1999 — 2025
                  </span>
                  <div className="h-[1px] w-4 bg-zinc-800" />
                  <span className="text-xs font-black text-zinc-400">
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
                  <span className="text-xs text-white bg-zinc-800 px-2 py-0.5 rounded-sm">
                    1992 — 1999
                  </span>
                  <div className="h-[1px] w-4 bg-zinc-900" />
                  <span className="text-xs font-black text-zinc-400">
                    8 yrs
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-black text-white tracking-tight">
                    Lieutenant
                  </span>
                  <span className="text-xs font-bold text-zinc-500 tracking-wide">
                    9 Para SF
                    {/* <span className="text-zinc-800 mx-1">/</span> SPECIAL OPERATIONS */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InsightCard>

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
        <InsightCard
          title="Deal"
          className="xl:col-span-2"
          showFilter
          currentFilter={dealFilter}
          onFilterChange={(value) => setDealFilter(value)}
        >
          <div className="flex flex-col gap-2">
            <MetricBox
              label="Corporate Revenue(Net)"
              value={currentDealData.corporateNet}
            />
            <InsightTable
              title="Corporate Insights"
              headers={["Company / Location", "Collab", "Net"]}
              data={currentDealData.corporateRows}
            />
          </div>

          <div className="flex flex-col gap-2 mt-6"> {/* Added margin for separation */}
            <MetricBox
              label="Camp Revenue(Net)"
              value={currentDealData.campNet}
            />
            <InsightTable
              title="Camp Insights"
              headers={["Camp Name / Location", "Type", "Collab", "Target Audience", "Ticket Size", "Net"]}
              data={currentDealData.campRows}
            />
          </div>
        </InsightCard>
      }
      {/* <InsightCard title="Camp Audience" className="xl:col-span-2">
        <InsightTable
          title="Camp Audience"
          headers={["Age", "Gender Ratio", "Location"]}
          data={[
            ["25", "M:F:T:O 4:1:3:0", "Mumbai, India"],
            // ["35", "M:F:T:O 4:2:1:0", "Bangalore, India"],
          ]}
          classname="border-0"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricBox label="Age" value="25" />
          <MetricBox label="Gender Ratio" value="Male : Female : Transgender : Others" sub={"4 : 1 : 3 : 0"} classForValue="text-xl" />
          <MetricBox label="Location" value="Mumbai, India" />
        </div>
      </InsightCard> */}

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
      <InsightCard title="Traveller Traffic" className="xl:col-span-2" showFilter currentFilter={travellerTrafficFilter} onFilterChange={(value) => setTravellerTrafficFilter(value)}>
        <div className="self-end flex flex-wrap gap-4 text-[10px] font-black">
          <LegendItem color="bg-blue-500" label="New" />
          <LegendItem color="bg-green-500" label="Repeat" />
        </div>
        <div className="h-[300px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentTrafficData}
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
        <InsightCard title="Revenue Trend" className="xl:col-span-2" showFilter currentFilter={revenueFilter} onFilterChange={(value) => setRevenueFilter(value)}>
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
                data={currentRevenueData}
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
                <Tooltip content={<HDTooltip currencyCols={["corporate", "spiritRoads", "land", "air", "water"]} />} />

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

function MetricBox({ label, value, sub, highlight, classForValue }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-6 rounded-none">
      <p className="text-sm font-black text-zinc-500 tracking-widest">{label}</p>
      <h3 className={`text-3xl font-black mt-2 tracking-tighter ${highlight ? 'text-green-400' : 'text-white'} ${classForValue}`}>
        {value}
      </h3>
      {sub && <p className="text-xl font-black">{sub}</p>}
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
            {headers.map((h: string, i: number) => <TableHead key={h} className={`${i != 0 && "text-right"}`}>{h}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm text-zinc-300">
          {data.map((row: any[], index: number) => <TableRow key={`${row[0]}-${index}`}>
            {Array.isArray(row) ? row.map((cell: string, index: number) => <TableCell key={index} className={`text-sm ${headers[index] == "Net" && "text-green-500"} ${index != 0 && "text-right"} w-1/${row.length}`}>{cell}</TableCell>) : <TableCell key={0} className="text-sm">{row}</TableCell>}
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