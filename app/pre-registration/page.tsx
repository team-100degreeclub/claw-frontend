"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// ─── Particle field — slower, more contemplative ─────────────────────────────

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; r: number;
      speed: number; opacity: number; pulse: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.15,
        speed: Math.random() * 0.06 + 0.01,
        opacity: Math.random() * 0.45 + 0.08,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += p.speed * 0.5;
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Warm amber-white tint instead of cold blue
        ctx.fillStyle = `rgba(220, 200, 170, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ target, duration = 1600 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(ease * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{current.toLocaleString("en-IN")}</>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PreRegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<"name" | "email" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  // ── Success screen ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-[#0a0906] flex items-center justify-center overflow-hidden px-6">
        <ParticleField />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(180,130,60,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center max-w-lg mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
          {/* Icon */}
          <div className="relative inline-flex">
            <div className="absolute inset-0 rounded-full bg-amber-600/15 blur-2xl scale-[2]" />
            <div className="relative w-18 h-18 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-amber-700/30 to-amber-900/20 border border-amber-600/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-amber-400/90" />
            </div>
          </div>

          {/* Copy */}
          <div className="space-y-5">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-amber-500/60 uppercase">
              The journey begins
            </p>
            <h1
              className="text-white leading-[1.05] tracking-tight"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                fontWeight: 900,
              }}
            >
              {name.split(" ")[0]},<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fcd34d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                you took the first step.
              </span>
            </h1>
            <p className="text-white/40 text-sm leading-[1.9] max-w-sm mx-auto">
              That&apos;s all it takes. We&apos;ll reach out when CLAW opens its doors — with a conversation waiting for you on the other side.
            </p>
          </div>

          {/* Email badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-white/35">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse shrink-0" />
            Confirmation sent to&nbsp;
            <span className="text-white/60 font-medium">{email}</span>
          </div>

          {/* Closing thought */}
          {/* <p className="text-white/20 text-xs italic max-w-xs mx-auto leading-relaxed">
            &ldquo;The mind that is stretched by a new experience can never go back to its old dimensions.&rdquo;
          </p> */}
        </div>
      </div>
    );
  }

  // ── Main page ─────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen bg-[#0a0906] flex flex-col overflow-hidden selection:bg-amber-500/20">
      <ParticleField />

      {/* Gradient atmosphere — warm amber/ochre, not cold blue */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "700px",
          background: "radial-gradient(ellipse at center, rgba(161,98,20,0.14) 0%, rgba(120,70,10,0.07) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "650px",
          height: "550px",
          background: "radial-gradient(ellipse at center, rgba(120,53,15,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "-8%",
          width: "450px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(80,40,10,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Horizontal breath line */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          top: "42%",
          background: "linear-gradient(90deg, transparent, rgba(200,160,80,0.05) 25%, rgba(200,160,80,0.05) 75%, transparent)",
        }}
      />

      {/* ── Nav ── */}
      <nav
        className={`relative z-20 flex items-center justify-between px-8 md:px-14 pt-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {/* Wordmark */}
        <div className="flex flex-col leading-none">
          <span
            className="font-black tracking-[0.18em] text-white"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "1.25rem",
              letterSpacing: "0.22em",
            }}
          >
            C.L.A.W
          </span>
          {/* <span
            className="text-[9px] tracking-[0.28em] text-amber-500/50 uppercase mt-0.5 font-semibold"
          >
            Consciousness · Legacy · Action · Will
          </span> */}
        </div>

        {/* Status pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_5px_rgba(251,191,36,0.6)] animate-pulse" />
          <span className="text-[11px] text-white/35 font-medium tracking-wide">Pre-registrations open</span>
        </div>
      </nav>

      {/* ── Core content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-6 pb-24">

        {/* Eyebrow label */}
        <div
          className={`transition-all duration-700 delay-[100ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <p className="text-base font-bold tracking-[0.35em] text-amber-500/50 uppercase mb-8">
            A conversation-based travel experience
          </p>
        </div>

        {/* Headline */}
        <div
          className={`transition-all duration-700 delay-[160ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1
            className="text-white leading-[0.94] tracking-tight mb-0"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(3.2rem, 9.5vw, 8rem)",
              fontWeight: 900,
            }}
          >
            Join CLAW<br />
            {/* gets hard —
            <br />
            <em
              className="not-italic block mt-1"
              style={{
                background: "linear-gradient(135deg, #b45309 0%, #d97706 35%, #f59e0b 65%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              don&apos;t collapse.
            </em> */}
          </h1>
        </div>

        {/* Subheading — the mission in plain words */}
        <div    
          className={`transition-all duration-700 delay-[230ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-white/38 text-base md:text-[1.05rem] leading-[1.85] max-w-2xl mx-auto mt-8 mb-12 font-light">
            CLAW brings together those still finding their way and those who have already walked through the fire — for conversations that rebuild the mind, one journey at a time.
          </p>
        </div>

        {/* ── Form ── */}
        <div
          className={`w-full max-w-[400px] transition-all duration-700 delay-[300ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300 ${
                  focused === "name" ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(217,119,6,0.18), rgba(180,83,9,0.10))",
                  filter: "blur(12px)",
                  transform: "scale(1.03)",
                }}
              />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                className={`relative w-full h-[54px] px-5 rounded-[14px] text-white text-sm font-medium placeholder:text-white/20 outline-none transition-all duration-300 ${
                  focused === "name"
                    ? "bg-white/[0.07] border border-amber-600/35"
                    : "bg-white/[0.035] border border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.05]"
                }`}
                style={{ backdropFilter: "blur(14px)" }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300 ${
                  focused === "email" ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(217,119,6,0.18), rgba(180,83,9,0.10))",
                  filter: "blur(12px)",
                  transform: "scale(1.03)",
                }}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className={`relative w-full h-[54px] px-5 rounded-[14px] text-white text-sm font-medium placeholder:text-white/20 outline-none transition-all duration-300 ${
                  focused === "email"
                    ? "bg-white/[0.07] border border-amber-600/35"
                    : "bg-white/[0.035] border border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.05]"
                }`}
                style={{ backdropFilter: "blur(14px)" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full h-[54px] rounded-[14px] font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.012] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, #92400e 0%, #b45309 40%, #d97706 100%)",
                boxShadow: "0 0 50px rgba(180,83,9,0.30), 0 4px 24px rgba(146,64,14,0.25)",
              }}
            >
              {/* Subtle shimmer on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                }}
              />
              <span className="relative flex items-center justify-center gap-2.5 text-amber-50">
                Begin my journey
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </button>
          </form>

          <p className="mt-4 text-[11px] text-white/60 text-center tracking-wide">
            No noise. Just a conversation, when the time is right.
          </p>
        </div>

        {/* ── Social proof — reframed for CLAW's mission ── */}
        {/* <div
          className={`mt-14 transition-all duration-700 delay-[500ms] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div
            className="inline-flex items-center gap-5 px-6 py-4 rounded-2xl border border-white/[0.06]"
            style={{
              background: "rgba(255,255,255,0.018)",
              backdropFilter: "blur(20px)",
            }}
          >
            {[
              { value: 1200, label: "veterans in the network", suffix: "+" },
              { value: 38, label: "journeys completed", suffix: "" },
              { value: 6, label: "years of conversations", suffix: "" },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px h-8 bg-white/[0.07]" />}
                <div className="text-center px-1">
                  <p className="text-base font-black text-white tabular-nums leading-none tracking-tight">
                    <AnimatedNumber target={stat.value} duration={1300 + i * 180} />
                    {stat.suffix}
                  </p>
                  <p className="text-[10px] text-white/25 mt-1.5 whitespace-nowrap leading-none">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div> */}

        {/* ── Pull quote ── */}
        {/* <div
          className={`mt-12 transition-all duration-700 delay-[600ms] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white/18 text-xs italic max-w-[320px] mx-auto leading-[1.8] text-center">
            &ldquo;The cave you fear to enter holds the treasure you seek.&rdquo;
            <br />
            <span className="not-italic text-white/12 tracking-widest text-[10px] mt-1 block">— Joseph Campbell</span>
          </p>
        </div> */}
      </div>

      {/* ── Footer ── */}
      {/* <div
        className={`relative z-10 border-t border-white/[0.04] px-8 md:px-14 py-4 flex items-center justify-between transition-all duration-700 delay-[700ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-[11px] text-white/18">
          © 2025 C.L.A.W · Consciousness Legacy Action Will
        </p>
        <div className="flex items-center gap-5">
          <span className="text-[11px] text-white/18 hover:text-white/40 cursor-pointer transition-colors">Privacy</span>
          <span className="text-[11px] text-white/18 hover:text-white/40 cursor-pointer transition-colors">Terms</span>
        </div>
      </div> */}
    </div>
  );
}