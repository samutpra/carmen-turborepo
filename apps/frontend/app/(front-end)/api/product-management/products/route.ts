import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';

interface ProductInfo {
	id: string;
	product_id: string;
	product_item_group_id: string;
	is_ingredients: boolean;
	price: string;
	tax_type: string;
	tax_rate: string;
	price_deviation_limit: string;
	info: {
		brand: string;
	};
	created_at: string;
	created_by_id: string;
	updated_at: string;
	updated_by_id: string;
}

interface Product {
	id: string;
	code: string;
	name: string;
	local_name: string | null;
	description: string;
	primary_unit_id: string;
	product_status_type: string;
	created_at: string;
	created_by_id: string;
	updated_at: string;
	updated_by_id: string;
	tb_product_info: ProductInfo;
	item_group_name: string;
	sub_category_name: string;
	category_name: string;
}

export const GET = async (request: NextRequest) => {
	try {
		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		if (!token) {
			return NextResponse.json(
				{ error: 'Token or tenant ID is missing from the headers' },
				{ status: 400 }
			);
		}
		const { searchParams } = new URL(request.url);
		const search = searchParams.get('search') || '';
		const page = searchParams.get('page') || '1';

		const PRODUCT_URL = `${API_URL}/v1/products?search=${search}&page=${page}`;

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'DUMMY',
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(PRODUCT_URL, options);
		if (response.status === 401) {
			return NextResponse.json(
				{ error: 'Unauthorized access - Invalid or expired token' },
				{ status: 401 }
			);
		}
		if (!response.ok) {
			throw new Error(
				`Failed to fetch products: ${response.status} ${response.statusText}`
			);
		}

		const result = await response.json();

		const data = await Promise.all(
			result.data.map(async (item: Product) => {
				const productItemGroupId = item.tb_product_info.product_item_group_id;
				const itemGroupResponse = await fetch(
					`${API_URL}/v1/product-item-group/${productItemGroupId}`,
					options
				);
				if (!itemGroupResponse.ok) {
					throw new Error(
						`Failed to fetch item group: ${itemGroupResponse.status} ${itemGroupResponse.statusText}`
					);
				}
				const itemGroupData = await itemGroupResponse.json();

				const productSubcategoryId = itemGroupData.data.product_subcategory_id;

				const subCategoryResponse = await fetch(
					`${API_URL}/v1/product-sub-category/${productSubcategoryId}`,
					options
				);

				if (!subCategoryResponse.ok) {
					throw new Error(
						`Failed to fetch subcategory: ${subCategoryResponse.status} ${subCategoryResponse.statusText}`
					);
				}
				const subCategoryData = await subCategoryResponse.json();

				const productCategoryId = subCategoryData.data.product_category_id;

				const categoryResponse = await fetch(
					`${API_URL}/v1/product-category/${productCategoryId}`,
					options
				);

				if (!categoryResponse.ok) {
					throw new Error(
						`Failed to fetch category: ${categoryResponse.status} ${categoryResponse.statusText}`
					);
				}
				const categoryData = await categoryResponse.json();

				return {
					...item,
					item_group_name: itemGroupData.data.name,
					sub_category_name: subCategoryData.data.name,
					category_name: categoryData.data.name,
				};
			})
		);

		return NextResponse.json({ data, pagination: result.pagination });
	} catch (error) {
		console.error('Error occurred:', error);
		return NextResponse.json(
			{ message: 'Internal Server Error', error },
			{ status: 500 }
		);
	}
};
