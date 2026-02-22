import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] border-t border-zinc-900 py-6 px-8 flex items-center justify-between">
      {/* 1. Left Section: Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-black tracking-tighter text-white">
          CL<span className="text-orange-500">A</span>W
        </span>
      </div>

      {/* 2. Right Section: CTA & Socials */}
      <div className="flex items-center gap-8">
        <Link 
          href="/careers" 
          className="text-xs text-white hover:text-cyan-400 transition-colors"
        >
          Careers
        </Link>
        {/* <Link 
          href="/hq" 
          className="text-xs font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-colors"
        >
          Join CLAW
        </Link> */}

        <div className="flex items-center gap-4">
          <SocialIcon href="https://facebook.com" icon={Facebook} />
          <SocialIcon href="https://twitter.com" icon={Twitter} />
          <SocialIcon href="https://instagram.com" icon={Instagram} />
          <SocialIcon href="https://telegram.org" icon={Send} />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-white transition-all transform hover:scale-110"
    >
      <Icon size={18} strokeWidth={2.5} />
    </Link>
  );
}