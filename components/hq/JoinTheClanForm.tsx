"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

const inputStyles = "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600 rounded-sm h-11 mt-1";
const labelStyles = "text-sm font-semibold text-zinc-400";

interface ServiceRecord {
  unit: string;
  rank: string;
  award: string;
  fromYear: string;
  toYear: string;
}

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  
  // State for dynamic service records
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([
    { unit: "", rank: "", award: "", fromYear: "", toYear: "" }
  ]);

  const addServiceRecord = () => {
    setServiceRecords([...serviceRecords, { unit: "", rank: "", award: "", fromYear: "", toYear: "" }]);
  };

  const removeServiceRecord = (index: number) => {
    if (serviceRecords.length > 1) {
      setServiceRecords(serviceRecords.filter((_, i) => i !== index));
    }
  };

  const handleServiceChange = (index: number, field: keyof ServiceRecord, value: string) => {
    const updatedRecords = [...serviceRecords];
    updatedRecords[index][field] = value;
    setServiceRecords(updatedRecords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Service Records:", serviceRecords);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-zinc-800 p-12 rounded-sm border border-zinc-700 shadow-sm max-w-md">
          <p className="text-lg font-medium text-white">Thanks for taking the time to apply</p>
          <p className="text-lg text-zinc-400 mt-1">We will review your submission and get back to you shortly</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <div className="relative w-24 h-24">
           <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="rounded-full border-2 border-zinc-800"
          />
        </div>
        <h2 className="text-4xl font-black tracking-tighter mb-5">Welcome to C.L.A.W.</h2>
        <div className="text-base space-y-4 text-left leading-relaxed text-zinc-300 flex flex-col">
          <p>
            C.L.A.W. is a vision built by special forces soldiers who have seen the world in its toughest realities 
            and are now coming together to create a better world through their experience. It is a clan for 
            those who were once destroyers and now want to create a positive impact for society today and tomorrow.
          </p>
          <p>
            So, if you are a special forces professional from any part of the world who wants to add value, 
            say in your hood, your country, or the world, tell us why you want to join C.L.A.W. and we will take it from there.
          </p>
          <p>Thank you.</p>
        </div>
      </div>

      {/* 1. Basic Details */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b border-zinc-800 pb-2">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className={labelStyles}>First Name</label>
            <Input className={inputStyles} placeholder="John" required />
          </div>
          <div className="space-y-1.5">
            <label className={labelStyles}>Last Name</label>
            <Input className={inputStyles} placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className={labelStyles}>Nationality</label>
            <Input className={inputStyles} placeholder="Country Name" required />
          </div>
          <div className="space-y-1.5">
            <label className={labelStyles}>Phone</label>
            <Input className={inputStyles} type="tel" placeholder="+1 234..." required />
          </div>
          <div className="space-y-1.5">
            <label className={labelStyles}>Email Address</label>
            <Input className={inputStyles} type="email" placeholder="john@example.com" required />
          </div>
        </div>
      </section>

      {/* 2. Service Record (Dynamic) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
          <h3 className="text-xl font-bold">Service Record</h3>
          <Button 
            type="button" 
            onClick={addServiceRecord}
            variant="ghost" 
            className="text-xs h-8 text-white hover:bg-cyan-500/10 gap-1"
          >
            <Plus size={14} /> Add
          </Button>
        </div>

        {serviceRecords.map((record, index) => (
          <div key={index} className="relative p-6 bg-zinc-900/30 rounded-sm border border-zinc-800 space-y-5 animate-in slide-in-from-top-2 duration-300">
            {serviceRecords.length > 1 && (
              <Button
                type="button"
                onClick={() => removeServiceRecord(index)}
                variant="ghost"
                className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 h-8 w-8 p-0"
              >
                <Trash2 size={16} />
              </Button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelStyles}>Unit / Regiment</label>
                <Input 
                  className={inputStyles} 
                  value={record.unit} 
                  onChange={(e) => handleServiceChange(index, "unit", e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelStyles}>Rank</label>
                <Input 
                  className={inputStyles} 
                  value={record.rank} 
                  onChange={(e) => handleServiceChange(index, "rank", e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className={labelStyles}>Honor / Awards</label>
                <Input 
                  className={inputStyles} 
                  value={record.award} 
                  onChange={(e) => handleServiceChange(index, "award", e.target.value)}
                  placeholder=""
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className={labelStyles}>From Year</label>
                <Input 
                  className={inputStyles} 
                  type="number" 
                  min="1950" 
                  max="2026" 
                  placeholder="YYYY" 
                  value={record.fromYear} 
                  onChange={(e) => handleServiceChange(index, "fromYear", e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelStyles}>To Year</label>
                <Input 
                  className={inputStyles} 
                  type="number" 
                  min="1950" 
                  max="2030" 
                  placeholder="YYYY" 
                  value={record.toYear} 
                  onChange={(e) => handleServiceChange(index, "toYear", e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Final Question */}
      <div className="space-y-1.5">
        <label className={labelStyles}>What change do you want to build?</label>
        <Textarea 
          placeholder="Tell us about the impact you want to create..."
          className={`${inputStyles} min-h-[150px] resize-none p-4`} 
          required 
        />
      </div>

      <div className="pt-6 flex items-center justify-center">
        <Button 
          type="submit" 
          className="w-full md:w-auto px-16 h-12 bg-white text-zinc-900 hover:bg-zinc-200 rounded-sm font-bold"
        >
          Send Application
        </Button>
      </div>
    </form>
  );
}