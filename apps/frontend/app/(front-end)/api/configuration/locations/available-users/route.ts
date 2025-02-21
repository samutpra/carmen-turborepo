import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/util/api';

export async function GET(request: NextRequest) {
	const token = request.headers.get('Authorization')?.replace('Bearer ', '');
	const tenantId = request.headers.get('x-tenant-id');

	if (!token || !tenantId) {
		return NextResponse.json(
			{ message: 'Unauthorized' },
			{ status: 401 }
		);
	}
	const api_url = `${API_URL}/v1/user/business-unit`;
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'x-tenant-id': tenantId,
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await fetch(api_url, options);
		if (response.status === 401) {
			return NextResponse.json(
				{ message: 'Unauthorized' },
				{ status: 401 }
			);
		}
		const result = await response.json();
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json(
			{ message: error },
			{ status: 500 }
		);
	}
}
