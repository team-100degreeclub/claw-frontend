import PerformanceDashboard from "@/components/hq/dashboards/PerformanceDashboard";
import Library from "@/components/hq/Library";


// This is a mapping of slugs to actual UI components
const VIEW_COMPONENTS: Record<string, React.ComponentType> = {
  // Add more as you build them
  "library": Library
};

export default async function DynamicDashboardPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params;

  // Fallback to Performance if view isn't found
  const SelectedView = VIEW_COMPONENTS[category] || PerformanceDashboard;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <SelectedView />
    </div>
  );
}