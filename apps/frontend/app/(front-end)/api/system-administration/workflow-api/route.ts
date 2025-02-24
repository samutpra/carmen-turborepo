import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

export async function GET(request: NextRequest) {
	const token = request.headers.get('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return NextResponse.json(
			{ error: 'Token or tenant ID is missing from the headers' },
			{ status: 400 }
		);
	}

	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search') || '';

	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'x-tenant-id': `${tenantId}`,
		},
	};

	const url = `${apiUrl}/v1/workflows?search=${search}`;

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Failed to fetch data: ${response.statusText}` },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Fetch error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from API' },
			{ status: 500 }
		);
	}
}
