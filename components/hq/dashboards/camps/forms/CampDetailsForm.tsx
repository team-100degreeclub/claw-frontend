"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CampNameSuggestions from "../CampNameSuggestions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import React from "react";
import { Camp, CampStatus, Gender } from "@/lib/types/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button"; // Import the Button component
import { toast } from "sonner";
import { useFormContext } from "react-hook-form";
import { CampFormValues } from "@/lib/types/api";

interface CampDetailsFormProps {
	isUpdateMode?: boolean;
	isUpdatable?: boolean
}

const genderDisplay: Record<string, string> = {
	[Gender.MALE]: "Male",
	[Gender.FEMALE]: "Female",
	[Gender.TRANSGENDER]: "Transgender",
	[Gender.OTHERS]: "Others",
	[Gender.ANY]: "Any",
};

const getGenderEnum = (gender: Gender | "Any" | undefined | null): Gender => {
	if (gender === "Any") return Gender.ANY;
	if (gender && Object.values(Gender).includes(gender)) {
		return gender;
	}
	return Gender.ANY;
}

export function CampDetailsForm({ isUpdateMode, isUpdatable }: CampDetailsFormProps) {
	const {
		control,
		watch,
		setValue,
	} = useFormContext<CampFormValues>();

	const age = watch("age");

	const isFree = watch("isFree");
	const min_age = watch("min_age");
	const max_age = watch("max_age");
	const startDate = watch("startDate");
	const endDate = watch("endDate");
	const lastDate = watch("lastDate");

	React.useEffect(() => {
		if (isFree) setValue("cost", 0);
	}, [isFree, setValue]);

	const disableBeforeDate = new Date();
	disableBeforeDate.setDate(disableBeforeDate.getDate() + 0);
	disableBeforeDate.setHours(0, 0, 0, 0);

	// const updateSection = async (
	// ) => {
	// 	// setIsLoading(true);
	// 	try {
	// 		// await campService.updateCampSection(
	// 		// 	initialData!.id!,
	// 		// 	section,
	// 		// 	payload
	// 		// );
	// 		("Updating data: ", form.getValues());
	// 		toast.success("Updated successfully");
	// 	} catch (e) {
	// 		toast.error("Update failed");
	// 	} finally {
	// 		// setIsLoading(false);
	// 	}
	// };

	return (
		<div className="bg-zinc-950 mb-8 rounded-lg overflow-y-hidden text-zinc-100">
    <form id="camp-details-form" className="space-y-10">
        {/* Camp Name */}
        <FormField
            control={control}
            name="campName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-zinc-400 font-medium">Camp's Name</FormLabel>
                    <div className="flex items-center gap-3">
                        <FormControl>
                            <Input 
                                placeholder="e.g., Summer Leadership Retreat" 
                                className="h-11 bg-zinc-900 border-zinc-800 focus:border-white focus:ring-white text-white placeholder:text-zinc-600 transition-all" 
                                {...field} 
                            />
                        </FormControl>
                        <CampNameSuggestions />
                    </div>
                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />

        {/* Dates Section */}
        <div className="space-y-6 pt-2 border-t border-zinc-900">
            <h5 className="text-lg font-bold text-white tracking-tight">Camp Duration</h5>
            <div className="grid grid-cols-3 gap-6">
                <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Start Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="bg-zinc-900 border-zinc-800"
                                    disabled={[{ before: disableBeforeDate }]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">End Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={[
                                        { before: disableBeforeDate },
                                        ...(startDate ? [{ before: startDate }] : []),
                                    ]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="lastDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Last Date to Register</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={[
                                        { before: disableBeforeDate },
                                        ...(startDate ? [{ after: startDate }] : []),
                                    ]}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        {/* Participant Criteria */}
        <div className="space-y-6 pt-2 border-t border-zinc-900">
            <h5 className="text-lg font-bold text-white tracking-tight">Traveller's Details</h5>
            <div className="grid grid-cols-3 gap-6">
                <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100">
                                        <SelectValue placeholder="Select gender">
                                            {field.value ? genderDisplay[field.value] : "Select gender"}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                    {Object.values(Gender).map((genderValue) => (
                                        genderValue != "others" &&
                                        <SelectItem key={genderValue} value={genderValue} className="focus:bg-zinc-800 focus:text-white">
                                            {genderDisplay[genderValue]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Age Range</FormLabel>
                            <FormControl>
                                <div className="pt-2">
                                    <Slider
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        max={100}
                                        min={0}
                                        step={1}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-zinc-500 mt-1">
                                        <span>MIN: {min_age || age[0]}</span>
                                        <span>MAX: {max_age || age[1]}</span>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="seats"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">No. of Seats</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder="10" 
                                    className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100" 
                                    {...field} 
                                    onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))} 
                                    value={field.value ?? ""} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-6 pt-2 border-t border-zinc-900">
            <h5 className="text-lg font-bold text-white tracking-tight">Pricing</h5>
            <div className="grid grid-cols-2 gap-8 items-center">
                <FormField
                    control={control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Cost per Seat</FormLabel>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">₹</span>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        className="h-11 pl-8 bg-zinc-900 border-zinc-800 text-white focus:border-white focus:ring-white" 
                                        placeholder="500" 
                                        {...field} 
                                        disabled={isFree} 
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="isFree"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-x-3 mt-6">
                            <FormControl>
                                <Switch 
                                    id="is-free" 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-emerald-500" 
                                />
                            </FormControl>
                            <Label htmlFor="is-free" className="text-zinc-300 font-medium cursor-pointer">
                                Free Camp
                            </Label>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        {/* Camp Location */}
        <div className="space-y-6 pt-2 border-t border-zinc-900">
            <h5 className="text-lg font-bold text-white tracking-tight">Camp Location</h5>
            <div className="space-y-4">
                <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Camp Address</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter camp's physical address" 
                                    className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="googleMapsUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Google Maps Pin URL</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="e.g., https://maps.google.com/..." 
                                    className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>

        {/* Meetup Details */}
        <div className="space-y-6 pt-2 border-t border-zinc-900">
            <h5 className="text-lg font-bold text-white tracking-tight">Meetup Details</h5>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={control}
                        name="meetupDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400">Date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={[
                                            { before: disableBeforeDate },
                                            ...(startDate ? [{ after: startDate }] : []),
                                        ]}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="meetupTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400">Time</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="time" 
                                        className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 [color-scheme:dark]" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="meetupAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Meetup Address</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter meetup's physical address" 
                                    className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="meetupGoogleMapsUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400">Meetup Google Maps Pin URL</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="e.g., https://maps.google.com/..." 
                                    className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    </form>
</div>
	);
}