import TermsAndPrivacyDialog from "@/components/profile/TermsAndPrivacyDialog";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface PolicySheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PolicySheet({ isOpen, onClose }: PolicySheetProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="min-w-[600px] bg-background text-gray-900 border-l border-border rounded-l-2xl">
                <SheetHeader className="flex flex-row items-center justify-between">
                    {/* <SheetTitle className="text-2xl font-bold">Policy</SheetTitle> */}
                    {/* <SheetClose asChild className="">
                    </SheetClose> */}
                        <Button variant="default" size="icon" className="bg-black/0 text-white hover:bg-white/10">
                            <X className="w-6 h-6" />
                        </Button>
                </SheetHeader>
                <ScrollArea className="h-full">
                    <TermsAndPrivacyDialog />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}