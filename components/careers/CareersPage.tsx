"use client";

import { useState } from "react";
import { MOCK_CAREERS } from "@/lib/mockCareers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [visibleJobs, setVisibleJobs] = useState(6);

  const departments = [
    "All",
    ...Array.from(new Set(MOCK_CAREERS.map((job) => job.department))),
  ];
  const locations = [
    "All",
    ...Array.from(new Set(MOCK_CAREERS.map((job) => job.location))),
  ];

  const filteredCareers = MOCK_CAREERS.filter((job) => {
    return (
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "All" || job.department === department) &&
      (location === "All" || job.location === location)
    );
  });

  const loadMoreJobs = () => {
    setVisibleJobs((prev) => prev + 6);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2670&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="text-center z-10">
          <h1 className="text-6xl font-black tracking-tighter absolute bottom-0 right-0 w-full">
            Find Your Next Job @CLAW Global
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-zinc-900 p-8 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-1">
              <label className="text-sm font-bold text-zinc-400 mb-2 block">
                Search
              </label>
              <Input
                type="text"
                placeholder="By keyword"
                className="bg-zinc-800 border-zinc-700 h-12"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-zinc-400 mb-2 block">
                Department
              </label>
              <Select onValueChange={setDepartment} defaultValue="All">
                <SelectTrigger className="bg-zinc-800 border-zinc-700 h-12">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-bold text-zinc-400 mb-2 block">
                Location
              </label>
              <Select onValueChange={setLocation} defaultValue="All">
                <SelectTrigger className="bg-zinc-800 border-zinc-700 h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white">
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCareers.slice(0, visibleJobs).map((job) => (
            <div
              key={job.id}
              className="p-8 bg-zinc-900 rounded-lg transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-zinc-400 mb-4">
                {job.department} ・ {job.location}
              </p>
              <Button variant="secondary" className="w-full">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {visibleJobs < filteredCareers.length && (
          <div className="text-center mt-12">
            <Button onClick={loadMoreJobs}>Load More</Button>
          </div>
        )}

        {filteredCareers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 font-bold tracking-widest text-lg">
              No jobs found
            </p>
            <p className="text-zinc-600 text-sm mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
