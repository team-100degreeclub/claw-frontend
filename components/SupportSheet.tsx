"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle } from "lucide-react";
import React from "react";
import CreateTicketSheet from "@/components/CreateTicketSheet";
import { cn } from "@/lib/utils";
import { SupportTicketForProfile, TravellerProfileResponse } from "@/lib/api/models/auth";

interface SupportSheetProps {
	isOpen: boolean;
	onClose: () => void;
	userProfile: TravellerProfileResponse | null;
	onTicketCreated?: () => void;
}

	const dummySupportTickets: SupportTicketForProfile[] = [
		{
			subject: "Test Support Ticket",
			message: "This is a test support ticket",
			category: "technical",
			status: "open",
		},
		{
			subject: "Test Support Ticket 2",
			message: "This is a test support ticket 2",
			category: "payment",
			status: "in_progress",
		},
	];

export default function SupportSheet({ isOpen, onClose, userProfile, onTicketCreated = () => {} }: SupportSheetProps) {
	const [isCreateTicketSheetOpen, setCreateTicketSheetOpen] = React.useState(false);
	const supportTickets = userProfile?.support_tickets || dummySupportTickets;

	return (
		<>
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="min-w-[600px] bg-black border-l border-zinc-900 text-zinc-300 p-0 shadow-2xl">
            {/* Header */}
            <SheetHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-6 border-b border-zinc-900 bg-zinc-950/50">
                <div className="space-y-1">
                    <SheetTitle className="text-xl font-bold text-white">Support</SheetTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-9 px-4 mr-8" 
                        onClick={() => setCreateTicketSheetOpen(true)}
                    >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Ticket
                    </Button>
                </div>
            </SheetHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 no-scrollbar">
                {supportTickets.map((ticket, index) => (
                    <Card key={index} className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden hover:border-zinc-700 transition-colors">
                        <CardContent className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-bold text-white text-sm leading-tight">{ticket.subject}</h3>
                                <Badge 
                                    className={cn(
                                        "text-[10px] font-bold px-2 py-0.5 rounded-none border", 
                                        ticket.status === "open" 
                                            ? "bg-yellow-900/10 text-yellow-400 border-yellow-900/30" 
                                            : ticket.status === "in_progress" ? "bg-cyan-900/10 text-cyan-400 border-cyan-900/30" : "bg-green-500 text-green-500 border-green-800"
                                    )}
                                >
                                    {ticket.status === "open" ? "Open" : ticket.status === "in_progress" ? "In Progress" : "Closed"}
                                </Badge>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-zinc-600">Category</span>
                                    <span className="text-[10px] text-zinc-400">{ticket.category}</span>
                                </div>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{ticket.message}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Empty State */}
                {supportTickets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-12 h-12 bg-zinc-900/50 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                             <PlusCircle className="w-6 h-6 text-zinc-700" />
                        </div>
                        <p className="text-zinc-400 font-bold text-sm">No support tickets</p>
                        <p className="text-xs text-zinc-600 mt-1 max-w-[200px]">Create a new ticket if you require technical or operational assistance.</p>
                    </div>
                )}
            </div>
        </SheetContent>
    </Sheet>

    {/* Nested Create Ticket Sheet */}
    <CreateTicketSheet 
        isOpen={isCreateTicketSheetOpen} 
        onClose={() => setCreateTicketSheetOpen(false)} 
        userProfile={userProfile} 
        onTicketCreated={onTicketCreated} 
    />
</>
	);
}
