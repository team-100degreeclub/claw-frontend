"use client";

import React from "react";
import { CampFormValues, CampStatus } from "@/lib/types/api";
import { DeleteConfirmation } from "./forms/DeleteConfirmation";
import { CancelCampSection } from "./forms/CancelCampSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import campService from "@/lib/services/campService";
import { useFormContext } from "react-hook-form";

type ActionType = "Completed" | "Delete" | "Cancel";

interface CampStatusTabProps {
  campId: string | undefined;
  status: CampStatus | undefined;
  onStatusUpdated?: () => void;
}

export function CampStatusTab({
  campId,
  status,
  onStatusUpdated,
}: CampStatusTabProps) {
  const {
    control,
    watch,
  } = useFormContext<CampFormValues>();


  if (campId == undefined || status == undefined) return null;
  const [action, setAction] = React.useState<ActionType | null>(null);
  const [loading, setLoading] = React.useState(false);

  const isPending = status === CampStatus.PENDING_REVIEW;
  const isActive = status === CampStatus.APPROVED;
  const isCompleted = status === CampStatus.COMPLETED;
  const isCancelled = status === CampStatus.CANCELLED;
  
  const markCompleted = async () => {
    try {
      setLoading(true);
      await campService.updateCampStatus(campId, CampStatus.COMPLETED);
      toast.success("Camp marked as completed.");

      onStatusUpdated?.();
    } catch {
      toast.error("Failed to update camp status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 mb-8">
      {/* Pending */}
      {isPending && (
        <div className="space-y-3 text-sm text-muted-foreground">
          <h3 className="text-xl font-bold text-white">Camp Under Review</h3>
          <p>
            Your camp is under review for 2 days. You can take your time to make edits or even delete it if needed. This is a chance to rethink the structure or paperwork before it goes live. All collaborators must complete their profiles before the camp goes live.
          </p>
          <div className="border-t"></div>
          <h2 className="text-lg font-bold text-neutral text-center mt-3 mb-0">Delete Camp</h2>
          <DeleteConfirmation
            campId={campId}
            onDeleted={onStatusUpdated}
          />
        </div>
      )}

      {/* Active */}
      {isActive && !isCompleted && (
        <div className="space-y-8">
          <div className="space-y-3 text-sm">
            <h3 className="text-lg font-bold">Camp is Live</h3>
            <p>
              Your camp is live.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <h4 className="font-medium">Update Camp Status</h4>
              <Select
                value={action ?? ""}
                onValueChange={(v) => setAction(v as ActionType)}
              >
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Select Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancel">Cancel</SelectItem>
                  <SelectItem value="Delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {action === "Completed" && (
              <Button
                onClick={markCompleted}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full h-10"
              >
                {loading ? "Updating..." : "Mark as Completed"}
              </Button>
            )}

            {action === "Cancel" && (
              <CancelCampSection
                campId={campId}
                onCancelled={onStatusUpdated}
              />
            )}

            {action === "Delete" && (
              <DeleteConfirmation
                campId={campId}
                onDeleted={onStatusUpdated}
              />
            )}
          </div>
        </div>
      )}

      {/* Completed */}
      {isCompleted && (
        <div className="space-y-3 text-sm">
          <h3 className="text-lg font-bold">Camp Completed</h3>
          <p className="text-muted-foreground">
            This camp has been completed. No further actions are available.
          </p>
        </div>
      )}

      {/* Cancelled */}
      {isCancelled && (
        // <div className="space-y-3 text-sm text-muted-foreground">
        //   <h3 className="text-lg font-bold">Camp Cancelled</h3>
        //   <p>
        //     This camp has been cancelled. No further actions are available.
        //   </p>
        // </div>
        <CancelCampSection
          campId={campId}
          onCancelled={onStatusUpdated}
        />
      )}
    </div>
  );
}
