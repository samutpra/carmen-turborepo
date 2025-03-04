import { wfFormSchema } from '@/dtos/workflow.dto';
import { API_URL } from '@/lib/util/api';
import { extractRequest } from '@/lib/util/auth';
import { NextRequest, NextResponse } from 'next/server';
import { fetchData } from '@/services/client';

export async function GET(request: NextRequest) {
	const { token, tenantId } = extractRequest(request);

	if (!token || !tenantId) {
		return NextResponse.json(
			{ error: 'Unauthorized access - Invalid or expired token' },
			{ status: 401 }
		);
	}

	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search') || '';

	const url = `${API_URL}/v1/workflows?search=${search}`;

	try {
		const wfResponse = await fetchData(url, token, tenantId);

		return NextResponse.json({
			data: wfResponse.data,
			pagination: wfResponse.pagination,
		});
	} catch (error) {
		console.error('Fetch error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from API' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { token, tenantId } = extractRequest(request);

		if (!token || !tenantId) {
			return NextResponse.json(
				{ error: 'Unauthorized access - Invalid or expired token' },
				{ status: 401 }
			);
		}

		const body = await request.json();
		const result = wfFormSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: result.error.issues,
				},
				{ status: 400 }
			);
		}
		const validatedData = result.data;
		const apiUrl = `${API_URL}/v1/workflows`;

		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId || '',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(validatedData),
		};

		const response = await fetch(apiUrl, options);
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(
				`Failed to create unit: ${response.status} ${response.statusText}`,
				{ cause: errorData }
			);
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal Server Error', error: error },
			{ status: 500 }
		);
	}
}
