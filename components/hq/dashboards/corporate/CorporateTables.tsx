// components/hq/corporate/CorporateTables.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// data/corporate-data.ts
export const CORPORATE_DATA = {
  companies: [
    {
      id: "c1",
      name: "Apple Inc. / USA",
      location: "USA / CA",
      gross: 1200000,
      net: 980000,
      repeat: "Yes (3x)",
    },
    {
      id: "c2",
      name: "Microsoft",
      location: "USA / WA",
      gross: 2450000,
      net: 2100000,
      repeat: "Yes (5x)",
    },
    {
      id: "c3",
      name: "Google",
      location: "USA / CA",
      gross: 850000,
      net: 720000,
      repeat: "No",
    },
    {
      id: "c4",
      name: "Amazon",
      location: "USA / WA",
      gross: 3200000,
      net: 2850000,
      repeat: "Yes (2x)",
    }
  ],
  teamEngagements: [
    {
      id: "t1",
      memberName: "Major Ankit / Apple Inc. USA",
      company: "Apple Inc.",
      gross: 1200000,
      net: 980000,
    },
    {
      id: "t2",
      memberName: "Sarah Chen",
      company: "Microsoft",
      gross: 1450000,
      net: 1250000,
    },
    {
      id: "t3",
      memberName: "Michael Ross",
      company: "Amazon",
      gross: 1800000,
      net: 1600000,
    },
    {
      id: "t4",
      memberName: "Elena Rodriguez",
      company: "Google",
      gross: 850000,
      net: 720000,
    }
  ]
};

export function CorporateTables() {
  const formatCurrency = (val: number) => 
    val.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

  return (
    <Tabs defaultValue="persona" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <TabsList className="bg-zinc-900 border border-zinc-800 p-1 h-11 rounded-lg">
          <TabsTrigger 
            value="persona" 
            className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:border-none transition-all px-6"
          >
            Companies {`(${CORPORATE_DATA.companies.length})`}
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:border-none transition-all px-6"
          >
            Team {`(${CORPORATE_DATA.teamEngagements.length})`}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="persona" className="outline-none">
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-zinc-900/80 ">
              <TableRow className="border-zinc-800 text-sm  text-zinc-500 tracking-widest hover:bg-transparent">
                <TableHead className="py-4 w-1/3 pl-6">Company Name</TableHead>
                {/* <TableHead>Country/State</TableHead> */}
                <TableHead className="text-right w-2/3">Repeat</TableHead>
                <TableHead className="text-right w-1/3">Gross</TableHead>
                <TableHead className="text-right w-1/3 pr-6">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {CORPORATE_DATA.companies.map((company) => (
                <TableRow key={company.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="text-white py-5 pl-6">{company.name}</TableCell>
                  {/* <TableCell className="text-zinc-400">{company.location}</TableCell> */}
                  <TableCell className="text-right">
                    <span className="text-zinc-300 px-3 py-1 rounded-full tracking-tighter">
                      {company.repeat}
                    </span>
                  </TableCell>
                  <TableCell className="text-right  text-zinc-300 w-1/3">{formatCurrency(company.gross)}</TableCell>
                  <TableCell className="text-right text-emerald-400 font-black pr-6">{formatCurrency(company.net)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="team" className="outline-none">
        <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-zinc-900/80">
              <TableRow className="border-zinc-800 text-sm  text-zinc-500 font-black tracking-widest hover:bg-transparent">
                <TableHead className="py-4 w-1/2">Team</TableHead>
                {/* <TableHead>Company</TableHead> */}
                <TableHead className="text-right w-1/2">Gross</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {CORPORATE_DATA.teamEngagements.map((engagement) => (
                <TableRow key={engagement.id} className="border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="py-5">{engagement.memberName}</TableCell>
                  {/* <TableCell>{engagement.company}</TableCell> */}
                  <TableCell className="text-right">{formatCurrency(engagement.gross)}</TableCell>
                  <TableCell className="text-right text-emerald-400 font-black ">{formatCurrency(engagement.net)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}