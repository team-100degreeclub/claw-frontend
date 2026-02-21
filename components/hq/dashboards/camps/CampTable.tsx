"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Layers } from "lucide-react";
import { CreateCampDialog } from "./CreateCampDialog";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import campService from "@/lib/services/campService";
import { PartnerProfileResponse, CampFormValues } from "@/lib/types/api";
import { toast } from "sonner";
import { IncompleteProfileDialog } from "./IncompleteProfileDialog";

// Updated type to reflect new columns
interface ExtendedCampView {
    id: string;
    camp_name: string;
    location: string;
    category: "Roads" | "Land" | "Air" | "Water";
    partners: any[];
    slots: number;
    ticket_price: number;
    tickets_sold: number;
    status: "Approved" | "Pending" | "Rejected";
    gross: number;
    net: number;
}

const dummyCamps: ExtendedCampView[] = [
    {
        id: "camp1",
        camp_name: "Summit Peaks",
        location: "Himalayas, IN",
        category: "Land",
        partners: [{ first_name: "John", last_name: "Doe", email: "john@ex.com" }],
        slots: 20,
        ticket_price: 500,
        tickets_sold: 15,
        status: "Approved",
        gross: 7500,
        net: 6000,
    },
    {
        id: "camp2",
        camp_name: "River Rush",
        location: "Rishikesh, IN",
        category: "Water",
        partners: [{ first_name: "Jane", last_name: "Smith", email: "jane@ex.com" }],
        slots: 15,
        ticket_price: 300,
        tickets_sold: 10,
        status: "Pending",
        gross: 3000,
        net: 2400,
    }
];

interface CampTableProps {
    profile: PartnerProfileResponse | null;
}

export function CampTable({ profile }: CampTableProps) {
    const [isCreateCampOpen, setCreateCampOpen] = React.useState(false);
    const [selectedCamp, setSelectedCamp] = React.useState<Partial<CampFormValues> | undefined>(undefined);
    const [camps, setCamps] = useState<ExtendedCampView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileIncomplete, setProfileIncomplete] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [dateFilter, setDateFilter] = useState<string>("all");

    const filteredCamps = camps.filter((camp) => {
        const matchesStatus = statusFilter === "all" || camp.status.toLowerCase() === statusFilter.toLowerCase();

        const matchesDate = dateFilter === "all" || true;

        return matchesStatus && matchesDate;
    });

    const isProfileComplete = (profile: PartnerProfileResponse | null): boolean => true;

    const handleCreateCampClick = () => {
        if (isProfileComplete(profile)) {
            setSelectedCamp(undefined);
            setCreateCampOpen(true);
        } else {
            setProfileIncomplete(true);
        }
    };

    const fetchCamps = async () => {
        setCamps(dummyCamps);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCamps();
    }, []);

    async function handleDownloadTravellerData(id: string) {
        toast.info("Downloading traveller data...");
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-black min-h-screen text-white">
                <div className="w-6 h-6 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                <p className="text-xs font-bold  tracking-widest">Fetching Data</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 bg-black p-6 min-h-screen">
            <header className="flex flex-row justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Camps</h2>
                </div>
                <div className="flex flex-row align-center justify-center items-center gap-2">
                    <div className="flex flex-wrap gap-4 mb-6">
                        {/* Month/Year Filter */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white pl-1 mb-1">Timeline</label>
                            <select
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-white transition-all w-40"
                            >
                                <option value="all">Lifetime</option>
                                <option value="2024-01">This Month</option>
                                <option value="2023-12">This Year</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white pl-1 mb-1">Status</label>
                            <select
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-white transition-all w-40"
                            >
                                <option value="all">All</option>
                                <option value="Approved">Live</option>
                                <option value="Pending">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <Button
                        onClick={handleCreateCampClick}
                        className="bg-blue-800 hover:bg-blue-800/80 text-white rounded-lg h-10 px-6 font-bold text-xs tracking-widest transition-all"
                    >
                        Create Camp
                    </Button>
                </div>
            </header>


            <Card className="bg-zinc-950 border-zinc-900 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    {camps.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <Layers className="w-10 h-10 text-zinc-800 mb-4" />
                            <h3 className="text-sm font-bold text-white  tracking-widest">No Records Found</h3>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-zinc-900/50">
                                    <TableRow className="hover:bg-transparent border-zinc-900">
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 pl-6 ">Camp Name</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Location</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Category</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Collaboration</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Slots</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Price</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Sold</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4 ">Approval</TableHead>
                                        <TableHead className="text-[13px] w-1/9 text-white py-4  text-center">Data</TableHead>
                                        {/* <TableHead className="text-[13px] w-1/11 text-white py-4 ">Gross</TableHead>
                                        <TableHead className="text-[13px] w-1/11 text-white py-4 pr-6 ">Net</TableHead> */}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredCamps.map((camp) => (
                                        <TableRow
                                            key={camp.id}
                                            className="group border-zinc-900 hover:bg-zinc-900/40 hover:cursor-pointer transition-colors"
                                            onClick={handleCreateCampClick}
                                        >
                                            <TableCell className="py-5 pl-6 text-white">{camp.camp_name}</TableCell>
                                            <TableCell className="text-white text-sm">{camp.location}</TableCell>
                                            <TableCell className="text-white text-sm">{camp.category}</TableCell>

                                            {/* Collaboration (Partners) */}
                                            <TableCell>
                                                <div className="flex -space-x-2">
                                                    {camp.partners.map((partner, i) => (
                                                        <HoverCard key={i}>
                                                            <HoverCardTrigger asChild>
                                                                <Avatar className="h-7 w-7 border-2 border-zinc-950">
                                                                    <AvatarFallback className="text-[10px] bg-zinc-800 text-white font-bold">
                                                                        {partner.first_name?.[0]}{partner.last_name?.[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="bg-zinc-950 border-zinc-800 text-white">
                                                                <p className="text-xs font-bold">{partner.first_name} {partner.last_name}</p>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    ))}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-white text-sm">{camp.slots}</TableCell>
                                            <TableCell className="text-white text-sm">${camp.ticket_price}</TableCell>
                                            <TableCell className="text-white text-sm">{camp.tickets_sold}</TableCell>

                                            {/* Approval */}
                                            <TableCell>
                                                <span className={`text-[11px] font-bold px-2 py-1 rounded ${camp.status === 'Approved' ? 'text-white' :
                                                    camp.status === 'Rejected' ? 'text-white' : 'border-amber-500 text-white'
                                                    }`}>
                                                    {camp.status}
                                                </span>
                                            </TableCell>

                                            {/* Download Data */}
                                            <TableCell className="text-left">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDownloadTravellerData(camp.id)}
                                                    className="h-8 w-8 text-white hover:bg-zinc-800"
                                                >
                                                    Download Tickets
                                                </Button>
                                            </TableCell>

                                            {/* <TableCell className="text-white text-sm">₹{camp.gross.toLocaleString("en-IN", { currency: "INR" })}</TableCell>
                                            <TableCell className="text-white text-sm pr-6">₹{camp.net.toLocaleString("en-IN", { currency: "INR" })}</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <CreateCampDialog isOpen={isCreateCampOpen} onClose={() => { setCreateCampOpen(false); fetchCamps(); }} initialData={selectedCamp} />
            <IncompleteProfileDialog isOpen={isProfileIncomplete} onClose={() => setProfileIncomplete(false)} />
        </div>
    );
}