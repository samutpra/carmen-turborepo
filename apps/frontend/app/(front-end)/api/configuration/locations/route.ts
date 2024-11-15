import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/locations';

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': 'DUMMY',
        }
    };

    const url = `${API_URL}?search=${search}`;

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch data: ${response.statusText}` },
                { status: response.status }
            );
        }

        const result = await response.json();

        return NextResponse.json(result);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
    }
}
