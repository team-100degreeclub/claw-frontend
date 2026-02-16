"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface GoViralSectionProps {
	campId?: string | undefined;
	campSlug?: string | undefined;
}

export function GoViralSection({ campId, campSlug }: GoViralSectionProps) {
	const shareUrl = `https://100degree.club/camps/${campSlug}`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			toast.success("Link copied to clipboard!");
		} catch {
			toast.error("Failed to copy link");
		}
	};

	return (
		<div className="bg-zinc-950 mb-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                    Share Your Camp
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    Here you go. Your camp is live. You can share this link on your social media so that travellers can visit and register. We’re sure this camp will create happy memories and help you build new relationships. Wishing you all the very best and lots of love for your camp.
                </p>
            </div>

            {/* Share URL */}
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <label className="sr-only">Shareable Link</label>
                    <Input
                        value={shareUrl}
                        readOnly
                        className="h-11 border-zinc-800 bg-zinc-900 text-zinc-100 font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>

                <Button
                    type="button"
                    onClick={handleCopy}
                    className="h-11 bg-white text-black hover:bg-zinc-200 px-6 font-bold shadow-lg shadow-white/5 transition-all"
                >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                </Button>
            </div>

            <p className="text-center text-sm text-zinc-400 mt-6">
                Anyone with this link can view and apply to your camp.
            </p>
        </div>
	);
}

