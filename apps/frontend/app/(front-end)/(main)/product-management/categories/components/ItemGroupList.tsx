'use client';

import { ProductItemGroupType } from '@carmensoftware/shared-types';

import React, { useState } from 'react';

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
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [itemGroup, setItemGroup] = useState<ProductItemGroupType | null>(null);
	const [itemGroupToDelete, setItemGroupToDelete] = useState<string | null>(
		null
	);
	console.log('data item group', data);

	const handleEditClick = (itemGroup: ProductItemGroupType) => {
		setItemGroup(itemGroup);
		setIsEditDialogOpen(true);
	};

	const handleDeleteItemGroup = async () => {
		if (!itemGroup) return;
	};

	const itemGroupListItems = data.map((itemGroup) => (
		<div
			key={itemGroup.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div className="cursor-pointer hover:bg-accent rounded-lg p-2 w-full">
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
							onClick={() => setItemGroupToDelete(itemGroup.id || '')}
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
								{data.find((sc) => sc.id === itemGroupToDelete)?.name}
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
