"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Target, ChevronRight, MapPin, Award } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("otp");
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
    <div className="flex min-h-[calc(100vh-64px)] w-full bg-[#09090b]">
      {/* Left Column: Tactical Branding & Visuals */}
      <div className="hidden lg:flex w-[40%] flex-col justify-between p-12 relative overflow-hidden">
        {/* Main Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1525373417962-166eb127dd6a?q=80&w=2670&auto=format&fit=crop" 
          alt="Tactical Mountain Mission" 
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity"
        />
        
        {/* Tactical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />
        
        {/* Top: Brand Logo */}
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

        {/* Center: Floating Mission Dossier Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 bg-zinc-950/80 backdrop-blur-xl p-5 rounded-xl border border-zinc-800 shadow-2xl max-w-xs"
        >
          <div className="flex justify-between items-start mb-4 border-b border-zinc-800 pb-3">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-white text-xs font-black  tracking-widest">Active Operator</h4>
                <p className="text-[10px] text-zinc-500 font-bold  tracking-tight">Status: Ready</p>
              </div>
            </div>
            <Award className="text-red-600 h-5 w-5" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold  tracking-widest text-zinc-400">
              <span>L.A.W. Proficiency</span>
              <span className="text-white ">Elite Tier</span>
            </div>
            {/* Tactical Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold ">
              <MapPin className="h-3 w-3" />
              Deployment Zone: Ladakh
            </div>
          </div>
        </motion.div>

        {/* Bottom: Hero Text with Deep Gradient */}
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

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-[420px] space-y-10">
          <div className="text-left space-y-2">
            <h1 className="text-3xl font-black text-white">Sign In</h1>
            {/* <p className="text-zinc-500 text-sm font-bold">Enter your email</p> */}
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 transition-all rounded-lg px-5 text-xs"
                  />
                </div>

                <Button className="w-full h-14 bg-white text-black hover:bg-white/90 group text-lg shadow-lg shadow-green-600/20 hover:cursor-pointer">
                  Continue
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="relative flex items-center py-4">
                  <div className="h-px bg-zinc-800 flex-1" />
                  <span className="text-zinc-600 text-[10px] font-black  tracking-widest"></span>
                  <div className="h-px bg-zinc-800 flex-1" />
                </div>

                <div className="text-center text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <button type="button" className="text-white font-black hover:underline hover:cursor-pointer tracking-widest">Sign Up</button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-sm text-center text-zinc-500 block">
                    We've sent an email with your code to {email}
                  </label>
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
                </div>
                
                <Button className="w-full h-14 bg-white text-black hover:bg-white/80 group text-lg shadow-lg shadow-green-600/20 hover:cursor-pointer">
                  Login
                </Button>
                
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setStep("email")}
                    className="text-sm text-zinc-400 hover:text-white transition-colors hover:cursor-pointer"
                  >
                    ← Sign in with a different email
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