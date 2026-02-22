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

interface Host {
   collaboration_id: string;
    first_name?: string;
    last_name?: string;
    bio?: string;
    profile_image_url?: string;
}

interface Camp {
    id: string;
    type: string;
    name: string;
    video_id: string;
    location: string;
    campDates: string;
    duration: string;
    meetupLocation: string;
    meetupTime: string;
    eligibility: string;
    genders: string;
    slotsRemaining: string;
    price: number;
    isFree: boolean;
    hosts: Host[];
    brief: string;
    checklist: string;
}

export default function CampViewPage() {
    const router = useRouter();
    const params = useParams();
    const campId = params.camp_id as string;

    const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);

    const adventureCampData: Camp = {
        id: "adventure-camp-1",
        type: "Adventure/Land",
        name: "Himalayan Endurance",
        video_id: "H9-OOl_9r6I",
        location: "Leh, Ladakh",
        campDates: "Mar 12 - Mar 20",
        duration: "8 Days Duration",
        meetupLocation: "Leh Airport",
        meetupTime: "Mar 11, 09:00 AM",
        eligibility: "18-40 Yrs",
        genders: "All Genders",
        slotsRemaining: "1/10",
        price: 19999,
        isFree: false,
        hosts: [
            {
                collaboration_id: "Major-Vivek-Jacob",
                first_name: "Major Vivek",
                last_name: "Jacob",
                bio: "The mastermind behind CLAW Global. A specialist in high-altitude combat and rescue operations with decades of experience in the world's harshest terrains.",
                profile_image_url: "/vivek_jacob.jpg",
            },
            {
                collaboration_id: "Capt-Sameer-S",
                first_name: "Capt",
                last_name: "Sameer S.",
                bio: "Maritime extraction specialist and master of underwater tactical operations. Leading the Water Domainmissions with surgical precision.",
                profile_image_url: "/gaurav_bali.jpg",
            },
            {
                collaboration_id: "Lt-Col-Rhea-D",
                first_name: "Lt. Col.",
                last_name: "Rhea D.",
                bio: "Mental resilience expert and SERE (Survival, Evasion, Resistance, and Escape) instructor. Hermissions focus on the psychological threshold of the human spirit.",
                profile_image_url: "/gaurav_bali_2.jpg",
            }
        ],
        brief: `Experience high-altitude hiking.
Develop mental resilience in the world's harshest terrains.
Led by ex-Para SF and MARCOS veterans.`,
        checklist: `Gear: All-weather clothing, sturdy boots, medical kit.
Fitness: High physical endurance required.
Essentials: Hydration pack, navigation tools.
Safety: Follow all instructions, emergency protocols.`,
    };

    const spiritRoadsCampData: Camp = {
        id: "spirit-roads-camp-1",
        type: "Conversation",
        name: "Dinner At My Home – Honest Stories From My Service",
        video_id: "H9-OOl_9r6I", // Placeholder, ideally a different video
        location: "Manali, Himachal Pradesh",
        campDates: "Apr 5 - Apr 10",
        duration: "6 Days Duration",
        meetupLocation: "Manali Bus Stand",
        meetupTime: "Apr 4, 12:00 PM",
        eligibility: "20-50 Yrs",
        genders: "All Genders",
        slotsRemaining: "5/15",
        price: 15000,
        isFree: false,
        hosts: [
            {
                collaboration_id: "Dr.-Anya-Sharma",
                first_name: "Dr. Anya",
                last_name: "Sharma",
                bio: "A renowned expert in cognitive behavioral therapy and mindfulness, Dr. Sharma helps individuals unlock their potential through guided conversations and meditation.",
                profile_image_url: "/vivek_jacob.jpg",
            },
            {
                collaboration_id: "Professor-K.L.-Singh",
                first_name: "Professor K.L.",
                last_name: "Singh",
                bio: "Professor Singh specializes in ancient philosophies and their modern applications, fostering deep intellectual discussions and critical thinking.",
                profile_image_url: "/gaurav_bali.jpg",
            }
        ],
        brief: `I am hosting a simple vegetarian dinner at my home.
We will sit together, share our food, and have conversations about my service. 
This is just honest conversations where I share about how we worked, some operations we did, and how you can build a mindset that helps you understand yourself better.`,
        checklist: `Dinner begins at 8 pm sharp.
Please don’t get any food. I will be cooking for you personally.
The seating will be Indian style, on the floor.
I have a pet dog at home, Goofy, a golden retriever. He will be around and will not be tied.
Please wear comfortable clothes, no formality.
We will clean together before leaving.

PS
Oh.. please do not ask how to join the Army..`,
    };

    const selectedCamp = campId === "1" ? adventureCampData : spiritRoadsCampData;

    // Placeholder for actual camp data. In a real app, this would be fetched from an API.
    const campSpotsLeft = parseInt(selectedCamp.slotsRemaining.split('/')[0]); // Assuming '1/10' means 1 spot left
    const isFreeCamp = selectedCamp.isFree;

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
                        src={`https://www.youtube.com/embed/${selectedCamp.video_id}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=0&rel=0&start=109&showinfo=0&playlist=${selectedCamp.video_id}&enablejsapi=1`}
                        allow="autoplay; encrypted-media"
                        className="absolute top-0 left-0 w-full h-full border-none"
                        title="Camp Hero Video"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Camp Identity Overlay */}
                <div className="absolute bottom-24 left-10 md:left-5">
                    <span className="bg-white text-green-500 p-3 py-2 rounded-sm text-xs font-black tracking-[0.1em]">
                        {selectedCamp.type}
                    </span>
                    <h1 className="text-6xl md:text-5xl font-black leading-none mt-4">
                        {selectedCamp.name}
                    </h1>
                </div>
            </section>

            {/* 2. Tactical Info Bar (Data Points) */}
            <div className="relative z-10 -mt-20 mx-4 bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <InfoItem icon={<MapPin className="text-red-600" />} label="Location" value={selectedCamp.location} subValue="Google Maps Pin" href="https://maps.google.com" />
                    <InfoItem icon={<Calendar className="text-red-600" />} label="Camp Dates" value={selectedCamp.campDates} subValue={selectedCamp.duration} />
                    <InfoItem icon={<Clock className="text-red-600" />} label="Meetup" value={selectedCamp.meetupLocation} subValue={selectedCamp.meetupTime} href="https://maps.google.com" />
                    <InfoItem icon={<Users className="text-red-600" />} label="Eligibility" value={selectedCamp.eligibility} subValue={selectedCamp.genders} />
                    <InfoItem icon={<Users className="text-red-600" />} label="Slots Remaining" value={selectedCamp.slotsRemaining} />
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 ">
                    <div className="flex gap-10">
                        {/* <div>
                            <p className="text-[10px] font-black text-zinc-500 tracking-widest">Slots Remaining</p>
                            <p className="text-2xl font-black text-white italic">1/10 <span className="text-xs text-red-600 not-italic ml-2">Filling Fast</span></p>
                        </div> */}
                        <div>
                            {/* <p className="text-sm font-black text-zinc-500 tracking-widest">Price</p> */}
                            <p className="text-2xl font-black text-white"><IndianRupee className="inline h-5 w-5 -mt-1" /> {selectedCamp.price.toLocaleString("en-IN")} <span className="text-sm text-zinc-400 ml-1">/ Traveller</span></p>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => setIsBookingSheetOpen(true)} className="mr-2 w-full md:w-30 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-black tracking-[0.2em] h-10 text-xs shadow-[0_0_20px_rgba(220,38,38,0.3)] p-0">
                            Buy Now
                        </Button>
                        <Button disabled className="mr-2 w-full md:w-30 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-black tracking-[0.2em] h-10 text-xs shadow-[0_0_20px_rgba(220,38,38,0.3)]">
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

                    <TabsContent value="hosts" className="">
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2">
                        {selectedCamp.hosts.map((host, index) => (
                            <HostCard
                                host={host}
                            />
                        ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="brief" className="prose prose-invert">
                        <p className="text-zinc-400 leading-relaxed text-lg">{renderNewlines(selectedCamp.brief)}</p>
                    </TabsContent>

                    <TabsContent value="checklist" className="prose prose-invert">
                        <p className="text-zinc-400 leading-relaxed text-lg">{renderNewlines(selectedCamp.checklist)}</p>
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
                campId={selectedCamp.id}
                price={selectedCamp.price}
                spotsLeft={campSpotsLeft}
                isFree={selectedCamp.isFree}
                onPay={handleBooking} // Pass handleBooking to BookingSheet
            />
            {/* PolicyDialog is not directly opened by a button, but could be integrated if needed */}
            <PolicyDialog isOpen={false} onClose={() => { }} />
        </div>
    );
}

// Helper function to render newlines
function renderNewlines(text: string) {
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));
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