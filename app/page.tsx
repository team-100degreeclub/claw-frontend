import Navbar from "@/components/layout/Navbar";
import HeroDiscovery from "@/components/camps/HeroDiscovery";
import CampFilters from "@/components/camps/CampFilters";
import CampGrid from "@/components/camps/CampGrid";
import Leaderboard from "@/components/social/Leaderboard";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600/30">
      {/* <Navbar /> */}
      
      {/* Main Container: col-span-10 grid */}
      <main className="container mx-auto grid grid-cols-10 gap-8 py-8 px-4 lg:px-0">
        
        {/* Left Section (70%): Standard Scrolling Behavior */}
        <section className="col-span-10 lg:col-span-7 space-y-12">
          <HeroDiscovery />
          
          {/* We wrap the filters and grid in a container for consistent spacing */}
          <div className="space-y-8">
            <CampFilters />
            <CampGrid />
          </div>
        </section>

        {/* Right Section (30%): Fixed/Sticky Behavior */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            {/* top-28: Adjust this based on your Navbar height (Navbar h-20 + 8px spacing)
              h-[calc(100vh-120px)]: Ensures the sidebar doesn't extend beyond the screen
              no-scrollbar: Keeps the tactical UI clean even if the list is long
            */}
            <Leaderboard />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}