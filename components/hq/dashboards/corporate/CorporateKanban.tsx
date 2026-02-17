"use client";

import React, { useState, useEffect } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, MapPin, Building2, Calendar, Phone, Mail, DollarSign, Clock, Users, Link as LinkIcon, MessageSquare, UserCheck, Briefcase, ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import AvailabilityCalendar from "./AvailabilityCalendar";

// Helper function to format numbers to Indian Rupee currency
const formatToIndianCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0, // Assuming whole rupees for these displays
    });
};

// --- Types ---
interface LeadData {
    id: string;
    column: string;
    inquiryDate: string;
    company: string;
    location: string;
    schedule: string;
    time: string;
    phone: string;
    email: string;
    message: string;
    requestSpeaker: string;
    teamAvailable: string;
    gross: number;
    fee: number;
    taxes: number;
    net: number;
    assignSpeaker: string;
    docsLink: string;
}

const SPEAKERS = [
    { value: "sarah-chen", label: "Dr. Sarah Chen" },
    { value: "marcus-thorne", label: "Marcus Thorne" },
    { value: "robert-p", label: "Robert P." },
    { value: "emily-rivera", label: "Emily Rivera" },
    { value: "jordan-lee", label: "Jordan Lee" },
    { value: "alex-morgan", label: "Alex Morgan" },
];

// --- Dummy Data ---
const DUMMY_LEADS: Record<string, LeadData[]> = {
    Lead: [
        {
            id: "d1", column: "Lead", inquiryDate: "2026-02-10", company: "TechNova Solutions", location: "San Francisco, CA",
            schedule: "2026-05-15", time: "10:00", phone: "555-0123", email: "contact@technova.io",
            message: "Keynote on AI ethics and future of work.", requestSpeaker: "Dr. Sarah Chen",
            teamAvailable: "A-Team", gross: 15000, fee: 2250.00, taxes: 1200, net: 11550.00,
            assignSpeaker: "Pending", docsLink: "https://drive.google.com/docs/1"
        },
        {
            id: "d2", column: "Lead", inquiryDate: "2026-02-12", company: "GreenGrid Energy", location: "Austin, TX",
            schedule: "2026-06-20", time: "14:30", phone: "555-0987", email: "events@greengrid.com",
            message: "Sustainability summit closing session.", requestSpeaker: "Marcus Thorne",
            teamAvailable: "B-Team", gross: 8000, fee: 1200.00, taxes: 640, net: 6160.00,
            assignSpeaker: "Unassigned", docsLink: ""
        }
    ],
    Discussion: [
        {
            id: "d3", column: "Discussion", inquiryDate: "2026-01-25", company: "Global Finance Inc.", location: "New York, NY",
            schedule: "2026-04-05", time: "09:00", phone: "555-4433", email: "hr@globalfinance.com",
            message: "Leadership workshop for C-suite executives.", requestSpeaker: "John Maxwell Style",
            teamAvailable: "Gold Tier", gross: 25000, fee: 3750.00, taxes: 2000, net: 19250.00,
            assignSpeaker: "Robert P.", docsLink: "https://dropbox.com/s/proposal-v2"
        }
    ],
    // Assign: [],
    Deal: [
        {
            id: "d4", column: "Deal", inquiryDate: "2026-01-10", company: "Creative Minds Agency", location: "Remote",
            schedule: "2026-02-25", time: "11:00", phone: "555-7788", email: "hello@creativeminds.com",
            message: "Monthly inspiration webinar.", requestSpeaker: "Emily Rivera",
            teamAvailable: "Web-Team", gross: 5000, fee: 750.00, taxes: 400, net: 3850.00,
            assignSpeaker: "Emily Rivera", docsLink: "https://zoom.us/webinar/123"
        }
    ],
    // Completed: [],
    // Canceled: [],
};

export function CorporateKanban() {
    const [columns, setColumns] = useState(DUMMY_LEADS);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Drag only starts after moving 8px, allowing clicks to fire
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // Press and hold to drag on mobile
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleAddNew = () => {
        setSelectedLead(null);
        setIsSheetOpen(true);
    };

    const handleEditTask = (lead: LeadData) => {
        setSelectedLead(lead);
        setIsSheetOpen(true);
    };

    const onSave = (data: Partial<LeadData>) => {
        if (selectedLead) {
            const colId = selectedLead.column;
            setColumns((prev) => ({
                ...prev,
                [colId]: prev[colId].map((i) => (i.id === selectedLead.id ? { ...i, ...data } : i)),
            }));
        } else {
            const id = Math.random().toString(36).substring(2, 9);
            const newLead = { ...data, id, column: "Lead" } as LeadData;
            setColumns((prev) => ({ ...prev, Lead: [...prev.Lead, newLead] }));
        }
        setIsSheetOpen(false);
    };

    const findContainer = (id: string) => (id in columns ? id : Object.keys(columns).find(k => columns[k].find(i => i.id === id)));

    const handleDragOver = (e: any) => {
        const { active, over } = e;
        if (!over) return;
        const activeCol = findContainer(active.id);
        const overCol = findContainer(over.id) || over.id;
        if (activeCol && overCol && activeCol !== overCol) {
            setColumns((prev) => {
                const activeItems = prev[activeCol];
                const overItems = prev[overCol] || [];
                const activeIdx = activeItems.findIndex((i) => i.id === active.id);
                const item = { ...activeItems[activeIdx], column: overCol };
                return { ...prev, [activeCol]: activeItems.filter(i => i.id !== active.id), [overCol]: [...overItems, item] };
            });
        }
    };

    const handleDragEnd = (e: any) => {
        const { active, over } = e;
        if (!over) return;
        const activeCol = findContainer(active.id);
        const overCol = findContainer(over.id) || over.id;
        if (activeCol && overCol && activeCol === overCol) {
            const activeIdx = columns[activeCol].findIndex(i => i.id === active.id);
            const overIdx = columns[overCol].findIndex(i => i.id === over.id);
            if (activeIdx !== overIdx) setColumns(prev => ({ ...prev, [activeCol]: arrayMove(prev[activeCol], activeIdx, overIdx) }));
        }
        setActiveId(null);
    };

    return (
        <div className="flex flex-col gap-6 w-full p-6 bg-zinc-900/70 min-h-screen text-white rounded-2xl">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Lead Board</h1>
                    {/* <p className="text-zinc-500 text-sm">Track inquiries and revenue pipeline</p> */}
                </div>
                {/* <Button onClick={handleAddNew} className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-medium h-10 px-6">
                    <Plus size={18} className="mr-2" /> Add Task
                </Button> */}
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={(e) => setActiveId(e.active.id as string)} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide">
                    {Object.keys(columns).map((id) => (
                        <KanbanColumn key={id} id={id} title={id} items={columns[id]} onCardClick={handleEditTask} />
                    ))}
                </div>
                <DragOverlay>
                    {activeId ? <div className="scale-105 shadow-2xl opacity-90"><KanbanCard item={Object.values(columns).flat().find(i => i.id === activeId)} /></div> : null}
                </DragOverlay>
            </DndContext>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                {/* INCREASED WIDTH TO 800PX */}
                <SheetContent className="sm:max-w-4xl min-w-3xl bg-zinc-950 border-zinc-800 text-zinc-100 overflow-y-auto p-0">
                    <KanbanForm
                        initialData={selectedLead}
                        onSave={onSave}
                        onCancel={() => setIsSheetOpen(false)}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}

// --- Sub-Component: Form ---
function KanbanForm({ initialData, onSave, onCancel }: { initialData: LeadData | null, onSave: (data: any) => void, onCancel: () => void }) {
    const [openSpeaker, setOpenSpeaker] = useState(false);
    const [isAvailSheetOpen, setIsAvailSheetOpen] = useState(false);
    const [formData, setFormData] = useState({
        inquiryDate: "", company: "", location: "", schedule: "", time: "",
        phone: "", email: "", message: "", requestSpeaker: "", teamAvailable: "",
        gross: 0, fee: 0, taxes: 0, net: 0, assignSpeaker: "", docsLink: ""
    });

    useEffect(() => {
        if (initialData) setFormData({ ...initialData });
    }, [initialData]);

    useEffect(() => {
        const grossNum = formData.gross;
        const taxNum = formData.taxes;
        const feeCalc = grossNum * 0.15;
        const netCalc = grossNum - feeCalc - taxNum;
        setFormData(prev => ({ ...prev, fee: feeCalc, net: netCalc }));
    }, [formData.gross, formData.taxes]);

    return (
        <div className="flex flex-col h-full">
            <div className="p-8 border-b border-zinc-900 sticky top-0 bg-zinc-950 z-10">
                <SheetHeader>
                    {/* <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black  tracking-[0.2em] mb-2">
            <Briefcase size={14} />
            <span>Opportunity Management</span>
          </div> */}
                    <SheetTitle className="text-3xl text-white font-bold">
                        {initialData ? formData.company : "New Lead Inquiry"}
                    </SheetTitle>
                </SheetHeader>
            </div>

            <div className="flex-1 p-8 space-y-12 pb-24">
                {/* Logistics Group */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-zinc-100 font-semibold border-l-2 border-zinc-100 pl-4">Logistics & Identity</div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Inquiry Date</Label>
                            <Input type="date" value={formData.inquiryDate} onChange={e => setFormData({ ...formData, inquiryDate: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Company Name</Label>
                            <Input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Location</Label>
                            <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Event Date</Label>
                            <Input type="date" value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Time</Label>
                            <Input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-zinc-100 font-semibold border-l-2 border-zinc-100 pl-4">Point of Contact</div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Phone</Label>
                            <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs">Email</Label>
                            <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Message / Purpose</Label>
                        <Textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="bg-zinc-900 border-zinc-800 min-h-[100px] resize-none" />
                    </div>
                </div>

                {/* Staffing */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
                    <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Requested Speaker</Label>
                        <Input value={formData.requestSpeaker} onChange={e => setFormData({ ...formData, requestSpeaker: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Team Available</Label>
                        <div className="relative group">
                            <Input
                                readOnly
                                value={formData.teamAvailable}
                                placeholder="Check availability..."
                                className="bg-zinc-900 border-zinc-800 h-11 cursor-pointer group-hover:border-zinc-600 transition-colors"
                                onClick={() => setIsAvailSheetOpen(true)}
                            />
                            <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-zinc-500 group-hover:text-zinc-300 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Nested Sheet for Calendar */}
                <Sheet open={isAvailSheetOpen} onOpenChange={setIsAvailSheetOpen}>
                    <SheetContent side="right" className="sm:max-w-[1000px] min-w-2xl bg-zinc-950 border-zinc-800 p-0 overflow-y-auto">
                        <AvailabilityCalendar onSelectTeam={(val) => {
                            setFormData({ ...formData, teamAvailable: val });
                            setIsAvailSheetOpen(false);
                        }} />
                    </SheetContent>
                </Sheet>

                {/* Deal */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-l-2 border-zinc-100 pl-4">
                        <div className="text-zinc-100 font-semibold">Deal</div>
                        {/* <span className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase">Automated 15% Management Fee</span> */}
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs flex items-center gap-2">
                                <DollarSign size={14} className="text-zinc-600" /> Gross Amount (₹)
                            </Label>
                            <Input
                                type="number"
                                value={formData.gross}
                                onChange={e => setFormData({ ...formData, gross: parseFloat(e.target.value) || 0 })}
                                className="bg-zinc-900 border-zinc-800 h-11 focus:border-emerald-500 transition-colors text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs flex items-center gap-2">
                                <Users size={14} className="text-zinc-600" /> CLAW Fee (15%)
                            </Label>
                            <Input
                                readOnly
                                value={formatToIndianCurrency(formData.fee)}
                                className="bg-zinc-900/50 border-zinc-800 h-11 text-zinc-500 cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-500 text-xs flex items-center gap-2">
                                <DollarSign size={14} className="text-zinc-600" /> Taxes (₹)
                            </Label>
                            <Input
                                type="number"
                                value={formData.taxes}
                                onChange={e => setFormData({ ...formData, taxes: parseFloat(e.target.value) || 0 })}
                                className="bg-zinc-900 border-zinc-800 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold flex items-center gap-2">
                                <UserCheck size={14} /> Net Income (₹)
                            </Label>
                            <Input
                                type="number"
                                value={formatToIndianCurrency(formData.net)}
                                disabled
                                className="bg-zinc-900 border-zinc-800 h-11"
                            />
                        </div>
                    </div>
                </div>

                {/* Final Details */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
                    <div className="space-y-2">
                        {/* <Label className="text-zinc-500 text-xs">Assign Speaker</Label>
            <Input value={formData.assignSpeaker} onChange={e => setFormData({...formData, assignSpeaker: e.target.value})} className="bg-zinc-900 border-zinc-800 h-11" /> */}
                        <Label className="text-zinc-500 text-xs mb-1 flex items-center gap-2">
                            <UserCheck size={14} /> Assign Speaker
                        </Label>

                        {/* --- COMBOBOX IMPLEMENTATION --- */}
                        <Popover open={openSpeaker} onOpenChange={setOpenSpeaker}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openSpeaker}
                                    className="w-full justify-between bg-zinc-900 border-zinc-800 h-11 hover:bg-zinc-800 text-zinc-100 font-normal"
                                >
                                    {formData.assignSpeaker
                                        ? SPEAKERS.find((s) => s.label === formData.assignSpeaker)?.label || formData.assignSpeaker
                                        : "Select speaker..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-zinc-900 border-zinc-800">
                                <Command className="bg-transparent">
                                    <CommandInput placeholder="Search speakers..." className="h-9 text-zinc-100" />
                                    <CommandList>
                                        <CommandEmpty>No speaker found.</CommandEmpty>
                                        <CommandGroup>
                                            {SPEAKERS.map((speaker) => (
                                                <CommandItem
                                                    key={speaker.value}
                                                    value={speaker.label}
                                                    onSelect={(currentValue) => {
                                                        setFormData({
                                                            ...formData,
                                                            assignSpeaker: currentValue === formData.assignSpeaker ? "" : currentValue,
                                                        });
                                                        setOpenSpeaker(false);
                                                    }}
                                                    className="text-zinc-100 aria-selected:bg-zinc-800 aria-selected:text-white cursor-pointer"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            formData.assignSpeaker === speaker.label ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {speaker.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-zinc-500 text-xs">Documents Link</Label>
                        <Input value={formData.docsLink} onChange={e => setFormData({ ...formData, docsLink: e.target.value })} className="bg-zinc-900 border-zinc-800 h-11" placeholder="https://" />
                    </div>
                </div>
            </div>

            <div className="p-8 border-t border-zinc-900 bg-zinc-950 sticky bottom-0 z-10">
                <SheetFooter className="sm:flex-row flex-row gap-4">
                    <Button variant="default" onClick={onCancel} className="flex-1 h-12 bg-zinc-800 hover:bg-zinc-800/80 text-zinc-500">Cancel</Button>
                    <Button onClick={() => onSave(formData)} className="flex-1 bg-white text-black hover:bg-zinc-300 h-12 font-bold text-md">
                        {initialData ? "Apply Changes" : "Add"}
                    </Button>
                </SheetFooter>
            </div>
        </div>
    );
}

// --- Kanban Sub-Components ---
function KanbanColumn({ id, title, items, onCardClick }: any) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div className="flex-1 min-w-[320px] bg-zinc-900/10 rounded-2xl border border-zinc-900/50 flex flex-col">
            <div className="p-4 flex justify-between items-center text-[11px] font-bold text-zinc-500  tracking-[0.15em]">
                {title} <span className="bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">{items.length}</span>
            </div>
            <div ref={setNodeRef} className="p-3 space-y-3 flex-1 min-h-[500px]">
                <SortableContext items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map((item: any) => <KanbanCard key={item.id} id={item.id} item={item} onClick={() => onCardClick(item)} />)}
                </SortableContext>
            </div>
        </div>
    );
}

function KanbanCard({ id, item, onClick }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Translate.toString(transform), transition };
    const handleInternalClick = (e: React.MouseEvent) => {
        // If we're dragging, don't trigger the click
        if (isDragging) return;
        onClick(item);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={handleInternalClick} className={cn("bg-zinc-950 border border-zinc-900 p-4 rounded-xl hover:border-zinc-700 transition-all cursor-grab active:cursor-grabbing group shadow-sm", isDragging && "opacity-30 border-dashed border-zinc-800")}>
            <h4 className="text-[13px] font-semibold mb-1 text-zinc-100 group-hover:text-white transition-colors">{item?.company || "Untitled Inquiry"}</h4>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mb-4 pointer-events-none">
                <MapPin size={10} /> {item?.location || "No location"}
            </div>
                <div className="flex flex-col justify-between border-t border-zinc-900 pt-3">
                    {/* <div className="flex justify-between"> */}
                        {/* <p className="text-[9px] text-zinc-600 font-bold  mb-0.5">Net Deal</p>
                        <span className="text-xs font-bold text-emerald-400">{formatToIndianCurrency(item?.net || 0)}</span>
                        <span className="text-xs font-bold text-emerald-400">₹{parseInt(item?.net).toLocaleString("en-IN")}</span> */}
                        <p className="text-xs text-zinc-300 font-bold mb-0.5">Event Date: {item?.schedule ? new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.schedule)) : "No Date"}</p>
                        {/* <span className="text-xs font-bold">{item?.schedule || "No Date"}</span> */}
                    {/* </div> */}
                    {/* <div className="tflex justify-between"> */}
                        {/* <p className="text-[10px] text-zinc-400 font-medium">{item?.schedule || "No Date"}</p> */}
                        <p className="text-xs text-zinc-300 font-bold mb-0.5">Lead Date: {item.inquiryDate ? new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.inquiryDate)) : "No Date"}</p>
                        {/* <span className="text-xs font-bold">{item.inquiryDate || "No Date"}</span> */}
                    {/* </div> */}
                    {item.column === "Deal" && 
                        (
                            <div>
                                <div>
                                    <span className="text-xs text-zinc-300 font-bold mb-0.5">Deal Size: </span>
                                    <span className="text-xs font-bold text-emerald-400">₹{parseInt(item?.net).toLocaleString("en-IN")}</span>
                                </div>
                                
                            </div>
                        )
                    }
                </div>
        </div>
    );
}