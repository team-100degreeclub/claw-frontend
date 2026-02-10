"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { PlusCircle, Trash2, Info, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gender } from "@/lib/api/models/enums";
import { BookedForTraveller } from "@/lib/api/models/registrations";
import { Separator } from "../ui/separator";

const attendeeSchema = z.object({
	firstName: z.string().min(1, "Required"),
	lastName: z.string().min(1, "Required"),
	email: z.string().email("Invalid email"),
	age: z.number().min(1).max(100),
	gender: z.nativeEnum(Gender),
	contactNumber: z.string().min(10).max(15),
});

const bookingSchema = z.object({
	attendees: z.array(attendeeSchema),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingSheetProps {
	isOpen: boolean;
	onClose: () => void;
	campId: string;
	price: number;
	spotsLeft: number;
	isFree: boolean;
	onPay: (campId: string, attendees: BookedForTraveller[], isFree: boolean, book_for_primary_user: boolean) => void;
}

export default function BookingSheet({ isOpen, onClose, campId, price, spotsLeft, isFree, onPay }: BookingSheetProps) {
	const [isBookingForSelf, setIsBookingForSelf] = React.useState(false);
	const [isPolicyDialogOpen, setIsPolicyDialogOpen] = React.useState(false);

	const form = useForm<BookingFormValues>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			attendees: [],
		},
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "attendees",
	});

	const {
		formState: { isValid },
		handleSubmit,
		watch,
	} = form;

	const attendees = watch("attendees");
	const actualAttendeesCount = isBookingForSelf ? attendees.length + 1 : attendees.length;
	const subTotal = actualAttendeesCount * price;
	const gst = subTotal * 0.18;
	const totalPrice = subTotal + gst;

	const onSubmit = (data: BookingFormValues) => {
		const formattedAttendees: BookedForTraveller[] = data.attendees.map(attendee => ({
			first_name: attendee.firstName,
			last_name: attendee.lastName,
			email: attendee.email,
			age: attendee.age,
			gender: attendee.gender,
		}));
		onPay(campId, formattedAttendees, isFree, isBookingForSelf);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side="right" className="flex flex-col w-full min-w-lg sm:max-w-xl bg-neutral-900 border-zinc-800 text-white p-0 rounded-l-2xl">
				<SheetHeader className="p-6 border-b border-zinc-900 bg-zinc-950/50">
					<SheetTitle className="text-2xl font-bold">Book Tickets</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
					{/* Self Booking Toggle */}
					<div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
						<div className="space-y-0.5">
							<Label htmlFor="booking-for-self" className="text-sm text-white ">
								Are you buying a ticket for yourself?
							</Label>
							{/* <p className="text-[10px] text-zinc-500 font-medium  tracking-wider">Add your details to this booking</p> */}
						</div>
						<Switch 
							id="booking-for-self" 
							checked={isBookingForSelf} 
							onCheckedChange={setIsBookingForSelf}
							className="data-[state=checked]:bg-white" 
						/>
					</div>

					<Form {...form}>
						<form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{fields.map((field, index) => (
								<div key={field.id} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative space-y-6">
									<div className="flex justify-between items-center">
										<span className="text-sm tracking-[0.2em] text-white">
											Attendee {index + 1}
										</span>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => remove(index)}
											className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 text-zinc-600 transition-colors"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`attendees.${index}.firstName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold  text-zinc-400">First Name</FormLabel>
													<FormControl><Input className="auth-input-dark h-11" placeholder="John" {...field} /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`attendees.${index}.lastName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold  text-zinc-400">Last Name</FormLabel>
													<FormControl><Input className="auth-input-dark h-11" placeholder="Doe" {...field} /></FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name={`attendees.${index}.email`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-bold  text-zinc-400">Email Address</FormLabel>
												<FormControl><Input className="auth-input-dark h-11" placeholder="john@example.com" {...field} /></FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`attendees.${index}.age`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold  text-zinc-400">Age</FormLabel>
													<FormControl>
														<Input 
															type="number" 
															className="auth-input-dark h-11" 
															{...field} 
															onChange={e => field.onChange(parseInt(e.target.value))} 
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`attendees.${index}.gender`}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-bold  text-zinc-400">Gender</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl><SelectTrigger className="auth-input-dark h-11"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
														<SelectContent className="bg-zinc-900 border-zinc-800 text-white">
															<SelectItem value={Gender.MALE}>Male</SelectItem>
															<SelectItem value={Gender.FEMALE}>Female</SelectItem>
															<SelectItem value={Gender.TRANSGENDER}>Transgender</SelectItem>
															<SelectItem value={Gender.PREFER_NOT_TO_SAY}>Other</SelectItem>
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									</div>
								</div>
							))}

							{actualAttendeesCount < spotsLeft && (
								<Button 
									type="button" 
									variant="outline" 
									onClick={() => append({ firstName: "", lastName: "", email: "", age: 18, gender: Gender.PREFER_NOT_TO_SAY, contactNumber: "" })} 
									className="w-full h-14 border-dashed border-zinc-800 text-white hover:text-white hover:border-zinc-700 transition-all bg-transparent font-bold text-xs"
								>
									<PlusCircle className="w-4 h-4 mr-2" />
									Add
								</Button>
							)}
						</form>
					</Form>
				</div>

				<SheetFooter className="p-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
					<div className="w-full space-y-6">
						<div className="flex justify-between items-end">
							<div>
								<p className="text-sm font-bold text-zinc-400">Total</p>
								<h3 className="text-3xl font-black ">₹{totalPrice.toLocaleString()}</h3>
							</div>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="ghost" className="h-8 text-sm font-bold  text-zinc-400 hover:text-white">
										<Info className="w-3 h-3 mr-1.5" /> 
										Payment Breakdown
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-64 bg-zinc-900 border-zinc-800 text-zinc-100 p-4 shadow-2xl">
									<p className="text-sm font-bold text-white mb-4">Summary</p>
									<div className="space-y-2 text-xs font-medium">
										<div className="flex justify-between">
											<span className="text-zinc-400">Ticket Price x {actualAttendeesCount}</span>
											<span>₹{subTotal.toLocaleString()}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-zinc-400">Taxes (18% GST)</span>
											<span>₹{gst.toLocaleString()}</span>
										</div>
										<Separator className="bg-zinc-800 my-2" />
										<div className="flex justify-between text-white font-bold">
											<span>Total</span>
											<span>₹{totalPrice.toLocaleString()}</span>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>

						<Button 
							type="button" 
							disabled={!isValid || actualAttendeesCount === 0}
							onClick={() => setIsPolicyDialogOpen(true)} 
							className="w-full h-14 bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer text-lg shadow-lg shadow-red-600/20 group"
						>
							{isFree ? "Register Now" : `Proceed to Payment`}
							<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</SheetFooter>

				{/* Refund Policy Dialog */}
				<Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
					<DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-md">
						<DialogHeader>
							<DialogTitle className="text-xl font-bold ">Refund Policy</DialogTitle>
							<DialogDescription className="text-zinc-400 pt-4 space-y-4">
								<ul className="space-y-3 text-sm">
									<li className="flex gap-3">
										<span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
										<span>Bookings are non-refundable once the ticket is issued.</span>
									</li>
									<li className="flex gap-3">
										<span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
										<span>Refunds apply only if the camp host cancels the event.</span>
									</li>
									<li className="flex gap-3">
										<span className="h-1.5 w-1.5 rounded-full bg-white mt-1.5 shrink-0" />
										<span>Processing takes 10-15 working days depending on your bank.</span>
									</li>
								</ul>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="pt-6 gap-2">
							<Button variant="ghost" onClick={() => setIsPolicyDialogOpen(false)} className="text-zinc-300 px-4 hover:bg-gray-800/70 hover:cursor-pointer hover:text-white text-sm">Cancel</Button>
							<Button type="submit" form="booking-form" className="bg-zinc-100 text-black hover:bg-zinc-100/70 hover:cursor-pointer px-8">
								Confirm & Pay
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</SheetContent>
		</Sheet>
	);
}