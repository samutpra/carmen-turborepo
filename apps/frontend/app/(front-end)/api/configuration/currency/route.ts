import { NextRequest, NextResponse } from 'next/server';

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
    const search = searchParams.get('search') || '';

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': 'DUMMY',
        }
    };

    const url = `${apiUrl}?search=${search}`;

    try {
        const response = await fetch(url, options);

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

export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { error: 'Token is missing from the headers' },
                { status: 401 }
            );
        }
        const body = await request.json();

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || 'Failed to create currency' },
                { status: response.status }
            );
        }

        return NextResponse.json(data.id, { status: 201 });
    } catch (error) {
        console.error('Currency creation error:', error);

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        );
    }
}
