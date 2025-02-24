import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';
import { extractToken } from '@/lib/util/auth';

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

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

		const url = `${API_URL}/v1/workflows/${params.id}`;

		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': `${tenantId}`,
			},
		};

		const response = await fetch(url, options);

		const data = await response.json();

		return NextResponse.json(data);
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
