"use client";

import { Card, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, } from "recharts";
import { MetricItem } from "./corporate/LeadInsights";
import { InsightCard } from "./PerformanceDashboard";
import { countries } from "@/lib/countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

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
// Avg. Spending,
// Revenue,
// Growth Rate - Revenue,
// Growth Rate - Spending,
// Growth Rate - Traffic
const detailedAnalysisPerCountry= [
    {state: "Maharashtra", totalTravellers: 100, genderRatio: "50:40:10", ageBucket: "25-34", avgSpending: "1000", revenue: "50000", growthRateRevenue: "10%", growthRateSpending: "20%", growthRateTraffic: "15%", net: "50000", netPercentChange: "10%", avgSpendPercentChange: "20%"},
    {state: "Rajasthan", totalTravellers: 50, genderRatio: "60:30:10", ageBucket: "35-44", avgSpending: "800", revenue: "30000", growthRateRevenue: "5%", growthRateSpending: "15%", growthRateTraffic: "10%", net: "30000", netPercentChange: "5%", avgSpendPercentChange: "15%"},
    {state: "Kerala", totalTravellers: 75, genderRatio: "40:50:10", ageBucket: "18-24", avgSpending: "1200", revenue: "60000", growthRateRevenue: "15%", growthRateSpending: "25%", growthRateTraffic: "20%", net: "60000", netPercentChange: "15%", avgSpendPercentChange: "25%"},
    {state: "Tamil Nadu", totalTravellers: 200, genderRatio: "70:25:5", ageBucket: "45+", avgSpending: "1500", revenue: "75000", growthRateRevenue: "20%", growthRateSpending: "30%", growthRateTraffic: "25%", net: "75000", netPercentChange: "20%", avgSpendPercentChange: "30%"},
    {state: "Karnataka", totalTravellers: 150, genderRatio: "30:60:10", ageBucket: "25-34", avgSpending: "900", revenue: "45000", growthRateRevenue: "12%", growthRateSpending: "22%", growthRateTraffic: "17%", net: "45000", netPercentChange: "12%", avgSpendPercentChange: "22%"},
    {state: "Gujarat", totalTravellers: 80, genderRatio: "55:40:5", ageBucket: "35-44", avgSpending: "1100", revenue: "55000", growthRateRevenue: "8%", growthRateSpending: "18%", growthRateTraffic: "13%", net: "55000", netPercentChange: "8%", avgSpendPercentChange: "18%"},
    {state: "Punjab", totalTravellers: 120, genderRatio: "65:30:5", ageBucket: "18-24", avgSpending: "1300", revenue: "65000", growthRateRevenue: "18%", growthRateSpending: "28%", growthRateTraffic: "23%", net: "65000", netPercentChange: "18%", avgSpendPercentChange: "28%"},
    {state: "Andhra Pradesh", totalTravellers: 90, genderRatio: "75:20:5", ageBucket: "45+", avgSpending: "1400", revenue: "70000", growthRateRevenue: "10%", growthRateSpending: "20%", growthRateTraffic: "15%", net: "70000", netPercentChange: "10%", avgSpendPercentChange: "20%"},
    {state: "Telangana", totalTravellers: 60, genderRatio: "80:15:5", ageBucket: "25-34", avgSpending: "1200", revenue: "60000", growthRateRevenue: "12%", growthRateSpending: "22%", growthRateTraffic: "17%", net: "60000", netPercentChange: "12%", avgSpendPercentChange: "22%"},
]

const dummyData = [
  { name: 'Week 1', oldTrav: 45, newTrav: 120, revOld: 4500, revNew: 18000 },
  { name: 'Week 2', oldTrav: 52, newTrav: 110, revOld: 5200, revNew: 16500 },
  { name: 'Week 3', oldTrav: 48, newTrav: 140, revOld: 4800, revNew: 21000 },
  { name: 'Week 4', oldTrav: 61, newTrav: 165, revOld: 6100, revNew: 24750 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7"];

export default function TravellerDashboard() {
    return (
        <div className="space-y-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-500 text-white">

            <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
                <div className="flex justify-between">
                    <MetricItem label="Total Registered" value="24,500" sub="All Time" text />
                    <MetricItem label="Total Active" value="14,240" text />
                    <MetricItem label="Active Per Day" value="8,000" text />
                    <MetricItem label="Active 15th Day" value="6,000" text />
                    <MetricItem label="Active 30th Day" value="5,000" text />
                    <MetricItem label="Active 90th Day" value="4,000" text />
                    <MetricItem label="DAU / MAU Ratio" value="10" highlight text />
                </div>
            </Card>

            <div className="grid gap-8">
                <InsightCard title="Detailed Analysis" className="xl:col-span-2" showFilterTravellerDashboard>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-black text-zinc-500">Country:</p>
                        <Select defaultValue="All">
                            <SelectTrigger className="bg-zinc-900 border border-zinc-700 rounded-none p-2">
                                <SelectValue />
                                <ChevronsUpDown size={16} className="ml-1" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border border-zinc-700 rounded-none p-2">
                                <SelectItem value="All">All</SelectItem>
                                {countries.map(country => (
                                    <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Table>
                        <TableHeader className="border-zinc-800">
                            <TableRow className="text-sm font-black text-zinc-500 ">
                                <TableHead>State</TableHead>
                                <TableHead className="text-right">Travellers</TableHead>
                                <TableHead className="text-right">Gender M:F:T</TableHead>
                                <TableHead className="text-right">Age Bucket</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                                <TableHead className="text-right">Net</TableHead>
                                <TableHead className="text-right">Avg. Spending</TableHead>
                                {/* <TableHead className="text-right">Growth Rate - Revenue</TableHead> */}
                                {/* <TableHead className="text-right">Growth Rate - Spending</TableHead> */}
                                {/* <TableHead className="text-right">Traffic</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-sm">
                            {detailedAnalysisPerCountry.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.state}</TableCell>
                                    <TableCell className="text-right">{item.totalTravellers}
                                        (
                                            {parseFloat(item.growthRateTraffic.split('%')[0]) > 0 ? (
                                            <span className="text-emerald-500">
                                                +{item.growthRateRevenue}
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                -{Math.abs(parseFloat(item.growthRateTraffic.split('%')[0]))}%
                                            </span>
                                        )}
                                        )
                                    </TableCell>
                                    <TableCell className="text-right">{item.genderRatio}</TableCell>
                                    <TableCell className="text-right">{item.ageBucket}</TableCell>
                                    <TableCell className="text-right">
                                        {item.revenue}
                                        ({parseFloat(item.growthRateRevenue.split('%')[0]) > 0 ? (
                                            <span className="text-emerald-500">
                                                +{item.growthRateRevenue}
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                -{Math.abs(parseFloat(item.growthRateRevenue.split('%')[0]))}%
                                            </span>
                                        )})
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {parseFloat(item.net).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                        (
                                            {parseFloat(item.netPercentChange.split('%')[0]) > 0 ? (
                                                <span className="text-emerald-500">
                                                    +{item.netPercentChange}
                                                </span>
                                            ) : (
                                                <span className="text-red-500">
                                                    -{Math.abs(parseFloat(item.netPercentChange.split('%')[0]))}%
                                                </span>
                                            )}
                                        )
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {parseFloat(item.avgSpending).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
                                            (
                                            {parseFloat(item.avgSpendPercentChange.split('%')[0]) > 0 ? (
                                                <span className="text-emerald-500">
                                                    +{item.avgSpendPercentChange}
                                                </span>
                                            ) : (
                                                <span className="text-red-500">
                                                    -{Math.abs(parseFloat(item.avgSpendPercentChange.split('%')[0]))}%
                                                </span>
                                            )}
                                            )
                                        </TableCell>
                                    {/* <TableCell className="text-right">{item.growthRateRevenue} </TableCell> */}
                                    {/* <TableCell className="text-right">{item.growthRateSpending}</TableCell> */}
                                    {/* <TableCell className="text-right">
                                        {parseFloat(item.growthRateTraffic.split('%')[0]) > 0 ? (
                                            <span className="text-emerald-500">
                                                +{item.growthRateRevenue}
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                -{Math.abs(parseFloat(item.growthRateTraffic.split('%')[0]))}%
                                            </span>
                                        )}
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

            <TravellerAnalysisGraph />

            
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

const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`} />
    <span className="text-zinc-400">{label}</span>
  </div>
);

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
        
        <Tabs defaultValue="month" className="bg-zinc-950 border border-zinc-800 p-1 rounded-none">
          <TabsList className="bg-transparent h-7 gap-1">
            {["Week", "Month", "Year"].map(t => (
              <TabsTrigger 
                key={t} 
                value={t.toLowerCase()} 
                onClick={() => setRange(t.toLowerCase())}
                className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-[9px] font-black px-3 h-5 rounded-lg transition-all"
              >
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
          <LineChart data={dummyData} margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" stroke="#18181b" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="white"
              fontSize={10}
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