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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductSubCategoryType, SubCategoryFormData } from '@carmensoftware/shared-types';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import SubCategoryDialog from './SubCategoryDialog';
import { useState } from 'react';

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
	const [editingSubProduct, setEditingSubProduct] = useState<ProductSubCategoryType | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleEdit = (subProduct: ProductSubCategoryType) => {
		setEditingSubProduct(subProduct);
		setIsEditDialogOpen(true);
	};

	const handleEditSubmit = async (formData: SubCategoryFormData) => {
		if (editingSubProduct) {
			await onEditSubProduct(editingSubProduct.id, formData);
			setIsEditDialogOpen(false);
			setEditingSubProduct(null);
		}
	};

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
					<CardDescription>Select a sub category to view item groups</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					{subProducts.map((subProduct) => (
						<div
							key={subProduct.id}
							className={cn(
								'flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent',
								selectedSubProduct?.id === subProduct.id && 'bg-accent'
							)}
							onClick={() => onSelectSubProduct(subProduct)}
						>
							<span>{subProduct.name}</span>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="h-8 w-8 p-0"
										onClick={(e) => e.stopPropagation()}
									>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={(e) => {
											e.stopPropagation();
											handleEdit(subProduct);
										}}
									>
										<Pencil className="mr-2 h-4 w-4" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										className="text-destructive"
										onClick={(e) => {
											e.stopPropagation();
											onDeleteSubProduct(subProduct.id);
										}}
									>
										<Trash className="mr-2 h-4 w-4" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					))}
				</CardContent>
			</Card>

			<SubCategoryDialog
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
				onSubmit={handleEditSubmit}
				initialData={editingSubProduct || undefined}
				mode="edit"
				categories={[]}
			/>
		</>
	);
};

export default SubProductList; 