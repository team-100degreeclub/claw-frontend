"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { SupportCategory } from "@/lib/api/models/tickets";
import { ticketService } from "@/lib/api/services/tickets";
import { TravellerProfileResponse } from "@/lib/api/models/auth";
import { toast } from "sonner";

const createTicketSchema = z.object({
	subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
	category: z.nativeEnum(SupportCategory),
	message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

interface CreateTicketSheetProps {
	isOpen: boolean;
	onClose: () => void;
    userProfile: TravellerProfileResponse | null;
	onTicketCreated: () => void;
}

export default function CreateTicketSheet({ isOpen, onClose, userProfile, onTicketCreated }: CreateTicketSheetProps) {
	const form = useForm<z.infer<typeof createTicketSchema>>({
		resolver: zodResolver(createTicketSchema),
		defaultValues: {
			subject: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof createTicketSchema>) {
        try {
            await ticketService.createSupportTicket(values);
			toast.success("Ticket created successfully!");
			onTicketCreated();
            onClose();
        } catch (error) {
			toast.error("Failed to create ticket.");
        }
	}

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side="right" className="w-[540px] bg-zinc-900 text-zinc-300 rounded-l-2xl shadow-xl">
				{/* Header */}
				<SheetHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
					<SheetTitle className="text-2xl font-bold text-zinc-300">Create New Ticket</SheetTitle>
					<SheetClose asChild>
					</SheetClose>
				</SheetHeader>

				{/* Scrollable Form */}
				<div className="flex-1 overflow-y-auto p-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Subject */}
							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-zinc-300 font-medium">Subject</FormLabel>
										<FormControl>
											<Input placeholder="e.g., Issue with payment" className="h-11 focus:border-blue-500 focus:ring-blue-500" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Category */}
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-zinc-300 font-medium">Category</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="h-11">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
                                                {Object.values(SupportCategory).map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </SelectItem>
                                                ))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Message */}
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-zinc-300 font-medium">Message</FormLabel>
										<FormControl>
											<Textarea placeholder="Describe your issue in detail..." className="min-h-32 resize-none focus:border-blue-500 focus:ring-blue-500" {...field} />
																				</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<Button type="submit" className="w-full h-10 text-black bg-zinc-300 hover:bg-zinc-300/90 hover:cursor-pointer rounded-lg transition-all shadow-xl shadow-white/5">
								Submit Ticket
							</Button>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
