import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';
import { extractToken } from '@/lib/util/auth';
import { fetchData } from '@/app/(front-end)/services/client';
import {
	fetchProductItemGroup,
	fetchProductSubcategory,
	fetchProductCategory,
} from '@/app/(front-end)/services/products';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const token = extractToken(request);
		if (!token) {
			return NextResponse.json(
				{ error: 'Token is missing from the headers' },
				{ status: 400 }
			);
		}
		const tenantId = 'DUMMY';

		// Fetch product data
		const productUrl = `${API_URL}/v1/products/${params.id}`;
		const productResponse = await fetchData(productUrl, token, tenantId);

		const productItemGroupId =
			productResponse.data.tb_product_info.product_item_group_id;
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
			...productResponse,
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
