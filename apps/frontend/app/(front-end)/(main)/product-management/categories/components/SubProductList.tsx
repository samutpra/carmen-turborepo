'use client';

import React from 'react';
import { ProductSubCategoryType } from '@carmensoftware/shared-types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubProductListProps {
	subProducts: ProductSubCategoryType[];
	selectedSubProduct: ProductSubCategoryType | null;
	onSelectSubProduct: (subProduct: ProductSubCategoryType) => void;
	onDeleteSubProduct: (subProductId: string) => Promise<void>;
}

const SubProductList = ({
	subProducts,
	selectedSubProduct,
	onSelectSubProduct,
	onDeleteSubProduct,
}: SubProductListProps) => (
	<div className="w-1/3">
		{subProducts.length > 0 ? (
			subProducts.map((subProduct) => (
				<div
					key={subProduct.id}
					className={`border p-2 mb-2 cursor-pointer flex justify-between items-center ${
						selectedSubProduct?.id === subProduct.id
							? 'bg-blue-100 border-blue-500'
							: 'hover:bg-gray-50'
					}`}
					onClick={() => onSelectSubProduct(subProduct)}
				>
					<p>{subProduct.name}</p>
					<Button
						variant="ghost"
						size="icon"
						onClick={(e) => {
							e.stopPropagation();
							onDeleteSubProduct(subProduct.id);
						}}
						aria-label={`Delete ${subProduct.name}`}
					>
						<Trash2 className="h-4 w-4 text-red-500" />
					</Button>
				</div>
			))
		) : (
			<div className="text-gray-500">No sub-products available</div>
		)}
	</div>
);

export default SubProductList; 