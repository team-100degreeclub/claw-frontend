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
import { formatCompactNumber } from "../PerformanceDashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        partners: [{ first_name: "John", last_name: "Doe", email: "john@ex.com", profile_image_url: "https://github.com/shadcn.png" }],
        slots: 20,
        ticket_price: 20000,
        tickets_sold: 15,
        status: "Approved",
        gross: 300000,
        net: 240000,
    },
    {
        id: "camp2",
        camp_name: "River Rush",
        location: "Rishikesh, IN",
        category: "Water",
        partners: [{ first_name: "Jane", last_name: "Smith", email: "jane@ex.com", profile_image_url: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }, { first_name: "John", last_name: "Doe", email: "john@ex.com", profile_image_url: "https://github.com/shadcn.png" }],
        slots: 15,
        ticket_price: 30100,
        tickets_sold: 10,
        status: "Pending",
        gross: 301000,
        net: 250000,
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
            <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8">
                {/* Title Section */}
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Camps</h2>
                </div>

                {/* Controls Section */}
                <div className="flex flex-wrap items-end gap-4">
                    {/* Timeline Filter */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-500 pl-1">Timeline</label>
                        <Select defaultValue="all" onValueChange={(value) => setDateFilter(value)}>
                            <SelectTrigger className="w-44 h-[42px] bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl focus:ring-zinc-700 transition-all">
                                <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl shadow-2xl">
                                <SelectItem value="all">Lifetime</SelectItem>
                                <SelectItem value="2024-01">This Month</SelectItem>
                                <SelectItem value="2023-12">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-500 pl-1">Status</label>
                        <Select defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
                            <SelectTrigger className="w-44 h-[42px] bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl focus:ring-zinc-700 transition-all">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl shadow-2xl">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Approved">Live</SelectItem>
                                <SelectItem value="Pending">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action Button */}
                    <Button
                        onClick={handleCreateCampClick}
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-[42px] px-6 font-semibold text-sm transition-all shadow-lg shadow-blue-900/20"
                    >
                        Create Camp
                    </Button>
                </div>
            </header>


            <div className="bg-transparent border-0 overflow-hidden">
                {/* <CardContent className="p-0"> */}
                {camps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Layers className="w-10 h-10 text-zinc-800 mb-4" />
                        <h3 className="text-sm font-bold text-white tracking-widest">No Camps Found</h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="overflow-hidden rounded-[24px] border border-zinc-800 bg-zinc-950/50 shadow-2xl">
                            <Table className="w-full border-collapse">
                                <TableHeader className="bg-zinc-900/50">
                                    <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                                        <TableHead className="py-5 pl-8 text-base font-semibold text-white">Camp Name</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white">Location</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white">Category</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white">Collaboration</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white text-right">Slots</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white text-right">Price</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white text-right">Sold</TableHead>
                                        <TableHead className="py-5 text-base font-semibold text-white text-center">Approval</TableHead>
                                        <TableHead className="py-5 pr-8 text-base font-semibold text-white text-center">Tickets</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredCamps.map((camp) => (
                                        <TableRow
                                            key={camp.id}
                                            className="group border-b border-zinc-900 hover:bg-zinc-800/40 hover:cursor-pointer transition-all duration-200"
                                            onClick={handleCreateCampClick}
                                        >
                                            {/* Camp Name */}
                                            <TableCell className="py-5 pl-8 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                                                {camp.camp_name}
                                            </TableCell>

                                            {/* Location & Category */}
                                            <TableCell className="py-5 text-sm font-medium text-zinc-300">{camp.location}</TableCell>
                                            <TableCell className="py-5 text-sm font-medium text-zinc-300">{camp.category}</TableCell>

                                            {/* Collaboration (Partners) */}
                                            <TableCell className="py-5">
                                                <div className="flex -space-x-2">
                                                    {camp.partners.map((partner, i) => (
                                                        <HoverCard key={i}>
                                                            <HoverCardTrigger asChild>
                                                                <Avatar className="h-8 w-8 border-2 border-zinc-950 transition-transform group-hover:scale-110">
                                                                    <AvatarImage src={partner.profile_image_url} />
                                                                    <AvatarFallback className="text-[10px] bg-zinc-800 text-white font-semibold">
                                                                        {partner.first_name?.[0]}{partner.last_name?.[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent className="bg-zinc-900 border-zinc-800 text-zinc-300 rounded-xl">
                                                                <p className="text-sm font-medium">{partner.first_name} {partner.last_name}</p>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    ))}
                                                </div>
                                            </TableCell>

                                            {/* Numerical Data */}
                                            <TableCell className="py-5 text-sm text-right tabular-nums text-zinc-300">{camp.slots}</TableCell>
                                            <TableCell className="py-5 text-sm text-right tabular-nums text-zinc-300">{formatCompactNumber(camp.ticket_price)}</TableCell>
                                            <TableCell className="py-5 text-sm text-right tabular-nums text-zinc-300">{formatCompactNumber(camp.tickets_sold).slice(1)}</TableCell>

                                            {/* Approval Status Badge */}
                                            <TableCell className="py-5 text-center">
                                                #{camp.status.toLocaleLowerCase()}
                                                {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold border transition-colors ${camp.status === 'Approved'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                            camp.status === 'Rejected'
                                                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        }`}>
                                                        {camp.status}
                                                    </span> */}
                                            </TableCell>

                                            {/* Download Data Action */}
                                            <TableCell className="py-5 pr-8 text-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent row click
                                                        handleDownloadTravellerData(camp.id);
                                                    }}
                                                    className="h-10 w-10 text-white bg-zinc-600 hover:bg-white rounded-full transition-all"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
                {/* </CardContent> */}
            </div>

            <CreateCampDialog isOpen={isCreateCampOpen} onClose={() => { setCreateCampOpen(false); fetchCamps(); }} initialData={selectedCamp} />
            <IncompleteProfileDialog isOpen={isProfileIncomplete} onClose={() => setProfileIncomplete(false)} />
        </div>
    );
}