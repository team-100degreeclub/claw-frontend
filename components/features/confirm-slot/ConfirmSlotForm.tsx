"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ShieldCheck, MapPin, User, Mail, Phone, Calendar as CalendarIcon, FileText, AlertCircle } from "lucide-react";
import { MediaUploadCard } from "./MediaUploadCard";
import { CountryCodePicker } from "@/components/CountryCodePicker";
import { useParams, useRouter } from "next/navigation";
import { registrationService } from "@/lib/api/services/registrations";
import { PendingTravellerDetails, TravellerUpdateSchema } from "@/lib/api/models/registrations";
import { Gender } from "@/lib/api/models/enums";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

const DUMMY_PENDING_TRAVELLERS: PendingTravellerDetails[] = [
    {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        is_existing_user: false,
        missing_documents: [
            { id: "aadhaar", name: "Aadhaar Card" },
            { id: "passport", name: "Passport" }
        ],
        gender: Gender.MALE,
    },
    {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        is_existing_user: true,
        missing_documents: [],
        gender: Gender.FEMALE,
    }
];

export function ConfirmSlotForm() {
    const params = useParams();
    const router = useRouter();
    const token = params.uuid as string;

    const [pendingTravelers, setPendingTravelers] = useState<PendingTravellerDetails[]>([]);
    const [selectedTravelerId, setSelectedTravelerId] = useState<string | null>(null);
    const [dob, setDob] = useState<Date | undefined>(undefined);
    const [gender, setGender] = useState<Gender | "">("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [documentFiles, setDocumentFiles] = useState<Record<string, File | null>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // if (token) {
        //     const fetchPendingTravelers = async () => {
        //         try {
        //             setIsLoading(true);
        //             const data = await registrationService.getPendingTravellers(token);
        //             if (data.length === 0) {
        //                 router.push('/');
        //                 return;
        //             }
        //             setPendingTravelers(data);
        //         } catch (err) {
        //             setError("Failed to fetch traveler details.");
        //             console.error(err);
        //         } finally {
        //             setIsLoading(false);
        //         }
        //     };
        //     fetchPendingTravelers();
        // }

        // Dummy data for demo purposes
        setPendingTravelers(DUMMY_PENDING_TRAVELLERS);
        setIsLoading(false);
    }, [token, router]);

    const selectedTraveler = useMemo(() => pendingTravelers.find(t => t.id === selectedTravelerId), [selectedTravelerId, pendingTravelers]);

    React.useEffect(() => {
        if (selectedTraveler) {
            setEmail(selectedTraveler.email);
            setGender(selectedTraveler.gender || "");
            setDob(undefined);
        }
    }, [selectedTraveler]);

    const handleDocumentUpload = (docId: string, file: File | null) => {
        setDocumentFiles(prev => ({ ...prev, [docId]: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTraveler) return;

        let travellerUpdateData: TravellerUpdateSchema;

        if (selectedTraveler.is_existing_user) {
            travellerUpdateData = {
                first_name: selectedTraveler.first_name,
                last_name: selectedTraveler.last_name,
                email: selectedTraveler.email,
            }
        } else {
            travellerUpdateData = {
                first_name: selectedTraveler.first_name,
                last_name: selectedTraveler.last_name,
                email: email,
                gender: gender || undefined,
                country_code: countryCode,
                contact_number: phone,
                date_of_birth: dob ? dob.toISOString().split('T')[0] : undefined,
                city: city,
                state: state,
                country: country,
            };
        }

        const filesToUpload: File[] = [];
        const docTypeIds: string[] = [];

        for (const docId in documentFiles) {
            if (documentFiles[docId]) {
                filesToUpload.push(documentFiles[docId] as File);
                docTypeIds.push(docId);
            }
        }

        try {
            // await registrationService.confirmSlot(token, {
            //     traveller_details: travellerUpdateData,
            //     document_files: filesToUpload,
            //     document_type_ids: docTypeIds,
            // });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Failed to confirm slot:", error);
            setError("Failed to confirm slot. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin" />
                <p className="text-sm font-medium text-zinc-400">Securing your session...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="max-w-sm w-full text-center space-y-6">
                    <div className="inline-flex bg-rose-500/10 p-4 rounded-full">
                        <AlertCircle className="w-8 h-8 text-rose-500" />
                    </div>
                    <p className="text-sm font-medium text-zinc-300 leading-relaxed">{error}</p>
                    <Button 
                        variant="outline" 
                        onClick={() => window.location.reload()} 
                        className="w-full border-zinc-800 text-white hover:bg-zinc-900 rounded-xl h-12"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="inline-flex bg-emerald-500/10 p-8 rounded-[32px] border border-emerald-500/20">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Slot Confirmed</h1>
                        <p className="text-zinc-400 text-base leading-relaxed">
                            Thank you, {selectedTraveler?.first_name}. Your camp booking is officially confirmed
                        </p>
                    </div>
                    <Button 
                        onClick={() => router.push('/')} 
                        className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-14 rounded-2xl text-sm transition-all shadow-xl shadow-white/5"
                    >
                        Go to Homepage
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Complete Your Profile</h1>
                    <p className="text-zinc-400 font-medium text-sm max-w-xl mx-auto leading-relaxed">
                        Please complete the documentation to confirm your slot for the camp. If any documents are missing, we will cancel your tickets. Sadly, no refund will be issued. Thanks.
                    </p>
                </header>

                <div className="bg-zinc-950 rounded-[32px] border border-zinc-800 shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Traveler Selection */}
                            <div className="space-y-3 flex items-center justify-center">
                                {/* <Label className="text-sm text-zinc-400">Identify Traveler</Label> */}
                                <Select onValueChange={setSelectedTravelerId} required>
                                    <SelectTrigger className="h-14 border-zinc-800 bg-zinc-900 text-white text-base rounded-2xl focus:ring-zinc-700 transition-all min-w-[30%]">
                                        <SelectValue placeholder="Search your name" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                        {pendingTravelers.map((traveler) => (
                                            <SelectItem key={traveler.id} value={traveler.id} className="text-sm font-medium py-3 cursor-pointer">
                                                {traveler.first_name} {traveler.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedTraveler && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="border-t border-zinc-900 pt-10 space-y-10">

                                        {!selectedTraveler.is_existing_user && (
                                            <div className="space-y-10">
                                                {/* Personal Info Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <Label className="text-sm text-zinc-400">Date of Birth</Label>
                                                        <DatePicker value={dob} onChange={setDob} className="h-12 bg-zinc-900 border-zinc-800 rounded-xl" />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-sm text-zinc-400">Gender</Label>
                                                        <Select key={selectedTraveler?.id} defaultValue={selectedTraveler?.gender || ""} onValueChange={(value) => setGender(value as Gender)} required>
                                                            <SelectTrigger className="h-12 bg-zinc-900 border-zinc-800 rounded-xl text-sm text-white w-full mb-0">
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                                                <SelectItem value={Gender.MALE}>Male</SelectItem>
                                                                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                                                <SelectItem value={Gender.TRANSGENDER}>Transgender</SelectItem>
                                                                <SelectItem value={Gender.OTHERS}>Others</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                {/* Contact Details Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <Label className="text-sm text-zinc-400">Email Address</Label>
                                                        <div className="relative group">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                                                            <Input
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                                className="h-12 pl-12 bg-zinc-900 border-zinc-800 rounded-xl text-sm text-white focus:ring-zinc-700"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-sm text-zinc-400">Phone Contact</Label>
                                                        <div className="flex group">
                                                            <CountryCodePicker
                                                                value={countryCode}
                                                                onChange={setCountryCode}
                                                                className="rounded-l-xl rounded-r-none border-zinc-800 border-r-0 h-12 bg-zinc-900 text-sm text-white"
                                                            />
                                                            <div className="relative flex-1">
                                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                                                                <Input
                                                                    value={phone}
                                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                                                                    placeholder="Number"
                                                                    required
                                                                    className="rounded-l-none rounded-r-xl h-12 pl-12 bg-zinc-900 border-zinc-800 text-sm text-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Origin Details */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 pl-1">
                                                        <MapPin className="w-4 h-4 text-zinc-500" />
                                                        <Label className="text-sm text-zinc-400">Origin</Label>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                                                        <div className="space-y-2">
                                                            <Label className="text-sm text-zinc-400">City</Label>
                                                            <Input value={city} onChange={(e) => setCity(e.target.value)} required className="h-11 bg-zinc-950 border-zinc-800 rounded-lg text-sm text-white" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-sm text-zinc-400">State</Label>
                                                            <Input value={state} onChange={(e) => setState(e.target.value)} required className="h-11 bg-zinc-950 border-zinc-800 rounded-lg text-sm text-white" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-sm text-zinc-400">Country</Label>
                                                            <Input value={country} onChange={(e) => setCountry(e.target.value)} required className="h-11 bg-zinc-950 border-zinc-800 rounded-lg text-sm text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Verification Uploads */}
                                        {selectedTraveler && selectedTraveler.missing_documents.length > 0 && (
                                            <div className="space-y-6 pt-4">
                                                <div className="flex items-center gap-2 pl-1">
                                                    <FileText className="w-4 h-4 text-zinc-500" />
                                                    <Label className="text-sm text-zinc-400">Identity Documents</Label>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    {selectedTraveler.missing_documents.map((doc) => (
                                                        <MediaUploadCard
                                                            key={doc.id}
                                                            title={doc.name}
                                                            onFileUpload={(file) => handleDocumentUpload(doc.id, file)}
                                                            // className="bg-zinc-900 border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Action */}
                                        <div className="pt-8">
                                            <Button
                                                type="submit"
                                                className="w-full h-14 bg-zinc-700/80 text-white hover:bg-zinc-700 font-bold rounded-lg text-base transition-all active:scale-[0.98]"
                                            >
                                                Confirm Slot
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}