'use client';

import React from 'react';
import { DeliveryPointType } from '@carmensoftware/shared-types';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Trash } from 'lucide-react';
import { CustomButton } from '@/components/ui-custom/CustomButton';
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
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';

interface DeliveryPointTableProps {
	deliveryPoints: DeliveryPointType[];
	onSuccess: (values: DeliveryPointType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}

const DeliveryPointTable: React.FC<DeliveryPointTableProps> = ({
	deliveryPoints,
	onSuccess,
	onDelete,
	isLoading = false,
}) => {
	if (isLoading) {
		return <SkeletonTableLoading />;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{deliveryPoints?.map((point, index) => (
					<TableRow key={point.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{point.name}</TableCell>
						<TableCell>
							<Badge variant={point.is_active ? 'default' : 'destructive'}>
								{point.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<DeliveryPointDialog
									mode="edit"
									defaultValues={point}
									onSuccess={onSuccess}
								/>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<CustomButton variant="ghost" size="sm">
											<Trash className="h-4 w-4" />
										</CustomButton>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete the delivery point.
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
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default DeliveryPointTable;
