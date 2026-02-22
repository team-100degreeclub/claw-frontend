"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { HostPolicy } from "./HostPolicy";
import { TravelerPolicy } from "./TravelerPolicy";

export default function TermsAndPrivacyDialog() {
	const pathname = usePathname();
	const isHostPath = pathname.includes("/hq");

	return (
		<div className="animate-in fade-in slide-in-from-right-4 duration-500">
			<ScrollArea className="h-full">
				{isHostPath ? <HostPolicy /> : <TravelerPolicy />}
			</ScrollArea>
		</div>
	);
}
