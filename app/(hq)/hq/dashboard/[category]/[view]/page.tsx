import PerformanceDashboard from "@/components/hq/dashboards/PerformanceDashboard";
import BooksDashboard from "@/components/hq/dashboards/BooksDashboard";
import JoiningRequests from "@/components/hq/dashboards/JoiningRequestsDashboard";
import CorporateLeadsDashboard from "@/components/hq/dashboards/CorporateLeadsDashboard";
import { vi } from "date-fns/locale";


// This is a mapping of slugs to actual UI components
const VIEW_COMPONENTS: Record<string, React.ComponentType> = {
  "performance": PerformanceDashboard,
  "books": BooksDashboard,
  "joining-request": JoiningRequests,
  "corporate-leads": CorporateLeadsDashboard,
  // Add more as you build them
};

export default async function DynamicDashboardPage({ 
  params 
}: { 
  params: Promise<{ category: string; view: string }> 
}) {
  const { category, view } = await params;
  
  // Fallback to Performance if view isn't found
  const SelectedView = VIEW_COMPONENTS[view] || PerformanceDashboard;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <SelectedView />
    </div>
  );
}