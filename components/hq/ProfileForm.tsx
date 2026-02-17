"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, FileText, Upload, Shield, CheckCircle, UploadCloud } from "lucide-react";
import { CountryCodePicker } from "../CountryCodePicker";
import partnerService from "@/lib/services/partnerService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PartnerProfileResponse } from "@/lib/types/api";
import { ProfileGender } from "@/lib/types/enums";

const profileFormSchema = z.object({
	profileCode: z.string(),
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	email: z.string().email("Invalid email address."),
	gender: z.nativeEnum(ProfileGender).optional(),
	phone: z.object({
		countryCode: z.string().optional(),
		phoneNumber: z.string().optional(),
	}).optional(),
	bio: z.string().optional(),
	profileImage: z.any().optional(),
	identificationDocuments: z.object({
		aadhaarCard: z.any().optional(),
		passport: z.any().optional(),
	}).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const dummyProfileData: PartnerProfileResponse = {
	id: "1",
	profile_code: "DUMMY123",
	first_name: "John",
	last_name: "Doe",
	profile_image_url: "https://github.com/shadcn.png",
	email: "john.doe@example.com",
	gender: ProfileGender.MALE,
	country_code: "+91",
	contact_number: "9876543210",
	bio: "This is a dummy bio for John Doe.",
	aadhaar_url: undefined,
	passport_url: undefined,
};

export default function ProfileForm() {
	const [profile, setProfile] = useState<PartnerProfileResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [initialFormValues, setInitialFormValues] = useState<ProfileFormValues | null>(null);
	const [hasChanges, setHasChanges] = useState(false);

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			profileCode: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: {
				countryCode: "",
				phoneNumber: ""
			},
			bio: "",
			gender: undefined,
		},
		mode: "onChange",
	});

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				// const profileData = await partnerService.getMyProfile();
				const profileData = dummyProfileData;
				setProfile(profileData);
				setProfile(dummyProfileData);
				const defaultValues = {
					profileCode: profileData.profile_code || "",
					firstName: profileData.first_name || "",
					lastName: profileData.last_name || "",
					email: profileData.email || "",
					gender: profileData.gender || undefined,
					phone: {
						countryCode: profileData.country_code || "",
						phoneNumber: profileData.contact_number || ""
					},
					bio: profileData.bio || "",
				};
				form.reset(defaultValues);
				setInitialFormValues(defaultValues);
			} catch (err) {
				setError("Failed to fetch profile.");
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, [form]);

	useEffect(() => {
		if (initialFormValues) {
			const subscription = form.watch((value, { name, type }) => {
				// Create a copy of initialFormValues and current form values, excluding file inputs for comparison
				const currentValues = { ...form.getValues() };
				const cleanInitialValues = { ...initialFormValues };

				// Remove file-related fields from comparison
				delete currentValues.profileImage;
				delete currentValues.identificationDocuments?.aadhaarCard;
				delete currentValues.identificationDocuments?.passport;
				delete cleanInitialValues.profileImage;
				delete cleanInitialValues.identificationDocuments?.aadhaarCard;
				delete cleanInitialValues.identificationDocuments?.passport;
				
				// Handle potential undefined for phone number fields
				const currentPhone = currentValues.phone || {};
				const initialPhone = cleanInitialValues.phone || {};

				if (!currentPhone.countryCode) currentPhone.countryCode = "";
				if (!currentPhone.phoneNumber) currentPhone.phoneNumber = "";
				if (!initialPhone.countryCode) initialPhone.countryCode = "";
				if (!initialPhone.phoneNumber) initialPhone.phoneNumber = "";

				const isChanged = JSON.stringify({ ...currentValues, phone: currentPhone }) !== JSON.stringify({ ...cleanInitialValues, phone: initialPhone });
				setHasChanges(isChanged);
			});
			return () => subscription.unsubscribe();
		}
	}, [form, initialFormValues]);

	async function onSubmit(data: ProfileFormValues) {
		setIsLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append("first_name", data.firstName);
		formData.append("last_name", data.lastName);
		if (data.gender) {
			formData.append("gender", data.gender);
		}
		if (data.phone?.countryCode) {
			formData.append("country_code", data.phone.countryCode);
		}
		if (data.phone?.phoneNumber) {
			formData.append("contact_number", data.phone.phoneNumber);
		}
		if (data.bio) {
			formData.append("bio", data.bio);
		}
		if (data.profileImage && data.profileImage[0]) {
			formData.append("profile_image", data.profileImage[0]);
		}
		if (data.identificationDocuments?.aadhaarCard && data.identificationDocuments.aadhaarCard[0]) {
			formData.append("aadhaar_document", data.identificationDocuments.aadhaarCard[0]);
		}
		if (data.identificationDocuments?.passport && data.identificationDocuments.passport[0]) {
			formData.append("passport_document", data.identificationDocuments.passport[0]);
		}

		try {
			const updatedProfile = await partnerService.updateMyProfile(formData);
			setProfile(updatedProfile);
			form.reset({
				profileCode: updatedProfile.profile_code || "",
				firstName: updatedProfile.first_name || "",
				lastName: updatedProfile.last_name || "",
				email: updatedProfile.email || "",
				gender: updatedProfile.gender || undefined,
				phone: {
					countryCode: updatedProfile.country_code || "",
					phoneNumber: updatedProfile.contact_number || ""
				},
				bio: updatedProfile.bio || "",
			});
			toast.success("Profile updated successfully!");
			setHasChanges(false);
		} catch (err) {
			setError("Failed to update profile.");
			console.error(err);
			toast.error("Failed to update profile.");
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading && !profile) { // Show loading only on initial fetch
        return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">Loading profile...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-400">{error}</div>;
    }


    return (
        <div className="min-h-screen px-8 bg-zinc-950 text-zinc-100">
            <div className="max-w-5xl mx-auto py-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Profile</h1>
                    {/* <p className="text-zinc-500 text-lg font-medium">Manage your account information</p> */}
                </div>

                {/* Main Card */}
                <Card className="border-transparent bg-zinc-900/40 shadow-2xl overflow-hidden" >
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                
                                {/* Profile Image Section */}
                                <div className="bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800 shadow-inner">
                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        <div className="relative group">
                                            <Avatar className="h-40 w-40 border-4 border-zinc-800 shadow-2xl ring-2 ring-zinc-700 transition-transform group-hover:scale-105 duration-300">
                                                <AvatarImage src={profile?.profile_image_url || "https://github.com/shadcn.png"} alt="@shadcn" />
                                                <AvatarFallback className="text-3xl font-black bg-white text-black">
                                                    {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                                                <Upload className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="profileImage"
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Profile Image</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type="file"
                                                                onChange={(e) => field.onChange(e.target.files)}
                                                                className="h-12 bg-zinc-950 border-zinc-800 text-zinc-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-black file:uppercase file:bg-white file:text-black hover:file:bg-zinc-200 transition-all"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <p className="text-xs text-zinc-600 mt-3 font-medium">PNG, JPG or GIF. Max size 5MB.</p>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="profileCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-cyan-500" />
                                                    Profile Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled className="bg-zinc-950 border-zinc-800 text-cyan-500 font-mono text-lg h-14 tracking-wider opacity-80" />
                                                </FormControl>
                                                <p className="text-xs text-zinc-600 mt-2">Your unique identifier in the system</p>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Gender */}
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-14 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700">
                                                            <SelectValue placeholder="Select your gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl">
                                                        {Object.values(ProfileGender).map((gender) => (
                                                            <SelectItem key={gender} value={gender} className="focus:bg-zinc-800">
                                                                {gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">First Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                                        <Input placeholder="Enter first name" {...field} className="pl-12 h-14 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Last Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                                        <Input placeholder="Enter last name" {...field} className="pl-12 h-14 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-6 pt-6 border-t border-zinc-800">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-cyan-500" />
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Email Address</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                                            <Input placeholder="your.email@example.com" {...field} className="pl-12 h-14 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormItem>
                                            <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Phone Number</FormLabel>
                                            <div className="flex gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="phone.countryCode"
                                                    render={({ field }) => (
                                                        <FormControl>
                                                            <CountryCodePicker {...field} className="h-14 bg-zinc-950 border-zinc-800" />
                                                        </FormControl>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone.phoneNumber"
                                                    render={({ field }) => (
                                                        <FormControl className="flex-1">
                                                            <div className="relative w-full">
                                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                                                <Input placeholder="10-digit number" {...field} className="pl-12 h-14 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700" />
                                                            </div>
                                                        </FormControl>
                                                    )}
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                </div>

                                {/* Bio Section */}
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="pt-6 border-t border-zinc-800">
                                            <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-cyan-500" />
                                                Bio
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us a little bit about yourself..." className="resize-none min-h-32 bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-1 focus:ring-zinc-700 p-4" {...field} />
                                            </FormControl>
                                            <p className="text-xs text-zinc-600 mt-2 font-medium">Brief description for your profile. Max 200 characters.</p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Identification Documents */}
                                <div className="space-y-6 pt-6 border-t border-zinc-800">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-cyan-500" />
                                        Identification Documents
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Aadhaar Card */}
                                        <FormField
                                            control={form.control}
                                            name="identificationDocuments.aadhaarCard"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Aadhaar Card</FormLabel>
                                                    <FormControl>
                                                        <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all bg-zinc-950/50 group">
                                                            {profile?.aadhaar_url ? (
                                                                <div className="text-center">
                                                                    <div className="mx-auto h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 mb-4">
                                                                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                                                                    </div>
                                                                    <p className="text-sm font-bold text-white">Document Verified</p>
                                                                    <a href={profile.aadhaar_url} target="_blank" rel="noopener noreferrer" className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider block">
                                                                        View Document
                                                                    </a>
                                                                    <div className="mt-6">
                                                                        <Input
                                                                            type="file"
                                                                            onChange={(e) => field.onChange(e.target.files)}
                                                                            className="h-10 bg-zinc-900 border-zinc-800 text-xs cursor-pointer file:bg-zinc-800 file:text-white"
                                                                        />
                                                                        <p className="text-[10px] text-zinc-600 mt-2 uppercase font-black tracking-widest">Replace Document</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center">
                                                                    <UploadCloud className="mx-auto h-12 w-12 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                                                    <p className="mt-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Upload Aadhaar Card</p>
                                                                    <Input
                                                                        type="file"
                                                                        onChange={(e) => field.onChange(e.target.files)}
                                                                        className="mt-6 cursor-pointer bg-zinc-900 border-zinc-800 text-xs"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* Passport */}
                                        <FormField
                                            control={form.control}
                                            name="identificationDocuments.passport"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-black text-zinc-400 uppercase tracking-widest">Passport</FormLabel>
                                                    <FormControl>
                                                        <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all bg-zinc-950/50 group">
                                                            {profile?.passport_url ? (
                                                                <div className="text-center">
                                                                    <div className="mx-auto h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 mb-4">
                                                                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                                                                    </div>
                                                                    <p className="text-sm font-bold text-white">Document Verified</p>
                                                                    <a href={profile.passport_url} target="_blank" rel="noopener noreferrer" className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider block">
                                                                        View Document
                                                                    </a>
                                                                    <div className="mt-6">
                                                                        <Input
                                                                            type="file"
                                                                            onChange={(e) => field.onChange(e.target.files)}
                                                                            className="h-10 bg-zinc-900 border-zinc-800 text-xs cursor-pointer file:bg-zinc-800 file:text-white"
                                                                        />
                                                                        <p className="text-[10px] text-zinc-600 mt-2 uppercase font-black tracking-widest">Replace Document</p>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center">
                                                                    <UploadCloud className="mx-auto h-12 w-12 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                                                                    <p className="mt-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Upload Passport</p>
                                                                    <Input
                                                                        type="file"
                                                                        onChange={(e) => field.onChange(e.target.files)}
                                                                        className="mt-6 cursor-pointer bg-zinc-900 border-zinc-800 text-xs"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {hasChanges && (
                                    <div className="flex justify-end gap-6 pt-10 border-t border-zinc-800">
                                        <Button type="button" variant="ghost" className="px-10 h-14 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-900" disabled={isLoading}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="px-10 h-14 text-sm font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all" disabled={isLoading}>
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
