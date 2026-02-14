import PerformanceDashboard from "@/components/hq/dashboards/PerformanceDashboard";
import BooksDashboard from "@/components/hq/dashboards/BooksDashboard";
import JoiningRequests from "@/components/hq/dashboards/JoiningRequestsDashboard";


// This is a mapping of slugs to actual UI components
const VIEW_COMPONENTS: Record<string, React.ComponentType> = {
  "performance": PerformanceDashboard,
  "books": BooksDashboard,
  "joining-request": JoiningRequests,
  // Add more as you build them
};

export default function DynamicDashboardPage({ 
  params 
}: { 
  params: { view: string } 
}) {
  const { view } = params;
  
  // Fallback to Performance if view isn't found
  const SelectedView = VIEW_COMPONENTS[view] || PerformanceDashboard;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <SelectedView />
    </div>
  );
}