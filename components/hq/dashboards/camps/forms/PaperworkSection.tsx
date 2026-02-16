"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { PaperworkItem } from "../PaperworkItem";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CampFormValues } from "@/lib/types/api";

export type PaperworkDocument = {
  id: string;
  title: string;
  author: string;
  uploadedAt: Date;
  url: string;
  avatarUrl?: string;
  file?: File;
};


export function PaperworkSection() {
  const { control, watch } = useFormContext<CampFormValues>();

  const existingPaperwork = watch("paperwork") ?? [];

  const {
    fields: uploads,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "paperwork_files",
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    append({
      id: crypto.randomUUID(),
      file,
      title: file.name,
    });

    event.target.value = "";
  };

  const handleDeleteDocument = (id: string) => {
    // remove from RHF field array
    const index = existingPaperwork.findIndex((d) => d.id === id);
    if (index !== -1) {
      remove(index);
    }

  };

  const getDocumentNameFromURL = (url: string): string => {
    const parts = url.split("/");
    const filenameWithUUID = parts[parts.length - 1];
    const filename = filenameWithUUID.split("_")[1];
    return filename;
  };


  return (
    <div className="bg-zinc-950 mb-8 space-y-8 text-zinc-100">
  {/* Header Section */}
  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white tracking-tight">
        Paperwork & Documents
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
        You can upload the paperwork or documents here to host the camp. These will be shared exclusively with your internal team.
      </p>
    </div>

    <label className="cursor-pointer shrink-0">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleFileUpload}
      />
      <Button
        type="button"
        className="bg-white text-black hover:bg-zinc-200 h-10 px-6 font-bold transition-all shadow-lg shadow-white/5"
        asChild
      >
        <span>
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </span>
      </Button>
    </label>
  </div>

  {/* Document Lists Wrapper */}
  <div className="space-y-6">
    {/* Existing paperwork (from backend) */}
    {existingPaperwork.length > 0 && (
      <div className="space-y-3">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 px-1">Vault Records</h4>
        {existingPaperwork.map((doc) => (
          <PaperworkItem
            key={doc.id}
            doc={{
              id: doc.id,
              title: getDocumentNameFromURL(doc.document_url),
              author: `${doc.uploaded_by.first_name} ${doc.uploaded_by.last_name}`,
              uploadedAt: new Date(doc.uploaded_at),
              url: doc.document_url,
              avatarUrl: doc.uploaded_by.profile_image_url || `https://api.dicebear.com/7.x/initials/svg?seed=${doc.uploaded_by.first_name}%20${doc.uploaded_by.last_name}&backgroundColor=18181b`,
            }}
            onDelete={() => handleDeleteDocument(doc.id)}
          />
        ))}
      </div>
    )}

    {/* Newly uploaded files */}
    {uploads.length > 0 && (
      <div className="space-y-3">
        {uploads.map((doc, index) => (
          <PaperworkItem
            key={doc.id}
            doc={{
              id: doc.id,
              title: doc.title,
              author: "You",
              uploadedAt: new Date(),
              url: URL.createObjectURL(doc.file),
              file: doc.file,
            }}
            onDelete={() => remove(index)}
          />
        ))}
      </div>
    )}
  </div>

  {/* Empty State */}
  {existingPaperwork.length === 0 && uploads.length === 0 && (
    <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-zinc-900 rounded-xl bg-zinc-900/20">
      <div className="bg-zinc-900 p-4 rounded-full mb-4">
        <FileText className="w-6 h-6 text-zinc-700" />
      </div>
      <p className="text-zinc-500 text-sm font-medium">
        No documents uploaded yet.
      </p>
      {/* <p className="text-zinc-700 text-[11px] mt-1 tracking-tight">
        PDF, DOC, or TXT files are supported.
      </p> */}
    </div>
  )}
</div>
  );
}
