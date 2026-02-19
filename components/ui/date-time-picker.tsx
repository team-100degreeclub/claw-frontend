"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    disabled?: any;
    className?: string;
}

export function DateTimePicker({ value, onChange, disabled, className }: DateTimePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(value);
    const [hours, setHours] = React.useState(value ? value.getHours() : 0);
    const [minutes, setMinutes] = React.useState(value ? value.getMinutes() : 0);

    React.useEffect(() => {
        if (value) {
            setDate(value);
            setHours(value.getHours());
            setMinutes(value.getMinutes());
        }
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            selectedDate.setHours(hours);
            selectedDate.setMinutes(minutes);
        }
        setDate(selectedDate);
        onChange?.(selectedDate);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [h, m] = e.target.value.split(':').map(Number);
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(h);
            newDate.setMinutes(m);
            setDate(newDate);
            onChange?.(newDate);
        } else {
            // If no date is selected yet, use current date
            const now = new Date();
            now.setHours(h);
            now.setMinutes(m);
            setDate(now);
            onChange?.(now);
        }
        setHours(h);
        setMinutes(m);
    };

    // Format time for input
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", className)}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP HH:mm") : <span>Pick a date and time</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 flex flex-col gap-2">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus captionLayout="dropdown" disabled={disabled} />
                <div className="flex items-center justify-center p-2 border-t border-border">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="time"
                        value={formattedTime}
                        onChange={handleTimeChange}
                        className="w-fit border-none shadow-none focus-visible:ring-0"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
