"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { InviteForm } from "./InviteForm";
import { InviteList } from "./InviteList";
import partnerService from "@/lib/services/partnerService";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { CampFormValues } from "@/lib/types/api";
import { email } from "zod";
import { tr } from "date-fns/locale";
import { AxiosError } from "axios";
import { Users } from "lucide-react";

interface CollaboratorInviteProps {
	isUpdateMode?: boolean;
	isUpdatable?: boolean;
	campId?: string;
}

export function CollaboratorInvite({
	isUpdateMode,
	isUpdatable,
	campId,
}: CollaboratorInviteProps) {
	const { control } = useFormContext<CampFormValues>();

	const {
		fields: partners,
		append,
		remove,
	} = useFieldArray({
		control,
		name: "collaborators",
	});

	console.log(partners);

	// ─────────────────────────────────────────────
	// Invite Partner
	// ─────────────────────────────────────────────
	const handleInvite = async (partner_email: string) => {

		toast.info("We’ve sent the invite to the host. As soon as the host accepts the request, you’ll see it in your camp. We’ll also notify you by email as well. Thanks.");
		append({
			collabId: "temp-" + uuid(),
			name: "temp",
			email: partner_email,
			status: "pending",
			created_at: new Date().toISOString(),
		});
		return;
		// try {
		// 	const alreadyInvited = partners.some(
		// 		(partner) => partner.email === partner_email
		// 	);

		// 	if (alreadyInvited) {
		// 		toast.error("Host already invited.");
		// 		return;
		// 	}
		// 	if (isUpdateMode && campId) {
		// 		const data = new FormData();
		// 		data.append("email", partner_email);
		// 		data.append("camp_id", campId);

		// 		const invite = await partnerService.invitePartner(data);

		// 		if (invite && invite.hasOwnProperty("partner_not_registered") && invite.partner_not_registered) {
		// 			toast.info("We’ve sent the invite to the host. As soon as the host accepts the request, you’ll see it in your camp. We’ll also notify you by email as well. Thanks.");
		// 			return;
		// 		}
		// 		append({
		// 			collabId: invite.id,
		// 			name: invite.name,
		// 			email: invite.email,
		// 			status: invite.status,
		// 			created_at: invite.created_at,
		// 		});
		// 	} else {
		// 		try {
		// 			const partner = await partnerService.getPartnerByEmail(partner_email);

		// 			append({
		// 				collabId: uuid(),
		// 				name: `${partner.first_name} ${partner.last_name}`,
		// 				email: partner_email,
		// 				status: "Pending",
		// 				created_at: new Date().toISOString(),
		// 			});

		// 			toast.success("Invite sent successfully");
		// 		}
		// 		catch (e: any) {
		// 			if ((e as AxiosError).response?.status === 404) {
		// 				append({
		// 					collabId: uuid(),
		// 					name: "",
		// 					email: partner_email,
		// 					status: "Pending",
		// 					created_at: new Date().toISOString(),
		// 				});

		// 				toast("We’ve sent the invite to the host. As soon as the host accepts the request, you’ll see it in your camp. We’ll also notify you by email as well. Thanks.");
		// 			} else {
		// 				throw e;
		// 			}
		// 		}
		// 	}
		// } catch (e) {
		// 	toast.error("Failed to invite host");
		// 	console.error(e);
		// }
	};

	// ─────────────────────────────────────────────
	// Remove Partner
	// ─────────────────────────────────────────────
	const handleRemove = async (index: number, collabId?: string | null) => {
		try {
			if (isUpdateMode && collabId) {
				console.log(partners)
				await partnerService.removePartnerInvite(collabId);
			}
			remove(index);
			toast.success("Collaborator removed");
		} catch (e) {
			toast.error("Failed to remove collaborator");
			console.error(e);
		}
	};

	return (
		<div className="w-full bg-zinc-950 rounded-xl space-y-8 shadow-sm mb-6">
    {/* Header */}
    <div className="space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight">
            Invite Collaborators
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
            You can collaborate by inviting other camp hosts to co-host your camp. If they’re not in the C.L.A.W Host database, we’ll send them an invite on your behalf.
        </p>
    </div>

    {/* Invite Input Container */}
    <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-900">
        <InviteForm onInvite={handleInvite} />
    </div>

    {/* Invite List Section */}
    <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <h4 className="text-sm text-zinc-600">
                Active Collaborators
            </h4>
            <span className="text-[10px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-800">
                {partners.length}
            </span>
        </div>

        {partners.length > 0 ? (
            <div className="grid gap-3">
                <InviteList
                    invitees={partners}
                    onRemove={(index) =>
                        handleRemove(index, partners[index]?.collabId)
                    }
                />
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50">
                <div className="bg-zinc-900 p-3 rounded-full mb-3">
                    <Users className="w-5 h-5 text-zinc-700" />
                </div>
                <p className="text-zinc-500 text-sm font-medium">
                    No collaborators assigned to this camp.
                </p>
                <p className="text-zinc-700 text-[11px] mt-1">
                    Start by typing an email address above.
                </p>
            </div>
        )}
    </div>
</div>
	);
}
