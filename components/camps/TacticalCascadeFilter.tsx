"use client";

import * as React from "react";
import { ChevronRight, MapPin, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Option {
    label: string;
    value: string;
    children?: Option[];
}

interface Props {
    title: string;
    icon: React.ElementType;
    data: Option[];
    selection: string[];
    onSelect: (vals: string[]) => void;
}

const getAncestors = (items: Option[], targetValue: string, path: string[] = []): string[] | null => {
    for (const item of items) {
        // Check if this item is the target based on unique value
        if (item.value === targetValue) return path;

        if (item.children) {
            // Pass the current item's value into the path
            const found = getAncestors(item.children, targetValue, [...path, item.value]);
            if (found) return found;
        }
    }
    return null;
};

export function TacticalCascadeFilter({ title, icon: Icon, data, selection, onSelect }: Props) {
    const toggle = (item: Option) => {
        const val = item.value; // Using unique value instead of label

        if (selection.includes(val)) {
            // Deselecting
            onSelect(selection.filter((v) => v !== val));
        } else {
            // Selecting: Find ancestor values (IDs) and add them
            const ancestors = getAncestors(data, val) || [];
            const updated = Array.from(new Set([...selection, val, ...ancestors]));
            onSelect(updated);
        }
    };

    const renderItems = (items: Option[]) => {
        return items.map((item) => {
            const isSelected = selection.includes(item.value);

            if (item.children && item.children.length > 0) {
                return (
                    <DropdownMenuSub key={item.value}>
                        <DropdownMenuSubTrigger className="flex items-center justify-between py-3 px-3 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer">
                            <div className="flex items-center gap-3" onClick={(e) => { e.stopPropagation(); toggle(item); }}>
                                <div className={cn(
                                    "h-4 w-4 border rounded flex items-center justify-center transition-all",
                                    isSelected ? "bg-red-600 border-red-600" : "border-zinc-300 dark:border-zinc-700"
                                )}>
                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="font-bold text-[11px] ">{item.label}</span>
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="min-w-[180px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-1 shadow-xl">
                                {renderItems(item.children)}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                );
            }

            return (
                <DropdownMenuItem
                    key={item.value}
                    className="flex items-center gap-3 py-3 px-3 focus:bg-zinc-100 dark:focus:bg-zinc-900 cursor-pointer"
                    onSelect={(e) => { e.preventDefault(); toggle(item); }}
                >
                    <div className={cn(
                        "h-4 w-4 border rounded flex items-center justify-center transition-all",
                        isSelected ? "bg-red-600 border-red-600" : "border-zinc-300 dark:border-zinc-700"
                    )}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-bold text-[11px] tracking-tight">{item.label}</span>
                </DropdownMenuItem>
            );
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "h-10 border-2 px-4 font-bold transition-all bg-transparent group",
                        selection.length > 0 ? "border-red-600 text-black dark:text-white" : "border-zinc-200 dark:border-zinc-700 text-zinc-500 rounded-full ",
                        title == "Location" && "w-full justify-start "
                    )}
                >
                    {/* <Icon className="mr-2 h-4 w-4" /> */}
                    <span className="text-xs tracking-tighter ">
                        {selection.length === 0 ? title : `${selection[0]} ${selection.length > 1 ? title == "Location" ? selection.slice(1).join(", ") : `+${selection.length - 1}` : ""}`}
                    </span>
                    {/* <ChevronRight className="ml-2 h-3 w-3 opacity-30 group-data-[state=open]:rotate-90 transition-transform" /> */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl p-1">
                {/* <div className="px-3 py-2 border-b dark:border-zinc-800 mb-1">
           <span className="text-[9px] font-black text-zinc-400">Select Mission {title}</span>
        </div> */}
                {renderItems(data)}
                {selection.length > 0 && (
                    <div className="mt-1 border-t dark:border-zinc-800 p-1">
                        <Button
                            variant="ghost"
                            className="w-full h-8 text-[9px] font-black bg-zinc-800/10 hover:bg-zinc-800/20 text-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800/50 hover:cursor-pointer"
                            onClick={() => onSelect([])}
                        >
                            Clear Selection
                        </Button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}