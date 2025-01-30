import { NextResponse } from 'next/server';
import { mockCategories } from '../mock-data';
import { RecipeCategory } from '@/dtos/recipe-category.dto';

interface RecipeCategoryResponse {
	success: boolean;
	data: RecipeCategory[];
	message?: string;
}

export async function GET(): Promise<NextResponse<RecipeCategoryResponse>> {
	try {
		return NextResponse.json({
			success: true,
			data: mockCategories,
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
