'use client';

import React from 'react';
import { CurrencyType } from '@carmensoftware/shared-types';
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
import CurrencyDialog from './CurrencyDialog';
import SkeletonTableLoading from '@/components/ui-custom/Loading/SkeltonTableLoading';

interface CurrencyTableProps {
	currencies: CurrencyType[];
	onSuccess: (values: CurrencyType) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
}

const CurrencyTable: React.FC<CurrencyTableProps> = ({
	currencies,
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
					<TableHead>Code</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Symbol</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Rate</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currencies?.map((currency, index) => (
					<TableRow key={currency.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{currency.code}</TableCell>
						<TableCell>{currency.name}</TableCell>
						<TableCell>{currency.symbol}</TableCell>
						<TableCell>{currency.description}</TableCell>
						<TableCell>{currency.rate}</TableCell>
						<TableCell>
							<Badge variant={currency.is_active ? 'default' : 'destructive'}>
								{currency.is_active ? 'Active' : 'Inactive'}
							</Badge>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-2">
								<CurrencyDialog
									mode="edit"
									defaultValues={currency}
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
												onClick={() => currency.id && onDelete(currency.id)}
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

export default CurrencyTable;
