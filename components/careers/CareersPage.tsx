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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, MapPin, Briefcase, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  // const [visibleJobs, setVisibleJobs] = useState(6);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const departments = ["All", ...Array.from(new Set(MOCK_CAREERS.map((job) => job.department)))];
  const locations = ["All", ...Array.from(new Set(MOCK_CAREERS.map((job) => job.location)))];

  const filteredCareers = MOCK_CAREERS.filter((job) => {
    return (
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "All" || job.department === department) &&
      (location === "All" || job.location === location)
    );
  });

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="h-[40vh] bg-cover bg-center flex items-end relative" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=2670&auto=format&fit=crop)" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="container mx-auto px-4 z-10 mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter ">
            Internships @CLAW
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Filter Bar */}
        {/* <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search roles..."
              className="bg-zinc-950 border-zinc-800 h-12"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={setDepartment} defaultValue="All">
              <SelectTrigger className="bg-zinc-950 border-zinc-800 h-12 text-zinc-400">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={setLocation} defaultValue="All">
              <SelectTrigger className="bg-zinc-950 border-zinc-800 h-12 text-zinc-400">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div> */}

        {/* Table Header (Hidden on Mobile) */}
        {/* <div className="hidden md:grid grid-cols-12 px-8 py-4 text-xs font-black  tracking-widest text-zinc-500 border-b border-zinc-800">
          <div className="col-span-5">Role</div>
          <div className="col-span-3">Department</div>
          <div className="col-span-3">Location</div>
          <div className="col-span-1 text-right">Action</div>
        </div> */}

        {/* Table Content */}
        <div className="flex flex-col gap-2 mt-4">
          {filteredCareers.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 bg-zinc-900/30 hover:bg-zinc-800/50 border border-zinc-800 rounded-sm transition-all cursor-pointer group"
            >
              <div className="col-span-5 mb-2 md:mb-0">
                <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{job.title}</h3>
              </div>
              <div className="col-span-3 flex items-center gap-2 text-zinc-400 text-sm mb-1 md:mb-0">
                <Briefcase className="w-4 h-4 text-zinc-600" />
                {job.department}
              </div>
              <div className="col-span-3 flex items-center gap-2 text-zinc-400 text-sm">
                <MapPin className="w-4 h-4 text-zinc-600" />
                {job.location}
              </div>
              <div className="col-span-1 hidden md:flex justify-end">
                <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div className="md:hidden mt-4">
                <Button variant="secondary" className="w-full text-xs h-8">View Details</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-sm">
            <p className="text-zinc-500 font-bold  tracking-tighter">No roles found matching your criteria.</p>
          </div>
        )}

        {/* Load More */}
        {/* {visibleJobs < filteredCareers.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => setVisibleJobs(prev => prev + 6)}
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Load More Positions
            </Button>
          </div>
        )} */}
      </div>

      {/* Job Detail Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-black  mb-2">
                  <span>{selectedJob.department}</span>
                  <span className="text-zinc-700">•</span>
                  <span>{selectedJob.location}</span>
                </div>
                <DialogTitle className="text-3xl font-black tracking-tighter ">
                  {selectedJob.title}
                </DialogTitle>
                <div className="pt-4">
                  <DialogDescription className="text-zinc-400 leading-relaxed text-base">
                    {selectedJob.description}
                  </DialogDescription>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 my-4">
                <div>
                  <h4 className="text-sm font-black  text-white mb-2">Key Responsibilities</h4>
                  <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                    <li>Contribute to core projects at CLAW Global.</li>
                    <li>Collaborate with cross-functional teams.</li>
                    <li>Maintain high standards of excellence.</li>
                  </ul>
                </div>
              </div>

              <DialogFooter className="sm:justify-between gap-4">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full sm:w-auto px-8">
                  Apply Now
                </Button>
                {/* <Button 
                  variant="ghost" 
                  onClick={() => setSelectedJob(null)}
                  className="text-zinc-500 hover:text-white w-full sm:w-auto px-8"
                >
                  Close
                </Button> */}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}