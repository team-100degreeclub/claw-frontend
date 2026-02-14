"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; // npx shadcn-ui@latest add scroll-area

const labelStyles = "text-[10px] uppercase tracking-wider font-semibold text-zinc-400";
const inputStyles = "bg-zinc-800 border-zinc-700 text-white focus-visible:ring-zinc-600 rounded-sm";

export default function ProfileCodeDialog() {
    const [step, setStep] = useState(0); // 0: Code, 1: Agreement, 2: Success
    const [code, setCode] = useState("");

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy validation: Allow any 4+ character code for demo purposes
        if (code.length >= 4) {
            setStep(1);
        }
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    // --- STEP 0: ENTER PROFILE CODE ---
    if (step === 0) {
        return (
            <form onSubmit={handleVerifyCode} className="py-12 flex flex-col items-center gap-6">
                <div className="text-center space-y-2">
                    {/* <h2 className="text-xl font-bold uppercase tracking-tight">Access Restricted</h2> */}
                    <p className="text-zinc-400 text-base">Please enter your unique profile code to proceed.</p>
                </div>
                <div className="w-full max-w-xs space-y-4">
                    <div className="space-y-1.5">
                        <label className={labelStyles}>Profile Code</label>
                        <Input
                            className={inputStyles}
                            placeholder="Ex: CLAW-XXXX"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-white text-zinc-900 hover:bg-zinc-200 font-bold">
                        Submit
                    </Button>
                </div>
            </form>
        );
    }

    // --- STEP 1: AGREEMENT & UPLOAD ---
    if (step === 1) {
        return (
            <form onSubmit={handleFinalSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full mb-2 border border-zinc-700 flex items-center justify-center italic text-[10px] text-zinc-500"><img
                        src="https://pbs.twimg.com/profile_images/1221190646850965504/MyqCrr0y_400x400.jpg"
                        alt="C.L.A.W. Logo"
                        className="rounded-full"
                    /></div>
                    <h2 className="text-2xl font-bold uppercase tracking-tighter mb-3">C.L.A.W. Agreement</h2>
                    <div className="text-sm text-zinc-400 leading-relaxed text-left">
                        By clicking I Agree, you're confirming that you've read and understood all the terms and conditions.
                        This will be considered a binding agreement with C.L.A.W.
                    </div>
                </div>

                {/* Scrollable Contract Box */}
                <div className="relative border border-zinc-700 rounded-sm bg-zinc-950">
                    <ScrollArea className="h-64 p-6 text-xs text-zinc-300 leading-relaxed">
                        <p className="mb-4 font-bold text-white uppercase tracking-widest text-[10px]">Confidentiality & Non-Disclosure</p>
                        <p className="mb-4">1. DEFINITION OF CONFIDENTIAL INFORMATION. Confidential Information means any non-public information, data, or know-how revealed by C.L.A.W. including but not limited to operational tactics, member identities, and business insights.</p>
                        <p className="mb-4">2. NON-DISCLOSURE OBLIGATIONS. Recipient agrees that at all times and notwithstanding any termination or expiration of this Agreement, they will hold in strict confidence and not disclose to any third party Confidential Information.</p>
                        <p className="mb-4">3. USAGE RESTRICTIONS. The access granted to the HQ portal is strictly for authorized personnel. Sharing login credentials or profile codes is grounds for immediate termination of access and potential legal action.</p>
                        <p className="mb-4">4. GOVERNING LAW. This agreement is governed by the laws of the operational jurisdiction of the C.L.A.W. high command.</p>
                        <p>5. INTELLECTUAL PROPERTY. All materials, codebases, and visual assets within the HQ remain the sole property of the C.L.A.W. collective.</p>
                    </ScrollArea>
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide">Upload Verification Documents</h3>
                        <p className="text-[13px] text-zinc-500">To complete your application, please upload at least one official ID for verification (Aadhaar Card or Passport).</p>
                    </div>

                    <div className="bg-zinc-800/50 p-4 border border-zinc-700 border-dashed rounded-sm">
                        <label className={`${labelStyles} mb-2 block`}>Attach Document (JPG, PNG, PDF)</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-zinc-700 file:text-white hover:file:bg-zinc-600 cursor-pointer w-full"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                    <Button type="submit" className="w-full mt-2 h-12 bg-white text-zinc-900 hover:bg-zinc-200 font-bold uppercase text-xs tracking-widest">
                        I Accept and Submit
                    </Button>
                </div>
            </form>
        );
    }

    // --- STEP 2: SUCCESS MESSAGE ---
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 duration-300">
            <div className="p-10 rounded-sm shadow-xl space-y-4">
                {/* <h3 className="text-lg font-bold">2 profile Code</h3> */}
                <div className="space-y-2">
                    <p className="text-2xl font-medium text-white mb-2">Thanks for submitting</p>
                    <p className="text-base text-zinc-400 leading-relaxed">
                        We've received your signed contract and documents. Your verification is under review,
                        and your login code will be emailed to you shortly.
                    </p>
                </div>
            </div>
        </div>
    );
}