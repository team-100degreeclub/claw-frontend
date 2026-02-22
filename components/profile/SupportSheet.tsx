import TermsAndPrivacyDialog from "@/components/profile/TermsAndPrivacyDialog";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Support from "./Support";
import { TravellerProfileResponse } from "@/lib/types/api";

interface SupportSheetProps {
    isOpen: boolean;
    onClose: () => void;
    userProfile: TravellerProfileResponse | null;
    onTicketCreated?: () => void;
}

export default function SupportSheet({ isOpen, onClose }: SupportSheetProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="min-w-[600px] bg-background text-gray-900 border-l border-border rounded-l-2xl">
                <SheetHeader className="flex flex-row items-center justify-between">
                    <SheetTitle className="text-2xl font-bold">Policy</SheetTitle>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="w-6 h-6" />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <ScrollArea className="h-full p-6">
                    <Support />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}