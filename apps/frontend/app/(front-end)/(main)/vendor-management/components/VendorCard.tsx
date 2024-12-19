import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import { vendor_type } from '@carmensoftware/shared-types';
import React from 'react';
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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VendorDialog from './VendorDialog';

interface VendorCardProps {
	vendors: vendor_type[];
	onSuccess: (vendor: vendor_type) => void;
	onDelete: (id: string) => void;
	isLoading: boolean;
}
const VendorCard: React.FC<VendorCardProps> = ({
	vendors,
	onSuccess,
	onDelete,
	isLoading,
}) => {
	if (isLoading) {
		<div className="grid grid-cols-1 gap-4">
			{[...Array(6)].map((_, index) => (
				<SkeltonCardLoading key={index} />
			))}
		</div>;
	}
	return (
		<div className="grid grid-cols-1 gap-4">
			{vendors?.map((vendor) => (
				<Card key={vendor.id} className="hover:shadow-md transition-all">
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Name
								</span>
								<span className="text-sm font-medium col-span-7">
									{vendor.name}
								</span>
							</div>
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Description
								</span>
								<span className="text-sm font-medium col-span-7">
									{vendor.description}
								</span>
							</div>
							<div className="grid grid-cols-10 gap-4">
								<span className="text-sm text-muted-foreground col-span-3">
									Status
								</span>
								<div className="col-span-7">
									<Badge variant={vendor.is_active ? 'default' : 'destructive'}>
										{vendor.is_active ? 'Active' : 'Inactive'}
									</Badge>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
						<VendorDialog
							mode="edit"
							defaultValues={vendor}
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
										the vendor.
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
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default VendorCard;
