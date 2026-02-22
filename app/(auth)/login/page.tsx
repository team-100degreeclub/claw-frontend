"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Target, ChevronRight, MapPin, Award, Mail, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

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
    <div className="flex min-h-screen w-full bg-black text-zinc-300 selection:bg-blue-500/30">
      {/* Left Column: Inspiring Visuals */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-900">
        {/* Background Image: More peaceful/inspiring mountain scenery */}
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop" 
          alt="Mountain landscape" 
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 transition-opacity"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        
        {/* Top: Branding */}
        <div className="relative z-20 flex items-center gap-4">
          <img
            src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
            alt="C.L.A.W. Logo"
            className="h-12 w-12 rounded-full border border-zinc-800"
          />
          <span className="text-2xl font-bold text-white  ">C.L.A.W.</span>
        </div>

        {/* Bottom: Welcoming Text */}
        <div className="relative z-20">
          {/* <div className="flex items-center gap-2 text-blue-500 mb-4">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-bold ">Begin your journey</span>
          </div> */}
          <h2 className="text-5xl font-black  text-white leading-[0.9]">
            Rediscover <br /> Your <span className="text-blue-600">Inner Self</span>
          </h2>
          <p className="mt-6 text-zinc-500 text-sm leading-relaxed font-medium">
            Join a community dedicated to the spirit of conversation and adventure.
          </p>
        </div>
      </div>

      {/* Right Column: Simple Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-[380px] space-y-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white ">Sign In</h1>
            <p className="text-sm text-zinc-500">Welcome back. Please enter your email to proceed.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
                onSubmit={(e) => { e.preventDefault(); setStep("otp"); }}
              >
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-600 rounded-sm pl-12 transition-all text-sm"
                    />
                  </div>
                </div>

                <Button className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-sm text-sm font-bold   transition-all">
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center pt-4">
                  <p className="text-xs text-zinc-600 font-medium">
                    Don't have an account?{" "}
                    <button type="button" className="text-blue-500 font-bold hover:text-blue-400 hover:cursor-pointer" onClick={() => router.push("/signup")}>Sign Up</button>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      We've sent a 6-digit code to <br />
                      <span className="text-white font-bold">{email}</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-sm text-center text-lg font-bold text-white focus:border-blue-600 outline-none transition-all"
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => { inputRefs.current[index] = el; }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-sm text-sm font-bold   transition-all">
                    Verify & Login
                  </Button>
                  
                  <button 
                    type="button" 
                    onClick={() => setStep("email")}
                    className="w-full text-center text-xs text-zinc-600 hover:text-white transition-colors py-2 font-bold hover:cursor-pointer"
                  >
                    Use a different email address
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