import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';
import {
	fetchProductItemGroup,
	fetchProductSubcategory,
	fetchProductCategory,
} from '@/app/(front-end)/services/products';
import { extractToken } from '@/lib/util/auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		const token = extractToken(request)
		if (!token) {
			return NextResponse.json(
				{ error: 'Token is missing from the headers' },
				{ status: 400 }
			);
		}

		const tenantId = 'DUMMY';

		const productUrl = `${API_URL}/v1/products/${params.id}`;

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
		};

		const productResponse = await fetch(productUrl, options);

		const productData = await productResponse.json();

		const productItemGroupId =
			productData.data.tb_product_info.product_item_group_id;

		const itemGroupData = await fetchProductItemGroup(
			productItemGroupId,
			token,
			tenantId
		);

		const productSubcategoryId = itemGroupData.data.product_subcategory_id;
		const subCategoryData = await fetchProductSubcategory(
			productSubcategoryId,
			token,
			tenantId
		);

		const productCategoryId = subCategoryData.data.product_category_id;
		const categoryData = await fetchProductCategory(
			productCategoryId,
			token,
			tenantId
		);

		const product = {
			...productData,
			item_group_name: itemGroupData.data.name,
			sub_category_name: subCategoryData.data.name,
			category_name: categoryData.data.name,
		};

		return NextResponse.json({ data: product });
	} catch (error) {
		return NextResponse.json(
			{
				message:
					error instanceof Error ? error.message : 'Internal server error',
				error: process.env.NODE_ENV === 'development' ? error : undefined,
			},
			{ status: 500 }
		);
	}
}
