"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Camp } from
  "@/lib/types/api";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const scheduleItemSchema = z.object({
	fromDate: z.date({ error: "Start date is required." }),
	toDate: z.date({ error: "End date is required." }),
	fromTime: z.string().min(1, "Start time is required."),
	toTime: z.string().min(1, "End time is required."),
	activityInfo: z.string().min(1, "Activity information is required."),
});

export const scheduleFormSchema = z.object({
	schedule: z.array(scheduleItemSchema),
});

const defaultScheduleItem = {
	fromDate: new Date(),
	toDate: new Date(),
	fromTime: "09:00",
	toTime: "17:00",
	activityInfo: "",
};

interface ScheduleFormProps {
	initialData?: Camp;
	updateCampData: (data: Partial<Camp>) => void;
}

export function ScheduleForm({ initialData, updateCampData }: ScheduleFormProps) {
	const [frequency, setFrequency] = React.useState("custom");
	const schedule_from_backend =
    initialData?.schedule?.map((item) => ({
      ...item,
      fromDate: new Date(item.fromDate),
      toDate: new Date(item.toDate),
    })) || [];
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      schedule:
        schedule_from_backend.length > 0
          ? schedule_from_backend
          : [defaultScheduleItem],
    },
  });

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "schedule",
	});

	React.useEffect(() => {
    const schedule_from_backend =
      initialData?.schedule?.map((item) => ({
        ...item,
        fromDate: new Date(item.fromDate),
        toDate: new Date(item.toDate),
      })) || [];
    form.reset({
      schedule:
        schedule_from_backend.length > 0
          ? schedule_from_backend
          : [defaultScheduleItem],
    });
  }, [initialData, form]);

	const onSubmit = (values: z.infer<typeof scheduleFormSchema>) => {
		updateCampData({ schedule: values.schedule });
	};

	const handleFrequencyChange = (value: string) => {
		setFrequency(value);
	};

	return (
		<div className="bg-white rounded-lg p-8 space-y-8">
			{/* Header */}
			<div>
				<h3 className="text-lg font-semibold text-gray-900">Camp Schedule</h3>
				<p className="text-sm text-gray-600 mt-1">Schedule your camp multiple times</p>
			</div>

			<RadioGroup value={frequency} onValueChange={handleFrequencyChange} className="flex space-x-4">
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="daily" id="daily" />
					<Label htmlFor="daily">Daily</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="weekly" id="weekly" />
					<Label htmlFor="weekly">Weekly</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="monthly" id="monthly" />
					<Label htmlFor="monthly">Monthly</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="weekends" id="weekends" />
					<Label htmlFor="weekends">Weekends</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="custom" id="custom" />
					<Label htmlFor="custom">Custom</Label>
				</div>
			</RadioGroup>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Schedule Items */}
					<div className="space-y-4">
						{fields.map((item, index) => (
							<Card key={item.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
								{/* Delete Button */}
								<Button type="button" variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 z-10" onClick={() => remove(index)}>
									<Trash2 className="h-4 w-4" />
									<span className="sr-only">Remove schedule item</span>
								</Button>

								<CardContent className="p-6 pt-14 space-y-6">
									{/* Dates */}
									<div className="grid grid-cols-2 gap-6">
										<FormField
											control={form.control}
											name={`schedule.${index}.fromDate`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-gray-700 font-medium">Date (From)</FormLabel>
													<FormControl>
														<DatePicker value={field.value} onChange={field.onChange} />
													</FormControl>
													<FormMessage className="text-red-600 text-xs" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`schedule.${index}.toDate`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-gray-700 font-medium">Date (To)</FormLabel>
													<FormControl>
														<DatePicker value={field.value} onChange={field.onChange} />
													</FormControl>
													<FormMessage className="text-red-600 text-xs" />
												</FormItem>
											)}
										/>
									</div>

									{/* Times */}
									<div className="grid grid-cols-2 gap-6">
										<FormField
											control={form.control}
											name={`schedule.${index}.fromTime`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-gray-700 font-medium">Time (From)</FormLabel>
													<FormControl>
														<Input type="time" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
													</FormControl>
													<FormMessage className="text-red-600 text-xs" />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`schedule.${index}.toTime`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-gray-700 font-medium">Time (To)</FormLabel>
													<FormControl>
														<Input type="time" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
													</FormControl>
													<FormMessage className="text-red-600 text-xs" />
												</FormItem>
											)}
										/>
									</div>

									{/* Activity Info */}
									<FormField
										control={form.control}
										name={`schedule.${index}.activityInfo`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-gray-700 font-medium">Activity Information</FormLabel>
												<FormControl>
													<Textarea placeholder="Describe the activity, location, and any special instructions..." className="min-h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500" {...field} />
												</FormControl>
												<FormMessage className="text-red-600 text-xs" />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Add New Item Button */}
					<Button type="button" variant="outline" className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium" onClick={() => append(defaultScheduleItem)}>
						<Plus className="mr-2 h-4 w-4" />
						Repeat
					</Button>
				</form>
			</Form>
		</div>
	);
}
