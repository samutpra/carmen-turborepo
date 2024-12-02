import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/v1/departments';

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

        const response = await fetch(API_URL, {
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
        return NextResponse.json({ id: data.id });
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

