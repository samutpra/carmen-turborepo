import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { vendor_type } from '@carmensoftware/shared-types';
import React from 'react';
import { Badge } from '@/components/ui/badge';
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
import { CustomButton } from '@/components/ui-custom/CustomButton';
import { Pencil, Trash } from 'lucide-react';
import EmptyState from '@/components/ui-custom/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface VendorTableProps {
	vendors: vendor_type[];
	onDelete: (id: string) => void;
	isLoading: boolean;
}
const VendorTable: React.FC<VendorTableProps> = ({
	vendors,
	onDelete,
	isLoading,
}) => {
	if (isLoading) {
		return <SkeletonTableLoading />;
	}
	if (vendors.length === 0) {
		return (
			<EmptyState title="No vendors found" description="No vendors found" />
		);
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">#</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{vendors?.map((vendor, index) => (
					<TableRow key={vendor.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{vendor.name}</TableCell>
						<TableCell>{vendor.description}</TableCell>
						<TableCell>
							<Badge variant={vendor.is_active ? 'default' : 'destructive'}>
								{vendor.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<Button asChild variant="ghost">
									<Link href={`/vendor-management/vendors/${vendor.id}`}>
										<Pencil className="h-4 w-4" />
									</Link>
								</Button>
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
												delete the vendor.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => vendor.id && onDelete(vendor.id)}
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

export default VendorTable;
