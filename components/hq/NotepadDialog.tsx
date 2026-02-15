"use client";

import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface NotepadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotepadDialog({ isOpen, onClose }: NotepadDialogProps) {
  const [noteContent, setNoteContent] = useState<string>("");

  // Load note from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNote = localStorage.getItem("notepadContent");
      if (savedNote) {
        setNoteContent(savedNote);
      }
    }
  }, []);

  // Save note to localStorage whenever noteContent changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notepadContent", noteContent);
    }
  }, [noteContent]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-w-6xl min-w-6xl h-[80%] bg-zinc-900 border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Notepad</DialogTitle>
          {/* <DialogDescription className="text-muted-foreground">
            Jot down your thoughts, ideas, or reminders.
          </DialogDescription> */}
        </DialogHeader>
        <div className="py-4 flex-grow">
          <Textarea
            className="w-full h-full bg-transparent border-0 focus:ring-0 focus:outline-none resize-none text-foreground placeholder-muted-foreground"
            placeholder="Start typing..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
