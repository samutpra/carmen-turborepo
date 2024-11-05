import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Status } from '@/lib/types';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

interface CustomStatusBadgeProps extends StatusBadgeProps {
  children: React.ReactNode;
}

interface StatusColor {
  key: Status;
  color: string;
}

const statusColors: StatusColor[] = [
  { key: Status.Open, color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" },
  { key: Status.Closed, color: "bg-slate-300 text-slate-800 hover:bg-slate-500 hover:text-slate-100" },
  { key: Status.Draft, color: "bg-amber-200 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Sent, color: "bg-sky-300 text-sky-800 hover:bg-sky-500 hover:text-sky-100" },
  { key: Status.Committed, color: "bg-violet-300 text-violet-800 hover:bg-violet-500 hover:text-violet-100" },
  { key: Status.Saved, color: "bg-teal-300 text-teal-800 hover:bg-teal-500 hover:text-teal-100" },
  { key: Status.Voided, color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Approved, color: "bg-green-300 text-green-800 hover:bg-green-500 hover:text-green-100" },
  { key: Status.Rejected, color: "bg-red-300 text-red-800 hover:bg-red-500 hover:text-red-100" },
  { key: Status.Pending, color: "bg-yellow-200 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-100" },
  { key: Status.InProgress, color: "bg-blue-300 text-blue-800 hover:bg-blue-500 hover:text-blue-100" },
  { key: Status.Completed, color: "bg-lime-300 text-lime-800 hover:bg-lime-500 hover:text-lime-100" },
  { key: Status.Cancelled, color: "bg-pink-300 text-pink-800 hover:bg-pink-500 hover:text-pink-100" },
  { key: Status.OnHold, color: "bg-orange-200 text-orange-800 hover:bg-orange-400 hover:text-orange-100" },
  { key: Status.Delayed, color: "bg-amber-300 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Partial, color: "bg-yellow-300 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-100" },
  { key: Status.Submitted, color: "bg-cyan-300 text-cyan-800 hover:bg-cyan-500 hover:text-cyan-100" },
  { key: Status.Accepted, color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" },
  { key: Status.SendBack, color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Review, color: "bg-amber-200 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Deleted, color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Received, color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" }
];

const getStatusColor = (status: Status): string => {
  return statusColors.find(color => color.key === status)?.color || "bg-gray-300 text-gray-800";
};

const CustomStatusBadge: React.FC<CustomStatusBadgeProps> = ({
  children,
  status,
  className = "",
}) => {
  const colorClass = getStatusColor(status);

  return (
    <Badge className={`${colorClass} rounded-full ${className}`}>
      {children}
    </Badge>
  );
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <CustomStatusBadge status={status} className={className}>
      {status}
    </CustomStatusBadge>
  );
};

export default StatusBadge;
export { CustomStatusBadge };