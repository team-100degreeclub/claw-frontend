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
import { CheckCircle2, MapPin, Mail, Phone, FileText } from "lucide-react";
import { MediaUploadCard } from "@/components/features/confirm-slot/MediaUploadCard";
import { CountryCodePicker } from "@/components/CountryCodePicker";
import { useParams, useRouter } from "next/navigation";
import { registrationService } from "@/lib/api/services/registrations";
import { PendingTravellerDetails, TravellerUpdateSchema } from "@/lib/api/models/registrations";
import { Gender } from "@/lib/api/models/enums";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

export default function ConfirmSlotForm() {
    const params = useParams();
    const router = useRouter();
    const token = params.uuid as string;

    const DUMMY_PENDING_TRAVELERS: PendingTravellerDetails[] = [
        {
            id: "1",
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            gender: Gender.MALE,
            is_existing_user: false,
            missing_documents: [
                { id: "doc1", name: "Passport" },
                { id: "doc2", name: "Visa" },
            ],
            // registration_status: "PENDING",
            // registration_date: "2024-01-01T12:00:00Z"
        },
        {
            id: "2",
            first_name: "Jane",
            last_name: "Smith",
            email: "jane.smith@example.com",
            gender: Gender.FEMALE,
            is_existing_user: true,
            missing_documents: [],
            // registration_status: "PENDING",
            // registration_date: "2024-01-01T12:00:00Z"
        }
    ];

    const [pendingTravelers, setPendingTravelers] = useState<PendingTravellerDetails[]>(DUMMY_PENDING_TRAVELERS);
    const [selectedTravelerId, setSelectedTravelerId] = useState<string | null>(DUMMY_PENDING_TRAVELERS[0].id);
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
    const [isLoading, setIsLoading] = useState(false); // Set to false for demo purposes
    const [error, setError] = useState<string | null>(null);

    // Hardcoded data for demo purposes
    

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
        //             setError("failed to get your details.");
        //             console.error(err);
        //         } finally {
        //             setIsLoading(false);
        //         }
        //     };
        //     fetchPendingTravelers();
        // }
    }, [token, router]);

    const selectedTraveler = useMemo(() => pendingTravelers.find(t => t.id === selectedTravelerId), [selectedTravelerId, pendingTravelers]);

    useEffect(() => {
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
            setError("failed to save your details. please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                <p className="text-sm font-medium text-zinc-400">loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="text-center space-y-6">
                    <p className="text-sm font-medium text-red-500">{error}</p>
                    <Button variant="outline" onClick={() => window.location.reload()} className="border-zinc-800 text-zinc-100 hover:bg-zinc-900">try again</Button>
                </div>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="inline-flex bg-emerald-500/10 p-6 rounded-full">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold text-white tracking-tighter">slot confirmed</h1>
                        <p className="text-zinc-400 text-sm">thanks, {selectedTraveler?.first_name}. your booking is now ready.</p>
                    </div>
                    <div className="pt-6">
                        <Button onClick={() => router.push('/')} className="w-full bg-white text-black font-bold h-12 rounded-xl">go home</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-black px-6">
            <div className="max-w-2xl mx-auto w-full">
                <header className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tighter">Complete Your Profile</h1>
                    <p className="text-zinc-500 text-base leading-relaxed">Please add your info and documents to keep your spot. We need these to make sure you can join the camp. If things are missing, your ticket might be canceled without a refund.</p>
                </header>

                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* select traveler */}
                            <div className="space-y-4">
                                <Label className="text-xs font-bold text-zinc-500 ml-1">Find Your Name</Label>
                                <Select onValueChange={setSelectedTravelerId} required>
                                    <SelectTrigger className="h-14 border-zinc-800 bg-zinc-950 text-white rounded-xl focus:ring-zinc-700">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        {pendingTravelers.map((traveler) => (
                                            <SelectItem key={traveler.id} value={traveler.id} className="text-sm">
                                                {traveler.first_name} {traveler.last_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedTraveler && (
                                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="border-t border-zinc-800 pt-10 space-y-10">

                                        {!selectedTraveler.is_existing_user && (
                                            <div className="space-y-10">
                                                {/* personal info */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-zinc-500 ml-1">Date of Birth</Label>
                                                        <DatePicker value={dob} onChange={setDob} />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-zinc-500 ml-1">Gender</Label>
                                                        <Select defaultValue={selectedTraveler?.gender || ""} onValueChange={(value) => setGender(value as Gender)} required>
                                                            <SelectTrigger className="h-12 border-zinc-800 bg-zinc-950 rounded-xl text-white">
                                                                <SelectValue placeholder="Choose" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                                <SelectItem value={Gender.MALE}>Male</SelectItem>
                                                                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                                                <SelectItem value={Gender.TRANSGENDER}>Transgender</SelectItem>
                                                                <SelectItem value={Gender.OTHERS}>Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                {/* contact info */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-zinc-500 ml-1">Email</Label>
                                                        <div className="relative group">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                                                            <Input
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                                className="h-12 pl-12 border-zinc-800 bg-zinc-950 rounded-xl text-white"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-zinc-500 ml-1">Phone</Label>
                                                        <div className="flex group">
                                                            <CountryCodePicker
                                                                value={countryCode}
                                                                onChange={setCountryCode}
                                                                className="rounded-l-xl rounded-r-none border-zinc-800 border-r-0 h-12 w-fit bg-zinc-950 text-white"
                                                            />
                                                            <div className="relative flex-1">
                                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                                                                <Input
                                                                    value={phone}
                                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                                                                    placeholder="number"
                                                                    required
                                                                    className="rounded-l-none rounded-r-xl h-12 pl-12 border-zinc-800 bg-zinc-950 text-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* location info */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-zinc-600" />
                                                        <Label className="text-xs font-bold text-zinc-500">Where Are You Coming From?</Label>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-bold text-zinc-600 ml-1">City</Label>
                                                            <Input value={city} onChange={(e) => setCity(e.target.value)} required className="h-11 border-zinc-800 bg-black text-white rounded-lg" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-bold text-zinc-600 ml-1">State</Label>
                                                            <Input value={state} onChange={(e) => setState(e.target.value)} required className="h-11 border-zinc-800 bg-black text-white rounded-lg" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] font-bold text-zinc-600 ml-1">Country</Label>
                                                            <Input value={country} onChange={(e) => setCountry(e.target.value)} required className="h-11 border-zinc-800 bg-black text-white rounded-lg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* document uploads */}
                                        {selectedTraveler && selectedTraveler.missing_documents.length > 0 && (
                                            <div className="space-y-8 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-zinc-600" />
                                                    <Label className="text-xs font-bold text-zinc-500">ID Photos</Label>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    {selectedTraveler.missing_documents.map((doc) => (
                                                        <MediaUploadCard
                                                            key={doc.id}
                                                            title={doc.name.toLowerCase()}
                                                            onFileUpload={(file) => handleDocumentUpload(doc.id, file)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* submit button */}
                                        <div className="pt-10">
                                            <Button
                                                type="submit"
                                                className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
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