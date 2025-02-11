import { NextResponse } from 'next/server';
import { mockGoodsReceiveNotes } from '../mock_data';

export const GET = async () => {
	try {
		return NextResponse.json(
			{
				message: 'Goods received notes fetched successfully',
				data: mockGoodsReceiveNotes,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: 'Failed to fetch goods received notes',
				error:
					error instanceof Error ? error.message : 'Unknown error occurred',
			},
			{ status: 500 }
		);
	}
};
