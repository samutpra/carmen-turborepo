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

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		const tenantId = request.headers.get('x-tenant-id');
		const { id } = params;

		if (!id) {
			return NextResponse.json(
				{ error: 'Workflow ID is required' },
				{ status: 400 }
			);
		}

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
