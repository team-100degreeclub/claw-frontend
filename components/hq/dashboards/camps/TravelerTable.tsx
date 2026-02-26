"use client";

import * as React from "react";
import { Traveler } from "./forms/TravelersInfoSection";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText, MoreVertical, Mail, Phone, MapPin, User2, ChevronRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface TravelerTableProps {
    travelers: Traveler[];
}

export function TravelerTable({ travelers }: TravelerTableProps) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [documentUrl, setDocumentUrl] = React.useState("");

    const handleViewDocument = (url: string) => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
        const origin = new URL(apiBaseUrl).origin;
        setDocumentUrl(`${origin}/${url}`);
        setIsDialogOpen(true);
    };

    return (
        <div className="rounded-xl bg-zinc-950 overflow-hidden">
            {/* <div className="overflow-hidden rounded-[24px] border    border-zinc-800 bg-zinc-950/50 shadow-2xl"> */}
  <Table className="w-full">
    <TableBody>
      {travelers.map((traveler) => (
        <TableRow 
          key={traveler.id} 
          className="group border-b border-zinc-900 last:border-0 hover:bg-zinc-800/40 transition-all duration-200"
        >
          <TableCell className="py-8 px-8">
            <div className="flex items-start justify-between">
              <div className="space-y-5">
                {/* Secondary Info: Ticket Number (text-sm) */}
                <div className="inline-flex items-center rounded-lg">
                  <span className="text-sm font-medium text-zinc-400">
                    Ticket Number: <span className="tabular-nums">{traveler.ticketNumber}</span>
                  </span>
                </div>

                {/* Primary Info: Name (text-base) */}
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    {traveler.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <User2 className="w-3.5 h-3.5 text-zinc-500" /> 
                      {traveler.age} yrs
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>{traveler.gender}</span>
                  </div>
                </div>

                {/* Contact & Location Grid (text-sm) */}
                <div className="flex flex-wrap items-center gap-y-3 gap-x-8">
                  <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Mail className="w-4 h-4 text-zinc-500" />
                    <span>{traveler.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Phone className="w-4 h-4 text-zinc-500" />
                    <span>{traveler.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-400">{traveler.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Menu: shadcn-style dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 p-2 bg-zinc-900 border-zinc-800 rounded-xl shadow-2xl text-zinc-100"
                >
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white transition-colors">
                    <span>Download Ticket</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 rounded-lg cursor-pointer data-[state=open]:bg-zinc-800 focus:bg-zinc-800 focus:text-white transition-colors">
                      <span>View Identification</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-56 p-2 bg-zinc-900 border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
                      {traveler.identificationDocuments.map((doc) => (
                        <DropdownMenuItem
                          key={doc.url}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white"
                          onSelect={() => handleViewDocument(doc.url)}
                        >
                          <span>{doc.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* </div> */}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl w-[90vw] h-[85vh] flex flex-col p-0 overflow-hidden border-zinc-800 bg-zinc-950 rounded-2xl shadow-2xl">
                    <DialogHeader className="p-6 border-b border-zinc-900 bg-zinc-950">
                        <DialogTitle className="text-xl font-bold text-white">Identification Document</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 bg-black">
                        {documentUrl && <iframe src={documentUrl} className="w-full h-full border-0" title="Document Viewer" />}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}