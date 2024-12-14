import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		const { id } = params;

		if (!id) {
			return NextResponse.json(
				{ error: 'Product category ID is required' },
				{ status: 400 }
			);
		}

		if (!token) {
			return NextResponse.json(
				{ error: 'Token is missing from the headers' },
				{ status: 401 }
			);
		}

		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': 'DUMMY',
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(
			`${API_URL}/v1/product-category/${id}`,
			options
		);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return NextResponse.json(
				{
					error: 'Failed to delete product category',
					details: errorData,
				},
				{ status: response.status }
			);
		}

		return NextResponse.json({
			message: 'Product category deleted successfully',
			id,
		});
	} catch (error) {
		console.error('Error deleting product category:', error);
		return NextResponse.json(
			{ error: 'Internal server error while deleting product category' },
			{ status: 500 }
		);
	}
}
