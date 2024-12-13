'use client';

import React from 'react';
import { ProductSubCategoryType } from '@carmensoftware/shared-types';

type SubProductListProps = {
  subProducts: ProductSubCategoryType[];
  selectedSubProduct: ProductSubCategoryType | null;
  onSelectSubProduct: (subProduct: ProductSubCategoryType) => void;
};

const SubProductList = ({
	subProducts,
	selectedSubProduct,
	onSelectSubProduct,
}: SubProductListProps) => (
	<div className="w-1/3">
		{subProducts.length > 0 ? (
			subProducts.map((subProduct) => (
				<div
					key={subProduct.id}
					className={`border p-2 mb-2 cursor-pointer ${
						selectedSubProduct?.id === subProduct.id
							? 'bg-blue-100 border-blue-500'
							: 'hover:bg-gray-50'
					}`}
					onClick={() => onSelectSubProduct(subProduct)}
				>
					<p>{subProduct.name}</p>
				</div>
			))
		) : (
			<div className="text-gray-500">No sub-products available</div>
		)}
	</div>
);

export default SubProductList; 