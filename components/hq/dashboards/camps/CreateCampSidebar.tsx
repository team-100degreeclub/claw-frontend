import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreateCampSidebarProps {
	currentSection: string;
	setCurrentSection: (index: number) => void;
	sections: string[];
	enabledSections: string[];
	isUpdateMode?: boolean;
}

export function CreateCampSidebar({ currentSection, setCurrentSection, sections, enabledSections, isUpdateMode = false }: CreateCampSidebarProps) {
	const getVariant = (sectionName: string) => {
		if (currentSection === sectionName) {
			return "default"; // We'll style it manually below
		}
		return "ghost";
	};

	const handleClick = (sectionName: string) => {
		const index = sections.indexOf(sectionName);
		if (index !== -1) {
			setCurrentSection(index);
		}
	};

	const createSections = sections.filter((s) => !["Camp's Status", "Go Viral", "Traveller's Info", "Letters", "Camp Analytics"].includes(s));

	const orderedManageSections = ["Camp's Status", "Go Viral", "Camp Analytics", "Traveller's Info", "Letters"];
	const manageSections = orderedManageSections.filter((s) => sections.includes(s));

	return (
		<nav className="flex flex-col gap-6">
    {/* Create Section */}
    <div className="flex flex-col gap-2">
        <h4 className="px-3 text-[10px] font-bold uppercase text-zinc-500 tracking-[0.2em]">Create</h4>
        {createSections.map((section) => {
            const isActive = currentSection === section;
            const isDisabled = false;

            return (
                <Button
                    key={section}
                    variant="ghost"
                    className={cn(
                        "w-full justify-start h-10 px-3 text-sm font-medium transition-all rounded-lg",
                        isActive 
                            ? "bg-zinc-800 text-white shadow-sm" 
                            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
                        isDisabled && "text-zinc-700 cursor-not-allowed hover:bg-transparent"
                    )}
                    onClick={() => handleClick(section)}
                    disabled={isDisabled}
                >
                    {section === "Bank Detail" 
                        ? "Bank Details" 
                        : section === "Privacy & Refund" 
                            ? "Privacy & Refund Policy" 
                            : section}
                </Button>
            );
        })}
    </div>

    {/* Manage Section */}
    {manageSections.length > 0 && (
        <div className="flex flex-col gap-2">
            <h4 className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Manage</h4>
            {manageSections.map((section) => {
                const isActive = currentSection === section;
                // const isDisabled = !isUpdateMode && !enabledSections.includes(section);
                const isDisabled = false;
                const isDanger = false; // logic kept as per your snippet

                return (
                    <Button
                        key={section}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start h-10 px-3 text-sm font-medium transition-all rounded-lg",
                            isActive 
                                ? (isDanger ? "bg-red-950 text-red-400" : "bg-zinc-800 text-white shadow-sm") 
                                : isDanger 
                                    ? "text-red-500 hover:bg-red-950/50" 
                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
                            isDisabled && "text-zinc-700 cursor-not-allowed hover:bg-transparent"
                        )}
                        onClick={() => handleClick(section)}
                        disabled={isDisabled}
                    >
                        {section === "Go Viral" 
                            ? "Share" 
                            : section === "Danger Zone" 
                                ? "Delete Camp" 
                                : section === "Camp Analytics" 
                                    ? "Camp Analytics" 
                                    : section}
                    </Button>
                );
            })}
        </div>
    )}
</nav>
	);
}
