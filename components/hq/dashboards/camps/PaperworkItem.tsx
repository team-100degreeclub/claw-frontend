"use client";

import { PaperworkDocument } from "./forms/PaperworkSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PaperworkItemProps {
  doc: PaperworkDocument;
  onDelete: (id: string) => void;
}

export function PaperworkItem({ doc, onDelete }: PaperworkItemProps) {
  const formattedDate = format(doc.uploadedAt, "MMM dd, yyyy h:mm a");

  const handleCardClick = () => {
    if (doc.url) {
      window.open(doc.url, "_blank");
    } else if (doc.file) {
      const blobUrl = URL.createObjectURL(doc.file);
      window.open(blobUrl, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-3 w-full group/item">
    <Card 
        className="flex-1 cursor-pointer bg-zinc-900/40 border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all shadow-sm rounded-xl overflow-hidden" 
        onClick={handleCardClick}
    >
        <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-10 w-10 border border-zinc-800 ring-1 ring-zinc-950">
                <AvatarImage src={doc.avatarUrl} alt={doc.author} />
                <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs font-bold">
                    {doc.author?.[0]}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
                <p className="font-bold text-zinc-100 truncate text-sm tracking-tight group-hover/item:text-white transition-colors">
                    {doc.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] text-zinc-500 font-medium">By {doc.author}</p>
                    <span className="h-0.5 w-0.5 rounded-full bg-zinc-700" />
                    <p className="text-[11px] text-zinc-600 tracking-tighter">
                        {formattedDate}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>

    <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(doc.id)}
        className="h-9 w-9 text-zinc-600 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-all"
    >
        <Trash2 className="h-4 w-4" />
    </Button>
</div>
  );
}
