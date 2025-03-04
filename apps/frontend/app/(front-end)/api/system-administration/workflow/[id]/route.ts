import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';
import { extractRequest } from '@/lib/util/auth';
import { fetchData } from '@/services/client';
import { wfFormSchema } from '@/dtos/workflow.dto';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { token, tenantId } = extractRequest(request);

		if (!token || !tenantId) {
			return NextResponse.json(
				{ error: 'Unauthorized access - Invalid or expired token' },
				{ status: 401 }
			);
		}

		const url = `${API_URL}/v1/workflows/${params.id}`;

		try {
			const wfResponse = await fetchData(url, token, tenantId);

			return NextResponse.json(wfResponse);
		} catch (error) {
			console.error('Fetch error:', error);
			return NextResponse.json(
				{ error: 'Failed to fetch data from API' },
				{ status: 500 }
			);
		}
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

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;

		if (!id) {
			return NextResponse.json(
				{ error: 'Workflow ID is required' },
				{ status: 400 }
			);
		}

		const { token, tenantId } = extractRequest(request);

		if (!token || !tenantId) {
			return NextResponse.json(
				{ error: 'Token is missing from the headers' },
				{ status: 401 }
			);
		}

		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId || '',
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(`${API_URL}/v1/workflows/${id}`, options);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return NextResponse.json(
				{
					error: 'Failed to delete workflow',
					details: errorData,
				},
				{ status: response.status }
			);
		}

		return NextResponse.json({
			message: 'workflow deleted successfully',
			id,
		});
	} catch (error) {
		console.error('Error deleting workflow:', error);
		return NextResponse.json(
			{ error: 'Internal server error while deleting workflow' },
			{ status: 500 }
		);
	}
}

export const PATCH = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
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

		const url = `${API_URL}/v1/workflows/${params.id}`;

		const options = {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId || '',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(validatedData),
		};

		const response = await fetch(url, options);
		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new Error(
				`Failed to update workflow: ${response.status} ${response.statusText}`,
				{ cause: errorData }
			);
		}

		const data = await response.json();

		return NextResponse.json({ id: data.id }, { status: 200 });
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json(
			{
				message: 'Unexpected Internal Server Error',
				error: String(error),
			},
			{ status: 500 }
		);
	}
};
