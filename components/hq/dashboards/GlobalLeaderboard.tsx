"use client";

import React, { useState } from "react";
import { Mountain, Wind, Waves, Flame, Award, ExternalLink } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

// --- Mock Data ---
const LEADERS = [
    {
        name: 'Marcus Thorne',
        level: 'Soul Of Steel',
        country: 'India',
        hasSoulOfSteel: true,
        stats: { land: 5, air: 3, water: 4, spirit: 5 }
    },
    {
        name: 'Sarah Chen',
        level: 'Guardian 2',
        country: 'USA',
        hasSoulOfSteel: false,
        stats: { land: 5, air: 5, water: 5, spirit: 5 }
    },
    {
        name: 'Alex Rivera',
        level: 'Marshall 3',
        country: 'India',
        hasSoulOfSteel: false,
        stats: { land: 4, air: 2, water: 1, spirit: 3 }
    },
    {
        name: 'Emily Patel',
        level: 'Master 1',
        country: 'India ',
        hasSoulOfSteel: false,
        stats: { land: 3, air: 1, water: 4, spirit: 2 }
    },
];

export default function GlobalLeaderboard() {
    const [selectedProfile, setSelectedProfile] = useState<any>(null);

    // Helper to render the progress circles for disciplines
    const renderBadgeDots = (count: number, colorClass: string) => (
        <div className="flex items-center justify-center gap-0.5">
            <img src="/badge.png" width={50} />
            <span>+{count}</span>
            {/* {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`w-1.5 h-1.5 rounded-full ${i <= count ? colorClass : 'bg-zinc-800'}`} 
        />
      ))} */}
        </div>
    );

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm">
            <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                    <td className="text-left pl-3 w-1/2">Name</td>
                    <td className="text-right w-1/5">Land</td>
                    <td className="text-right w-1/5">Air</td>
                    <td className="text-right w-1/5">Water</td>
                    <td className="text-right w-1/5">Spirit Roads</td>
                    {/* <td>Name</td> */}
                </thead>
                <tbody className="text-xs">
                    {LEADERS.map((op) => (
                        <tr key={op.name} className="group">
                            {/* Column 1: Level */}
                            {/* <td className="py-4 px-2 align-middle">
                <span className="font-bold text-zinc-500">{op.level}</span>
              </td> */}

                            {/* Column 2: Flag / Name / Soul of Steel Button */}
                            <td className="py-4 px-2 align-middle">
                                {/* <div className="flex items-center gap-3">
                  <span className="text-lg">{op.country}</span>
                  <span className="font-bold text-white text-sm">{op.name}</span>
                  {op.hasSoulOfSteel && (
                    <button 
                      onClick={() => setSelectedProfile(op)}
                      className="ml-2 flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-amber-500 hover:bg-amber-500/20 transition-all"
                    >
                      <Award size={30} />
                      <img src="/badge.png" width={50}/>
                      <span className="text-[9px] font-bold">SOUL OF STEEL</span>
                    </button>
                  )}
                </div> */}
                                <div className="flex items-end">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 border-2    border-amber-500 flex items-center justify-center text-3xl">
                                            <img src="/badge.png" width={50} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold">{op.name}</p>
                                            <p className="text-amber-500 text-xs font-bold flex items-center gap-1">
                                                {op.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* Column 3: Badge Matrix */}
                            <td className="py-4 px-2 align-middle">
                                <div className="flex gap-6 justify-end">
                                    <div className="space-y-1">
                                        {/* <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <Mountain size={10} /> 
                      Land
                    </div> */}
                                        {renderBadgeDots(op.stats.land, 'bg-orange-500')}
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-2 align-middle">
                                <div className="flex gap-6 justify-end">
                                    <div className="space-y-1">
                                        {/* <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <Wind size={10} /> 
                      Air
                    </div> */}
                                        {renderBadgeDots(op.stats.air, 'bg-blue-400')}
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-2 align-middle">
                                <div className="flex gap-6 justify-end">
                                    <div className="space-y-1">
                                        {/* <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <Wind size={10} /> 
                      Air
                    </div> */}
                                        {renderBadgeDots(op.stats.spirit, 'bg-blue-400')}
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-2 align-middle">
                                <div className="flex gap-6 justify-end">
                                    <div className="space-y-1">
                                        {/* <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
                      <Wind size={10} /> 
                      Air
                    </div> */}
                                        {renderBadgeDots(op.stats.water, 'bg-blue-400')}
                                    </div>
                                </div>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- Achievement Profile Dialog --- */}
            <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
                <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl p-0 overflow-hidden">
                    {selectedProfile && (
                        <div className="relative">
                            {/* Header Visual */}
                            <div className="h-32 bg-gradient-to-r from-amber-600/20 to-zinc-900 border-b border-zinc-800 flex items-end p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-amber-500 flex items-center justify-center text-3xl">
                                        {selectedProfile.country}
                                    </div>
                                    <div>
                                        <DialogTitle className="text-2xl font-bold">{selectedProfile.name}</DialogTitle>
                                        <p className="text-amber-500 text-xs font-bold flex items-center gap-1">
                                            <Award size={12} /> SOUL OF STEEL RECIPIENT
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-500 mb-4 tracking-widest ">Operational Record</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                                            <p className="text-zinc-500 text-sm mb-1">Current Rank</p>
                                            <p className="font-bold text-lg">{selectedProfile.level}</p>
                                        </div>
                                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                                            <p className="text-zinc-500 text-sm mb-1">Social Work</p>
                                            <p className="font-bold text-lg text-cyan-500">14 Verified</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-zinc-500 mb-4 tracking-widest ">Discipline Mastery</h4>
                                    <div className="space-y-4">
                                        {Object.entries(selectedProfile.stats).map(([key, val]: any) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-xs font-bold capitalize">{key} Path</span>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-zinc-500 text-sm">{val}/5</span>
                                                    <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-cyan-500"
                                                            style={{ width: `${(val / 5) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <button className="w-full py-3 bg-white text-zinc-950 font-bold rounded-sm text-sm hover:bg-zinc-200 transition-colors">
                  View Full Service History
                </button> */}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}