"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle } from "lucide-react";
import React from "react";
import CreateTicketSheet from "@/components/CreateTicketSheet";
import { cn } from "@/lib/utils";
import { TravellerProfileResponse } from "@/lib/api/models/auth";

interface SupportSheetProps {
	isOpen: boolean;
	onClose: () => void;
	userProfile: TravellerProfileResponse | null;
	onTicketCreated?: () => void;
}

export default function SupportSheet({ isOpen, onClose, userProfile, onTicketCreated = () => {} }: SupportSheetProps) {
	const [isCreateTicketSheetOpen, setCreateTicketSheetOpen] = React.useState(false);
	const supportTickets = userProfile?.support_tickets || [];

	return (
		<>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side="right" className="min-w-[600px] bg-zinc-900 text-zinc-300 rounded-l-2xl shadow-xl">
					{/* Header */}
					<SheetHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
						<SheetTitle className="text-2xl font-bold text-zinc-300">Support</SheetTitle>
						<div className="flex items-center gap-2">
							<Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium mr-10" onClick={() => setCreateTicketSheetOpen(true)}>
								<PlusCircle className="h-4 w-4 mr-2" />
								New Ticket
							</Button>
							<SheetClose asChild>
								
							</SheetClose>
						</div>
					</SheetHeader>

					{/* Scrollable Content */}
					<div className="flex-1 overflow-y-auto p-6 space-y-4">
						{supportTickets.map((ticket, index) => (
							<Card key={index} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
								<CardContent className="p-4 space-y-3">
									<div className="flex items-center justify-between">
										<h3 className="font-semibold text-zinc-300 text-base">{ticket.subject}</h3>
										<Badge variant="secondary" className={cn("text-xs font-medium px-2 py-0.5", ticket.status === "open" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700")}>
											{ticket.status}
										</Badge>
									</div>

									<p className="text-sm text-gray-600">
										<span className="font-medium">Category:</span> {ticket.category}
									</p>

									<p className="text-sm text-gray-700 leading-relaxed">{ticket.message}</p>
								</CardContent>
							</Card>
						))}
					</div>

					{/* Empty State */}
					{supportTickets.length === 0 && (
						<div className="flex flex-col items-center justify-center h-full text-center p-8">
							<p className="text-zinc-400 text-lg">No support tickets</p>
							<p className="text-sm text-zinc-200 mt-1 text-lg">Create a new ticket if you need help.</p>
						</div>
					)}
				</SheetContent>
			</Sheet>

			{/* Nested Create Ticket Sheet */}
			<CreateTicketSheet isOpen={isCreateTicketSheetOpen} onClose={() => setCreateTicketSheetOpen(false)} userProfile={userProfile} onTicketCreated={onTicketCreated} />
		</>
	);
}
