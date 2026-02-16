"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, XCircle, Phone, Link } from "lucide-react";
import { toast } from "sonner";
import campService from "@/lib/services/campService";
import { handleCancellationUpload } from "@/lib/services/videoService";
import { CampFormValues, CampStatus, CampRequestCallback } from "@/lib/types/api";
import { useFormContext } from "react-hook-form";
import { Progress } from "@/components/ui/progress";

interface CancelCampSectionProps {
  campId: string;
  onCancelled?: () => void;
}

export function CancelCampSection({
  campId,
  onCancelled,
}: CancelCampSectionProps) {
  const {
    watch
  } = useFormContext<CampFormValues>();

  const videoUrl = watch("cancellation_video_url");
  const message_ = watch("cancellation_message");
  const status = watch("status");
  const [message, setMessage] = React.useState(message_ || "");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [requestCallbackLoading, setRequestCallbackLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (selected.type.startsWith("video/")) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      toast.error("Please select a video file.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
  };

  const handleCancel = async () => {
    if (!message.trim()) {
      toast.error("Cancellation message is required");
      return;
    }

    try {
      setLoading(true);

      if (file) {
        await handleCancellationUpload(file, campId, message, setUploadProgress);
        toast.success("Cancellation video uploaded successfully.");
      } else {
        await campService.cancelCamp(campId, message);
      }

      toast.success("Camp cancelled and applicants notified");
      onCancelled?.();
    } catch (error) {
      toast.error("Failed to cancel camp");
      console.error(error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleRequestCallback = async () => {
    try {
        setRequestCallbackLoading(true);
        const payload: CampRequestCallback = { camp_id: campId };
        await campService.requestCallback(payload);
        toast.success("Callback requested successfully!");
    } catch (error) {
        console.error("Failed to request callback:", error);
        toast.error("Failed to request callback.");
    } finally {
        setRequestCallbackLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 space-y-10 text-zinc-100">
      <div className="flex justify-between items-start">
        <div className="space-y-2 border-l-2 border-zinc-100 pl-4">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Cancel Camp & Notify Applicants
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {status === CampStatus.CANCELLED ? " This camp has been cancelled." : "You can share a short video explaining why the camp was cancelled."}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {status !== CampStatus.CANCELLED && (
          <div className="w-full md:w-48">
            <div className="relative h-[21.33rem] bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-colors">
              <input
                type="file"
                accept="video/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
                disabled={loading}
              />

              {previewUrl ? (
                <div className="relative h-full">
                  <video src={previewUrl} controls className="h-full w-full object-cover" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white hover:bg-black/80 z-20 rounded-full"
                    onClick={(e) => {e.stopPropagation(); handleRemoveFile()}}
                    disabled={loading}
                  >
                    <XCircle className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                  <div className="p-4 bg-zinc-950 rounded-full border border-zinc-800 mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6 text-zinc-500 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Upload video</span>
                </div>
              )}
            </div>
            {uploadProgress > 0 && <Progress value={uploadProgress} className="mt-2 bg-zinc-900 border border-zinc-800" />}
          </div>
        )}

        {status === CampStatus.CANCELLED && videoUrl && (
          <Button
            type="button"
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800 w-fit"
            onClick={() => window.open(videoUrl, "_blank")}
          >
            <Link className="h-5 w-5 text-white mr-2" /> View cancellation video
          </Button>
        )}

        <div className="flex-1 flex flex-col">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Cancellation message"
            className="flex-1 min-h-[200px] bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-500 rounded-xl p-4"
            disabled={loading || status === CampStatus.CANCELLED}
          />
          <Button
            onClick={handleCancel}
            disabled={loading || status === CampStatus.CANCELLED}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold h-11 transition-all shadow-lg shadow-red-900/20"
          >
            {loading ? (uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Finalizing...") : "Send Cancellation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
