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
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { PlusCircle, Trash2, CalendarIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Gender } from "@/lib/api/models/enums";
import { BookedForTraveller } from "@/lib/api/models/registrations";

const attendeeSchema = z.object({
	firstName: z.string().min(1, "First Name is required"),
	lastName: z.string().min(1, "Last Name is required"),
	email: z.string().email("Invalid email address"),
	age: z.number().min(1, "Age must be at least 1").max(100, "Age must be at most 100"),
	gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.TRANSGENDER, Gender.PREFER_NOT_TO_SAY], {
		message: "Gender is required",
	}),
	contactNumber: z.string().min(10, "Contact Number is required").max(15, "Contact Number is too long"),
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
	const [isBookingForSelf, setIsBookingForSelf] = React.useState(true);
	const [isPolicyDialogOpen, setIsPolicyDialogOpen] = React.useState(false);

	const form = useForm<BookingFormValues>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			attendees: isBookingForSelf
				? []
				: [
					{
						firstName: "",
						lastName: "",
						email: "",
						age: 18,
						gender: Gender.PREFER_NOT_TO_SAY,
						contactNumber: "",
					},
				],
		},
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "attendees",
	});

	React.useEffect(() => {
		const currentAttendees = form.getValues("attendees");
		if (isBookingForSelf) {
			// If booking for self is enabled, and there are attendees, do nothing
			// If there are no attendees, the array remains empty as expected
		} else {
			// If booking for self is disabled, and there are no attendees, add one empty attendee
			if (currentAttendees.length === 0) {
				form.reset({
					attendees: [
						{
							firstName: "",
							lastName: "",
							email: "",
							age: 18,
							gender: Gender.PREFER_NOT_TO_SAY,
							contactNumber: "",
						},
					],
				});
			}
		}
		console.log("Is free: " + isFree);
	}, [isBookingForSelf, form.reset, form]);

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

	const handleAddPerson = () => {
		if (actualAttendeesCount < spotsLeft) {
			append({
				firstName: "",
				lastName: "",
				email: "",
				age: 18,
				gender: Gender.PREFER_NOT_TO_SAY,
				contactNumber: "",
			});
		}
	};

	const handleRemovePerson = (index: number) => {
		if (!isBookingForSelf && fields.length === 1) {
			setIsBookingForSelf(true);
		}
		remove(index);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side="right" className="flex flex-col w-full sm:max-w-lg rounded-l-[10px]">
				<SheetHeader>
					<SheetTitle>Book Tickets</SheetTitle>
					{/* <SheetDescription>Enter the details for each traveller attending the camp.</SheetDescription> */}
				</SheetHeader>

				<div className="flex items-center justify-between py-4">
					<Label htmlFor="booking-for-self" className="text-sm font-medium">
						Are you buying a ticket for yourself?
					</Label>
					<Switch id="booking-for-self" checked={isBookingForSelf} onCheckedChange={() => setIsBookingForSelf(!isBookingForSelf)} />
				</div>

				<Form {...form}>
					<form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto">
						<div className="space-y-6">
							{fields.map((field, index) => (
								<div key={field.id} className="p-4 border rounded-lg relative">
									<div className="flex justify-between items-center mb-2">
										{/* <p className="font-semibold text-sm">
											Person {index + 1}
										</p> */}
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => handleRemovePerson(index)}
											className="absolute top-2 right-2 h-7 w-7"
										>
											<Trash2 className="h-4 w-4 text-red-500" />
										</Button>
									</div>
									<div className="space-y-4">
										<div className="grid grid-cols-2 gap-4">
											<FormField
												control={form.control}
												name={`attendees.${index}.firstName`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input placeholder="e.g. John" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`attendees.${index}.lastName`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input placeholder="e.g. Doe" {...field} />
														</FormControl>
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
													<FormLabel>Email Address</FormLabel>
													<FormControl>
														<Input placeholder="e.g. john.doe@example.com" {...field} />
													</FormControl>
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
														<FormLabel>Age</FormLabel>
														<FormControl>
															<Input type="number" placeholder="e.g. 25" {...field} onChange={event => field.onChange(parseInt(event.target.value, 10))} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`attendees.${index}.gender`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Gender</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Select gender" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value={Gender.MALE}>Male</SelectItem>
																<SelectItem value={Gender.FEMALE}>Female</SelectItem>
																<SelectItem value={Gender.TRANSGENDER}>Transgender</SelectItem>
																<SelectItem value={Gender.PREFER_NOT_TO_SAY}>Prefer not to say</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid grid-cols-2 gap-4">

											<FormField
												control={form.control}
												name={`attendees.${index}.contactNumber`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Contact Number</FormLabel>
														<FormControl>
															<Input type="tel" placeholder="e.g. 9876543210" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						{actualAttendeesCount < spotsLeft && (
							<Button type="button" variant="outline" onClick={handleAddPerson} className="w-full mt-4">
								<PlusCircle className="w-4 h-4 mr-2" />
								Add Another Person
							</Button>
						)}
						{actualAttendeesCount >= spotsLeft && <p className="text-sm text-center text-gray-500 mt-4">You have reached the maximum number of available spots.</p>}
					</form>
				</Form>

				<SheetFooter className="mt-auto pt-6">
					<div className="w-full">
						<div className="flex justify-between items-start mb-4">
							<div className="flex flex-col ">
								<span className="text-lg font-bold">Total Price:</span>
								<span className="text-xs text-gray-500">(Incl. GST)</span>
							</div>
							<div className="flex flex-col items-end">
								<span className="text-2xl font-bold">₹{totalPrice.toLocaleString()}</span>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="link" className="p-0 text-xs h-auto underline decoration-dotted">
											View breakdown
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-64 p-4">
										<p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Payment Summary</p>
										<div className="space-y-2 text-sm">
											<div className="flex justify-between text-gray-700">
												<span>Ticket Price</span>
												<span>₹{subTotal.toLocaleString()}</span>
											</div>
											<div className="flex justify-between text-gray-700">
												<span>GST (18%)</span>
												<span>₹{gst.toLocaleString()}</span>
											</div>
											<div className="border-t border-gray-300 pt-2 mt-2"></div>
											<div className="flex justify-between text-base font-bold text-gray-900">
												<span>Total</span>
												<span>₹{totalPrice.toLocaleString()}</span>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						<Button type="button" onClick={() => setIsPolicyDialogOpen(true)} disabled={!isValid || actualAttendeesCount === 0} className="w-full bg-blue-600">
							{isFree ? "Book" : `Pay ₹${totalPrice.toLocaleString()}`}
						</Button>
					</div>
				</SheetFooter>
				<Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Refund Policy</DialogTitle>
							<DialogDescription>
								<ol className="list-decimal list-inside space-y-1 mt-2">
									<li>All bookings are non-refundable once the ticket is issued.</li>
									<li>Refunds are only allowed if the camp partner cancels the event.</li>
									<li>If the event is cancelled: The full ticket amount (minus PG charges, card fees, and software charges) will be refunded to the customer.</li>
								</ol>
								<p className="text-sm mt-2">Refund may take 10 to 15 working days, depending on the bank/payment gateway.</p>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsPolicyDialogOpen(false)}>Cancel</Button>
							<Button type="submit" form="booking-form" className="bg-blue-600">
								{isFree ? "Confirm & Register" : "Confirm & Pay"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</SheetContent>
		</Sheet>
	);
}
