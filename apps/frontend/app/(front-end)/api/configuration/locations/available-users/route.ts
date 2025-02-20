import { NextResponse } from 'next/server';
import { availableUsers } from '../mock_data';

export async function GET() {
	return NextResponse.json({ data: availableUsers });
}
