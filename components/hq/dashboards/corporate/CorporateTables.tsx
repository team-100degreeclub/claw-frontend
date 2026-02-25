// components/hq/corporate/CorporateTables.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCompactNumber } from "../PerformanceDashboard";

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

  return (
    <Tabs defaultValue="persona" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl shadow-lg backdrop-blur-xl">

          <TabsTrigger
            value="persona"
            className="
        relative px-8 h-10 rounded-xl text-base font-medium
        text-zinc-400
        transition-all duration-300 ease-out
        hover:text-white hover:bg-zinc-800/60
        data-[state=active]:bg-white
        data-[state=active]:text-zinc-900
        data-[state=active]:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/40
      "
          >
            Companies
            <span className="ml-2 opacity-70">
              ({CORPORATE_DATA.companies.length})
            </span>
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="
        relative px-8 h-10 rounded-xl text-base font-medium
        text-zinc-400
        transition-all duration-300 ease-out
        hover:text-white hover:bg-zinc-800/60
        data-[state=active]:bg-white
        data-[state=active]:text-zinc-900
        data-[state=active]:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/40
      "
          >
            Team
            <span className="ml-2 opacity-70">
              ({CORPORATE_DATA.teamEngagements.length})
            </span>
          </TabsTrigger>

        </TabsList>
      </div>

      <TabsContent value="persona" className="outline-none">
        <div className="border border-zinc-800 bg-zinc-950/50 rounded-2xl overflow-hidden shadow-2xl">
          <Table className="w-full">
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                {/* Main column on the far left */}
                <TableHead className="py-5 text-base font-semibold text-white pl-8">
                  Company Name
                </TableHead>
                {/* These columns are pushed to the far right with smaller widths */}
                <TableHead className="py-5 text-base font-semibold text-white text-right w-[100px]">
                  Repeat
                </TableHead>
                <TableHead className="py-5 text-base font-semibold text-white text-right w-[140px]">
                  Gross
                </TableHead>
                <TableHead className="py-5 text-base font-semibold text-white text-right w-[140px] pr-8">
                  Net
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CORPORATE_DATA.companies.map((company) => (
                <TableRow key={company.id} className="border-zinc-800 hover:bg-zinc-800/40 transition-colors group">
                  <TableCell className="py-5 text-base font-medium text-zinc-300 pl-8 group-hover:text-white">
                    {company.name}
                  </TableCell>
                  <TableCell className="py-5 text-base text-right text-zinc-300 tabular-nums">
                    <span className="px-3 py-1 rounded-md">
                      {company.repeat}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 text-base text-right text-zinc-300 tabular-nums">
                    {formatCompactNumber(company.gross)}
                  </TableCell>
                  <TableCell className="py-5 text-base font-bold text-right text-emerald-400 pr-8 tabular-nums">
                    {formatCompactNumber(company.net)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="team" className="outline-none">
        <div className="border border-zinc-800 bg-zinc-950/50 rounded-2xl overflow-hidden shadow-2xl">
          <Table className="w-full">
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="py-5 text-base font-semibold text-white pl-8">
                  Team Member
                </TableHead>
                <TableHead className="py-5 text-base font-semibold text-white text-right w-[140px]">
                  Gross
                </TableHead>
                <TableHead className="py-5 text-base font-semibold text-white text-right w-[140px] pr-8">
                  Net
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CORPORATE_DATA.teamEngagements.map((engagement) => (
                <TableRow key={engagement.id} className="border-zinc-800 hover:bg-zinc-800/40 transition-colors group">
                  <TableCell className="py-5 text-base font-medium text-zinc-300 pl-8 group-hover:text-white">
                    {engagement.memberName}
                  </TableCell>
                  <TableCell className="py-5 text-base text-right text-zinc-300 tabular-nums">
                    {formatCompactNumber(engagement.gross)}
                  </TableCell>
                  <TableCell className="py-5 text-base font-bold text-right text-emerald-400 pr-8 tabular-nums">
                    {formatCompactNumber(engagement.net)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}