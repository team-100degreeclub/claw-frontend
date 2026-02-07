import HeroDiscovery from "@/components/camps/HeroDiscovery";
import CampFilters from "@/components/camps/CampFilters";
import CampGrid from "@/components/camps/CampGrid";

export default function Home() {
  return (
    <>
      <HeroDiscovery />
      
      {/* We wrap the filters and grid in a container for consistent spacing */}
      <div className="space-y-8">
        <CampFilters />
        <CampGrid />
      </div>
    </>
  );
}