// components/hq/corporate/LeadDetailsSheet.tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LeadDetailsSheet({ isOpen, onClose, lead }: any) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl bg-zinc-950 border-zinc-800 overflow-y-auto">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-xl font-black uppercase italic tracking-tighter">
            Deal Configuration: <span className="text-cyan-500">{lead?.company}</span>
          </SheetTitle>
        </SheetHeader>

        <form className="space-y-8 pb-10">
          {/* Section: Core Info */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Inquiry Date" type="date" />
            <FormInput label="Event Location" placeholder="e.g. London, UK" />
            <FormInput label="Schedule" type="date" />
            <FormInput label="Time" type="time" />
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <p className="text-[10px] uppercase font-black text-zinc-500">Contact & Purpose</p>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Phone" />
              <FormInput label="Email" />
            </div>
            <FormInput label="Message / Purpose" isTextArea />
          </div>

          {/* Section: Financials (With 15% Calculation) */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <p className="text-[10px] uppercase font-black text-cyan-500 italic">Financial Breakdown</p>
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="Gross Deal (₹)" defaultValue="100000" />
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-500">CLAW Management Fee (15%)</label>
                <div className="h-10 px-3 bg-zinc-900 flex items-center text-zinc-400 text-xs">₹15,000</div>
              </div>
              <FormInput label="Taxes" />
              <FormInput label="Net Profit" highlight />
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <Button className="w-full bg-white text-black hover:bg-cyan-500 hover:text-white font-black uppercase tracking-widest text-xs">
              Save Configuration
            </Button>
            <Button variant="outline" className="w-full border-zinc-800 text-zinc-500 text-xs">
              Documents Link / Assets
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function FormInput({ label, isTextArea, highlight, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase font-bold text-zinc-500">{label}</label>
      {isTextArea ? (
        <textarea className="w-full bg-zinc-900 border-zinc-800 rounded-sm p-3 text-xs min-h-[100px]" />
      ) : (
        <Input className={`bg-zinc-900 border-zinc-800 h-10 text-xs ₹{highlight ? 'border-cyan-500/50 text-cyan-400' : ''}`} {...props} />
      )}
    </div>
  );
}