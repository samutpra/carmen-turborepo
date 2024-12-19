'use client';

import React from 'react';
import { LocationType } from '@carmensoftware/shared-types';
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
import { StoreLocationDialog } from './StoreLocationDialog';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';

interface StoreLocationTableProps {
	storeLocations: LocationType[];
	onSuccess: (values: LocationType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}

const StoreLocationTable: React.FC<StoreLocationTableProps> = ({
	storeLocations,
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
					<TableHead>Type</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{storeLocations?.map((location, index) => (
					<TableRow key={location.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{location.name}</TableCell>
						<TableCell>
							{location.location_type === 'inventory' ? 'Inventory' : 'Direct'}
						</TableCell>
						<TableCell>{location.description}</TableCell>
						<TableCell>
							<Badge variant={location.is_active ? 'default' : 'destructive'}>
								{location.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<StoreLocationDialog
									mode="edit"
									defaultValues={location}
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
												delete the store location.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => location.id && onDelete(location.id)}
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

export default StoreLocationTable;
