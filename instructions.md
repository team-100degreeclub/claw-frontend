"use client";

import * as React from "react";
import {
	ArrowLeft,
	PlayCircle,
	Calendar,
	MapPin,
	Clock,
	User,
	Check,
	Share2,
	ExternalLink,
	Copy,
	Users,
	Armchair,
	ShieldCheck,
	CircleCheck,
	Info,
	History,
	SquareCheckBigIcon,
	SquareCheck,
	ChevronUp,
	ChevronDown,
	FileExclamationPoint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BookingSheet from "@/components/camps/BookingSheet";
import PolicyDialog from "@/components/camps/PolicyDialog";
import { cn } from "@/lib/utils";
import { campService } from "@/lib/api/services/camps";
import { CampDetailsResponse } from "@/lib/api/models/camps";
import YouTubePlayer from "@/components/ui/youtube-player";
import { BookedForTraveller, CampRegistrationCreate, PaymentVerificationRequest } from "@/lib/api/models/registrations";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ticketService } from "@/lib/api/services/tickets";
import { CampTicketDetailsResponse } from "@/lib/api/models/tickets";
import { CampStatus, TicketStatus } from "@/lib/api/models/enums";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { registrationService } from "@/lib/api/services/registrations";

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayPaymentObject {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayPaymentObject;
  }
}

// --- Sub-Component: Ticket Status Cards ---
const TicketsTabContent = ({ campId, isAuthenticated }: { campId: string; isAuthenticated: boolean }) => {
	const [ticketDetails, setTicketDetails] = React.useState<CampTicketDetailsResponse | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!isAuthenticated) { setLoading(false); return; }
		const fetchTicketDetails = async () => {
			try {
				const data = await ticketService.getCampTicketDetails(campId);
				setTicketDetails(data);
			} catch (err) { setError("Failed to fetch ticket details."); }
			finally { setLoading(false); }
		};
		fetchTicketDetails();
	}, [campId, isAuthenticated]);

	if (loading) return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div>;
	if (!ticketDetails) return <div className="py-12 text-center text-zinc-400 text-sm">No active bookings found.</div>;

	const currentPaymentSummary = { sub_total_amount: 117000, gst: 21060, total_amount: 138060 };

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
			{ticketDetails.booking_groups.map((group, index) => (
				<div key={index} className="space-y-4">
					<div className="flex items-center gap-2">
						<History className="w-4 h-4 text-[#172941]/40" />
						<h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#172941]/50">
							Booked at {new Date(group.booked_at).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
						</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{group.bookings.map((ticket, tIdx) => (
							<Card key={tIdx} className="p-5 border-[#172941]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
								<div className="flex justify-between items-start mb-4">
									<div>
										<p className="text-[10px] font-bold uppercase tracking-widest text-[#172941]/40">Ticket ID</p>
										<p className="font-mono text-sm font-bold text-[#172941]">{ticket.ticket_number}</p>
									</div>
									<div className={cn(
										"px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
										ticket.ticket_status === TicketStatus.CONFIRMED ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
									)}>
										{ticket.ticket_status === TicketStatus.CONFIRMED ? "Confirmed" : "Pending"}
									</div>
								</div>
								<div className="space-y-3">
									<p className="text-sm font-semibold text-[#172941]">{ticket.name}</p>
									<div className="flex gap-4 text-xs text-zinc-500">
										<span>{ticket.age} Yrs</span>
										<span className="capitalize">{ticket.gender}</span>
									</div>
								</div>
								{ticket.documents?.[0] ? (
									<Button variant="link" className="p-0 h-auto text-blue-600 text-xs mt-4" asChild>
										<a href={ticket.documents[0]} target="_blank" rel="noopener noreferrer">
											<ExternalLink className="w-3 h-3 mr-1" /> View Documents
										</a>
									</Button>
								) : (
									<div className="text-xs text-red-800 mt-4 text-center flex flex-row items-center justify-center">
										<FileExclamationPoint className="w-4 h-4 mr-1" />Documents Missing
									</div>
								)}
							</Card>
						))}
					</div>
				</div>
			))}

			{/* Payment Summary */}
			<Card className="p-6 border-[#172941]/10 bg-[#172941]/5 rounded-xl">
				<h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#172941]/60 mb-4">Billing Summary</h3>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between text-[#172941]/70"><span>Sub-total</span><span>₹{currentPaymentSummary.sub_total_amount.toLocaleString("en-IN")}</span></div>
					<div className="flex justify-between text-[#172941]/70"><span>Tax (GST)</span><span>₹{currentPaymentSummary.gst.toLocaleString("en-IN")}</span></div>
					<div className="border-t border-[#172941]/10 pt-2 mt-2 flex justify-between font-bold text-[#172941] text-lg">
						<span>Total Paid</span><span>₹{currentPaymentSummary.total_amount.toLocaleString("en-IN")}</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

const HostCard = ({ host }: { host: any }) => {
	const [isExpanded, setIsExpanded] = React.useState(false);

	return (
		<Card className="p-6 border-[#172941]/10 bg-white flex flex-col sm:flex-row items-start gap-6 group transition-all duration-300">
			{/* Avatar Section */}
			<Avatar className="h-20 w-20 border-2 border-white shadow-md ring-1 ring-[#172941]/5 shrink-0">
				<AvatarImage src={host.profile_image_url} />
				<AvatarFallback className="bg-[#172941]/5 text-[#172941] text-lg font-bold">
					{host.first_name?.[0]}
				</AvatarFallback>
			</Avatar>

			{/* Content Section */}
			<div className="flex-1 space-y-2 w-full">
				<div className="flex items-center justify-between">
					<h4 className="font-bold text-lg text-[#172941]">
						{host.first_name} {host.last_name}
					</h4>
				</div>

				{/* Bio Section with Clamp Logic */}
				<div className="relative">
					<p className={cn(
						"text-sm leading-relaxed text-[#172941]/70 transition-all duration-300",
						!isExpanded ? "line-clamp-3" : "line-clamp-none"
					)}>
						{host.bio || "Experience Collaborator"}
					</p>

					{/* Expand/Collapse Toggle */}
					{host.bio && host.bio.length > 150 && (
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#172941]/40 hover:text-[#172941] transition-colors"
						>
							{isExpanded ? (
								<>Show Less <ChevronUp className="w-3 h-3" /></>
							) : (
								<>Read Bio <ChevronDown className="w-3 h-3" /></>
							)}
						</button>
					)}
				</div>
			</div>
		</Card>
	);
};

// --- Main Page Component ---
export default function CampDetailsPage() {
	const router = useRouter();
	const params = useParams();
	const slug = params.slug as string;
	const { isAuthenticated } = useAuth();

	const [campData, setCampData] = React.useState<CampDetailsResponse | null>(null);
	const [ticketDetails, setTicketDetails] = React.useState<CampTicketDetailsResponse | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [activeTab, setActiveTab] = React.useState<any>("hosts");
	const [showVideo, setShowVideo] = React.useState(true);
	const [isBookingSheetOpen, setIsBookingSheetOpen] = React.useState(false);

	React.useEffect(() => {
		const fetchAll = async () => {
			try {
				const [camp, tickets] = await Promise.all([
					campService.getCampById(slug),
					isAuthenticated ? ticketService.getCampTicketDetails(slug) : Promise.resolve(null)
				]);
				setCampData(camp);
				setTicketDetails(tickets);
			} catch (err) { console.error(err); }
			finally { setLoading(false); }
		};
		fetchAll();
	}, [slug, isAuthenticated]);

	const youtubeVideoId = React.useMemo(() => {
		if (!campData?.pitch.yt_video_url) return null;
		try { return new URL(campData.pitch.yt_video_url).searchParams.get("v") || campData.pitch.yt_video_url.split("/").pop(); }
		catch { return null; }
	}, [campData]);

	if (loading || !campData) return <div className="p-12 max-w-7xl mx-auto"><Skeleton className="h-[600px] w-full rounded-2xl" /></div>;

	const documentLink = ticketDetails?.url_to_confirm_slot || "";
	const campChecklist = campData.pitch.camp_checklist.split("\n").filter(i => i.trim());

	const loadScript = (src: string) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};

	const handleBooking = async (
		camp_id: string,
		attendees: BookedForTraveller[],
		isFree: boolean,
		book_for_primary_user: boolean
	) => {
		try {
			const payload: CampRegistrationCreate = {
				camp_id: camp_id,
				book_for_primary_user: book_for_primary_user, // Assuming primary user is always booking for themselves
				other_travellers: attendees,
			};

			const response = await registrationService.registerForCamp(payload);

			if (response.registration.status === "success" && isFree) {
				// Free camp, registration successful
				toast.success("Registration Successful!", {
					description: "You have successfully registered for the free camp.",
				});
				// Redirect to a success page or profile
				router.push("/profile?tab=camps");
				// router.push("/profile?tab=camps");
				setIsBookingSheetOpen(false);
			} else if (
				response.registration.status === "locked" &&
				response.razorpay_order &&
				response.payment
			) {
				// Paid camp, proceed with Razorpay
				const res = await loadScript(
					"https://checkout.razorpay.com/v1/checkout.js"
				);

				if (!res) {
					toast.error("Payment Failed", {
						description: "Razorpay SDK failed to load. Are you online?",
					});
					return;
				}

				const options: RazorpayOptions = {
					key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Ensure this is set in your environment
					amount: response.razorpay_order.amount.toString(),
					currency: response.razorpay_order.currency,
					name: "100DegreeClub",
					description: `Camp Registration for ${camp_id}`,
					order_id: response.razorpay_order.id,
					handler: async (razorpayResponse) => {
						try {
							const verifyPayload: PaymentVerificationRequest = {
								razorpay_order_id: razorpayResponse.razorpay_order_id,
								razorpay_payment_id: razorpayResponse.razorpay_payment_id,
								razorpay_signature: razorpayResponse.razorpay_signature,
							};
							const verificationResult =
								await registrationService.verifyPayment(verifyPayload);

							if (verificationResult.status === "success") {
								toast.success("Payment Successful!", {
									description:
										"Your payment has been successfully processed and registration is confirmed.",
								});
								router.push("/profile?tab=camps");
							} else {
								toast.error("Payment Verification Failed", {
									description:
										"There was an issue verifying your payment. Please contact support.",
								});
							}
						} catch (error) {
							console.error("Error verifying payment:", error);
							toast.error("Payment Verification Error", {
								description: "An error occurred during payment verification.",
							});
						}
					},
					prefill: {
						name: "", // You might want to prefill user's name
						email: "", // You might want to prefill user's email
						contact: "", // You might want to prefill user's contact
					},
					notes: {
						address: "Razorpay Corporate Office",
					},
					theme: {
						color: "#3399cc",
					},
				};

				const paymentObject = new window.Razorpay(options);
				paymentObject.open();
			}
		} catch (error) {
			console.error("Error during camp registration:", error);
			toast.error("Registration Error", {
				description:
					"An error occurred during camp registration. Please try again.",
			});
		} finally {
			setIsBookingSheetOpen(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#FDFDFD] text-[#172941]">
			<main className="max-w-7xl mx-auto px-4 lg:px-8 py-10">

				{/* Back Button */}
				{/* <Button variant="ghost" onClick={() => router.back()} className="mb-8 -ml-2 text-[#172941]/60 hover:text-[#172941]">
					<ArrowLeft className="w-4 h-4 mr-2" /> Back to Camps
				</Button> */}

				<div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">

					{/* Sidebar: Media & Vital Specs */}
					<aside className="lg:sticky space-y-8 order-2 lg:order-1">
						<div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-zinc-100 group">
							{showVideo && youtubeVideoId ? (
								<YouTubePlayer videoId={youtubeVideoId} opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1 } }} isPlaying={showVideo} className="absolute inset-0" />
							) : (
								<>
									{/* <img src={campData.pitch.thumbnail_url || `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Camp" /> */}
									{/* <img src="/dinner.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Camp" /> */}
									<div className="absolute inset-0 flex items-center justify-center bg-[#172941]/20 cursor-pointer" onClick={() => setShowVideo(true)}>
										<div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl">
											<PlayCircle className="w-8 h-8 text-[#172941]" />
										</div>
									</div>
								</>
							)}
						</div>

						<Card className="p-8 border-[#172941]/10 bg-white rounded-2xl shadow-sm">
							<h3 className="text-[15px] font-bold tracking-[0.1em] text-[#172941] mb-6">Camp Details</h3>
							<div className="space-y-6 text-sm">
								{[
									{ icon: MapPin, label: "Destination", value: campData.location, url: campData.camp_location_gmaps_url },
									{ icon: Calendar, label: "Dates", value: `${new Date(campData.start_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })} - ${new Date(campData.end_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}` },
									{ icon: MapPin, label: "Meetup Location", value: campData.meetup_location_address, url: campData.meetup_location_gmaps_url },
									{ icon: Clock, label: "Meetup Date", value: `${new Date(campData.meetup_datetime).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} @ ${new Date(campData.meetup_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
									{ icon: User, label: "Eligibility", value: `${campData.min_age}-${campData.max_age} yrs, Gender - ${campData.gender[0].toUpperCase() + campData.gender.slice(1)}` },
									{ icon: Armchair, label: "Slots Remaining", value: `${campData.slots_remaining} / ${campData.total_seats}` }
								].map((spec, i) => (
									<div key={i} className="flex gap-4" onClick={() => spec.url && window.open(spec.url, "_blank")}>
										<spec.icon className="w-5 h-5 text-[#172941] shrink-0" />
										<div>
											<p className="text-[15px] font-bold text-[#172941]/60">{spec.label}</p>
											<p className={cn("font-semibold text-[#172941] mt-0.5", spec.icon == MapPin && "underline hover:cursor-pointer")}>{spec.value}</p>
										</div>
									</div>
								))}
							</div>

							<div className="space-y-4">
								<div className="flex flex-col">
									<span className="text-3xl font-bold tracking-tight text-[#172941]">₹{campData.price_per_seat.toLocaleString("en-IN")}</span>
									<span className="text-[10px] uppercase font-bold text-[#172941]/40 tracking-widest">Per Traveller</span>
								</div>
								<Button onClick={() => setIsBookingSheetOpen(true)} className="w-full h-14 bg-[#172941] hover:bg-[#172941]/90 text-white rounded-xl font-bold text-base shadow-lg shadow-[#172941]/20 transition-all">
									Buy Now
								</Button>
							</div>
						</Card>
					</aside>

					{/* Main Content: Narrative & Dashboard */}
					<div className="order-1 lg:order-2">
						<header className="mb-10 space-y-4">
							<h1 className="text-4xl md:text-5xl font-serif font-medium text-[#172941] leading-tight max-w-3xl">
								{campData.name}
							</h1>
							<div className="flex flex-wrap gap-3">
								<div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[12px] font-bold  border border-emerald-100">
									<CircleCheck className="w-3 h-3" />Camp Status: {campData.status === CampStatus.APPROVED ? "Live	" : "Review Pending"}
								</div>
								{/* <div className="flex items-center gap-2 px-3 py-1 bg-[#172941]/5 text-[#172941] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#172941]/10">
									<Users className="w-3 h-3" /> {ticketDetails?.total_slots_booked || 0} Travellers Joined
								</div> */}
							</div>
						</header>

						{/* Interactive Insights Board */}
						{
							ticketDetails && (
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
									{[
										{ label: "Tickets Booked", val: `${ticketDetails?.total_slots_booked || 0} / ${ticketDetails?.total_slots_booked}`, icon: User, color: "bg-[#172941]/5" },
										{ label: "Tickets Confirmed", val: `${ticketDetails?.total_slots_confirmed || 0} / ${ticketDetails?.total_slots_booked}`, icon: ShieldCheck, color: "bg-emerald-50" },
										{ label: "Refund", val: "₹4,000.00", icon: Info, color: "bg-orange-50" }
									].map((stat, i) => (
										<Card key={i} className={cn("p-4 border-none shadow-sm flex items-center gap-4", stat.color)}>
											<div className="p-2 bg-white rounded-lg shadow-sm"><stat.icon className="w-4 h-4 text-[#172941]" /></div>
											<div>
												<p className="text-[12px] font-bold tracking-widest text-[#172941]/50 text-center">{stat.label}</p>
												<p className="font-bold text-[#172941] text-center">{stat.val}</p>
											</div>
										</Card>
									))}
								</div>
							)
						}

						{/* Document Action Callout */}
						{isAuthenticated && ticketDetails && ticketDetails.total_slots_booked > ticketDetails.total_slots_confirmed && (
							<div className="bg-[#172941] text-white p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#172941]/20">
								<div className="space-y-1">
									<h4 className="font-bold text-lg">Incomplete Documentation</h4>
									<p className="text-white/60 text-sm">Action required to confirm all booked slots.</p>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button className="bg-white text-[#172941] hover:bg-zinc-100 font-bold rounded-lg h-11 px-8">Confirm Slots</Button>
									</DialogTrigger>
									<DialogContent className="max-w-md bg-white border-none rounded-2xl p-8">
										<DialogHeader><DialogTitle className="text-2xl font-serif">Share Verification Link</DialogTitle></DialogHeader>
										<p className="text-[#172941]/60 text-sm py-4">Share this unique URL with your co-travellers. They must upload their identity documents to secure the booking.</p>
										<div className="flex items-center gap-2 bg-zinc-50 p-2 rounded-xl border border-zinc-100">
											<Input value={documentLink} readOnly className="border-none bg-transparent shadow-none focus-visible:ring-0 font-mono text-xs" />
											<Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(documentLink); toast.success("Link Copied"); }}>
												<Copy className="h-4 w-4" />
											</Button>
										</div>
										<Button className="w-full mt-6 bg-[#172941] h-12 rounded-xl font-bold" onClick={() => navigator.share && navigator.share({ url: documentLink })}>
											<Share2 className="w-4 h-4 mr-2" /> Share with Travellers
										</Button>
									</DialogContent>
								</Dialog>
							</div>
						)}

						{/* Tab Navigation */}
						<div className="sticky top-0 bg-[#FDFDFD] z-20 border-b border-zinc-200 flex gap-8 mb-8 overflow-x-auto no-scrollbar">
							{['hosts', 'brief', 'checklist', 'tickets', 'refund'].filter((tab) => !isAuthenticated && (tab === "refund" || tab === "tickets") ? false : true).map((tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={cn(
										"pb-4 text-xs font-bold tracking-[0.1em] transition-all relative whitespace-nowrap text-[15px]",
										activeTab === tab ? "text-[#172941]" : "text-[#172941]/30 hover:text-[#172941]/60"
									)}
								>
									{tab.charAt(0).toUpperCase() + tab.slice(1)}
									{activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#172941] animate-in slide-in-from-left-2" />}
								</button>
							))}
						</div>

						{/* Tab Content Rendering */}
						<div className="min-h-[400px]">
							{activeTab === 'brief' &&
								// <ul className="text-zinc-600 leading-[1.8] text-lg font-light space-y-4 max-w-3xl list-disc pl-6">
								// 	{campData.pitch.camp_brief
								// 		.split('\n')
								// 		.filter(point => point.trim() !== "") // Removes empty lines
								// 		.map((point, index) => (
								// 			<li key={index} className="pl-2">
								// 				{point.trim()}
								// 			</li>
								// 		))
								// 	}
								// </ul>
								<div className="text-zinc-600 leading-[1.8] text-lg font-light space-y-6 max-w-3xl whitespace-pre-wrap">{campData.pitch.camp_brief}</div>

							}

							{activeTab === 'checklist' && (
								// <div className="animate-in fade-in slide-in-from-bottom-2 max-w-4xl">
								// 	<div className="relative p-8 md:p-12 bg-white border border-[#172941]/10 rounded-3xl shadow-sm overflow-hidden">
								// 		{/* Decorative Icon Background */}
								// 		{/* <SquareCheckBigIcon className="absolute -bottom-8 -right-8 w-48 h-48 text-[#172941]/5 -rotate-12" /> */}

								// 		<div className="relative z-10 space-y-8">
								// 			{/* Header Section */}
								// 			<div className="flex items-center gap-4">
								// 				<div className="bg-[#172941] p-2.5 rounded-xl shadow-lg shadow-[#172941]/20">
								// 					<SquareCheck className="w-5 h-5 text-white" />
								// 				</div>
								// 				<div>
								// 					<p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#172941]/40 leading-none mb-1">
								// 						Traveller Guide
								// 					</p>
								// 					<h3 className="text-xl font-serif font-semibold text-[#172941]">
								// 						Host's Preparation Checklist
								// 					</h3>
								// 				</div>
								// 			</div>

								// 			{/* Main Content Paragraph */}
								// 			<div className="relative">
								// 				{/* Subtle Quote Mark */}
								// 				<span className="absolute -left-6 -top-2 text-4xl font-serif text-[#172941]/10 select-none">"</span>
								// 				<p className="text-lg md:text-xl text-[#172941]/70 leading-[1.8] font-light italic pl-2">
								// 					{campData.pitch.camp_checklist}
								// 				</p>
								// 			</div>

								// 			{/* Footer Insight */}
								// 			<div className="pt-8 border-t border-[#172941]/5 flex items-center justify-between">
								// 				<div className="flex items-center gap-3">
								// 					<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								// 					<p className="text-xs font-bold uppercase tracking-widest text-[#172941]/40">
								// 						Required Reading Before Departure
								// 					</p>
								// 				</div>
								// 				<div className="hidden md:block">
								// 					<span className="text-[10px] font-mono text-zinc-300">REF_CHK_100</span>
								// 				</div>
								// 			</div>
								// 		</div>
								// 	</div>
								// </div>
								<div className="text-zinc-600 leading-[1.8] text-lg font-light space-y-6 max-w-3xl whitespace-pre-wrap">{campData.pitch.camp_checklist}</div>
								// <ul className="text-zinc-600 leading-[1.8] text-lg font-light space-y-4 max-w-3xl list-disc pl-6">
								// 	{campData.pitch.camp_checklist
								// 		.split('\n')
								// 		.filter(point => point.trim() !== "") // Removes empty lines
								// 		.map((point, index) => (
								// 			<li key={index} className="pl-2">
								// 				{point.trim()}
								// 			</li>
								// 		))
								// 	}
								// </ul>
							)}

							{activeTab === 'hosts' && (
								<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
									{campData.collaborators.map((c, i) => (
										<HostCard key={i} host={c} />
									))}
								</div>
							)}

							{activeTab === 'tickets' && <TicketsTabContent campId={campId} isAuthenticated={isAuthenticated} />}

							{activeTab === 'refund' && (
								<div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
									<Table>
										<TableHeader className="bg-zinc-50/50">
											<TableRow>
												<TableHead className="text-[13px] font-bold text-zinc-600 py-4 pl-6"></TableHead>
												<TableHead className="text-[13px] font-bold text-zinc-600">Timestamp</TableHead>
												<TableHead className="text-[13px] font-bold text-zinc-600 text-right">Amount</TableHead>
												<TableHead className="text-[13px] font-bold text-zinc-600 text-right pr-6">Settlement</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{[
												{ label: "Refund Initiated", amt: "₹4,000.00", date: "Jan 12, 2026", id: "STLMT_A89BB7" },
												{ label: "Funds Disbursed", amt: "₹4,000.00", date: "Jan 14, 2026", id: "STLMT_A89BB7" }
											].map((row, i) => (
												<TableRow key={i} className="hover:bg-zinc-50 transition-colors">
													<TableCell className="font-semibold text-zinc-900 py-5 pl-6">{row.label}</TableCell>
													<TableCell className="text-zinc-900 text-sm">{row.date}</TableCell>
													<TableCell className="text-right text-zinc-900">{row.amt}</TableCell>
													<TableCell className="text-right font-mono text-[12px] text-zinc-900 pr-6 uppercase">{row.id}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							)}
						</div>
					</div>
				</div>
			</main>

			<BookingSheet
				isOpen={isBookingSheetOpen}
				onClose={() => setIsBookingSheetOpen(false)}
				campId={campId}
				price={campData.price_per_seat}
				spotsLeft={campData.total_seats}
				isFree={campData.price_per_seat === 0}
				onPay={() => { }}
			/>
			<PolicyDialog isOpen={false} onClose={() => {handleBooking}} />
		</div>
	);
}