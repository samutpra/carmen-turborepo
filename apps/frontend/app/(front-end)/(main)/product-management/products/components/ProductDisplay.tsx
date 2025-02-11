import React, { useEffect, useState } from 'react';
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import { ProductCreateModel } from '@/dtos/product.dto';
import ProductMobile from './ProductMobile';
import ProductDesktop from './ProductDesktop';

export type SortDirection = 'asc' | 'desc';

interface ProductDisplayProps {
	products: ProductCreateModel[];
	fields: FieldConfig<ProductCreateModel>[];
	page: number;
	totalPage: number;
	handlePageChange: (newPage: number) => void;
	sort?: string;
	onSortChange?: (sort: SortQuery) => void;
	isLoading?: boolean;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
	products,
	fields = [],
	page,
	totalPage,
	handlePageChange,
	sort,
	onSortChange,
	isLoading = false,
}) => {
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

	useEffect(() => {
		if (!sort) return;

		const [field, direction] = sort.split(':');
		setSortField(field);
		setSortDirection((direction as SortDirection) || 'asc');
	}, [sort]);

	const handleSort = (field: string) => {
		const newDirection: SortDirection =
			sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';

		setSortField(field);
		setSortDirection(newDirection);
		onSortChange?.(`${field}:${newDirection}` as SortQuery);
	};

	return (
		<>
			<ProductMobile
				products={products}
				fields={fields}
				sortField={sortField}
				sortDirection={sortDirection}
				handleSort={handleSort}
				isLoading={isLoading}
			/>
			<ProductDesktop
				products={products}
				fields={fields}
				page={page}
				totalPage={totalPage}
				handlePageChange={handlePageChange}
				sortField={sortField}
				sortDirection={sortDirection}
				handleSort={handleSort}
				isLoading={isLoading}
			/>
		</>
	);
};

export default ProductDisplay;