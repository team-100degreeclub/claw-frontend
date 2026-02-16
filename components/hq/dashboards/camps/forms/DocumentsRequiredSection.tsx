"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilePlus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { getDocumentTypes, DocumentType } from "@/lib/services/documentService";
import { CampFormValues } from "@/lib/types/api";
import { Input } from "@/components/ui/input";

export function DocumentsRequiredSection() {
  const { control, watch, setValue, register } = useFormContext<CampFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requiredDocuments",
  });

  const [availableDocuments, setAvailableDocuments] = useState<DocumentType[]>(
    []
  );

  useEffect(() => {
    getDocumentTypes().then(setAvailableDocuments).catch(console.error);
  }, []);

  const watchedDocuments = watch("requiredDocuments") ?? [];

  const selectedDocumentIds = watchedDocuments
    .map((d) => d.document_type_id)
    .filter((id) => id !== "custom");

  const handleAddDocument = (isCustom: boolean) => {
    if (isCustom) {
      append({ document_type_id: null, name: "" });
    } else {
      append({ document_type_id: "", name: "" });
    }
  };

  return (
    <div className="bg-zinc-950 mb-8 space-y-8 text-zinc-100">
    {/* Header */}
    <div className="space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Documents Required</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
            Specify which documents travellers need to provide. Select from our predefined database or create custom requirements for this specific camp.
        </p>
    </div>

    {/* Document Selection List */}
    <div className="space-y-4">
        {fields.map((field, index) => {
            const isCustomField = watchedDocuments[index]?.document_type_id === null;

            return (
                <div key={field.id} className="flex items-center gap-3 group/row animate-in fade-in slide-in-from-left-2 duration-300">
                    <div className="flex-1">
                        {isCustomField ? (
                            <Input
                                {...register(`requiredDocuments.${index}.name`)}
                                placeholder="Enter custom document name (e.g. Scuba License)"
                                className="h-11 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-white focus:ring-white transition-all"
                            />
                        ) : (
                            <Select
                                value={watchedDocuments[index]?.document_type_id ?? ""}
                                onValueChange={(value) => {
                                    const doc = availableDocuments.find((d) => d.id === value);
                                    setValue(
                                        `requiredDocuments.${index}.document_type_id`,
                                        value,
                                        { shouldDirty: true, shouldTouch: true }
                                    );
                                    setValue(
                                        `requiredDocuments.${index}.name`,
                                        doc?.document_name ?? "",
                                        { shouldDirty: true, shouldTouch: true }
                                    );
                                }}
                            >
                                <SelectTrigger className="h-11 bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-white">
                                    <SelectValue placeholder="Select a document from database" />
                                </SelectTrigger>

                                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                    {availableDocuments.map((doc) => {
                                        const alreadySelected =
                                            selectedDocumentIds.includes(doc.id) &&
                                            watchedDocuments[index]?.document_type_id !== doc.id;

                                        if (alreadySelected) return null;

                                        return (
                                            <SelectItem 
                                                key={doc.id} 
                                                value={doc.id}
                                                className="focus:bg-zinc-800 focus:text-white cursor-pointer"
                                            >
                                                {doc.document_name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="h-11 w-11 text-zinc-600 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-all shrink-0"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        })}
    </div>
    
    {/* Action Buttons */}
    <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-900 justify-around">
        <Button
            type="button"
            onClick={() => handleAddDocument(false)}
            className="bg-white text-black hover:bg-zinc-200 h-11 px-6 font-bold rounded-lg shadow-lg shadow-white/5 transition-all w-1/3"
        >
            <Plus className="mr-2 h-4 w-4" />
            Add from List
        </Button>
        <Button
            type="button"
            onClick={() => handleAddDocument(true)}
            className="bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white h-11 px-6 font-bold rounded-lg transition-all w-1/3"
        >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Custom
        </Button>
    </div>
</div>
  );
}