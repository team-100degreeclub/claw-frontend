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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    <div className="flex min-h-screen w-full bg-black text-zinc-300 selection:bg-white-500/30">
      {/* Left Column: Inspiring Visuals (Consistent with Login) */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-900">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop" 
          alt="Mountain landscape" 
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        
        <div className="relative z-20 flex items-center gap-4">
          <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="h-12 w-12 rounded-full border border-zinc-800"
          />
          <span className="text-2xl font-bold text-white ">C.L.A.W.</span>
        </div>

        <div className="relative z-20">
          {/* <div className="flex items-center gap-2 text-blue-500 mb-4">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-bold ">Join the community</span>
          </div> */}
          <h2 className="text-5xl font-black er text-white leading-[0.9] ">
            Start Your <br /> Next <span className="text-blue-600">Chapter</span>
          </h2>
          <p className="mt-6 text-zinc-500 text-sm leading-relaxed font-medium">
            Join us on the mission where we empower individuals to navigate the complexities of life.
          </p>
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black overflow-y-auto">
        <div className="w-full max-w-[500px] py-12">
          <AnimatePresence mode="wait">
            {step === "data" ? (
              <motion.div
                key="data-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white ">Create Account</h1>
                  <p className="text-sm text-zinc-500">Please provide your details to get started.</p>
                </div>

                <form className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600">First Name</label>
                    <Input 
                      placeholder="e.g. John" 
                      className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm focus:border-blue-600 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600">Last Name</label>
                    <Input 
                      placeholder="e.g. Doe" 
                      className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm focus:border-white-600 transition-all" 
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-zinc-600">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm focus:border-white-600 transition-all" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600">Date of Birth</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal bg-zinc-950 border-zinc-800 rounded-sm h-12 text-zinc-400"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white-600" />
                          {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-zinc-950 border-zinc-800">
                        <Calendar
                          mode="single"
                          selected={formData.dob}
                          onSelect={(date) => setFormData({...formData, dob: date})}
                          className="text-zinc-300"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 w-full">Gender</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 rounded-sm text-sm text-zinc-400 w-full m-0 min-h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300 rounded-sm">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-zinc-600">Country</label>
                    <Input 
                      placeholder="India" 
                      className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm" 
                    />
                  </div>

                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-600">State</label>
                      <Input placeholder="Maharashtra" className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-600">City</label>
                      <Input placeholder="Mumbai" className="bg-zinc-950 border-zinc-800 rounded-sm h-12 text-sm" />
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    onClick={() => setStep("otp")}
                    className="col-span-2 w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-sm text-sm font-bold transition-all"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-zinc-600 font-medium">
                    Already have an account?{" "}
                    <button type="button" className="text-blue-500 font-bold hover:text-blue-400 hover:cursor-pointer" onClick={() => router.push("/login")}>Log In</button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white ">Verify Email</h1>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    We've sent a verification code to <br />
                    <span className="text-white font-bold">{formData.email || "your email"}</span>
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-sm text-center text-xl font-bold text-white focus:border-white-600 outline-none transition-all"
                      />
                    ))}
                  </div>
                  <Button className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-sm text-xs font-bold   transition-all">
                    Complete Registration
                  </Button>
                  <button 
                    onClick={() => setStep("data")}
                    className="w-full text-center text-xs text-zinc-600 hover:text-white transition-colors py-2 font-bold "
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