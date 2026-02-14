// components/hq/corporate/CorporateTables.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CorporateTables() {
  return (
    <Tabs defaultValue="persona" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="persona" className="text-[10px] uppercase font-bold">Companies</TabsTrigger>
          <TabsTrigger value="team" className="text-[10px] uppercase font-bold">Team Engagement</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="persona">
        <div className="border border-zinc-800 bg-zinc-900/20">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold">
                <TableHead>Company Name</TableHead>
                <TableHead>Country/State</TableHead>
                <TableHead>Gross</TableHead>
                <TableHead>Net</TableHead>
                <TableHead>Repeat</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-zinc-300">
              <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
                <TableCell className="font-bold text-white">Apple Inc.</TableCell>
                <TableCell>USA / CA</TableCell>
                <TableCell>{parseFloat("1200000").toLocaleString("en-IN", { style: "currency", currency: "USD" })}</TableCell>
                <TableCell className="text-emerald-500">{parseFloat("980000").toLocaleString("en-IN", { style: "currency", currency: "USD" })}</TableCell>
                <TableCell>Yes (3x)</TableCell>
                <TableCell>admin@apple.com, +91 9174874775</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="team">
        <div className="border border-zinc-800 bg-zinc-900/20">
          <Table>
            <TableHeader className="bg-zinc-900/50">
              <TableRow className="border-zinc-800 text-[10px] uppercase text-zinc-500 font-bold">
                <TableHead>Name</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="text-right">Deal Size</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-zinc-300">
              <TableRow className="border-zinc-800 hover:bg-zinc-800/20">
                <TableCell className="font-bold text-white">John Doe</TableCell>
                <TableCell>Apple Inc.</TableCell>
                <TableCell className="text-right">{parseFloat("1200000").toLocaleString("en-IN", { style: "currency", currency: "USD" })}</TableCell>
                <TableCell className="text-right text-emerald-500">{parseFloat("980000").toLocaleString("en-IN", { style: "currency", currency: "USD" })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}