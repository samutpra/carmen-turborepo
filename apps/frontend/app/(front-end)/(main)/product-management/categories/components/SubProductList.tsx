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
} from '@carmensoftware/shared-types';
import { Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubCategoryDialog from './SubCategoryDialog';
import React, { useState, useCallback } from 'react';

interface SubProductListProps {
	subProducts: ProductSubCategoryType[];
	selectedSubProduct: ProductSubCategoryType | null;
	onSelectSubProduct: (subProduct: ProductSubCategoryType) => void;
	onDeleteSubProduct: (id: string) => void;
	onEditSubProduct: (id: string, data: SubCategoryFormData) => void;
}

const SubProductList = ({
	subProducts,
	selectedSubProduct,
	onSelectSubProduct,
	onDeleteSubProduct,
	onEditSubProduct,
}: SubProductListProps) => {
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

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Sub Categories</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{subProducts.map((subProduct) => (
						<div
							key={subProduct.id}
							className={cn(
								'flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent',
								selectedSubProduct?.id === subProduct.id && 'bg-accent'
							)}
							onClick={() => handleItemClick(subProduct)}
							role="button"
							tabIndex={0}
						>
							<span>{subProduct.name}</span>
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
					))}
				</CardContent>
			</Card>

			<SubCategoryDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				onSubmit={handleEditSubmit}
				initialData={
					editingSubProduct
						? {
								name: editingSubProduct.name,
								description: '',
								is_active: true,
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

export default SubProductList; 