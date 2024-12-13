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

interface ProductResponse {
	name: string;
	id: string;
	productSubCategories: ProductSubCategoryType[];
}

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

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex gap-4">
			<ProductList
				products={products}
				selectedProduct={selectedProduct}
				onSelectProduct={(product) => {
					setSelectedProduct(product);
					setSelectedSubProduct(null);
				}}
			/>
			<SubProductList
				subProducts={filteredSubProducts}
				selectedSubProduct={selectedSubProduct}
				onSelectSubProduct={setSelectedSubProduct}
			/>
			<ItemGroupList itemGroups={filteredItemGroups} />
		</div>
	);
};

const ProductList = ({
	products,
	selectedProduct,
	onSelectProduct,
}: {
	products: ProductResponse[];
	selectedProduct: ProductResponse | null;
	onSelectProduct: (product: ProductResponse) => void;
}) => (
	<div className="w-1/3">
		<h2 className="text-xl font-bold mb-4">Product Categories</h2>
		{products.map((category) => (
			<div
				key={category.id}
				className={`border p-2 mb-2 cursor-pointer ${
					selectedProduct?.id === category.id
						? 'bg-blue-100 border-blue-500'
						: 'hover:bg-gray-100'
				}`}
				onClick={() => onSelectProduct(category)}
			>
				<p>ID: {category.id}</p>
				<p>Name: {category.name}</p>
			</div>
		))}
	</div>
);

const SubProductList = ({
	subProducts,
	selectedSubProduct,
	onSelectSubProduct,
}: {
	subProducts: ProductSubCategoryType[];
	selectedSubProduct: ProductSubCategoryType | null;
	onSelectSubProduct: (subProduct: ProductSubCategoryType) => void;
}) => (
	<div className="w-1/3">
		<h2 className="text-xl font-bold mb-4">Sub Products</h2>
		{subProducts.length > 0 ? (
			subProducts.map((subProduct) => (
				<div
					key={subProduct.id}
					className={`border p-2 mb-2 cursor-pointer ${
						selectedSubProduct?.id === subProduct.id
							? 'bg-blue-100 border-blue-500'
							: 'hover:bg-gray-100'
					}`}
					onClick={() => onSelectSubProduct(subProduct)}
				>
					<p>ID: {subProduct.id}</p>
					<p>Name: {subProduct.name}</p>
				</div>
			))
		) : (
			<div className="text-gray-500">No sub-products available</div>
		)}
	</div>
);

const ItemGroupList = ({
	itemGroups,
}: {
	itemGroups: ProductItemGroupType[];
}) => (
	<div className="w-1/3">
		<h2 className="text-xl font-bold mb-4">Item Groups</h2>
		{itemGroups.length > 0 ? (
			itemGroups.map((itemGroup) => (
				<div key={itemGroup.id} className="border p-2 mb-2">
					<p>ID: {itemGroup.id}</p>
					<p>Name: {itemGroup.name}</p>
				</div>
			))
		) : (
			<div className="text-gray-500">No item groups available</div>
		)}
	</div>
);

export default CategorieList;
