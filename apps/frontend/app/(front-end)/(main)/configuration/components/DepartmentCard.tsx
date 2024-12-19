'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { DepartmentType } from '@carmensoftware/shared-types/src/department';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import DepartmentDialog from './DepartmentDialog';

interface DepartmentCardProps {
	departments: DepartmentType[];
	onSuccess: (values: DepartmentType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}
const DepartmentSkeleton = () => {
	return (
		<Card className="h-[140px]">
			<CardHeader className="pb-4">
				<Skeleton className="h-4 w-2/3" />
			</CardHeader>
		</Card>
	);
};

const DepartmentCard: React.FC<DepartmentCardProps> = ({
	departments,
	onSuccess,
	onDelete,
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4">
				{[...Array(6)].map((_, index) => (
					<DepartmentSkeleton key={index} />
				))}
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 gap-4">
			{departments?.map((department) => (
				<Card key={department.id} className="hover:shadow-md transition-all">
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Name
								</span>
								<span className="text-sm font-medium col-span-7">
									{department.name}
								</span>
							</div>
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Description
								</span>
								<span className="text-sm font-medium col-span-7">
									{department.description}
								</span>
							</div>
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Status
								</span>
								<div className="col-span-7">
									<Badge
										variant={department.is_active ? 'default' : 'destructive'}
									>
										{department.is_active ? 'Active' : 'Inactive'}
									</Badge>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
						<DepartmentDialog
							mode="edit"
							defaultValues={department}
							onSuccess={onSuccess}
						/>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="ghost" size="sm">
									<TrashIcon className="w-4 h-4" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										the delivery point.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => department.id && onDelete(department.id)}
										className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
									>
										Delete
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default DepartmentCard;
