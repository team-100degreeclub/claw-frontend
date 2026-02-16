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
        <div className="rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden">
            <Table>
                <TableBody>
                    {travelers.map((traveler) => (
                        <TableRow key={traveler.id} className="group hover:bg-zinc-900/50 transition-colors border-zinc-900">
                            <TableCell className="py-6 px-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-4">
                                        {/* Ticket Identification */}
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-xs font-semibold text-zinc-500">
                                                Ticket Number: {traveler.ticketNumber}
                                            </span>
                                        </div>

                                        {/* Primary Info */}
                                        <div>
                                            <h3 className="text-lg font-bold text-white tracking-tight">
                                                {traveler.name}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                                <span className="flex items-center gap-1"><User2 className="w-3 h-3" /> {traveler.age} Yrs</span>
                                                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                                <span>{traveler.gender}</span>
                                            </div>
                                        </div>

                                        {/* Contact & Location Grid */}
                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                <Mail className="w-3.5 h-3.5 text-zinc-600" />
                                                <span>{traveler.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                <Phone className="w-3.5 h-3.5 text-zinc-600" />
                                                <span>{traveler.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                                                <span>{traveler.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-white hover:bg-zinc-800 rounded-full">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 p-2 bg-zinc-900 border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
                                            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-800 focus:bg-zinc-800 focus:text-white">
                                                <span>Download Ticket</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium text-zinc-300 rounded-lg cursor-pointer data-[state=open]:bg-zinc-800 focus:bg-zinc-800 focus:text-white">
                                                    <div className="flex items-center gap-3">
                                                        <span>View Identification</span>
                                                    </div>
                                                    {/* <ChevronRight className="h-4 w-4" /> */}
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