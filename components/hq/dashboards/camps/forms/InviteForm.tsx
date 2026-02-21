"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import partnerService from "@/lib/services/partnerService";
import { PartnerProfileResponse } from "@/lib/types/api";
import { AxiosError } from "axios";

const formSchema = z.object({
	email: z.string().email({ message: "Enter a valid email address." }),
});

interface InviteFormProps {
	onInvite: (partner_email: string) => void;
}

export function InviteForm({ onInvite }: InviteFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// const partnerData = await partnerService.invitePartner(values.email);
			onInvite(values.email);
			form.reset();
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			if (axiosError.response?.status === 404) {
				// Partner not found, still "invite" them by sending their email,
				// and inform the user that an invite will be sent.
				form.setError("email", { type: "manual", message: "Host not found. An invite will be sent instead." });
				const tempId = `temp-${Date.now()}`;
				onInvite(values.email); // Minimal data for non-existent partner
				form.reset();
			} else {
				form.setError("email", { type: "manual", message: "An unexpected error occurred." });
			}
		}
	}

	return (
		<Form {...form}>
    <div className="flex w-full max-w-lg items-start gap-3">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className="flex-grow">
                    <FormControl>
                        <Input 
                            type="email" 
                            placeholder="You can find fellow hosts on the C.L.A.W Team database" 
                            className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-white focus:ring-white transition-all rounded-lg"
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage className="text-red-400 text-[11px] mt-1" />
                </FormItem>
            )}
        />
        <Button 
            type="submit" 
            onClick={e => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }} 
            className="h-11 px-6 bg-white text-black hover:bg-zinc-200 font-bold rounded-lg transition-colors"
        >
            Invite
        </Button>
    </div>
</Form>
	);
}
