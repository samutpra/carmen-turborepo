'use client';

import { ProductItemGroupType } from '@carmensoftware/shared-types';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { useAuth } from '@/app/context/AuthContext';
import { cn } from '@/lib/utils';
import { formType } from '@/types/form_type';
import { deleteItemGroup } from '../actions/item_group';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';

interface Props {
	data: ProductItemGroupType[];
	setData: React.Dispatch<React.SetStateAction<ProductItemGroupType[]>>;
	subCategoryId: string;
	subCategoryName: string;
	onSelectItemGroup: (itemGroup: ProductItemGroupType) => void;
}

const ItemGroupList: React.FC<Props> = ({
	data,
	setData,
	subCategoryId,
	subCategoryName,
	onSelectItemGroup,
}) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [itemGroup, setItemGroup] = useState<ProductItemGroupType | null>(null);
	const [idToDelete, setIdToDelete] = useState<string | null>(null);
	const [selectedItemGroupId, setSelectedItemGroupId] = useState<string | null>(null);

	useEffect(() => {
		setSelectedItemGroupId(null);
		setItemGroup(null);
		onSelectItemGroup({
			id: '',
			name: '',
			code: '',
			description: '',
			is_active: true,
			product_subcategory_id: '',
		});
	}, [subCategoryId, onSelectItemGroup]);

	const handleEditClick = (itemGroup: ProductItemGroupType) => {
		setItemGroup(itemGroup);
		setIsEditDialogOpen(true);
	};

	const handleDeleteItemGroup = async () => {
		if (!idToDelete) return;
		try {
			const response = await deleteItemGroup(token, idToDelete);
			if (!response.ok) {
				throw new Error('Failed to delete item group.');
			}

			setData((prev) =>
				prev.filter((itemGroup) => itemGroup.id !== idToDelete)
			);
			toastSuccess({ message: 'Item group deleted successfully' });
			setIdToDelete(null);
		} catch (error) {
			console.log('Error deleting item group:', error);
			toastError({ message: 'Failed to delete item group' });
		}
	};

	const itemGroupListItems = data.map((itemGroup) => (
		<div key={itemGroup.id} className="flex items-center p-2 justify-between gap-2">
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedItemGroupId === itemGroup.id && 'bg-accent'
				)}
				onClick={() => {
					setSelectedItemGroupId(itemGroup.id || null);
					setItemGroup(itemGroup);
					onSelectItemGroup(itemGroup);
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (['Enter', ' '].includes(e.key)) {
						setSelectedItemGroupId(itemGroup.id || null);
						setItemGroup(itemGroup);
						onSelectItemGroup(itemGroup);
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
					size={'sm'}
					aria-label="Edit item group"
					onClick={() => handleEditClick(itemGroup)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size={'sm'}
							aria-label="Delete item group"
							onClick={() => setIdToDelete(itemGroup.id || '')}
						>
							<Trash className="h-4 w-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the item group
								&quot;{data.find((sc) => sc.id === idToDelete)?.name}&quot;.
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
				<CardContent className="space-y-2">{itemGroupListItems}</CardContent>
			</Card>
			<ItemGroupDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				mode={formType.EDIT}
				itemGroup={itemGroup}
				setItemGroup={setData}
				subcategory_id={subCategoryId}
				subcategory_name={subCategoryName}
			/>
		</>
	);
};

export default ItemGroupList;
