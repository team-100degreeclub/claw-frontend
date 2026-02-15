"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, Tent, Users, Bell, 
  Library, LifeBuoy, UserCircle, ChevronLeft, ChevronRight, 
  LampDesk
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const secondaryMenus: Record<string, { category: string; items: string[] }[]> = {
  "Board Room": [
    {
      category: "Business",
      items: ["Performance", "Books", "Corporate Leads", "Camp", "Traveller", "Insignia", "Joining Request"],
    },
    {
      category: "Operations",
      items: ["Alert", "Engagement", "Errors & Bugs", "Api", "Social Media", "Feature Request", "Customer Support"],
    },
  ],
  "Work Station": [
    {
      category: "Workstation",
      items: ["Insights", "Corporate", "Camps"],
    },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activePrimary, setActivePrimary] = useState("Board Room");
  const [activeSecondary, setActiveSecondary] = useState("Performance");
  
  const [primaryCollapsed, setPrimaryCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);

  const hasSecondary = !!secondaryMenus[activePrimary] && !["Library", "Support", "Profile"].includes(activePrimary);

  const pathname = usePathname();
  const router = useRouter();
  
  // Extract category and view from URL (e.g., /hq/dashboard/business/performance)
  const paths = pathname.split("/");
  const currentCategory = paths[3] || "business";
  const currentView = paths[4] || "performance";

  const handleSecondaryClick = (category: string, item: string) => {
    // Format item name for URL (e.g., "Corporate Leads" -> "corporate-leads")
    const viewSlug = item.toLowerCase().replace(/\s+/g, "-");
    router.push(`/hq/dashboard/${category.toLowerCase()}/${viewSlug}`);
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
      
      {/* PRIMARY SIDEBAR */}
      <aside className={cn(
        "relative flex flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300",
        primaryCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-6 font-bold text-white tracking-tighter truncate">
          {primaryCollapsed ? "C." : "C.L.A.W HQ"}
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            {[
              { label: "Board Room", icon: LayoutDashboard },
              { label: "Work Station", icon: LampDesk },
              { label: "Team", icon: Users },
              { label: "Updates", icon: Bell },
            ].map((item) => (
              <Button
                key={item.label}
                variant={activePrimary === item.label ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-4", primaryCollapsed && "justify-center px-0")}
                onClick={() => setActivePrimary(item.label)}
              >
                <item.icon className="h-5 w-5" />
                {!primaryCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          <div className="mb-auto pt-10 pb-6 space-y-2">
            {[
              { label: "Library", icon: Library },
              { label: "Support", icon: LifeBuoy },
              { label: "Profile", icon: UserCircle },
            ].map((item) => (
              <Button
                key={item.label}
                variant={activePrimary === item.label ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-4 text-zinc-500", primaryCollapsed && "justify-center px-0")}
                onClick={() => setActivePrimary(item.label)}
              >
                <item.icon className="h-5 w-5" />
                {!primaryCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <Button 
          variant="ghost" size="icon" 
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950"
          onClick={() => setPrimaryCollapsed(!primaryCollapsed)}
        >
          {primaryCollapsed ? <ChevronRight size={12}/> : <ChevronLeft size={12}/>}
        </Button>
      </aside>

      {/* SECONDARY SIDEBAR */}
      {hasSecondary && (
        <aside className={cn(
          "relative flex flex-col border-r border-zinc-800 bg-zinc-900/30 backdrop-blur-xl transition-all duration-300 ease-in-out z-20",
          secondaryCollapsed ? "w-12" : "w-64"
        )}>
          {!secondaryCollapsed ? (
            <ScrollArea className="flex-1 p-6">
              {/* <div className="mb-6">
                <p className="text-[10px] uppercase font-black text-cyan-500 italic tracking-[0.2em]">Context</p>
                <h2 className="text-lg font-bold text-white">{activePrimary}</h2>
              </div> */}
              
              {secondaryMenus[activePrimary].map((group) => (
                <div key={group.category} className="mb-10">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-4 px-2">
                    {group.category}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSecondaryClick(group.category, item)}
                        className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-tight rounded-sm transition-all text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            // Indicator for collapsed secondary state
            <div className="flex flex-col items-center py-10 gap-8">
               <div className="h-1 w-6 bg-zinc-800 rounded-full" />
               <div className="h-1 w-6 bg-zinc-800 rounded-full" />
            </div>
          )}

          {/* SECONDARY COLLAPSE TOGGLE - ADDED THIS */}
          <Button 
            variant="ghost" size="icon" 
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 z-40"
            onClick={() => setSecondaryCollapsed(!secondaryCollapsed)}
          >
            {secondaryCollapsed ? <ChevronRight size={12}/> : <ChevronLeft size={12}/>}
          </Button>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-black p-8">
        {children}
      </main>
    </div>
  );
}