'use client';

import React from 'react';
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
import SkeltonCardLoading from '@/components/ui-custom/Loading/SkeltonCardLoading';
import EmptyState from '@/components/ui-custom/EmptyState';

interface Field<T> {
	key: keyof T;
	label: string;
	render?: (value: T[keyof T]) => React.ReactNode;
}

interface DataCardProps<T extends { id?: string }> {
	items: T[];
	fields: Field<T>[];
	idField?: keyof T;
	isActiveField?: keyof T;
	onSuccess: (values: T) => void;
	onDelete: (id: string) => void;
	isLoading?: boolean;
	emptyStateProps?: {
		title: string;
		description: string;
	};
	DialogComponent: React.ComponentType<{
		mode: "edit";
		defaultValues: T;
		onSuccess: (values: T) => void;
	}>;
}

const DataCard = <T extends { id?: string; is_active?: boolean }>({
	items,
	fields,
	idField = 'id' as keyof T,
	isActiveField = 'is_active' as keyof T,
	onSuccess,
	onDelete,
	isLoading = false,
	emptyStateProps = {
		title: "No items found",
		description: "No items found"
	},
	DialogComponent
}: DataCardProps<T>): React.ReactElement => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-4">
				{[...Array(6)].map((_, index) => (
					<SkeltonCardLoading key={index} />
				))}
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<EmptyState
				title={emptyStateProps.title}
				description={emptyStateProps.description}
			/>
		);
	}

	const getItemId = (item: T): string => {
		const id = item[idField];
		return typeof id === 'string' ? id : String(id);
	};

	const isItemActive = (item: T): boolean => {
		const isActive = item[isActiveField];
		return typeof isActive === 'boolean' ? isActive : false;
	};

	return (
		<div className="grid grid-cols-1 gap-4">
			{items.map((item) => (
				<Card key={getItemId(item)} className="hover:shadow-md transition-all">
					<CardContent className="p-4">
						<div className="space-y-3">
							<div className="grid gap-2">
								{fields.map((field) => (
									<div key={String(field.key)} className="grid grid-cols-10 gap-4">
										<span className="text-sm text-muted-foreground col-span-3">
											{field.label}
										</span>
										<div className="text-sm font-medium col-span-7">
											{field.render ? (
												field.render(item[field.key])
											) : field.key === isActiveField ? (
												<Badge
													variant={isItemActive(item) ? 'default' : 'destructive'}
												>
													{isItemActive(item) ? 'Active' : 'Inactive'}
												</Badge>
											) : (
												String(item[field.key])
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 pt-0 pb-2 px-2">
						<DialogComponent
							mode="edit"
							defaultValues={item}
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
										the item.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={() => onDelete(getItemId(item))}
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

export default DataCard;