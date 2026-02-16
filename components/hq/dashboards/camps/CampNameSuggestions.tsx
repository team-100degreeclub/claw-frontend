"use client";

import * as React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Lightbulb, Compass, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CampNameSuggestionsProps {
	// onSuggestionClick: (suggestion: string) => void;
}

const curatedSuggestions = [
	{ title: "Talk under the stars", subtitle: "Open conversations about Gods" },
	{ title: "Five shots, five deaths", subtitle: "The art of planning in life" },
	{ title: "Lost my buddy", subtitle: "The art of letting things go" },
	{ title: "Dinner at my home", subtitle: "Honest stories from my service" },
	{ title: "50 is the new 20", subtitle: "How to relive life at 50" },
	{ title: "Stories from the field", subtitle: "Finding life in difficult situations" },
	{ title: "Trekking the Himalayas", subtitle: "Seeing nature and people as they are" },
	{ title: "Gardening at my farm", subtitle: "Exploring nature, spirit, and meaning" },
	{ title: "By the river", subtitle: "Silence and quiet talks" },
	{ title: "Cycling the North East", subtitle: "Breathing in consciousness" },
	{ title: "Cleaning Ladakh", subtitle: "Everyday cleaning, everyday meaning" },
	{ title: "A journey within", subtitle: "A weekend workshop" },
	{ title: "Let’s cook together", subtitle: "Food, wine, and depression" },
];

export default function CampNameSuggestions({ }: CampNameSuggestionsProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	// const handleSuggestionClick = (title: string, subtitle: string) => {
	// 	onSuggestionClick(`${title} – ${subtitle}`);
	// 	setIsOpen(false);
	// };

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
    <SheetTrigger asChild>
        <Button
            variant="outline"
            size="icon"
            className="relative border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all rounded-lg w-fit h-full px-4 py-2 m-0 animate-in fade-in zoom-in duration-500 gap-2 shadow-lg shadow-black/50"
        >
            {/* The Animated Ring - Swapped to Zinc/White */}
            <span className="absolute inset-0 rounded-lg ring-2 ring-white/20 animate-ping pointer-events-none" />

            <Lightbulb className="h-4 w-4 group-hover:animate-bounce text-yellow-500" />
            <p className="text-sm">Suggestions</p>
        </Button>
    </SheetTrigger>

    {/* Content Container - Zinc 950 Dark Theme */}
    <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-l border-zinc-900 p-0 flex flex-col h-full shadow-2xl">

        {/* Header Section */}
        <SheetHeader className="p-8 pb-6 bg-zinc-950 border-b border-zinc-900 shrink-0">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-zinc-100 p-1.5 rounded-md shadow-sm">
                    <Compass className="w-4 h-4 text-black" />
                </div>
                <SheetTitle className="text-2xl font-bold text-white tracking-tight">Camp Suggestions</SheetTitle>
            </div>
            <SheetDescription className="text-xs text-zinc-500 font-medium leading-relaxed">
                We've curated a list of camps that you might be interested in hosting.
            </SheetDescription>
        </SheetHeader>

        {/* List Section */}
        <ScrollArea className="flex-1 overflow-y-auto bg-zinc-950/50">
            <div className="px-4 py-6 space-y-2">
                {curatedSuggestions.map((item, index) => (
                    <button
                        key={index}
                        className="group w-full text-left p-4 rounded-xl transition-all duration-200 bg-zinc-900/40 border border-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20 flex items-center justify-between"
                    >
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-[11px] font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors  tracking-tight">
                                {item.subtitle}
                            </p>
                        </div>
                        {/* <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Compass className="w-4 h-4 text-emerald-500/50" />
                        </div> */}
                    </button>
                ))}
            </div>
        </ScrollArea>

        {/* Optional Footer (Kept for structure) */}
        {/* <div className="p-6 bg-zinc-950 border-t border-zinc-900 text-center shrink-0">
            <p className="text-[9px] font-bold  tracking-[0.3em] text-zinc-700">
                Curation Engine v2.0
            </p>
        </div> */}
    </SheetContent>
</Sheet>
	);
}