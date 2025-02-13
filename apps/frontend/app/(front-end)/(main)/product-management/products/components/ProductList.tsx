'use client';

import { Link } from '@/lib/i18n';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useURL } from '@/hooks/useURL';
import { Button } from '@/components/ui/button';
import { FileDown, Plus, Printer } from 'lucide-react';
import * as m from '@/paraglide/messages.js';
import SearchForm from '@/components/ui-custom/SearchForm';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { fetchProducts } from '../../actions/product';
import { toastError } from '@/components/ui-custom/Toast';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import ProductDisplay from './ProductDisplay';
import { ProductCreateModel } from '@/dtos/product.dto';
import SortComponent from '@/components/ui-custom/SortComponent';
import { PRODUCT_STATUS_FILTER } from '@/lib/util/status';

export enum ProductField {
	NAME = 'name',
	CODE = 'code',
	DESCRIPTION = 'description',
	CATEGORY = 'category_name',
	SUBCATEGORY = 'sub_category_name',
	ITEM_GROUP = 'item_group_name',
	STATUS = 'product_status_type',
}

const sortFields: FieldConfig<ProductCreateModel>[] = [
	{ key: ProductField.NAME as keyof ProductCreateModel, label: 'Name' },
	{ key: ProductField.CODE as keyof ProductCreateModel, label: 'Code' },
];

const fields: FieldConfig<ProductCreateModel>[] = [
	...sortFields,
	{
		key: ProductField.DESCRIPTION as keyof ProductCreateModel,
		label: 'Description',
	},
	{ key: ProductField.CATEGORY as keyof ProductCreateModel, label: 'Category' },
	{
		key: ProductField.SUBCATEGORY as keyof ProductCreateModel,
		label: 'Subcategory',
	},
	{
		key: ProductField.ITEM_GROUP as keyof ProductCreateModel,
		label: 'Item Group',
	},
	{ key: ProductField.STATUS as keyof ProductCreateModel, label: 'Status' },
];

const statusOptions = [
	{ label: `${m.all_status()}`, value: PRODUCT_STATUS_FILTER.ALL_STATUS },
	{ label: `${m.status_active()}`, value: PRODUCT_STATUS_FILTER.ACTIVE },
	{ label: `${m.status_inactive()}`, value: PRODUCT_STATUS_FILTER.IN_ACTIVE },
	{ label: `${m.status_discontinued()}`, value: PRODUCT_STATUS_FILTER.DISCONTINUED }
];

export const PRODUCT_STATUS_COLORS: Record<string, string> = {
	active: "border-transparent bg-[#eaf1e9] text-[#276D20] shadow hover:bg-[#eaf1e9]/80 font-bold",
	inactive: "border-transparent bg-[#ece0e0] text-[#9D1C1D] shadow hover:bg-[#ece0e0]/80 font-bold",
	discontinued: "border-transparent bg-orange-100 text-orange-600 hover:bg-orange-50 font-bold",
	"": "bg-gray-400 text-white",
};

export const productStatusBadge = (status: string) => (
	<span className={`px-2 py-1 rounded-full text-xs ${PRODUCT_STATUS_COLORS[status] || "bg-gray-400 text-white"}`}>
		{status.charAt(0).toUpperCase() + status.slice(1)}
	</span>
);

const ProductList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [products, setProducts] = useState<ProductCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');


	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchProducts(token, tenantId, {
				search,
				status,
				page,
				sort
			});
			setProducts(data.data);
			setPage(data.pagination.page);
			setPages(data.pagination.pages);
		} catch (error) {
			console.log('error', error);
			toastError({ message: 'Failed to fetch products' });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status, page, sort]);

	const handlePageChange = (newPage: number) => {
		const numericTotalPages = Number(pages);
		if (newPage < 1 || newPage > numericTotalPages) return;
		setPage(newPage.toString());
	};

	const actionButtons = (
		<div className="flex items-center gap-2">
			<Button
				asChild
				variant="outline"
				size="sm"
				data-id="product-list-new-product-button"
			>
				<Link
					href="/product-management/products/new"
					data-id="product-list-new-product-button"
				>
					<Plus className="h-4 w-4" />
					New product
				</Link>
			</Button>
			<Button
				variant="outline"
				className="group"
				size="sm"
				data-id="product-list-export-button"
			>
				<FileDown className="h-4 w-4" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size="sm" data-id="product-list-print-button">
				<Printer className="h-4 w-4" data-id="product-list-print-button-icon" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div
			className="filter-container my-4"
			data-id="product-list-filter-container"
		>
			<SearchForm
				onSearch={setSearch}
				defaultValue={search}
				placeholder={`${m.Search()} ...`}
				data-id="product-list-search-form"
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
					data-id="product-list-status-search-dropdown"
				/>
				<SortComponent
					fieldConfigs={sortFields}
					sort={sort}
					setSort={setSort}
					data-id="product-list-sort-dropdown"
				/>
			</div>
		</div>
	);

	const content = (
		<ProductDisplay
			products={products}
			fields={fields}
			page={+page}
			totalPage={+pages}
			handlePageChange={handlePageChange}
			sort={sort}
			onSortChange={(newSort: SortQuery) => {
				setSort(newSort);
			}}
			isLoading={isLoading}
			data-id="product-list-product-display"
		/>
	);

	return (
		<DataDisplayTemplate
			title="Products List"
			actionButtons={actionButtons}
			filters={filter}
			content={content}
			data-id="product-list-data-display-template"
		/>
	);
};

export default ProductList;
