"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Helper styles for consistent dark mode inputs and labels
const inputStyles = "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600 rounded-sm h-11 mt-1";
const labelStyles = "text-sm font-semibold text-zinc-400";

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      // Dark mode success box
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-zinc-800 p-12 rounded-sm border border-zinc-700 shadow-sm max-w-md">
          <p className="text-lg font-medium text-white">Thanks for taking the time to apply</p>
          <p className="text-lg text-zinc-400 mt-1">We will review your submission and get back to you shortly</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <div className="relative w-24 h-24">
           {/* Dark mode logo placeholder */}
           <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold mb-5">Welcome to C.L.A.W.</h2>
        <div className="text-base space-y-4 max-w-6xl text-left leading-relaxed text-zinc-300 flex flex-col">
          <div>
            C.L.A.W. is a vision built by special forces soldiers who have seen the world in its toughest realities 
            and are now coming together to create a better world through their experience. It is a clan for 
            those who were once destroyers and now want to create a positive impact for society today and tomorrow.
          </div>
          <span >
            So, if you are a special forces professional from any part of the world who wants to add value, 
            say in your hood, your country, or the world, tell us why you want to join C.L.A.W. and we will take it from there.
          </span>
          <span>Thank you.</span>
        </div>
      </div>

      {/* Form Fields - using the new dark mode helper styles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className={labelStyles}>Rank</label>
          <Input className={inputStyles} required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>First Name</label>
          <Input className={inputStyles} required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Last Name</label>
          <Input className={inputStyles} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="space-y-1.5">
          <label className={labelStyles}>Unit</label>
          <Input className={inputStyles} required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Rank</label>
          <Input className={inputStyles} required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Honor/Award</label>
          <Input className={inputStyles} />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Service Time</label>
          <div className="flex gap-2">
            <Input className={inputStyles} type="number" placeholder="Years" required />
            <Input className={inputStyles} type="number" placeholder="Months" required />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className={labelStyles}>Nationality</label>
          <Input className={inputStyles} required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Phone</label>
          <Input className={inputStyles} type="tel" required />
        </div>
        <div className="space-y-1.5">
          <label className={labelStyles}>Email</label>
          <Input className={inputStyles} type="email" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className={labelStyles}>What change do you want to build?</label>
        <Textarea className={`${inputStyles} min-h-[150px] resize-none p-3`} required />
      </div>

      <div className="pt-6 flex items-center justify-center">
        {/* High contrast button for dark mode */}
        <Button type="submit" className="w-full md:w-auto px-12 h-11 bg-white text-zinc-900 hover:bg-zinc-200 rounded-sm font-semibold">
          Send Application
        </Button>
      </div>
    </form>
  );
}