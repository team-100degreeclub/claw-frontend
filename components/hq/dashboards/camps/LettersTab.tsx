"use client";

import React, { use, useEffect } from "react";
import { CampStatus } from "@/lib/types/api";
import { CompleteCampSection } from "./forms/CompleteCampSection";
import { AlertCircle, LetterText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LettersTabProps {
  campId: string | undefined;
  status: CampStatus | undefined;
  onLetterSubmitted?: () => void;
}

export function LettersTab({
  campId,
  status,
  onLetterSubmitted,
}: LettersTabProps) {
  if(!campId) return null;
  // const [isCompleted, setIsCompleted] = React.useState(status === CampStatus.COMPLETED);
  const [isCompleted, setIsCompleted] = React.useState(status === CampStatus.APPROVED);
  
  return (
    <div className="mx-auto space-y-8 text-zinc-100">
      {/* Locked – Camp Not Completed */}
      {!isCompleted ? (
        <div className="bg-zinc-900/30 text-center">
          {/* <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">
            <LetterText className="h-7 w-7 text-white" />
          </div> */}

          <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
            Hey, you can now share a post-camp letter with your travellers. If you’d like, you can add a video or a group photo, and include a little personal note to share your feelings with them.
          </p>
          <Button className="bg-white text-black hover:bg-zinc-200 mt-5 font-bold px-8 h-11 transition-all shadow-lg shadow-white/5" onClick={() => setIsCompleted(true)}>
                <p className="font-medium">Click here to activate this tab</p>
          </Button>
        </div>
      ) : (
        /* Unlocked – Ready to Write Letter */
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                Hey, you can now share a post-camp letter with your travellers. If you’d like, you can add a video or a group photo, and include a little personal note to share your feelings with them.
              </p>
            </div>
          </div>

          <CompleteCampSection
            campId={campId}
            onSubmitted={onLetterSubmitted}
          />
        </div>
      )}
    </div>
  );
}
