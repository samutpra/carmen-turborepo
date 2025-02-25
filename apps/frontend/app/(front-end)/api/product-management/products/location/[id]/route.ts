import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/util/api';
import { extractToken } from '@/lib/util/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = extractToken(request)
        const tenantId = request.headers.get('x-tenant-id');
				if (!token || !tenantId) {
					return NextResponse.json(
						{ error: 'Unauthorized access - Invalid or expired token' },
						{ status: 401 }
					);
				}
        const productUrl = `${API_URL}/v1/product-location/${params.id}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },
        };
        const productResponse = await fetch(productUrl, options);
        const product = await productResponse.json();
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