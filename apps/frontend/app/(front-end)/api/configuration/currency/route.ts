import { NextRequest, NextResponse } from 'next/server'

const apiUrl = process.env.CURRENCY_API_URL || 'http://localhost:4000/api/v1/currencies';

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json(
            { error: 'Token or tenant ID is missing from the headers' },
            { status: 400 }
        );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perpage') || '10';
    const search = searchParams.get('search') || '';

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': 'DUMMY',
            'Content-Type': 'application/json',
        }
    };

    const urlWithParams = `${apiUrl}?page=${page}&perpage=${perPage}&search=${search}`;

    try {
        const response = await fetch(urlWithParams, options);
        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch data: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
    }
}
