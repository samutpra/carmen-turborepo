'use client';

import React from 'react';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { DeliveryPointDialog } from './DeliveryPointDialog';
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';

interface DeliveryPointCardProps {
	deliveryPoints: DeliveryPointType[];
	onSuccess: (values: DeliveryPointType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}

const DeliveryPointCard: React.FC<DeliveryPointCardProps> = ({
	deliveryPoints,
	onSuccess,
	onDelete,
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4">
				{[...Array(6)].map((_, index) => (
					<SkeltonCardLoading key={index} />
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4">
			{deliveryPoints?.map((point) => (
				<Card key={point.id} className="hover:shadow-md transition-all">
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="grid gap-2">
								<div className="grid grid-cols-10 gap-4">
									<span className="text-sm text-muted-foreground col-span-3">
										Name
									</span>
									<span className="text-sm font-medium col-span-7">
										{point.name}
									</span>
								</div>
								<div className="grid grid-cols-10 gap-4">
									<span className="text-sm text-muted-foreground col-span-3">
										Status
									</span>
									<div className="col-span-7">
										<Badge
											variant={point.is_active ? 'default' : 'destructive'}
										>
											{point.is_active ? 'Active' : 'Inactive'}
										</Badge>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
						<DeliveryPointDialog
							mode="edit"
							defaultValues={point}
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
										onClick={() => point.id && onDelete(point.id)}
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

export default DeliveryPointCard;
