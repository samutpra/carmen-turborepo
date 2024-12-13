'use client';

import { ProductSubCategoryType } from '@carmensoftware/shared-types/dist/productCategorySchema';
import React from 'react';

interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
}

type ProductListProps = {
	products: ProductResponse[];
	selectedProduct: ProductResponse | null;
	onSelectProduct: (product: ProductResponse) => void;
};

const ProductList = ({
	products,
	selectedProduct,
	onSelectProduct,
}: ProductListProps) => (
	<div className="w-1/3">
		{products.map((category) => (
			<div
				key={category.id}
				className={`border p-2 mb-2 cursor-pointer ${
					selectedProduct?.id === category.id
						? 'bg-blue-100 border-blue-500'
						: 'hover:bg-gray-50'
				}`}
				onClick={() => onSelectProduct(category)}
			>
				<p>{category.name}</p>
			</div>
		))}
	</div>
);

export default ProductList; 