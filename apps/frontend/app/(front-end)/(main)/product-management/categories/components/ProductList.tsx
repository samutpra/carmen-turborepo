'use client';

import {
	CategoryFormData,
	ProductSubCategoryType,
} from '@carmensoftware/shared-types/dist/productCategorySchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
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
import { toast } from 'sonner';
import CategoryDialog from './CategoryDialog';

interface ProductResponse {
	name: string;
	id: string;
	description?: string;
	is_active?: boolean;
	productSubCategories: ProductSubCategoryType[];
}

interface ProductListProps {
	products: ProductResponse[];
	selectedProduct: ProductResponse | null;
	onSelectProduct: (product: ProductResponse) => void;
	onDeleteProduct: (productId: string) => Promise<void>;
	onEditProduct: (
		productId: string,
		formData: CategoryFormData
	) => Promise<void>;
}

const ProductList = ({
	products,
	selectedProduct,
	onSelectProduct,
	onDeleteProduct,
	onEditProduct,
}: ProductListProps) => {
	const [productToDelete, setProductToDelete] =
		React.useState<ProductResponse | null>(null);
	const [editDialogOpen, setEditDialogOpen] = React.useState(false);
	const [productToEdit, setProductToEdit] =
		React.useState<ProductResponse | null>(null);

	const handleDeleteClick = (e: React.MouseEvent, product: ProductResponse) => {
		e.stopPropagation();
		setProductToDelete(product);
	};

	const handleEditClick = (e: React.MouseEvent, product: ProductResponse) => {
		e.stopPropagation();
		setProductToEdit(product);
		setEditDialogOpen(true);
	};

	const handleDelete = async () => {
		if (!productToDelete) return;
		try {
			await onDeleteProduct(productToDelete.id);
			setProductToDelete(null);
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('Failed to delete product');
		}
	};

	const handleEdit = async (formData: CategoryFormData) => {
		if (!productToEdit) return;
		await onEditProduct(productToEdit.id, formData);
		setEditDialogOpen(false);
	};

	const productListItems = products.map((category) => (
		<div
			key={category.id}
			className="flex items-center p-2 justify-between gap-2"
		>
			<div
				className={cn(
					'cursor-pointer hover:bg-accent rounded-lg p-2 w-full',
					selectedProduct?.id === category.id && 'bg-accent'
				)}
				onClick={() => onSelectProduct(category)}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						onSelectProduct(category);
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
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>{productListItems}</CardContent>
			</Card>

			{/* Delete Dialog */}
			<AlertDialog
				open={!!productToDelete}
				onOpenChange={() => setProductToDelete(null)}
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

			{/* Edit Dialog */}
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
				mode="edit"
			/>
		</>
	);
};

export default ProductList; 