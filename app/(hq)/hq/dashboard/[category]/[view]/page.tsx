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
import JoiningRequestsDashboard from "@/components/hq/dashboards/JoiningRequestsDashboard";
import Support from "@/components/profile/Support";
import TermsAndPrivacyDialog from "@/components/profile/TermsAndPrivacyDialog";
import ProfileForm from "@/components/hq/ProfileForm";
import Contract from "@/components/profile/Contract";


// This is a mapping of slugs to actual UI components
const VIEW_COMPONENTS: Record<string, React.ComponentType> = {
  "business_performance": PerformanceDashboard,
  "business_books": BooksDashboard,
  "business_joining-request": JoiningRequests,
  "business_corporate-leads": CorporateLeadsDashboard,
  "business_camp": CampDashboard,
  "business_traveller": TravellerDashboard,
  "business_insignia": InsigniaDashboard,
  "business_internship": JoiningRequestsDashboard,
  "workstation_insights": HostInsightsView,
  "workstation_corporate": CorporateDashboard,
  "workstation_camps": HostCampsDashboard,
  "team": HostInsightsView,
  "profile_profile-data": ProfileForm,
  "profile_support": Support,
  "profile_privacy-policy" : TermsAndPrivacyDialog,
  "profile_contract": Contract
  // Add more as you build them
};

export default async function DynamicDashboardPage({ 
  params 
}: { 
  params: Promise<{ category: string; view: string }> 
}) {
  const { category, view } = await params;

  console.log(category, view);  

  if (category === "team") {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <HostInsightsView teamView={true}/>
      </div>
    );
  }
  
  // Fallback to Performance if view isn't found
  const SelectedView = VIEW_COMPONENTS[category + "_" + view] || PerformanceDashboard;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {
        // (SelectedView === HostInsightsView && category.includes("team")) ? <HostInsightsView teamView={false} /> : <SelectedView />
      }
      <SelectedView />
    </div>
  );
}