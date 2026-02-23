"use client";

import * as React from "react";
import {
  Building2,
  MapPin,
  CalendarIcon, // Renamed to avoid conflict with Calendar component
  User,
  Phone,
  Mail,
  Globe2,
  ChevronsUpDown,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "@/components/ui/date-time-picker"; // Import the new DateTimePicker
import { Label } from "radix-ui";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DateRange } from "react-day-picker";

const PAST_EVENTS = [
  { company: "Microsoft", country: "United States" },
  { company: "TCS", country: "India" },
  { company: "BMW Group", country: "Germany" },
  { company: "Samsung Electronics", country: "South Korea" },
  { company: "Emirates", country: "United Arab Emirates" },
  { company: "Atlassian", country: "Australia" },
  { company: "Zerodha", country: "India" },
  { company: "Zoho", country: "India" },
  { company: "Snapchat", country: "India" },
  { company: "Urban Company", country: "India" },
  { company: "Boeing", country: "Germany" },
  { company: "Air India", country: "India" },
];

const SPEAKERS = [
  { value: "sarah-chen", label: "Dr. Sarah Chen" },
  { value: "marcus-thorne", label: "Marcus Thorne" },
  { value: "robert-p", label: "Robert P." },
  { value: "emily-rivera", label: "Emily Rivera" },
  { value: "jordan-lee", label: "Jordan Lee" },
  { value: "alex-morgan", label: "Alex Morgan" },
];

interface FormData {
  assignSpeaker: string[];
}

export default function CorporateEvents() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState<string>("12:00");
  const [endDate, setEndDate] = React.useState<Date>();
  const [endTime, setEndTime] = React.useState<string>("14:00");
  const [preferredSpeaker, setPreferredSpeaker] = React.useState<string>("");
  const [openSpeaker, setOpenSpeaker] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    assignSpeaker: [],
  });
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">

      {/* 1. Hero Section: Video */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Replace src with your actual video path */}
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?q=80&w=2673&auto=format&fit=crop"
        />
        {/* <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-walking-in-the-mountains-4636-large.mp4" type="video/mp4" /> */}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Corporate Wellness & Team Resilience
          </h1>
          <p className="mt-4 text-lg text-zinc-300 max-w-2xl font-light">
            Transforming corporate culture through immersive outdoor experiences and professional camps.
          </p>
        </div>
      </section>

      {/* 2. Two Column Layout */}
      <section className="max-w-7xl mx-auto py-20 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column: Request Form */}
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
            <h2 className="text-2xl font-medium mb-8">Request a seminar</h2>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 ml-1">Organization name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400 ml-1">What's the purpose?</label>
                <textarea
                  placeholder=""
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 px-4 h-24 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                    <input type="text" placeholder="Preferred region" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 ml-1">Event Duration (Date & Time)</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-zinc-950 border-zinc-800 h-12 hover:bg-zinc-900 text-zinc-100",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, yyyy HH:mm")} -{" "}
                              {format(dateRange.to, "LLL dd, yyyy HH:mm")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, yyyy HH:mm")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-950 border-zinc-800" align="start">
                      <div className="flex flex-col md:flex-row">
                        {/* Date Selection Area */}
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                          className="bg-zinc-950 text-zinc-100"
                        />
                      </div>

                      {/* Time Selection Area - Integrated Footer */}
                      <div className="flex items-center justify-between p-4 border-t border-zinc-800 bg-zinc-900/50">
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px]  font-bold text-zinc-500">Start Time</span>
                          <input
                            type="time"
                            className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 ring-zinc-600"
                            value={dateRange?.from ? format(dateRange.from, "HH:mm") : "12:00"}
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value.split(":");
                              const newFrom = dateRange?.from ? new Date(dateRange.from) : new Date();
                              newFrom.setHours(parseInt(hours), parseInt(minutes));
                              setDateRange({ ...dateRange, from: newFrom });
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px]  font-bold text-zinc-500">End Time</span>
                          <input
                            type="time"
                            className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 ring-zinc-600"
                            value={dateRange?.to ? format(dateRange.to, "HH:mm") : "14:00"}
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value.split(":");
                              const newTo = dateRange?.to ? new Date(dateRange.to) : new Date();
                              newTo.setHours(parseInt(hours), parseInt(minutes));
                              setDateRange({ ...dateRange, from:undefined, to: newTo });
                            }}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  {/* <Label className="text-zinc-500 text-xs">Assign Speaker</Label>
            <Input value={formData.assignSpeaker} onChange={e => setFormData({...formData, assignSpeaker: e.target.value})} className="bg-zinc-900 border-zinc-800 h-11" /> */}
                  <label className="text-zinc-500 text-xs mb-1 flex items-center gap-2">
                    {/* <UserCheck size={14} />  */}
                    Available Speakers
                  </label>

                  {/* --- MULTI-SELECT COMBOBOX FOR SPEAKERS --- */}
                  <Popover open={openSpeaker} onOpenChange={setOpenSpeaker}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSpeaker}
                        className="w-full justify-between bg-zinc-900 border-zinc-800 h-11 hover:bg-zinc-800 text-zinc-100 font-normal truncate"
                      >
                        {formData.assignSpeaker.length > 0
                          ? formData.assignSpeaker
                            .map((speakerValue) => SPEAKERS.find((s) => s.value === speakerValue)?.label)
                            .filter(Boolean) // Remove undefined labels
                            .join(", ")
                          : "Select speaker(s)..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-zinc-900 border-zinc-800">
                      <Command className="bg-transparent">
                        <CommandInput placeholder="Search speakers..." className="h-9 text-zinc-100" />
                        <CommandList>
                          <CommandEmpty>No speaker found.</CommandEmpty>
                          <CommandGroup>
                            {SPEAKERS.map((speaker) => (
                              <CommandItem
                                key={speaker.value}
                                value={speaker.value} // Use value for internal logic
                                onSelect={(currentValue) => {
                                  const isSelected = formData.assignSpeaker.includes(currentValue);
                                  setFormData((prev) => ({
                                    ...prev,
                                    assignSpeaker: isSelected
                                      ? prev.assignSpeaker.filter((s) => s !== currentValue)
                                      : [...prev.assignSpeaker, currentValue],
                                  }));
                                }}
                                className="text-zinc-100 aria-selected:bg-zinc-800 aria-selected:text-white cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.assignSpeaker.includes(speaker.value) ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {speaker.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm font-medium mb-4 text-zinc-300">Point of contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                    <input type="text" placeholder="Salutation & Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                    <input type="tel" placeholder="Contact number" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600" />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                  <input type="email" placeholder="Email address" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600" />
                </div>
              </div>

              <button className="w-full bg-zinc-100 text-zinc-950 font-semibold py-3 rounded-lg hover:bg-zinc-300 transition-all hover:cursor-pointer">
                Request callback
              </button>
            </form>
          </div>

          {/* Right Column: Global Footprint */}
          <div className="flex flex-col mt-6">
            <h2 className="text-2xl font-medium mb-10 text-center">Successful Seminars</h2>
            {/* <p className="text-zinc-400 mb-8 font-light leading-relaxed">
              We have successfully organized and facilitated corporate resilience camps for industry leaders across the globe. Join the network of organizations investing in their human capital.
            </p> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PAST_EVENTS.map((item, idx) => (
                <div key={idx} className="p-5 bg-zinc-900/30 border border-zinc-800 rounded-xl flex items-center gap-4">
                  {/* <div className="bg-zinc-800 p-2 rounded-lg">
                    <Globe2 className="h-5 w-5 text-zinc-400" />
                  </div> */}
                  <div>
                    <h4 className="text-sm font-semibold">{item.company}</h4>
                    <p className="text-sm text-zinc-500">{item.country}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-12 p-6 rounded-xl border border-dashed border-zinc-800">
              <p className="text-sm italic text-zinc-500 text-center">
                "The experience redefined our leadership dynamics in ways a boardroom never could."
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="bg-zinc-900/30 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-medium mb-4">C.L.A.W's Den</h3>
              <address className="not-italic text-zinc-400 leading-relaxed text-sm">
                Department of Industries,<br />
                Majitha House, Near H.P. Secretariat Chhota Shimla,<br />
                Shimla-2, Himachal Pradesh
              </address>
              <p className="mt-3 text-zinc-400">
                Email: <span className="">claw@gmail.com</span>
              </p>
            </div>
            <div className="md:text-right">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}