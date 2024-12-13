'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import {
	fetchItemGroup,
	fetchProduct,
	fetchSubProduct,
} from '../actions/actions';
import {
	ProductItemGroupType,
	ProductSubCategoryType,
} from '@carmensoftware/shared-types';
import SummaryCard from './SummaryCard';
import { Folder, Tag, LayoutGrid } from 'lucide-react';
import { ItemGroupList } from './ItemGroupList';
import ProductList from './ProductList';
import SubProductList from './SubProductList';

interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
}

type CategorySummary = {
	totalCategories: number;
	totalSubCategories: number;
	totalItemGroups: number;
};

const CategorieList = () => {
	const { accessToken } = useAuth();
	const [products, setProducts] = useState<ProductResponse[]>([]);
	const [subProducts, setSubProducts] = useState<ProductSubCategoryType[]>([]);
	const [itemGroups, setItemGroups] = useState<ProductItemGroupType[]>([]);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductResponse | null>(null);
	const [selectedSubProduct, setSelectedSubProduct] =
		useState<ProductSubCategoryType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const token = accessToken || '';
	const tenantId = 'DUMMY';

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [productResponse, subProductResponse, itemGroupResponse] =
					await Promise.all([
						fetchProduct(token, tenantId),
						fetchSubProduct(token, tenantId),
						fetchItemGroup(token, tenantId),
					]);

				setProducts(
					Array.isArray(productResponse.data.data)
						? productResponse.data.data
						: ([productResponse.data.data] as ProductResponse[])
				);
				setSubProducts(
					subProductResponse.data.data as ProductSubCategoryType[]
				);
				setItemGroups(itemGroupResponse.data.data as ProductItemGroupType[]);
			} catch (err) {
				console.log(err);
				setError('An error occurred while fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [token, tenantId]);

	const filteredSubProducts = selectedProduct
		? subProducts.filter(
				(sub) => sub.product_category_id === selectedProduct.id
			)
		: [];

	const filteredItemGroups = selectedSubProduct
		? itemGroups.filter(
				(group) => group.product_subcategory_id === selectedSubProduct.id
			)
		: [];

	const handleDeleteItemGroup = (itemGroupId: string) => {
		setItemGroups((prevGroups) =>
			prevGroups.filter((group) => group.id !== itemGroupId)
		);
	};

	const handleUpdateItemGroup = (itemGroupId: string, newName: string) => {
		setItemGroups((prevGroups) =>
			prevGroups.map((group) =>
				group.id === itemGroupId ? { ...group, name: newName } : group
			)
		);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	const summary: CategorySummary = {
		totalCategories: products.length,
		totalSubCategories: subProducts.length,
		totalItemGroups: itemGroups.length,
	};

	return (
		<div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Categories"
					count={summary.totalCategories}
					icon={<Folder className="w-6 h-6" />}
					onAddData={() => {
						// Your custom logic here
						console.log('Category Add');
					}}
				/>
				<ProductList
					products={products}
					selectedProduct={selectedProduct}
					onSelectProduct={(product) => {
						setSelectedProduct(product);
						setSelectedSubProduct(null);
					}}
				/>
			</div>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Sub Categories"
					count={summary.totalSubCategories}
					icon={<Tag className="w-6 h-6" />}
					onAddData={() => {
						// Your custom logic here
						console.log('Sub Category Add');
					}}
				/>
				<SubProductList
					subProducts={filteredSubProducts}
					selectedSubProduct={selectedSubProduct}
					onSelectSubProduct={setSelectedSubProduct}
				/>
			</div>

			<div className="flex flex-col space-y-4">
				<SummaryCard
					title="Item Groups"
					count={summary.totalItemGroups}
					icon={<LayoutGrid className="w-6 h-6" />}
					onAddData={() => {
						// Your custom logic here
						console.log('Item Group Add');
					}}
				/>
				<ItemGroupList
					itemGroups={filteredItemGroups}
					categoryName={selectedProduct?.name || ''}
					subCategoryName={selectedSubProduct?.name || ''}
					onDeleteItemGroup={handleDeleteItemGroup}
					onUpdateItemGroup={handleUpdateItemGroup}
				/>
			</div>
		</div>
	);
};

export default CategorieList;
