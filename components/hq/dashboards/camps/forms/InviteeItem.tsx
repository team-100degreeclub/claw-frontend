"use client";

// import { DisplayInvitee } from "./CollaboratorInvite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, MoreVertical, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CollaborationsPartnerResponse } from "@/lib/types/api";

interface InviteeItemProps {
	invitee: CollaborationsPartnerResponse;
	onRemove: (id: number) => void;
	index: number;
}

export function InviteeItem({ invitee, onRemove, index }: InviteeItemProps) {
	const formattedDate = format(invitee.created_at, "dd MMMM yyyy, h:mm a");

	return (
		<Card className="bg-zinc-900/40 border border-zinc-900 shadow-sm hover:border-zinc-800 transition-all group">
    <CardContent className="px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-zinc-100 truncate text-sm tracking-tight">{invitee.name}</p>
                    <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-700/50 uppercase font-bold tracking-tighter">
                        #{invitee.status}
                    </span>
                </div>
                
                <div className="flex items-center gap-3">
                    <p className="text-sm text-zinc-400 truncate font-medium">{invitee.email}</p>
                    <span className="h-1 w-1 rounded-full bg-zinc-500" />
                    <span className="text-sm text-zinc-400">{formattedDate}</span>
                </div>
            </div>
        </div>

        {/* Right: Menu Trigger */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg flex-shrink-0 transition-colors"
                >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-48 bg-zinc-950 border border-zinc-800 shadow-2xl p-1"
            >
                <DropdownMenuItem 
                    className="text-zinc-300 focus:bg-zinc-900 focus:text-white cursor-pointer rounded-md"
                >
                    <LogOut className="mr-2 h-4 w-4 text-zinc-500" />
                    <span className="text-xs font-medium">Exit Collaboration</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-zinc-900 my-1" />
                
                <DropdownMenuItem 
                    onClick={() => onRemove(index)} 
                    className="text-red-400 focus:bg-red-950/30 focus:text-red-400 cursor-pointer rounded-md"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="text-xs font-medium">Remove Partner</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </CardContent>
</Card>
	);
}
