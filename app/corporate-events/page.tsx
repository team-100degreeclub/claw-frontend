"use client";

import React from "react";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  UserCircle, 
  Phone, 
  Mail, 
  Globe2,
  ChevronRight
} from "lucide-react";

// Mock Data for Past Corporate Missions
const RECENT_CLIENTS = [
  { company: "Goldman Sachs", location: "Ladakh, India", type: "Leadership Resilience" },
  { company: "Google Cloud", location: "Swiss Alps", type: "Strategic Alignment" },
  { company: "TATA Motors", location: "Spiti Valley, India", type: "Team Synergy" },
  { company: "Microsoft", location: "Iceland", type: "Extreme Adaptability" },
  { company: "Reliance Industries", location: "Thar Desert, India", type: "Crisis Management" },
];

export default function CorporateEventsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      
      {/* 1. TOP HERO SECTION: VIDEO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {/* Replace src with your actual video link */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="h-full w-full object-cover grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-walking-in-a-modern-office-4330-large.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            Elite Corporate <br /> Missions
          </h1>
          <p className="mt-4 text-zinc-400 max-w-xl font-medium tracking-widest uppercase text-xs">
            Forging high-performance leadership through tactical immersion.
          </p>
        </div>
      </section>

      {/* 2. TWO COLUMN LAYOUT */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Request Form */}
        <div className="bg-zinc-900/50 p-8 md:p-12 border border-white/5 rounded-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight">Request Deployment</h2>
            <p className="text-zinc-500 text-sm mt-2">Submit your organizational requirements for a tailored field brief.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Organization Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm" placeholder="e.g. Acme Corp" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Location Preference</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm" placeholder="e.g. Himalayas" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Purpose of Mission</label>
              <textarea className="w-full bg-zinc-950 border border-zinc-800 p-3 focus:border-white outline-none transition-all text-sm h-24" placeholder="Describe your objectives (Leadership, Team Building, etc.)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Proposed Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="date" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm invert" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Point of Contact (Name)</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm" placeholder="Mr./Ms. Name" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="tel" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                  <input type="email" className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 focus:border-white outline-none transition-all text-sm" placeholder="name@company.com" />
                </div>
              </div>
            </div>

            <button className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-4">
              Request Callback <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Deployment History */}
        <div className="flex flex-col justify-center">
          <div className="mb-10">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2">
              <Globe2 className="h-4 w-4" /> Global Footprint
            </h3>
            <h2 className="text-4xl font-bold mt-4 tracking-tighter italic">Trusted by the World's Most <br /> Resilient Organizations.</h2>
          </div>

          <div className="space-y-4">
            {RECENT_CLIENTS.map((client, idx) => (
              <div key={idx} className="group p-6 border border-white/5 bg-zinc-900/30 flex items-center justify-between hover:bg-white hover:text-black transition-all duration-300">
                <div>
                  <h4 className="font-black uppercase tracking-tight text-lg">{client.company}</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">{client.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest">{client.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 border-l-2 border-zinc-800">
            <p className="text-sm text-zinc-500 italic leading-relaxed">
              "The transition from boardroom to basecamp was seamless. Our leadership team returned with a level of clarity we haven't seen in a decade."
            </p>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">— Chief Strategy Officer, Global Finance Partner</p>
          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-lg mb-6 italic">Department of Industries</h4>
            <address className="not-italic text-zinc-500 text-sm space-y-2 font-medium leading-loose">
              Majitha House, Near H.P. Secretariat<br />
              Chhota Shimla, Shimla-2, 171002<br />
              Himachal Pradesh, India
            </address>
          </div>
          <div className="flex flex-col md:items-end justify-center">
            <p className="text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase">
              Official Government Partnership
            </p>
            <div className="h-[2px] w-24 bg-zinc-800 mt-4" />
          </div>
        </div>
      </footer>
    </div>
  );
}