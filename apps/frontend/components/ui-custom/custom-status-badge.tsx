import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Status } from '@/lib/types';


export interface IBadgeColors {
  key: Status;
  Color: string;
}

export const StatusList: IBadgeColors[] = [
  { key: Status.Open, Color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" },
  { key: Status.Closed, Color: "bg-slate-300 text-slate-800 hover:bg-slate-500 hover:text-slate-100" },
  { key: Status.Draft, Color: "bg-amber-200 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Sent, Color: "bg-sky-300 text-sky-800 hover:bg-sky-500 hover:text-sky-100" },
  { key: Status.Committed, Color: "bg-violet-300 text-violet-800 hover:bg-violet-500 hover:text-violet-100" },
  { key: Status.Saved, Color: "bg-teal-300 text-teal-800 hover:bg-teal-500 hover:text-teal-100" },
  { key: Status.Voided, Color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Approved, Color: "bg-green-300 text-green-800 hover:bg-green-500 hover:text-green-100" },
  { key: Status.Rejected, Color: "bg-red-300 text-red-800 hover:bg-red-500 hover:text-red-100" },
  { key: Status.Pending, Color: "bg-yellow-200 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-100" },
  { key: Status.InProgress, Color: "bg-blue-300 text-blue-800 hover:bg-blue-500 hover:text-blue-100" },
  { key: Status.Completed, Color: "bg-lime-300 text-lime-800 hover:bg-lime-500 hover:text-lime-100" },
  { key: Status.Cancelled, Color: "bg-pink-300 text-pink-800 hover:bg-pink-500 hover:text-pink-100" },
  { key: Status.OnHold, Color: "bg-orange-200 text-orange-800 hover:bg-orange-400 hover:text-orange-100" },
  { key: Status.Delayed, Color: "bg-amber-300 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Partial, Color: "bg-yellow-300 text-yellow-800 hover:bg-yellow-400 hover:text-yellow-100" },
  { key: Status.Submitted, Color: "bg-cyan-300 text-cyan-800 hover:bg-cyan-500 hover:text-cyan-100" },
  { key: Status.Accepted, Color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" },
  { key: Status.SendBack, Color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Review, Color: "bg-amber-200 text-amber-800 hover:bg-amber-400 hover:text-amber-100" },
  { key: Status.Deleted, Color: "bg-rose-300 text-rose-800 hover:bg-rose-500 hover:text-rose-100" },
  { key: Status.Received, Color: "bg-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-emerald-100" },
];



const CustomStatusBadge = ({
  children,
  badgeColor,
  status,
}: {
  children: React.ReactNode;
  badgeColor?: Status;
  status?: Status;
}) => {
  badgeColor = status ?? badgeColor;

  const colorClass = StatusList.find(color => color.key === badgeColor)?.Color || "bg-gray-300";

  return (
    <Badge className={`${colorClass} rounded-full`}>
      {children}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  return <CustomStatusBadge status={status}>{status}</CustomStatusBadge>;
};


export default StatusBadge;
