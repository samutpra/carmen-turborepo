import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export enum BadgeStatus {
  Open = "Open",
  Closed = "Closed",
  Draft = "Draft",
  Sent = "Sent",
  Committed = "Committed",
  Saved = "Saved",
  Voided = "Voided",
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled",
  OnHold = "OnHold",
  Delayed = "Delayed",
  Partial = "Partial",
  Submitted = "Submitted",
  Accepted = "Accepted",
  SendBack = "SendBack",
  Review = "Review",
  Deleted = "Deleted",
  Received = "Received",
  Active = "Active",
  Inactive = "Inactive",
  BelowMin = "below-min",
  Reorder = "reorder",
  OverMax = "over-max",
  Normal = "normal",
  Posted = "Posted",
  IN = "IN",
  OUT = "OUT"
}

const statusStyles: Record<string, { bg: string, text: string }> = {
  // Success states
  Approved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
  Completed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
  Active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
  Accepted: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
  Posted: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },

  // Primary states (using corporate blue)
  Open: { bg: 'bg-primary/20 dark:bg-primary/30', text: 'text-primary dark:text-primary-foreground' },
  InProgress: { bg: 'bg-primary/20 dark:bg-primary/30', text: 'text-primary dark:text-primary-foreground' },
  Submitted: { bg: 'bg-primary/20 dark:bg-primary/30', text: 'text-primary dark:text-primary-foreground' },
  Sent: { bg: 'bg-primary/20 dark:bg-primary/30', text: 'text-primary dark:text-primary-foreground' },

  // Warning states
  Pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300' },
  OnHold: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300' },
  Review: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300' },
  Draft: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300' },

  // Danger states
  Rejected: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },
  Cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },
  Deleted: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },
  Voided: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },

  // Neutral states
  Closed: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-300' },
  Inactive: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-300' },

  // Special states
  Partial: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-300' },
  BelowMin: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300' },
  OverMax: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300' },
  Normal: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles['Normal'];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-2 py-1 font-medium rounded-full",
        style.bg,
        style.text,
        className
      )}
    >
      {status}
    </Badge>
  );
}
