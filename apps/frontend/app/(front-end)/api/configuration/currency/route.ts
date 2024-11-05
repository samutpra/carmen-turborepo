import { NextRequest, NextResponse } from 'next/server'

const url = 'http://localhost:4000/api/v1/currencies';

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', ''); 
        if (!token) {
            return NextResponse.json(
                { error: 'Token or tenant ID is missing from the headers' },
                { status: 400 }
            );
        }
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': 'DUMMY',
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
