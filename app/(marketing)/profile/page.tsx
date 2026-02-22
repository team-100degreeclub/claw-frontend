"use client";

import * as React from "react";
import { ArrowLeft, Camera, Upload, CreditCard, Shield, Receipt, LifeBuoy, LogOut, Phone, User, MapPin, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
// import PaymentsSheet from "./PaymentsSheet";
// import PolicySheet from "./PolicySheet";
// import RefundSheet from "./RefundSheet";
// import SupportSheet from "./SupportSheet";
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

import PolicySheet from "@/components/profile/PolicySheet";
import SupportSheet from "@/components/SupportSheet";

const profileFormSchema = z.object({
    first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    country_code: z.string().nonempty({ message: "Country code is required." }),
    contact_number: z.string().min(10, { message: "Contact number must be at least 10 digits." }),
    date_of_birth: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, { message: "Use YYYY-MM-DD format." }),
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
    const [error, setError] = React.useState<string | null>(null);
    const [documentTypes, setDocumentTypes] = React.useState<DocumentType[]>([]);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            country_code: "+91",
            contact_number: "",
            date_of_birth: "",
            city: "",
            state: "",
            country: "",
        },
        mode: "onChange",
    });

    const fetchData = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const profile = await authService.getTravellerProfile();
            setUserProfile(profile);
            form.reset({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                country_code: profile.country_code || "+91",
                contact_number: profile.contact_number || "",
                date_of_birth: profile.date_of_birth || "",
                gender: profile.gender || undefined,
                city: profile.city || "",
                state: profile.state || "",
                country: profile.country || "",
            });

            const types = await profileService.getDocumentTypes();
            setDocumentTypes(types);
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setIsLoading(false);
        }
    }, [form]);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [isPaymentsSheetOpen, setPaymentsSheetOpen] = React.useState(false);
    const [isPolicySheetOpen, setPolicySheetOpen] = React.useState(false);
    const [isRefundSheetOpen, setRefundSheetOpen] = React.useState(false);
    const [isSupportSheetOpen, setSupportSheetOpen] = React.useState(false);

    const navItems = [
        // { icon: <CreditCard className="w-4 h-4" />, label: "Payments", onClick: () => setPaymentsSheetOpen(true) },
        { icon: <Shield className="w-4 h-4" />, label: "Policy", onClick: () => setPolicySheetOpen(true) },
        // { icon: <Receipt className="w-4 h-4" />, label: "Refunds", onClick: () => setRefundSheetOpen(true) },
        { icon: <LifeBuoy className="w-4 h-4" />, label: "Support", onClick: () => setSupportSheetOpen(true) },
    ];

    async function onSubmit(data: ProfileFormValues) {
        const profile_data: TravellerProfileUpdate = {
            first_name: data.first_name,
            last_name: data.last_name,
            country_code: data.country_code,
            contact_number: data.contact_number,
            date_of_birth: data.date_of_birth,
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
                loading: "Updating profile...",
                success: "Profile updated successfully!",
                error: "Failed to update profile.",
            }
        );
    }

    const handleLogout = () => {
        toast.promise(authService.logout(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: "Failed to log out.",
        });
        router.push("/");
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#172941] font-medium">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-zinc-300 selection:bg-white/30">
            <main className="max-w-7xl mx-auto px-6 py-8 lg:py-16">

                {/* Desktop Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">

                    {/* Left Column: Profile Summary & Nav */}
                    <aside className="lg:sticky lg:top-8 space-y-6">
                        <Card className="p-8 border-zinc-900 bg-zinc-950 rounded-none shadow-2xl">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                                    <Avatar className="h-32 w-32 rounded-none">
                                        <AvatarImage src={userProfile?.profile_image_url || "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=360"} />
                                        <AvatarFallback className="bg-zinc-900 text-zinc-500 text-xl font-bold">
                                            {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <h2 className="mt-6 text-xl font-bold text-white">
                                    {userProfile?.first_name} {userProfile?.last_name}
                                </h2>
                                <p className="text-xs text-zinc-500 font-medium mt-1">{userProfile?.email}</p>
                            </div>

                            <div className="mt-10 space-y-1">
                                {navItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={item.onClick}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold  transition-all hover:bg-zinc-900 text-zinc-500 hover:text-white hover:cursor-pointer"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                                <Separator className="my-4 bg-zinc-900" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-900 hover:text-red-500 transition-all hover:cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </Card>
                    </aside>

                    {/* Right Column: Form Section */}
                    <div className="space-y-8">
                        <header className="flex items-center gap-4 pb-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-zinc-900 lg:hidden rounded-none">
                                <ArrowLeft className="h-5 w-5 text-white" />
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold text-white ">Profile</h1>
                            </div>
                        </header>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                {/* Hidden Avatar Input */}
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

                                {/* Basic Info Section */}
                                <Card className="p-10 border-zinc-900 bg-zinc-950 rounded-none space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                        <FormField
                                            control={form.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-zinc-500 ">First Name</FormLabel>
                                                    <FormControl><Input className="bg-black border-zinc-800 focus:border-white rounded-sm text-zinc-300" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-zinc-500 ">Last Name</FormLabel>
                                                    <FormControl><Input className="bg-black border-zinc-800 focus:border-white rounded-sm text-zinc-300" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold text-zinc-500 ">Email Address</FormLabel>
                                            <div className="flex items-center gap-3 text-[11px] font-bold bg-zinc-900/50 border border-zinc-900 p-3 text-zinc-400 rounded-sm">
                                                <Mail className="w-3 h-3 text-white" /> {userProfile?.email}
                                            </div>
                                        </FormItem>
                                        <FormItem className="space-y-1">
                                            <FormLabel className="text-xs font-bold text-zinc-500 ">Phone Number</FormLabel>
                                            <div className="flex group">
                                                <FormField
                                                    control={form.control}
                                                    name="country_code"
                                                    render={({ field }) => <CountryCodePicker className="rounded-l-sm rounded-r-[0px] border-zinc-800 border-r-0 h-10 w-fit bg-black text-xs text-zinc-300" {...field} />}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="contact_number"
                                                    render={({ field }) => (
                                                        <FormControl>
                                                            <div className="relative flex-1">
                                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-600" />
                                                                <Input {...field} className="rounded-r-sm rounded-l-[0px] h-10 pl-10 border-zinc-800 bg-black text-xs text-zinc-300 w-full" />
                                                            </div>
                                                        </FormControl>
                                                    )}
                                                />
                                            </div>
                                        </FormItem>
                                        <FormField
                                            control={form.control}
                                            name="date_of_birth"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-zinc-500 ">Date of Birth</FormLabel>
                                                    <FormControl><Input type="date" className="bg-black border-zinc-800 rounded-sm text-xs text-zinc-300 h-10" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-bold text-zinc-500 ">Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl><SelectTrigger className="bg-black border-zinc-800 rounded-sm text-xs h-10"><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                                        <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300 rounded-sm">
                                                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                                                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                                            <SelectItem value={Gender.OTHERS}>Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator className="bg-zinc-900" />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <FormField control={form.control} name="city" render={({ field }) => (
                                            <FormItem><FormLabel className="text-xs font-bold text-zinc-500 ">City</FormLabel>
                                                <FormControl><Input className="bg-black border-zinc-800 rounded-sm h-10 text-xs" {...field} /></FormControl></FormItem>
                                        )} />
                                        <FormField control={form.control} name="state" render={({ field }) => (
                                            <FormItem><FormLabel className="text-xs font-bold text-zinc-500 ">State</FormLabel>
                                                <FormControl><Input className="bg-black border-zinc-800 rounded-sm h-10 text-xs" {...field} /></FormControl></FormItem>
                                        )} />
                                        <FormField control={form.control} name="country" render={({ field }) => (
                                            <FormItem><FormLabel className="text-xs font-bold text-zinc-500 ">Country</FormLabel>
                                                <FormControl><Input className="bg-black border-zinc-800 rounded-sm h-10 text-xs" {...field} /></FormControl></FormItem>
                                        )} />
                                    </div>
                                </Card>

                                {/* Documents Section */}
                                <Card className="p-10 border-zinc-900 bg-zinc-950 rounded-none space-y-8">
                                    <h3 className="text-xs font-bold text-zinc-500  border-l-2 border-white pl-4">Identification Documents</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { name: "aadhaarFile", label: "Aadhaar Card", profileKey: 'aadhaar' },
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
                                                                className="group relative border border-dashed border-zinc-800 rounded-none p-8 text-center hover:bg-zinc-900/40 hover:border-zinc-600 transition-all cursor-pointer"
                                                            >
                                                                <Upload className="mx-auto h-6 w-6 text-zinc-700 group-hover:text-white transition-colors" />
                                                                <p className="mt-4 text-[11px] font-bold text-zinc-300 ">{field.value?.name ?? doc.label}</p>
                                                                <p className="text-[9px] text-zinc-600 font-medium mt-1">PDF, PNG, JPG (Max 5MB)</p>

                                                                {userProfile?.documents.find(d => d.document_name.toLowerCase().includes(doc.profileKey)) && (
                                                                    <div className="mt-6 pt-4 border-t border-zinc-900">
                                                                        <span className="text-[9px] font-bold text-white hover:text-white">View Uploaded {doc.label}</span>
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
                                </Card>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" className="w-32 text-white bg-white/30 hover:bg-white/25 rounded-sm font-bold text-xs transition-all shadow-2xl shadow-white/20 hover:cursor-pointer">
                                        Update Profile
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>
            {/* Bottom Sheets remain for functional consistency */}
            {/* <PaymentsSheet isOpen={isPaymentsSheetOpen} onClose={() => setPaymentsSheetOpen(false)} userProfile={userProfile} /> */}
            {/* <RefundSheet isOpen={isRefundSheetOpen} onClose={() => setRefundSheetOpen(false)} userProfile={userProfile} /> */}

            <PolicySheet isOpen={isPolicySheetOpen} onClose={() => setPolicySheetOpen(false)} />
            <SupportSheet isOpen={isSupportSheetOpen} onClose={() => setSupportSheetOpen(false)} userProfile={null} />
        </div>
    );
}

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("border bg-white rounded-xl", className)}>
        {children}
    </div>
);



