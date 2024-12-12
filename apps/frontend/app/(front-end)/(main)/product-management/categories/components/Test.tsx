'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import {
	fetchItemGroup,
	fetchProduct,
	fetchSubProduct,
} from '../actions/actions';
import {
	ProductCategoryType,
	ProductItemGroupType,
	ProductSubCategoryType,
} from '@carmensoftware/shared-types';

const Test = () => {
	const { accessToken } = useAuth();
	const [products, setProducts] = useState<ProductCategoryType>([]);
	const [subProducts, setSubProducts] = useState<ProductSubCategoryType[]>([]);
	const [itemGroups, setItemGroups] = useState<ProductItemGroupType[]>([]);

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const token = accessToken || '';
	const tenantId = 'DUMMY';

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const [productResponse, subProductResponse, itemGroupResponse] =
					await Promise.all([
						fetchProduct(token, tenantId),
						fetchSubProduct(token, tenantId),
						fetchItemGroup(token, tenantId),
					]);

				setProducts(productResponse.data.data);
				setSubProducts(
					subProductResponse.data.data as ProductSubCategoryType[]
				);
				setItemGroups(itemGroupResponse.data.data as ProductItemGroupType[]);
			} catch (err) {
				console.error('Fetch error:', err);
				setError(
					err instanceof Error
						? err.message
						: 'An error occurred while fetching data'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [token, tenantId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex gap-4">
			{/* Product Categories */}
			<div className="w-1/3">
				<h2 className="text-xl font-bold mb-4">Product Categories</h2>
				{products.map((category) => (
					<div key={category.id} className="border p-2 mb-2">
						<p>ID: {category.id}</p>
						<p>Name: {category.name}</p>
					</div>
				))}
			</div>

			{/* Sub Products */}
			<div className="w-1/3">
				<h2 className="text-xl font-bold mb-4">Sub Products</h2>
				{subProducts.map((subProduct) => (
					<div key={subProduct.id} className="border p-2 mb-2">
						<p>ID: {subProduct.id}</p>
						<p>Name: {subProduct.name}</p>
						<p>Category ID: {subProduct.product_category_id}</p>
					</div>
				))}
			</div>

			{/* Item Groups */}
			<div className="w-1/3">
				<h2 className="text-xl font-bold mb-4">Item Groups</h2>
				{itemGroups.map((itemGroup) => (
					<div key={itemGroup.id} className="border p-2 mb-2">
						<p>ID: {itemGroup.id}</p>
						<p>Name: {itemGroup.name}</p>
						<p>Sub Category ID: {itemGroup.product_subcategory_id}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
