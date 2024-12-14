'use client';

import { ProductSubCategoryType } from '@carmensoftware/shared-types/dist/productCategorySchema';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
import { Trash2 } from 'lucide-react';
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

interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
}

interface ProductListProps {
	products: ProductResponse[];
	selectedProduct: ProductResponse | null;
	onSelectProduct: (product: ProductResponse) => void;
	onDeleteProduct: (productId: string) => Promise<void>;
}

const ProductList = ({
	products,
	selectedProduct,
	onSelectProduct,
	onDeleteProduct,
}: ProductListProps) => {
	
	const [productToDelete, setProductToDelete] =
		React.useState<ProductResponse | null>(null);

	const handleDeleteClick = (e: React.MouseEvent, product: ProductResponse) => {
		e.stopPropagation();
		setProductToDelete(product);
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

	return (
		<>
			<div className="w-1/3 space-y-2">
				{products.map((category) => (
					<Card
						key={category.id}
						className={cn(
							'transition-colors cursor-pointer hover:bg-gray-50 group',
							selectedProduct?.id === category.id &&
								'bg-blue-100 border-blue-500'
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
						<CardContent className="p-4 flex items-center justify-between">
							<p className="text-sm font-medium">{category.name}</p>
							<Button
								variant="ghost"
								size="icon"
								className="opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={(e) => handleDeleteClick(e, category)}
								aria-label={`Delete ${category.name}`}
							>
								<Trash2 className="h-4 w-4 text-red-500" />
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

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
		</>
	);
};

export default ProductList; 