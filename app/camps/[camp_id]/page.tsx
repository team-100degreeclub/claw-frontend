"use client";

import { MapPin, Calendar, Users, IndianRupee, Clock, ChevronRight, Share2, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampCard } from "@/components/camps/CampCard";
import { MOCK_CAMPS } from "@/lib/mockCamps";
import { HostCard } from "@/components/camps/HostCard"; // Importing HostCard from here, will use the one from instructions.md as a sub-component.
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BookingSheet from "@/components/camps/BookingSheet";
import PolicyDialog from "@/components/camps/PolicyDialog";
import { BookedForTraveller, CampRegistrationCreate, PaymentVerificationRequest } from "@/lib/api/models/registrations";
import { toast } from "sonner";
import { registrationService } from "@/lib/api/services/registrations";
import * as React from "react"; // Explicitly import React for React.useState etc.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

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

export default function CampViewPage() {
    const VIDEO_ID = "H9-OOl_9r6I";
    const router = useRouter();
    const params = useParams();
    const campId = params.camp_id as string; // Assuming parameter name is camp_id

    const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);

    // Placeholder for actual camp data. In a real app, this would be fetched from an API.
    const campPrice = 19999;
    const campSpotsLeft = 5; // Assuming '1/10' means 1 spot left
    const isFreeCamp = campPrice === '0';

    // Placeholder for useAuth hook. In a real app, this would be a proper context.
    const { isAuthenticated } = { isAuthenticated: true }; // Assuming user is always authenticated for now

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
                book_for_primary_user: book_for_primary_user,
                other_travellers: attendees,
            };

            const response = await registrationService.registerForCamp(payload);

            if (response.registration.status === "success" && isFree) {
                toast.success("Registration Successful!", {
                    description: "You have successfully registered for the free camp.",
                });
                router.push("/profile?tab=camps");
                setIsBookingSheetOpen(false);
            } else if (
                response.registration.status === "locked" &&
                response.razorpay_order &&
                response.payment
            ) {
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
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
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
                        name: "",
                        email: "",
                        contact: "",
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
        <div className="min-h-screen bg-black text-white">
            {/* 1. Full Viewport Video Hero */}
            <section className="relative w-full overflow-hidden pb-[56.25%]">
                <div className="absolute inset-0 h-full w-full pointer-events-none">
                    <iframe
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=0&rel=0&start=109&showinfo=0&playlist=${VIDEO_ID}&enablejsapi=1`}
                        allow="autoplay; encrypted-media"
                        className="absolute top-0 left-0 w-full h-full border-none"
                        title="Camp Hero Video"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Camp Identity Overlay */}
                <div className="absolute bottom-24 left-10 md:left-5">
                    {/* <span className="bg-white/20 text-green-500 p-3 py-2 rounded-sm text-lg font-black tracking-[0.1em]">
                        Active
                    </span> */}
                    <h1 className="text-6xl md:text-5xl font-black leading-none mt-4">
                        Himalayan Endurance
                    </h1>
                </div>
            </section>

            {/* 2. Tactical Info Bar (Data Points) */}
            <div className="relative z-10 -mt-20 mx-4 bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <InfoItem icon={<MapPin className="text-red-600" />} label="Location" value="Leh, Ladakh" subValue="Google Maps Pin" href="https://maps.google.com" />
                    <InfoItem icon={<Calendar className="text-red-600" />} label="Camp Dates" value="Mar 12 - Mar 20" subValue="8 Days Duration" />
                    <InfoItem icon={<Clock className="text-red-600" />} label="Meetup" value="Leh Airport" subValue="Mar 11, 09:00 AM" href="https://maps.google.com" />
                    <InfoItem icon={<Users className="text-red-600" />} label="Eligibility" value="18-40 Yrs" subValue="All Genders" />
                    <InfoItem icon={<Users className="text-red-600" />} label="Slots Remaining" value="1/10" />
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 ">
                    <div className="flex gap-10">
                        {/* <div>
                            <p className="text-[10px] font-black text-zinc-500 tracking-widest">Slots Remaining</p>
                            <p className="text-2xl font-black text-white italic">1/10 <span className="text-xs text-red-600 not-italic ml-2">Filling Fast</span></p>
                        </div> */}
                        <div>
                            {/* <p className="text-sm font-black text-zinc-500 tracking-widest">Price</p> */}
                            <p className="text-2xl font-black text-white"><IndianRupee className="inline h-5 w-5 -mt-1" /> {campPrice.toLocaleString("en-IN")} <span className="text-sm text-zinc-400 ml-1">/ Traveller</span></p>
                        </div>
                    </div>
                    <div>
                    <Button onClick={() => setIsBookingSheetOpen(true)} className="mr-2 w-full md:w-30 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-black tracking-[0.2em] h-10 text-xs shadow-[0_0_20px_rgba(220,38,38,0.3)] p-0">
                        Buy Now
                    </Button>
                    <Button className="mr-2 w-full md:w-30 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-black tracking-[0.2em] h-10 text-xs shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                        Volunteer
                    </Button>
                    <Button className="w-fit md:w-30 bg-zinc-700 hover:bg-zinc-800 hover:cursor-pointer text-white font-black tracking-[0.2em] h-10 text-xs">
                        Share <Share2Icon className="mr-2 h-4 w-4" />
                    </Button>
                    </div>
                </div>
            </div>

            {/* 3. Mission Briefing Tabs */}
            <section className="container mx-auto py-20 px-4">
                <Tabs defaultValue="hosts" className="w-full">
                    <TabsList className="relative bg-transparent border-zinc-800 w-full justify-start rounded-none h-auto p-0 mb-12 flex gap-8">
                        <TabsTrigger
                            value="hosts"
                            className="relative px-0 py-6 bg-transparent rounded-xl border-b-2 border-transparent
               text-sm font-black tracking-[0.1em] text-zinc-500
               data-[state=active]:dark:text-green-600
               hover:text-zinc-200 transition-all duration-300 ease-out hover:cursor-pointer"
                        >
                            Hosts
                        </TabsTrigger>

                        <TabsTrigger
                            value="brief"
                            className="relative px-0 py-6 bg-transparent rounded-xl border-b-2 border-transparent
               text-sm font-black tracking-[0.1em] text-zinc-500
               data-[state=active]:dark:text-green-600
               hover:text-zinc-200 transition-all duration-300 ease-out hover:cursor-pointer"
                        >
                            Camp Brief
                        </TabsTrigger>

                        <TabsTrigger
                            value="checklist"
                            className="relative px-0 py-6 bg-transparent rounded-xl border-b-2 border-transparent
               text-sm font-black tracking-[0.1em] text-zinc-500
               data-[state=active]:dark:text-green-600
               hover:text-zinc-200 transition-all duration-300 ease-out hover:cursor-pointer"
                        >
                            Checklist
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="hosts" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <HostCard
                            name="Major Vivek Jacob"
                            role="Ex-Para SF"
                            img="/vivek_jacob.jpg"
                            bio="The mastermind behind CLAW Global. A specialist in high-altitude combat and rescue operations with decades of experience in the world's harshest terrains."
                            specialization={["Indian Army Special Forces", "Founder, C.L.A.W"]}
                        />
                        <HostCard
                            name="Capt. Sameer S."
                            role="Combat Diver"
                            img="/gaurav_bali.jpg"
                            bio="Maritime extraction specialist and master of underwater tactical operations. Leading the Water Domain missions with surgical precision."
                            specialization={["MARCOS", "Member, C.L.A.W"]}
                        />
                        <HostCard
                            name="Lt. Col. Rhea D."
                            role="Survival Instructor"
                            img="/gaurav_bali_2.jpg"
                            bio="Mental resilience expert and SERE (Survival, Evasion, Resistance, and Escape) instructor. Her missions focus on the psychological threshold of the human spirit."
                            specialization={["NSG", "Member, C.L.A.W"]}
                        />
                    </TabsContent>

                    <TabsContent value="brief" className="prose prose-invert">
                        {/* <h3 className="text-2xl font-black tracking-tighter mb-4">Brief</h3> */}
                        <p className="text-zinc-400 leading-relaxed text-lg">The camp is designed to offer a structured yet flexible experience led by the host, with activities, discussions, or sessions aligned to the camp’s objective. Participants are encouraged to come with an open mindset, be actively involved, and respect differing perspectives. The duration, flow, and pace of the camp may vary, so adaptability is important. Any materials, instructions, or updates will be shared by the host before or during the camp. The environment is intended to be safe, inclusive, and respectful, and all participants are expected to uphold these values. Outcomes may include learning, networking, shared experiences, or personal growth, depending on the nature of the camp. For any clarifications before or during the camp, participants should refer to the communication shared by the organizers or reach out to the designated contact person.</p>
                    </TabsContent>

                    <TabsContent value="checklist" className="prose prose-invert">
                        {/* <h3 className="text-2xl font-black tracking-tighter mb-4">Checklist</h3> */}
                        <p className="text-zinc-400 leading-relaxed text-lg">Please review all details carefully before attending. Ensure you have completed your registration, shared any required personal or emergency information, and confirmed the camp date, time, and location. Arrive on time and follow the schedule shared by the host. Carry a valid ID, any passes or confirmations sent to you, and keep your phone charged for updates or coordination. Dress appropriately for the nature of the camp and the activities planned, and bring any personal essentials you may need during the event. If meals are included, note the timings and inform the organizers in advance about any dietary restrictions or allergies. Follow all safety instructions given by the host, respect fellow participants, and adhere to the code of conduct throughout the camp. In case of any discomfort, emergency, or uncertainty, immediately reach out to the camp organizers or designated point of contact.
                            </p>
                    </TabsContent>
                </Tabs>
            </section>

            {/* 4. More Camps (Horizontal Scroll) */}
            <section className="bg-zinc-950 py-20 border-t border-zinc-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-black tracking-tighter mb-10">More Camps</h2>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-10">
                        {/* Reuse CampCard Component */}
                        {MOCK_CAMPS.map((camp) => (
                            <CampCard key={camp.id} camp={camp} />
                        ))}
                    </div>
                </div>
            </section>

            <BookingSheet
                isOpen={isBookingSheetOpen}
                onClose={() => setIsBookingSheetOpen(false)}
                campId={campId}
                price={campPrice}
                spotsLeft={campSpotsLeft}
                isFree={isFreeCamp}
                onPay={handleBooking} // Pass handleBooking to BookingSheet
            />
            {/* PolicyDialog is not directly opened by a button, but could be integrated if needed */}
            <PolicyDialog isOpen={false} onClose={() => {}} />
        </div>
    );
}

// Sub-components
function InfoItem({ icon, label, value, subValue, href }: any) {
    return (
        <div className="space-y-2 w-fit">
            <div className="flex items-center gap-2">
                {/* {icon} */}
                <span className="text-[12px] font-black text-zinc-400">{label}</span>
            </div>
            <div className="">
                {href ? (
                    <a href={href} className="">
                        <p className="text-sm font-bold tracking-tight underline">{value} </p>
                        {/* {value} <ChevronRight className="h-2 w-2" /> */}
                        {label == "Meetup" && <p className="text-[11px] font-bold text-zinc-400">{subValue}</p>}
                    </a>
                ) : (
                    <>
                    <p className="text-sm font-bold tracking-tight">{value}</p>
                    <p className="text-[11px] font-bold text-zinc-400">{subValue}</p>
                    </>
                )}
            </div>
            <div>
            </div>
        </div>
    );
}

function ChecklistItem({ item }: { item: string }) {
    return (
        <div className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/50 rounded-lg">
            <div className="h-2 w-2 bg-red-600 rounded-full" />
            <span className="text-sm font-bold tracking-tight">{item}</span>
        </div>
    );
}