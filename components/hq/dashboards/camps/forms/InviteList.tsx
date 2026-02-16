"use client";

import { CollaborationsPartnerResponse } from "@/lib/types/api";
// import { DisplayInvitee } from "./CollaboratorInvite";
import { InviteeItem } from "./InviteeItem";

interface InviteListProps {
	invitees: CollaborationsPartnerResponse[];
	onRemove: (id: number) => void;
}

export function InviteList({ invitees, onRemove }: InviteListProps) {
	console.log(invitees)
	return (
		<div className="flex flex-col gap-4 mt-8 mb-4 w-full">
			{invitees.map((invitee, index) => (
				<InviteeItem key={invitee.collabId} invitee={invitee} index={index} onRemove={onRemove} />
			))}
		</div>
	);
}
