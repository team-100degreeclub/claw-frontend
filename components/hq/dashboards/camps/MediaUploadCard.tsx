"use client";

import { Upload, XCircle, Video } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaUploadCardProps {
    label: string;
    orientation?: "portrait" | "landscape";
    isOptional?: boolean;
    onFileChange: (file: File | null) => void;
}

export function MediaUploadCard({ label, orientation = "landscape", onFileChange }: MediaUploadCardProps) {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // Updated: 16/9 for Landscape, 9/16 for Portrait
            const idealAspectRatio = orientation === "landscape" ? 16 / 9 : 9 / 16;
            const tolerance = 0.05; // Slightly higher tolerance for various device encodes

            if (selectedFile.type.startsWith("video/")) {
                const video = document.createElement("video");
                video.preload = "metadata";
                video.onloadedmetadata = () => {
                    window.URL.revokeObjectURL(video.src);
                    const aspectRatio = video.videoWidth / video.videoHeight;
                    
                    if (Math.abs(aspectRatio - idealAspectRatio) > tolerance) {
                        toast.error(`Please upload a video with a ${orientation} aspect ratio.`);
                        setPreviewUrl(null);
                        onFileChange(null);
                    } else {
                        setPreviewUrl(URL.createObjectURL(selectedFile));
                        onFileChange(selectedFile);
                    }
                };
                video.src = URL.createObjectURL(selectedFile);
            } else if (selectedFile.type.startsWith("image/")) {
                const img = new window.Image();
                img.onload = () => {
                    const aspectRatio = img.width / img.height;
                    if (Math.abs(aspectRatio - idealAspectRatio) > tolerance) {
                        toast.error(`Please upload an image with a ${orientation} aspect ratio.`);
                        setPreviewUrl(null);
                        onFileChange(null);
                    } else {
                        setPreviewUrl(URL.createObjectURL(selectedFile));
                        onFileChange(selectedFile);
                    }
                };
                img.src = URL.createObjectURL(selectedFile);
            } else {
                setPreviewUrl(URL.createObjectURL(selectedFile));
                onFileChange(selectedFile);
            }
        } else {
            setPreviewUrl(null);
            onFileChange(null);
        }
    };

    const handleRemoveFile = () => {
        setPreviewUrl(null);
        onFileChange(null);
    };

    const fileInputAccept = label === "Video" ? "video/*" : "image/*";
    
    // Updated: Responsive landscape classes (Aspect 16/9)
    const orientationClasses = orientation === "portrait" 
        ? "h-96 w-[13.5rem]" 
        : "w-full aspect-video"; // aspect-video is a tailwind class for 16:9

    return (
        <div className="space-y-2 w-full">
        <div className={cn(
            "relative bg-zinc-900 border-zinc-800 border rounded-xl flex items-center justify-center cursor-pointer group hover:border-zinc-400 transition-all overflow-hidden shadow-inner",
            orientationClasses
        )}>
            {/* FIX: If previewUrl exists, we add 'pointer-events-none' 
                so clicks go to the <video> instead of the <input> 
            */}
            <input 
                type="file" 
                className={cn(
                    "absolute inset-0 opacity-0 cursor-pointer z-10",
                    previewUrl && "pointer-events-none" 
                )} 
                onChange={handleFileChange} 
                accept={fileInputAccept} 
                // Alternatively, disable the input when preview exists
                disabled={!!previewUrl} 
            />
            
            {previewUrl ? (
                <>
                    {label === "Video" ? (
                        <video 
                            src={previewUrl} 
                            className="w-full h-full object-cover z-0" 
                            controls 
                        />
                    ) : (
                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    )}
                    
                    {/* Ensure Remove Button stays clickable */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 backdrop-blur-sm z-20 rounded-full h-8 w-8"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveFile();
                        }}
                    >
                        <XCircle className="h-5 w-5" />
                    </Button>
                </>
            ) : (
                <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-zinc-950 rounded-full border border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-6 w-6 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        Upload {label}
                    </p>
                </div>
            )}
        </div>
    </div>
    );
}