'use client';

import { ProductItemGroupType } from '@carmensoftware/shared-types';

import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Pencil, Trash } from 'lucide-react';
import ItemGroupDialog from './ItemGroupDialog';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';
import { cn } from '@/lib/utils';

interface Props {
	data: ProductItemGroupType[];
	setData: React.Dispatch<React.SetStateAction<ProductItemGroupType[]>>;
	subCategoryId: string;
	subCategoryName: string;
}
const ItemGroupList: React.FC<Props> = ({
	data,
	setData,
	subCategoryId,
	subCategoryName,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [itemGroup, setItemGroup] = useState<ProductItemGroupType | null>(null);
	const [idToDelete, setIdToDelete] = useState<string | null>(null);
	const [selectedItemGroupId, setSelectedItemGroupId] = useState<string | null>(
		null
	);

	useEffect(() => {
		setSelectedItemGroupId(null);
		setItemGroup(null);
	}, [subCategoryId]);

	const handleEditClick = (itemGroup: ProductItemGroupType) => {
		setItemGroup(itemGroup);
		setIsEditDialogOpen(true);
	};

	const handleDeleteItemGroup = async () => {
		if (!idToDelete) return;
		try {
			const response = await fetch(
				`/api/product-management/category/product-item-group/${idToDelete}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				setData((prevItemGroups) =>
					prevItemGroups.filter((itemGroup) => itemGroup.id !== idToDelete)
				);
				toast.success('Item group deleted successfully');
			} else {
				toast.error('Failed to delete item group', {
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				});
			}
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Internal Server Error',
				{
					className: 'bg-red-500 text-white border-none',
					duration: 3000,
				}
			);
		}
	};

	const itemGroupListItems = data.map((itemGroup) => (
		<div
			key={itemGroup.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedItemGroupId === itemGroup.id && 'bg-accent'
				)}
				onClick={() => {
					setSelectedItemGroupId(itemGroup.id || null);
					setItemGroup(itemGroup);
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setSelectedItemGroupId(itemGroup.id || null);
						setItemGroup(itemGroup);
					}
				}}
				aria-label={`Select ${itemGroup.name} item group`}
				aria-selected={selectedItemGroupId === itemGroup.id}
			>
				{itemGroup.name}
			</div>
			<div className="flex">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					aria-label="Edit sub category"
					onClick={() => handleEditClick(itemGroup)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-destructive hover:text-destructive"
							aria-label="Delete sub category"
							onClick={() => setIdToDelete(itemGroup.id || '')}
						>
							<Trash className="h-4 w-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								sub-category &quot;
								{data.find((sc) => sc.id === idToDelete)?.name}
								&quot;.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteItemGroup}
								className="bg-red-500 hover:bg-red-600 text-white"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	));

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Item Groups</CardTitle>
					{itemGroup && (
						<span className="text-sm text-muted-foreground">
							Selected: {itemGroup.name}
						</span>
					)}
				</CardHeader>
				<CardContent className="space-y-2">{itemGroupListItems}</CardContent>
			</Card>
			<ItemGroupDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				mode="edit"
				itemGroup={itemGroup}
				setItemGroup={setData}
				subcategory_id={subCategoryId}
				subcategory_name={subCategoryName}
			/>
		</>
	);
};

export default ItemGroupList;
