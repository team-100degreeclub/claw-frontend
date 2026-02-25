// components/hq/corporate/LeadInsights.tsx
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "../PerformanceDashboard";
import { cn } from "@/lib/utils";

export function LeadInsights() {
  return (
    <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
      <div className="flex justify-around flex-wrap">
        <MetricItem className="w-1/6" label="Total Deal" value="45" text />
        <MetricItem className="w-1/6" label="Success" value="12" text />
        <MetricItem className="w-1/6" label="Discussion" value="28" text />
        <MetricItem className="w-1/6" label="Canceled" value="5" text />
        <MetricItem className="w-1/6" label="Conv. Rate" value="21%" highlight text />

        <MetricItem className="w-1/6" label="Highest Deal" value="230000" desc="Tech Corp" />
        <MetricItem className="w-1/6" label="Lowest Deal" value="12000" desc="Small Biz" />
        <MetricItem className="w-1/6" label="Avg Deal" value="75000" />
        <MetricItem className="w-1/6" label="Gross" value="3400000" />
        <MetricItem className="w-1/6" label="Net" value="2800000" highlight />
      </div>
    </Card>
  );
}

export function MetricItem({ label, value, color = "text-white", highlight, text, desc, className }: any) {
  return (
    <div className={cn("m-2 rounded-xl p-3 shadow-sm flex flex-col", className)}>
      {/* Label: Using text-sm for a clean, secondary title */}
      <p className="text-base font-medium text-zinc-300">
        {label}
      </p>

      {/* Main Value: Using text-base for the primary metric with professional slate coloring */}
      <p className={`text-3xl font-bold ${highlight ? 'text-emerald-600' : 'text-white'}`}>
        {text
          ? value
          : formatCompactNumber(value)
          // parseFloat(value).toLocaleString("en-IN", { 
          //     maximumFractionDigits: 0, 
          //     minimumFractionDigits: 0, 
          //     style: "currency", 
          //     currency: "INR" 
          //   })
        }
      </p>

      {/* Description: Using text-sm for secondary context, avoiding uppercase */}
      {desc && (
        <p className="text-sm text-slate-400 font-medium">
          {desc}
        </p>
      )}
    </div>
  );
}