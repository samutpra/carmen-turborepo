'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ProductSubCategoryType,
	SubCategoryFormData,
	SubCategoryType,
} from '@carmensoftware/shared-types';
import { Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubCategoryDialog from './SubCategoryDialog';
import React, { useState, useCallback } from 'react';

interface SubCategoryListProps {
	subProducts: SubCategoryType[];
	selectedSubProduct: ProductSubCategoryType | null;
	onSelectSubProduct: (subProduct: ProductSubCategoryType) => void;
	onDeleteSubProduct: (id: string) => void;
	onEditSubProduct: (id: string, data: SubCategoryFormData) => void;
}

const SubCategoryList = ({
	subProducts,
	selectedSubProduct,
	onSelectSubProduct,
	onDeleteSubProduct,
	onEditSubProduct,
}: SubCategoryListProps) => {
	const [editingSubProduct, setEditingSubProduct] =
		useState<ProductSubCategoryType | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleEdit = useCallback((subProduct: ProductSubCategoryType) => {
		setEditingSubProduct(subProduct);
		setIsEditDialogOpen(true);
	}, []);

	const handleEditSubmit = useCallback(
		async (formData: SubCategoryFormData) => {
			if (editingSubProduct) {
				await onEditSubProduct(editingSubProduct.id, formData);
				setIsEditDialogOpen(false);
				setEditingSubProduct(null);
			}
		},
		[editingSubProduct, onEditSubProduct]
	);

	const handleItemClick = useCallback(
		(subProduct: ProductSubCategoryType) => {
			onSelectSubProduct(subProduct);
		},
		[onSelectSubProduct]
	);

	const handleDelete = useCallback(
		(id: string, e: React.MouseEvent) => {
			e.stopPropagation();
			onDeleteSubProduct(id);
		},
		[onDeleteSubProduct]
	);

	if (!subProducts.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Sub Categories</CardTitle>
					<CardDescription>No sub categories found</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	const subCategoryListItems = subProducts.map((subProduct) => (
		<div
			key={subProduct.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedSubProduct?.id === subProduct.id && 'bg-accent'
				)}
				onClick={() => handleItemClick(subProduct)}
				role="button"
			>
				<span>{subProduct.name}</span>
			</div>
			<div className="flex">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={(e) => {
						e.stopPropagation();
						handleEdit(subProduct);
					}}
					aria-label="Edit sub category"
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-destructive hover:text-destructive"
					onClick={(e) => handleDelete(subProduct.id, e)}
					aria-label="Delete sub category"
				>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
		</div>
	));

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Sub Categories</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">{subCategoryListItems}</CardContent>
			</Card>

			<SubCategoryDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				onSubmit={handleEditSubmit}
				initialData={
					editingSubProduct
						? {
								name: editingSubProduct.name,
								description: editingSubProduct.description || '',
								is_active: editingSubProduct.is_active ?? true,
								product_category_id: editingSubProduct.product_category_id,
							}
						: undefined
				}
				mode="edit"
				categories={subProducts}
			/>
		</>
	);
};

export default SubCategoryList;
