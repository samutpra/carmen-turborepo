import { API_URL } from '@/lib/util/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json(
                { error: 'Token or tenant ID is missing from the headers' },
                { status: 400 }
            );
        }

        const URL = `${API_URL}/v1/products`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': 'DUMMY',
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(URL, options);
        if (response.status === 401) {
            return NextResponse.json(
                { error: 'Unauthorized access - Invalid or expired token' },
                { status: 401 }
            );
        }
        if (!response.ok) {
            throw new Error(
                `Failed to fetch units: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        return NextResponse.json({ data });

    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error },
            { status: 500 }
        );
    }
}