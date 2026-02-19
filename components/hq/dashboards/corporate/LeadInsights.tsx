// components/hq/corporate/LeadInsights.tsx
import { Card } from "@/components/ui/card";

export function LeadInsights() {
  return (
    <Card className="bg-zinc-900/40 border-zinc-700 rounded-none p-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <MetricItem label="Total Deal" value="45" text/>
        <MetricItem label="Success" value="12" text/>
        <MetricItem label="Discussion" value="28" text/>
        <MetricItem label="Canceled" value="5" text/>
        <MetricItem label="Conv. Rate" value="21%" highlight text/>
        
        <MetricItem label="Highest Deal" value="230000" desc="Tech Corp" />
        <MetricItem label="Lowest Deal" value="12000" desc="Small Biz" />
        <MetricItem label="Avg Deal" value="75000" />
        <MetricItem label="Gross" value="3400000" />
        <MetricItem label="Net" value="2800000" highlight />
      </div>
    </Card>
  );
}

export function MetricItem({ label, value, color = "text-white", highlight, text, desc }: any) {
  return (
    <div className="space-y-1 w-fit">
      <p className="text-xs font-black text-zinc-500">{label}</p>
      <p className={`text-2xl font-black tracking-tighter ${highlight ? 'text-green-400' : color}`}>
        {text ? value : parseFloat(value).toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 , style: "currency", currency: "INR" })}
      </p>
      {desc && <p className="text-[9px] text-zinc-600 uppercase font-bold">{desc}</p>}
    </div>
  );
}