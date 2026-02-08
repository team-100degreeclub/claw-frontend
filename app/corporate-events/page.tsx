"use client";

import * as React from "react";
import { 
  Building2, 
  MapPin, 
  CalendarIcon, // Renamed to avoid conflict with Calendar component
  User, 
  Phone, 
  Mail, 
  Globe2 
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

export default function CorporateEvents() {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("12:00");

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-600" />
                    <input type="text" placeholder="Preferred region" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-zinc-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400 ml-1">Date & time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-zinc-950 border border-zinc-800 text-zinc-400 pr-4",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {/* <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-zinc-600" fill="white"/> */}
                        {date ? (
                          format(new Date(date.setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]))), "PPP p    ")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-800 border border-zinc-700 text-zinc-100">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                      <div className="p-3 border-t border-zinc-700">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-md py-1 px-2 text-zinc-100 focus:outline-none focus:border-zinc-500"
                        />
                      </div>
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