"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Plus, FileText, Users2, Layers } from "lucide-react";
import { CreateCampDialog } from "./CreateCampDialog";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import campService from "@/lib/services/campService";
import { CampDBView, PartnerProfileResponse, CampFormValues } from "@/lib/types/api";
import { toast } from "sonner";
import { IncompleteProfileDialog } from "./IncompleteProfileDialog";
import { cn } from "@/lib/utils";
import { CampStatus } from "@/lib/types/api";

const dummyCamps: CampDBView[] = [
    {
        id: "camp1",
        camp_name: "Dummy Camp Alpha",
        partners: [
            {
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                profile_image_url: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe",
                bio: "Experienced adventurer.",
            },
        ],
        status: CampStatus.APPROVED,
        traveller_data_url: "https://example.com/data/camp1.csv",
    },
    {
        id: "camp2",
        camp_name: "Beta Expedition",
        partners: [
            {
                first_name: "Jane",
                last_name: "Smith",
                email: "jane.smith@example.com",
                profile_image_url: "https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith",
                bio: "Nature enthusiast.",
            },
            {
                first_name: "Peter",
                last_name: "Jones",
                email: "peter.jones@example.com",
                profile_image_url: "https://api.dicebear.com/7.x/initials/svg?seed=Peter%20Jones",
                bio: "Mountain guide.",
            },
        ],
        status: CampStatus.PENDING_REVIEW,
        traveller_data_url: "https://example.com/data/camp2.csv",
    },
    {
        id: "camp3",
        camp_name: "Cancelled Trek",
        partners: [],
        status: CampStatus.CANCELLED,
        traveller_data_url: "https://example.com/data/camp3.csv",
    },
];

interface CampTableProps {
    profile: PartnerProfileResponse | null;
}

export function CampTable({ profile }: CampTableProps) {
    const [isCreateCampOpen, setCreateCampOpen] = React.useState(false);
    const [selectedCamp, setSelectedCamp] = React.useState<Partial<CampFormValues> | undefined>(undefined);
    const [camps, setCamps] = useState<CampDBView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfileIncomplete, setProfileIncomplete] = useState(false);

    const isProfileComplete = (profile: PartnerProfileResponse | null): boolean => {
        // if (!profile) return false;
        // return !!(profile.first_name && profile.last_name && profile.email && profile.gender && profile.contact_number && profile.country_code && profile.bio);
        return true;
    };

    const handleCreateCampClick = () => {
        if (isProfileComplete(profile)) {
            setSelectedCamp(undefined);
            setCreateCampOpen(true);
        } else {
            setProfileIncomplete(true);
        }
    };

    const handleRowClick = async (camp: CampDBView) => {
        setCreateCampOpen(true);
        return;
        try {
            const campData = await campService.getCampDbById(camp.id);
            setSelectedCamp(campData);
            setCreateCampOpen(true);
        } catch (error) {
            toast.error("Failed to fetch camp details.");
        }
    };

    const fetchCamps = async () => {
        setCamps(dummyCamps);
        setIsLoading(false);
        return;
        try {
            const campsData = await campService.getCampsForDashboard();
            setCamps(campsData);
        } catch (err) {
            toast.error("Failed to fetch camps.");
            setCamps([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCamps();
    }, []);

    async function handleDownloadTravellerData(id: string) {
        try {
            toast.info("Preparing data download...");
            const response = await campService.getCampTravellerDataPDF(id);
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `traveller_data_${id}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error("Failed to download traveller data.");
        }
    }

    if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-black min-h-screen">
            <div className="w-6 h-6 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Fetching Data</p>
        </div>
    );
}

return (
    <div className="space-y-6 bg-black p-4 min-h-screen text-zinc-100">
        <header className="flex flex-row justify-between items-end px-2">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">Camps</h2>
                {/* <p className="text-xs text-zinc-500 font-medium">Manage and monitor your active and historical camps.</p> */}
            </div>
            <Button
                onClick={handleCreateCampClick}
                className="bg-zinc-100 hover:bg-zinc-200 text-black rounded-lg h-10 px-6 font-bold text-xs tracking-widest transition-all"
            >
                Create Camp
            </Button>
        </header>

        <Card className="bg-zinc-950 border-zinc-900 shadow-xl rounded-xl overflow-hidden">
            <CardContent className="p-0">
                {camps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Layers className="w-10 h-10 text-zinc-800 mb-4" />
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">No Records Found</h3>
                        <p className="text-xs text-zinc-600 mt-1">Your created camps will appear here.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-zinc-900/50">
                            <TableRow className="hover:bg-transparent border-zinc-900">
                                <TableHead className="text-[14px] font-bold text-zinc-400 py-4 pl-8 text-left uppercase tracking-tight w-[350px]">
                                    Camp Name
                                </TableHead>

                                <TableHead className="text-[14px] font-bold text-zinc-400 py-4 text-left uppercase tracking-tight w-[250px]">
                                    Partners
                                </TableHead>

                                <TableHead className="text-[14px] font-bold text-zinc-400 py-4 text-left uppercase tracking-tight">
                                    Status
                                </TableHead>

                                <TableHead className="text-[14px] font-bold text-zinc-400 py-4 text-right pr-10 uppercase tracking-tight w-[100px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {camps.map((camp) => (
                                <TableRow
                                    key={camp.id}
                                    onClick={() => handleRowClick(camp)}
                                    className="group cursor-pointer border-zinc-900 hover:bg-zinc-900/40 transition-colors"
                                >
                                    {/* Camp Name */}
                                    <TableCell className="py-5 pl-8 text-left">
                                        <span className="font-bold text-white transition-colors">
                                            {camp.camp_name}
                                        </span>
                                    </TableCell>

                                    {/* Partners */}
                                    <TableCell className="py-5 text-left">
                                        <div className="flex justify-start -space-x-2 overflow-hidden">
                                            {camp.partners.length === 0 ? (
                                                <span className="text-xs text-zinc-700">—</span>
                                            ) : (
                                                camp.partners.map((partner, i) => (
                                                    <HoverCard key={i} openDelay={100}>
                                                        <HoverCardTrigger asChild>
                                                            <Avatar className="h-8 w-8 border-2 border-zinc-950 ring-1 ring-zinc-800 cursor-pointer">
                                                                <AvatarImage src={partner.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${partner.first_name}%20${partner.last_name}`} />
                                                                <AvatarFallback className="text-[10px] bg-zinc-800 text-zinc-300 font-bold">
                                                                    {partner.first_name?.[0]}{partner.last_name?.[0]}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent align="start" className="w-64 p-4 rounded-xl border-zinc-800 bg-zinc-950 shadow-2xl text-zinc-100">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-10 w-10">
                                                                    <AvatarImage src={partner.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${partner.first_name}%20${partner.last_name}`} />
                                                                    <AvatarFallback className="bg-zinc-800 text-zinc-300">{partner.first_name?.[0]}{partner.last_name?.[0]}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <h4 className="text-sm font-bold text-white">{partner.first_name} {partner.last_name}</h4>
                                                                    <p className="text-[11px] text-zinc-500 truncate">{partner.email}</p>
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                ))
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="py-5 text-left">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-zinc-200 ">
                                            #{camp.status.split("_")[0]}
                                        </span>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="py-5 pr-8 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDownloadTravellerData(camp.id); }}
                                            className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg text-xs font-bold transition-all"
                                        >
                                            <Download className="h-3.5 w-3.5 mr-2" />
                                            Download Traveller Data
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>

            <CreateCampDialog isOpen={isCreateCampOpen} onClose={() => { setCreateCampOpen(false); fetchCamps(); }} initialData={selectedCamp} />
        </Card>
        <IncompleteProfileDialog isOpen={isProfileIncomplete} onClose={() => setProfileIncomplete(false)} />
    </div>
);
}