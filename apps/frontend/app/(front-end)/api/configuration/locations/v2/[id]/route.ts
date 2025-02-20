import { NextResponse } from 'next/server';
import { locationsDetail } from '../../mock_data';

export async function GET() {
	return NextResponse.json({ data: locationsDetail });
}
