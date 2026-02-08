"use client";

import * as React from "react";
import { ArrowLeft, Camera, Upload, Shield, LogOut, Phone, Mail, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import PolicySheet from "@/components/PolicySheet";
import SupportSheet from "@/components/SupportSheet";
import { useRouter } from "next/navigation";
import { CountryCodePicker } from "@/components/CountryCodePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { authService } from "@/lib/api/services/auth";
import { profileService } from "@/lib/api/services/profile";
import { TravellerProfileResponse } from "@/lib/api/models/auth";
import { toast } from "sonner";
import { TravellerProfileUpdate } from "@/lib/api/models/profile";
import { DocumentType } from "@/lib/api/models/profile";
import { Gender } from "@/lib/api/models/enums";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const profileFormSchema = z.object({
    first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    country_code: z.string().nonempty({ message: "Country code is required." }),
    contact_number: z.string().min(10, { message: "Contact number must be at least 10 digits." }),
    date_of_birth: z.date().optional(),
    gender: z.nativeEnum(Gender).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    profile_image: z.instanceof(File).optional(),
    aadhaarFile: z.instanceof(File).optional(),
    passportFile: z.instanceof(File).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
    const router = useRouter();
    const avatarInputRef = React.useRef<HTMLInputElement>(null);
    const [userProfile, setUserProfile] = React.useState<TravellerProfileResponse | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [documentTypes, setDocumentTypes] = React.useState<DocumentType[]>([]);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            country_code: "+91",
            contact_number: "",
            date_of_birth: undefined,
            city: "",
            state: "",
            country: "",
        },
        mode: "onChange",
    });

    const fetchData = React.useCallback(async () => {
        try {
            setIsLoading(true);
            // Dummy Data for userProfile
            const dummyProfile: TravellerProfileResponse = {
                id: "123",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                country_code: "+91",
                contact_number: "9876543210",
                date_of_birth: "1990-01-15",
                gender: Gender.MALE,
                city: "Mumbai",
                state: "Maharashtra",
                country: "India",
                profile_image_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf267abe?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                documents: [
                    { id: "doc1", document_name: "Aadhaar", document_url: "someurl.pdf", document_type_id: "aadhaar-type-id" }
                ],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                payments: [],
                refunds: [],
                support_tickets: []
            };
            setUserProfile(dummyProfile);
            form.reset({
                first_name: dummyProfile.first_name || "",
                last_name: dummyProfile.last_name || "",
                country_code: dummyProfile.country_code || "+91",
                contact_number: dummyProfile.contact_number || "",
                date_of_birth: dummyProfile.date_of_birth ? new Date(dummyProfile.date_of_birth) : undefined,
                gender: dummyProfile.gender || undefined,
                city: dummyProfile.city || "",
                state: dummyProfile.state || "",
                country: dummyProfile.country || "",
            });
            // Dummy data for document types
            const dummyDocumentTypes: DocumentType[] = [
                // { id: "aadhaar-type-id", document_name: "Aadhaar Card" },
                { id: "123", document_type_code: "passport-type-id", document_name: "Passport" },
            ];
            setDocumentTypes(dummyDocumentTypes);
        } catch (err) {
            toast.error("Could not load profile data.");
        } finally {
            setIsLoading(false);
        }
    }, [form]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [isPolicySheetOpen, setPolicySheetOpen] = React.useState(false);
    const [isSupportSheetOpen, setSupportSheetOpen] = React.useState(false);

    const navItems = [
        { icon: <Shield className="w-4 h-4" />, label: "Privacy Policy", onClick: () => setPolicySheetOpen(true) },
        { icon: <Mail className="w-4 h-4" />, label: "Help & Support", onClick: () => setSupportSheetOpen(true) },
    ];

    async function onSubmit(data: ProfileFormValues) {
        const profile_data: TravellerProfileUpdate = {
            first_name: data.first_name,
            last_name: data.last_name,
            country_code: data.country_code,
            contact_number: data.contact_number,
            date_of_birth: data.date_of_birth ? format(data.date_of_birth, "yyyy-MM-dd") : undefined,
            gender: data.gender,
            city: data.city,
            state: data.state,
            country: data.country,
        };

        const document_files: File[] = [];
        const document_type_ids: string[] = [];

        if (data.aadhaarFile) {
            const aadhaarDocType = documentTypes.find(dt => dt.document_name.toLowerCase().includes("aadhaar"));
            if (aadhaarDocType) {
                document_files.push(data.aadhaarFile);
                document_type_ids.push(aadhaarDocType.id);
            }
        }
        if (data.passportFile) {
            const passportDocType = documentTypes.find(dt => dt.document_name.toLowerCase().includes("passport"));
            if (passportDocType) {
                document_files.push(data.passportFile);
                document_type_ids.push(passportDocType.id);
            }
        }

        toast.promise(
            profileService.updateTravellerProfile({
                profile_data,
                profile_image: data.profile_image,
                document_files,
                document_type_ids,
            }),
            {
                loading: "Saving changes...",
                success: "Profile updated!",
                error: "Update failed.",
            }
        );
    }

    const handleLogout = () => {
        authService.logout();
        toast.success("Signed out successfully.");
        router.push("/");
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-black text-zinc-100">
            <main className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
                
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
                    
                    {/* Left: Summary Section */}
                    <aside className="lg:sticky lg:top-10 space-y-6 bg-zinc-700/30 p-4 rounded-lg">
                        {/* <Card className="p-8 border-zinc-800 bg-zinc-900/50 rounded-2xl"> */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                                    <Avatar className="h-32 w-32 border-4 border-zinc-800 shadow-xl">
                                        <AvatarImage src={userProfile?.profile_image_url || ""} />
                                        <AvatarFallback className="bg-zinc-800 text-white text-2xl font-bold">
                                            {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <h2 className="mt-6 text-2xl font-bold">
                                    {userProfile?.first_name} {userProfile?.last_name}
                                </h2>
                                <p className="text-sm text-zinc-500 mt-1">{userProfile?.email}</p>
                            </div>

                            <nav className="mt-10 space-y-1">
                                {navItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={item.onClick}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                                <Separator className="my-4 bg-zinc-800" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </nav>
                        {/* </Card> */}
                    </aside>

                    {/* Right: Detailed Form */}
                    <div className="space-y-8">
                        <header className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-zinc-800 lg:hidden">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold">Profile</h1>
                                <p className="text-zinc-500 mt-1">Update your personal details.</p>
                            </div>
                        </header>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="profile_image"
                                    render={({ field }) => (
                                        <Input 
                                            type="file" 
                                            ref={avatarInputRef} 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    )}
                                />

                                {/* <Card className="p-8 border-zinc-800 bg-zinc-900/50 rounded-2xl space-y-10"> */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                        <FormField
                                            control={form.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold text-zinc-400">First Name</FormLabel>
                                                    <FormControl><Input className="auth-input-dark" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold text-zinc-400">Last Name</FormLabel>
                                                    <FormControl><Input className="auth-input-dark" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-zinc-400">Email</FormLabel>
                                            <div className="flex items-center gap-3 text-sm font-medium bg-zinc-950 p-4 rounded-xl text-zinc-400 border border-zinc-800">
                                                <Mail className="w-4 h-4 opacity-40" /> {userProfile?.email}
                                            </div>
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-zinc-400">Phone Number</FormLabel>
                                            <div className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="country_code"
                                                    render={({ field }) => <CountryCodePicker className="h-12 bg-zinc-950 border-zinc-800 text-white w-24" {...field} />}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="contact_number"
                                                    render={({ field }) => (
                                                        <FormControl className="flex-1">
                                                            <Input {...field} className="auth-input-dark h-12" />
                                                        </FormControl>
                                                    )}
                                                />
                                            </div>
                                        </FormItem>
                                        <FormField
                                            control={form.control}
                                            name="date_of_birth"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Birth Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "auth-input-dark pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800 text-white" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold text-zinc-400">Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="auth-input-dark">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                                                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                                            <SelectItem value={Gender.OTHERS}>Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator className="bg-zinc-800" />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { name: "city", label: "City" },
                                            { name: "state", label: "State" },
                                            { name: "country", label: "Country" }
                                        ].map((loc) => (
                                            <FormField key={loc.name} control={form.control} name={loc.name as any} render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold text-zinc-400">{loc.label}</FormLabel>
                                                    <FormControl><Input className="auth-input-dark" {...field} /></FormControl>
                                                </FormItem>
                                            )} />
                                        ))}
                                    </div>
                                {/* </Card> */}

                                {/* <Card className="p-8 border-zinc-800 bg-zinc-900/50 rounded-2xl space-y-6"> */}
                                    <h3 className="text-sm tracking-widest">ID Verification</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { name: "aadhaarFile", label: "National ID", profileKey: 'aadhaar' },
                                            { name: "passportFile", label: "Passport", profileKey: 'passport' }
                                        ].map((doc) => (
                                            <FormField
                                                key={doc.name}
                                                control={form.control}
                                                name={doc.name as "aadhaarFile" | "passportFile"}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div 
                                                                onClick={() => document.getElementById(doc.name)?.click()}
                                                                className="group relative border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center hover:bg-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer"
                                                            >
                                                                <Upload className="mx-auto h-10 w-10 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                                                <p className="mt-4 text-sm font-bold text-white">{field.value?.name ?? doc.label}</p>
                                                                <p className="text-[10px] text-zinc-500 font-bold  mt-2">PDF, PNG, JPG (5MB Max)</p>
                                                                
                                                                {userProfile?.documents.find(d => d.document_name.toLowerCase().includes(doc.profileKey)) && (
                                                                    <div className="mt-4 pt-4 border-t border-zinc-800">
                                                                        <span className="text-[10px] font-black text-blue-400  tracking-widest">View Uploaded Document</span>
                                                                    </div>
                                                                )}
                                                                <Input type="file" id={doc.name} className="hidden" accept="application/pdf,image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                {/* </Card> */}

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" className="px-10 h-14 text-black bg-zinc-300 hover:bg-zinc-300/90 hover:cursor-pointer rounded-lg transition-all shadow-xl shadow-white/5">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>

            <PolicySheet isOpen={isPolicySheetOpen} onClose={() => setPolicySheetOpen(false)} />
            <SupportSheet isOpen={isSupportSheetOpen} onClose={() => setSupportSheetOpen(false)} userProfile={userProfile} />
        </div>
    );
}

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("border border-zinc-800 bg-zinc-900/50 rounded-2xl overflow-hidden", className)}>
        {children}
    </div>
);