'use client';

import {
	CategoryFormData,
	CategoryType,
} from '@carmensoftware/shared-types/dist/productCategorySchema';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useState, MouseEvent } from 'react';
import { Pencil, Trash } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import CategoryDialog from './CategoryDialog';
import { formType } from '@/types/form_type';
import { toastError } from '@/components/ui-custom/Toast';

interface Props {
	products: CategoryType[];
	selectedProduct: CategoryType | null;
	onSelectCategory: (product: CategoryType) => void;
	onDeleteCategory: (productId: string) => Promise<void>;
	onEditCategory: (
		productId: string,
		formData: CategoryFormData
	) => Promise<void>;
}

const CategoryItemList: React.FC<Props> = ({
	products,
	selectedProduct,
	onSelectCategory,
	onDeleteCategory,
	onEditCategory,
}) => {
	const [productToDelete, setProductToDelete] = useState<CategoryType>();
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [productToEdit, setProductToEdit] = useState<CategoryType | null>(null);

	const handleDeleteClick = (e: MouseEvent, product: CategoryType) => {
		e.stopPropagation();
		setProductToDelete(product);
	};

	const handleEditClick = (e: MouseEvent, product: CategoryType) => {
		e.stopPropagation();
		setProductToEdit(product);
		setEditDialogOpen(true);
	};

	const handleDelete = async () => {
		if (!productToDelete?.id) return;
		try {
			await onDeleteCategory(productToDelete.id);
			setProductToDelete(undefined);
		} catch (error) {
			console.error('Error deleting product:', error);
			toastError({ message: 'Failed to delete product' });
		}
	};

	const handleEdit = async (formData: CategoryType) => {
		if (!productToEdit?.id) return;
		await onEditCategory(productToEdit.id, formData);
		setEditDialogOpen(false);
	};

	const categoryListItems = products.map((category) => (
		<div
			key={category.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedProduct?.id === category.id && 'bg-accent'
				)}
				onClick={() => onSelectCategory(category)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						onSelectCategory(category);
					}
				}}
				aria-label={`Select ${category.name} category`}
				aria-selected={selectedProduct?.id === category.id}
			>
				<span>{category.name}</span>
			</div>
			<div className="flex">
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => handleEditClick(e, category)}
					aria-label={`Edit ${category.name}`}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => handleDeleteClick(e, category)}
					aria-label={`Delete ${category.name}`}
				>
					<Trash className="h-4 w-4 text-red-500" />
				</Button>
			</div>
		</div>
	));

	return (
		<>
			<Card>
				<CardContent>{categoryListItems}</CardContent>
			</Card>
			<AlertDialog
				open={!!productToDelete}
				onOpenChange={(open) =>
					setProductToDelete(open ? productToDelete : undefined)
				}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete &quot;{productToDelete?.name}&quot;.
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-red-500 hover:bg-red-600 text-white"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<CategoryDialog
				open={editDialogOpen}
				onOpenChange={setEditDialogOpen}
				onSubmit={handleEdit}
				initialData={
					productToEdit
						? {
							name: productToEdit.name,
							description: productToEdit.description || '',
							is_active: productToEdit.is_active ?? true,
						}
						: undefined
				}
				mode={formType.EDIT}
			/>
		</>
	);
};

export default CategoryItemList;
