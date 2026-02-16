"use client";

import React, { useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MediaUploadCard } from "../MediaUploadCard";
import { FileText, ListChecks, VideoOff } from "lucide-react";
import { CampFormValues, CampStatus } from "@/lib/types/api";
import YouTubePlayer from "@/components/ui/youtube-player";
import { cn } from "@/lib/utils";
type PitchTab = "brief" | "checklist";

export function PitchForm() {
	const [activeTab, setActiveTab] = React.useState<PitchTab>("brief");

	const { control, setValue, watch } = useFormContext<CampFormValues>();
	const status = watch("status")
	const isUpdatable = status == CampStatus.PENDING_REVIEW;

	const yt_video_url = watch("pitch.yt_video_url");

	const videoId = useMemo(() => {
		console.log("Video url" + yt_video_url);
		if (!yt_video_url) return null;
		// Handle YouTube Shorts
		if (yt_video_url.includes("/shorts/")) {
			return yt_video_url.split("/shorts/")[1]?.split("?")[0];
		}
		if (yt_video_url.includes("watch?v=")) {
			return yt_video_url.split("v=")[1]?.split("&")[0];
		}
		if (yt_video_url.includes("youtu.be/")) {
			return yt_video_url.split("youtu.be/")[1];
		}
		if (yt_video_url.includes("embed/")) {
			return yt_video_url.split("embed/")[1];
		}
		return null;
	}, [yt_video_url]);

	const opts = useMemo(() => ({
		width: "100%", // Corrected from "96rem"
		// height: "13.5rem", // Kept commented as per original
		playerVars: {
			autoplay: 0,
		},
	}), []);

	const isUpdateMode = !!yt_video_url;

	return (
		<div className="bg-zinc-950 mb-8 space-y-8 text-zinc-100">
    {/* Header */}
    <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">Pitch</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
            Hey, please add a short video explaining why your camp exists and how it adds value to a traveller’s life. This will work as a quick intro before they book.
        </p>
    </div>

    <div className="flex flex-col gap-8">
        {/* Video Section - Now Full Width or Large Landscape */}
        <div className="w-full">
            {isUpdateMode ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-full text-center text-sm font-black rounded-md text-white flex justify-around px-4">
                            <span>Pitch Video</span>
                        </div>
                    </div>
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black border border-zinc-900 shadow-2xl">
                        {videoId ? (
                            <YouTubePlayer
                                videoId={videoId}
                                isPlaying={false}
                                opts={{
                                    height: '100%',
                                    width: '100%',
                                    playerVars: { autoplay: 0 },
                                }}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-900/50 flex flex-col items-center justify-center gap-3">
                                <VideoOff className="w-8 h-8 text-zinc-800" />
                                <span className="text-[10px] font-bold text-zinc-700">No Video Found</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <FormField
                    control={control}
                    name="pitchVideo"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="h-8 w-fit text-[10px] font-black rounded-md bg-zinc-900 text-zinc-400 flex items-center px-4 border border-zinc-800 mb-4">
                                Pitch Video
                            </FormLabel>
                            <fieldset disabled={isUpdatable}>
                                <MediaUploadCard
                                    label="Video"
                                    orientation="landscape"
                                    onFileChange={(file) =>
                                        setValue("pitchVideo", file ?? undefined, {
                                            shouldDirty: true,
                                        })
                                    }
                                />
                            </fieldset>
                            <FormMessage className="text-red-400 mt-2" />
                        </FormItem>
                    )}
                />
            )}
        </div>

        {/* Editor Section */}
        <div className="flex flex-col space-y-4">
            {/* Sidebar Tabs */}
            <nav className="flex gap-2 p-1 bg-zinc-900/50 rounded-xl w-fit border border-zinc-900">
                <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                        "h-10 px-6 text-xs font-bold rounded-lg transition-all",
                        activeTab === "brief"
                            ? "bg-white text-black shadow-lg"
                            : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
                    )}
                    onClick={() => setActiveTab("brief")}
                >
                    <FileText className="mr-2 h-4 w-4" />
                    Camp Brief
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                        "h-10 px-6 text-xs font-bold rounded-lg transition-all",
                        activeTab === "checklist"
                            ? "bg-white text-black shadow-lg"
                            : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
                    )}
                    onClick={() => setActiveTab("checklist")}
                >
                    <ListChecks className="mr-2 h-4 w-4" />
                    Checklist
                </Button>
            </nav>

            <fieldset disabled={isUpdatable} className="w-full">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 min-h-[300px] overflow-hidden">
                    {activeTab === "brief" && (
                        <FormField
                            control={control}
                            name="pitch.campBrief"
                            render={({ field }) => (
                                <FormItem className="m-0 h-full">
                                    <Textarea
                                        {...field}
                                        placeholder="Describe your camp in detail..."
                                        className="min-h-[300px] w-full resize-none border-0 bg-zinc-950 p-6 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 rounded-lg"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {activeTab === "checklist" && (
                        <FormField
                            control={control}
                            name="pitch.checkList"
                            render={({ field }) => (
                                <FormItem className="m-0 h-full">
                                    <Textarea
                                        {...field}
                                        placeholder="What should travellers keep in mind?"
                                        className="min-h-[300px] w-full resize-none border-0 bg-zinc-950 p-6 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 rounded-lg"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
            </fieldset>
        </div>
    </div>
</div>
	);
}
