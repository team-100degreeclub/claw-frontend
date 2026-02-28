"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X, ChevronLeft, Check } from "lucide-react";

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i === step ? "w-6 bg-cyan-500" : "w-1.5 bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function WaitlistSheet({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setStep("success");
  };

  return (
    <>
      <div
        className={`absolute inset-0 z-40 transition-all duration-350 cursor-pointer ${
          visible ? "bg-black/50 backdrop-blur-[2px]" : "bg-black/0"
        }`}
        onClick={close}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 z-50 transition-transform duration-350 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white rounded-t-3xl px-6 pt-4 pb-10 shadow-2xl">
          {step === "form" ? (
            <>
              <StepDots step={1} />
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-lg font-bold text-neutral-900 tracking-tight">
                  Join the Waitlist
                </h2>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="h-14 rounded-2xl border-cyan-400/60 bg-cyan-50/40 text-neutral-900 placeholder:text-neutral-400 text-sm focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 px-4"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 rounded-2xl border-cyan-400/60 bg-cyan-50/40 text-neutral-900 placeholder:text-neutral-400 text-sm focus-visible:ring-1 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 px-4"
                />
                <p className="text-[11px] text-neutral-400 text-center">
                  We'll let you know the moment CLAW opens.
                </p>
                <button
                  type="submit"
                  className="w-full h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-cyan-400/30 hover:shadow-blue-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  Join
                </button>
              </form>
            </>
          ) : (
            <>
              <StepDots step={2} />
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setStep("form")}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="font-serif text-lg font-bold text-neutral-900 tracking-tight">
                  Complete
                </h2>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col items-center text-center py-4 space-y-4">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30" />
                  <div className="absolute inset-2 rounded-full bg-blue-100 opacity-60" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-400/40">
                    <Check className="w-7 h-7 text-white stroke-[2.5]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    You're on the list, {firstName.split(" ")[0]}!
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                    We'll reach out to{" "}
                    <span className="text-neutral-600 font-medium">{email}</span>{" "}
                    when CLAW opens its doors.
                  </p>
                </div>
                <button
                  onClick={close}
                  className="w-full h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  Complete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ScreenContent({
  mounted,
  onOpenSheet,
  sheetOpen,
  onCloseSheet,
}: {
  mounted: boolean;
  onOpenSheet: () => void;
  sheetOpen: boolean;
  onCloseSheet: () => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/pre-reg-video.mp4"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/90" />

      <div
        className={`relative z-10 flex flex-col flex-1 justify-between px-6 pt-16 pb-12 transition-all duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`transition-all duration-500 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
        </div>

        <div className="space-y-5">
          <div
            className={`transition-all duration-700 delay-[150ms] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h1 className="font-serif text-[clamp(2.8rem,9vw,3.6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white drop-shadow-xl">
              C.L.A.W<br />
              <em className="not-italic bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent text-2xl">
                Conquer Land Air Water
              </em>
            </h1>
          </div>

          <div
            className={`space-y-3 transition-all duration-700 delay-[300ms] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <button
              onClick={onOpenSheet}
              className="w-full h-[54px] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm tracking-wide shadow-xl shadow-cyan-600/40 hover:shadow-blue-500/60 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>

      {sheetOpen && <WaitlistSheet onClose={onCloseSheet} />}
    </div>
  );
}

export default function PreRegistrationPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const screenProps = {
    mounted,
    onOpenSheet: () => setSheetOpen(true),
    sheetOpen,
    onCloseSheet: () => setSheetOpen(false),
  };

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-[#1a0e08] md:hidden">
        <ScreenContent {...screenProps} />
      </div>

      <div className="hidden md:flex w-screen h-screen items-center justify-center overflow-hidden relative bg-[#0c0806]">

        <video
          className="absolute inset-0 w-full h-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
          src="/pre-reg-video.mp4"
        />
        <div className="absolute inset-0 backdrop-blur-3xl bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

        <div className="relative z-10 w-[393px] h-[852px] rounded-[3rem] overflow-hidden flex-shrink-0 shadow-[0_50px_140px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.07)]">
          <ScreenContent {...screenProps} />
        </div>
      </div>
    </>
  );
}