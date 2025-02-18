import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';
import { extractToken } from '@/lib/util/auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
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

		return NextResponse.json({ data: productData });
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
