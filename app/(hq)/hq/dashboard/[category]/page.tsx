import PerformanceDashboard from "@/components/hq/dashboards/PerformanceDashboard";
import BooksDashboard from "@/components/hq/dashboards/BooksDashboard";
import JoiningRequests from "@/components/hq/dashboards/JoiningRequestsDashboard";
import CorporateLeadsDashboard from "@/components/hq/dashboards/CorporateLeadsDashboard";
import CampDashboard from "@/components/hq/dashboards/CampDashboard";
import TravellerDashboard from "@/components/hq/dashboards/TravellerDashboard";
import InsigniaDashboard from "@/components/hq/dashboards/InsigniaDashboard";
import HostInsightsView from "@/components/hq/dashboards/HostInsightsDashboard";
import CorporateDashboard from "@/components/hq/dashboards/CorporateDashboard";
import HostCampsDashboard from "@/components/hq/dashboards/HostCampsDashboard";
import Library from "@/components/hq/Library";


// This is a mapping of slugs to actual UI components
const VIEW_COMPONENTS: Record<string, React.ComponentType> = {
  // Add more as you build them
  "library": Library
};

export default async function DynamicDashboardPage({ 
  params 
}: { 
  params: Promise<{ category: string; view: string }> 
}) {
  const { category, view } = await params;

  // Fallback to Performance if view isn't found
  const SelectedView = VIEW_COMPONENTS[category] || PerformanceDashboard;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <SelectedView />
    </div>
  );
}