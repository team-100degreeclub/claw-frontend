"use client";

import { useState } from "react";
import HeroDiscovery from "@/components/camps/HeroDiscovery";
import CampFilters from "@/components/camps/CampFilters";
import CampGrid from "@/components/camps/CampGrid";

export default function Home() {
  const [isLetsTalkActive, setIsLetsTalkActive] = useState(false);

  return (
    <>
      <HeroDiscovery />
      
      {/* We wrap the filters and grid in a container for consistent spacing */}
      <div className="space-y-8">
        <CampFilters isLetsTalkActive={isLetsTalkActive} onToggleLetsTalk={setIsLetsTalkActive} />
        {isLetsTalkActive ? (
          <p className="text-sm text-white px-4">
            These are conversation camps built by Special Forces veterans, where together we breathe through your life situations and try to see them from a slightly higher consciousness. These camps are built for small or personal groups only.
          </p>
        ) : (
          <p className="text-sm text-white px-4">
            These are adventure camps built by Special Forces veterans, where we try to reach the highest level of consciousness by performing activities which target the physical, mental and medical aspects.
          </p>
        )}
        <CampGrid isLetsTalkActive={isLetsTalkActive} />
      </div>
    </>
  );
}