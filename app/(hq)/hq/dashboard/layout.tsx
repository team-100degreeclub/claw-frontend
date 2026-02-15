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
import { TeamSidebar } from "@/components/hq/team/TeamSidebar";

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


  const [primaryCollapsed, setPrimaryCollapsed] = useState(false);
  const [secondaryCollapsed, setSecondaryCollapsed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname.split('/').filter(Boolean); // e.g., ["hq", "dashboard", "workstation", "insights"]
  console.log(pathSegments);
  // --- Derive activePrimaryLabel ---
  let activePrimaryLabel = "Board Room"; // Default
  if (pathSegments.length >= 3 && pathSegments[0] === "hq" && pathSegments[1] === "dashboard") {
    const dashboardCategorySegment = pathSegments[2]; // e.g., 'business', 'workstation', 'library'

    if (["business", "operations"].includes(dashboardCategorySegment)) {
      activePrimaryLabel = "Board Room";
    } else if (dashboardCategorySegment === "workstation") {
      activePrimaryLabel = "Work Station";
    } else if (dashboardCategorySegment === "team") {
      activePrimaryLabel = "Team";
    } else if (dashboardCategorySegment === "updates") {
      activePrimaryLabel = "Updates";
    } else if (dashboardCategorySegment === "library") {
      activePrimaryLabel = "Library";
    } else if (dashboardCategorySegment === "support") {
      activePrimaryLabel = "Support";
    } else if (dashboardCategorySegment === "profile") {
      activePrimaryLabel = "Profile";
    }
  }

  // --- Derive activeSecondaryLabel ---
  let activeSecondaryLabel = "";
  const currentCategorySegment = pathSegments[2]; // e.g., 'business'
  const currentViewSegment = pathSegments[3];   // e.g., 'performance'

  if (currentViewSegment && secondaryMenus[activePrimaryLabel]) {
    for (const group of secondaryMenus[activePrimaryLabel]) {
      for (const item of group.items) {
        if (item.toLowerCase().replace(/\s+/g, "-") === currentViewSegment) {
          // Also check if the category matches the current URL category segment
          if (group.category.toLowerCase() === currentCategorySegment) {
            activeSecondaryLabel = item;
            break;
          }
        }
        if (activeSecondaryLabel) break;
      }
      if (activeSecondaryLabel) break;
    }
  }

  // Set default secondary if not found (e.g., if just navigated to primary, or on initial load to a primary route)
  if (!activeSecondaryLabel) {
    if (activePrimaryLabel === "Board Room" && secondaryMenus["Board Room"] && secondaryMenus["Board Room"][0]) {
      activeSecondaryLabel = secondaryMenus["Board Room"][0].items[0]; // "Performance"
    } else if (activePrimaryLabel === "Work Station" && secondaryMenus["Work Station"] && secondaryMenus["Work Station"][0]) {
      activeSecondaryLabel = secondaryMenus["Work Station"][0].items[0]; // "Insights"
    }
  }

  const handlePrimaryClick = (label: string) => {
    if (label === "Board Room") {
      router.push("/hq/dashboard/business/performance"); // Default for Board Room
    } else if (label === "Work Station") {
      router.push("/hq/dashboard/workstation/insights"); // Default for Work Station
    } else if (label === "Team") {
      router.push("/hq/dashboard/team/self"); // Assuming this is a direct path without secondary menus
    } else if (label === "Updates") {
      router.push("/hq/dashboard/updates"); // Assuming this is a direct path without secondary menus
    } else if (label === "Library") {
      router.push("/hq/dashboard/library"); // Assuming this is a direct path without secondary menus
    } else if (label === "Support") {
      router.push("/hq/dashboard/support"); // Assuming this is a direct path without secondary menus
    } else if (label === "Profile") {
      router.push("/hq/dashboard/profile"); // Assuming this is a direct path without secondary menus
    }
  };

  const hasSecondary =
    (!!secondaryMenus[activePrimaryLabel] || activePrimaryLabel === "Team") &&
    !["Library", "Support", "Profile", "Updates"].includes(activePrimaryLabel);

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
                variant={activePrimaryLabel === item.label ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-4", primaryCollapsed && "justify-center px-0")}
                onClick={() => handlePrimaryClick(item.label)}
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
                variant={activePrimaryLabel === item.label ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-4 text-zinc-500", primaryCollapsed && "justify-center px-0")}
                onClick={() => handlePrimaryClick(item.label)}
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
          {primaryCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </Button>
      </aside>

      {/* SECONDARY SIDEBAR */}
      {hasSecondary && (
        <aside
          className={cn(
            "relative flex flex-col border-r border-zinc-800 bg-zinc-900/30 backdrop-blur-xl transition-all duration-300 ease-in-out z-20",
            secondaryCollapsed ? "w-12" : "w-64"
          )}
        >
          {!secondaryCollapsed ? (
            <>
              {activePrimaryLabel === "Team" ? (
                <TeamSidebar />
              ) : (
                <ScrollArea className="flex-1 p-6">
                  {secondaryMenus[activePrimaryLabel].map((group) => (
                    <div key={group.category} className="mb-10">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-4 px-2">
                        {group.category}
                      </h3>

                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item}
                            onClick={() =>
                              handleSecondaryClick(group.category, item)
                            }
                            className={cn(
                              "w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-tight rounded-sm transition-all",
                              activeSecondaryLabel === item &&
                                group.category.toLowerCase() ===
                                currentCategorySegment
                                ? "text-white bg-zinc-800/50"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                            )}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </>
          ) : (
            // Collapsed indicator
            <div className="flex flex-col items-center py-10 gap-8">
              <div className="h-1 w-6 bg-zinc-800 rounded-full" />
              <div className="h-1 w-6 bg-zinc-800 rounded-full" />
            </div>
          )}

          {/* SECONDARY COLLAPSE TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 z-40"
            onClick={() => setSecondaryCollapsed(!secondaryCollapsed)}
          >
            {secondaryCollapsed ? (
              <ChevronRight size={12} />
            ) : (
              <ChevronLeft size={12} />
            )}
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