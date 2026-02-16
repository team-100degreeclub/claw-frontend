"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import campService from "@/lib/services/campService";

interface DeleteConfirmationProps {
  campId: string;
  onDeleted?: () => void;
}

export function DeleteConfirmation({
  campId,
  onDeleted,
}: DeleteConfirmationProps) {
  const [agreed, setAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await campService.deleteCamp(campId);
      toast.success("Camp permanently deleted");
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch {
      toast.error("Failed to delete camp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 rounded-xl py-8 max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-3 bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
        <AlertCircle className="text-red-500 h-5 w-5" />
        <p className="text-sm font-medium text-red-200/80">
          This action is irreversible. All camp data will be permanently deleted.
        </p>
      </div>

      <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={agreed}
              onCheckedChange={(v) => setAgreed(Boolean(v))}
              className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <p className="text-sm text-zinc-400">
              I understand that this action cannot be undone.
            </p>
          </div>

          <Button
            onClick={handleDelete}
            disabled={!agreed || loading}
            className={`w-full h-11 font-bold transition-all ${
              agreed
                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "Deleting…" : "Permanently Delete Camp"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
