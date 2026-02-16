"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import campService from "@/lib/services/campService";
import { CampFormValues } from "@/lib/types/api";
import { useFormContext } from "react-hook-form";

interface CompleteCampSectionProps {
  campId: string;
  onSubmitted?: () => void;
}

export function CompleteCampSection({
  campId,
  onSubmitted,
}: CompleteCampSectionProps) {
	if(!campId) return null;

  const {
      control,
      watch,
      setValue,
    } = useFormContext<CampFormValues>();

  const post_camp_video_url = watch("post_camp_video_url");
  const post_camp_photo_url = watch("post_camp_photo_url");
  const post_camp_message = watch("post_camp_message");
  const updated_at = watch("updated_at")
    
  const [message, setMessage] = React.useState("");
  const [albumUrl, setAlbumUrl] = React.useState("");
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [sentAt, setSentAt] = React.useState<Date | null>(null);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Letter message is required");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      const data = {
        "message": message,
        "album_url": albumUrl,
      }
      formData.append("data", JSON.stringify(data));
      if (videoFile) formData.append("video", videoFile);

      await campService.completeCamp(campId, formData);

      toast.success("Letter sent to all travellers");
      setSentAt(new Date());
      onSubmitted?.();
    } catch {
      toast.error("Failed to send letter");
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
    }
  };


  useEffect(() => {
    if (post_camp_message || post_camp_photo_url || post_camp_video_url) setIsSubmitted(true)
    else setIsSubmitted(false)
  })

  return (
    <div className="bg-zinc-950 space-y-8 text-zinc-100 mb-8">
      {post_camp_message && (
        <div className="bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-400 text-center p-3 rounded-lg">
          Letter sent on {updated_at?.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" })}
        </div>
      )}

      {/* Google Photos URL */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">
          Google Photos Album (optional)
        </label>
        <Input
          type="url"
          placeholder="https://photos.app.goo.gl/..."
          className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-500"
          value={isSubmitted ? post_camp_photo_url || "No URL was provided" : albumUrl}
          onChange={(e) => setAlbumUrl(e.target.value)}
          disabled={isSubmitted}
        />
      </div>

      {/* Video Upload */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">
          Thank You Video
        </label>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 h-11 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center px-4 group hover:border-zinc-700 transition-colors">
            <input
              type="file"
              accept="video/mp4,video/quicktime"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleVideoChange}
              disabled={isSubmitted}
            />

            {videoFile ? (
              <span className="flex items-center gap-2 truncate text-white font-medium">
                <FileText className="h-4 w-4 text-zinc-500" />
                {videoFile.name}
              </span>
            ) : (
              <span className="text-zinc-600 flex items-center gap-2 text-sm">
                <Upload className="h-4 w-4" />
                {isSubmitted ? post_camp_video_url ? "" : "No video was provided": "Click to upload video"}
              </span>
            )}
          </div>

          {videoFile && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveVideo}
              disabled={isSubmitted}
              className="hover:bg-zinc-900"
            >
              <XCircle className="h-5 w-5 text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {post_camp_video_url && (
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
            onClick={() => window.open(post_camp_video_url, "_blank")}
          >
            View Video
          </Button>
        </div>
      )}

      {/* Letter */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-zinc-400">
          Letter
        </label>
        <Textarea
          placeholder="Dear travellers, thank you for being part of this journey…"
          className="h-64 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-500 p-4"
          value={isSubmitted ? post_camp_message || "No message was provided" : message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitted}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <Button
            type="button"
            className="bg-white text-black hover:bg-zinc-200 px-8 h-11 font-bold shadow-lg shadow-white/5 transition-all"
            disabled={isSubmitted || submitting}
            onClick={() => setConfirmOpen(true)}
          >
            Send Letter to Travellers
          </Button>

          <AlertDialogContent className="bg-zinc-950 border-zinc-900">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Send letter?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This action is final and cannot be edited later.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-white text-black hover:bg-zinc-200"
                onClick={async () => {await handleSubmit();}}
              >
                Confirm & Send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
