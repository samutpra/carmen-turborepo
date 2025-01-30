import { NextResponse } from 'next/server';
import { mockCuisines } from './mock-data';
import { RecipeCuisine } from '@/dtos/cuisine-types.dto';

export interface CuisineTypesResponse {
	success: boolean;
	data: RecipeCuisine[];
	message?: string;
}

export async function GET(): Promise<NextResponse<CuisineTypesResponse>> {
	try {
		return NextResponse.json({
			success: true,
			data: mockCuisines,
		});
	} catch (error) {
		console.error('Error fetching cuisine types:', error);
		return NextResponse.json(
			{
				success: false,
				data: [],
				message: 'Failed to fetch cuisine types',
			},
			{ status: 500 }
		);
	}
}
