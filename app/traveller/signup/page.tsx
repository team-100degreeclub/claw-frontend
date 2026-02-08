"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, Target, ChevronRight, MapPin, Award, 
  User, Mail, Calendar as CalendarIcon 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function SignUpPage() {
  const [step, setStep] = React.useState<"data" | "otp">("data");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: undefined as Date | undefined, // Changed type to Date | undefined
    gender: "",
    country: "",
    state: "",
    city: "",
  });
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[0-9]/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-tab to the next field if a digit is entered and it's not the last field
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If backspace is pressed and current field is empty, move to previous field and clear it
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else if (otp[index] !== "") {
        // If backspace is pressed and current field has content, clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full bg-[#09090b]">
      {/* Left Column: Tactical Branding (Reused from Login) */}
      <div className="hidden lg:flex w-[40%] flex-col justify-between p-12 relative overflow-hidden border-r border-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1525373417962-166eb127dd6a?q=80&w=2670&auto=format&fit=crop" 
          alt="Tactical Mountain Mission" 
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        
        <div className="relative z-20 flex items-center gap-3">
          {/* <div className="p-2.5 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <Target className="h-6 w-6 text-white" />
          </div> */}
          <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-3xl font-bold text-white">C.L.A.W.</span>
        </div>

        <div className="relative z-20">
          <span className="text-xl font-bold text-green-600 mb-2 block ">Conquer Your</span>
          <h2 className="text-5xl font-black   tracking-tighter text-white leading-none">
            Inner <br /> Terrain
          </h2>
          <p className="mt-4 text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
            Join the elite circle of Special Forces veterans. Access your mission dossier, track your L.A.W. badges, and prepare for deployment.
          </p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-y-auto">
        <div className="w-full max-w-[500px] py-12">
          <AnimatePresence mode="wait">
            {step === "data" ? (
              <motion.div
                key="data-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="text-left space-y-2">
                  <h1 className="text-3xl font-black text-white">Sign Up</h1>
                  <p className="text-zinc-500 text-xs font-bold  tracking-widest">Complete your profile to proceed</p>
                </div>

                <form onSubmit={handleDataSubmit} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black  text-zinc-500 ml-1">First Name</label>
                    <Input 
                      placeholder="John" 
                      className="auth-input" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black  text-zinc-500 ml-1">Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      className="auth-input" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black  text-zinc-500 ml-1">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="traveller@example.com" 
                      className="auth-input" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black  text-zinc-500 ml-1">Date of Birth</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal auth-input ${
                            !formData.dob && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dob}
                          onSelect={(date) => setFormData({...formData, dob: date})}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black h-full text-zinc-500 ml-1">Gender</label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                      required
                    >
                      <SelectTrigger className="auth-input w-full appearance-none">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="female">Transgender</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black  text-zinc-500 ml-1">Country</label>
                    <Input 
                      placeholder="India" 
                      className="auth-input" 
                      required 
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black  text-zinc-500 ml-1">State</label>
                      <Input 
                        placeholder="Maharashtra" 
                        className="auth-input" 
                        required 
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black  text-zinc-500 ml-1">City</label>
                      <Input 
                        placeholder="Mumbai" 
                        className="auth-input" 
                        required 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button className="col-span-2 w-full h-14 bg-white text-black hover:bg-white/90 group text-lg shadow-lg shadow-green-600/20 hover:cursor-pointer mt-2">
                    Continue
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                <div className="text-center text-sm text-zinc-400">
                  Already have an account?{" "}
                  <button type="button" className="text-white font-black hover:underline hover:cursor-pointer tracking-widest">Sign In</button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-left space-y-2">
                  <h1 className="text-3xl font-black text-white mb-12">Verify Your Email</h1>
                  <p className="text-sm text-center text-zinc-500 block">We've sent an email with your code to {formData.email}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-lg text-center text-xl font-black text-white focus:border-red-600 outline-none transition-all"
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <Button className="col-span-2 w-full h-14 bg-white text-black hover:bg-white/90 group text-lg shadow-lg shadow-green-600/20 hover:cursor-pointer mt-2">
                    Sign Up
                  </Button>
                  <button 
                    onClick={() => setStep("data")}
                    className="text-sm text-zinc-400 hover:text-white transition-colors hover:cursor-pointer w-full"
                  >
                    ← Edit your information
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}