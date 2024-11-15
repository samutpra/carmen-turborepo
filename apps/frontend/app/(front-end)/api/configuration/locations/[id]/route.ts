import { NextRequest, NextResponse } from 'next/server';

const apiUrl = 'http://localhost:4000/api/v1';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();

        const URL = `${apiUrl}/locations/${params.id}`;

        const response = await fetch(URL, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message: errorData?.message || 'Failed to update store',
                    error: errorData
                },
                { status: response.status }
            );
        }

        const result = await response.json();
        if (!result) {
            throw new Error('Invalid response from API');
        }
        return NextResponse.json({ data: result.data }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const URL = `${apiUrl}/locations/${params.id}`;
        const response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-tenant-id': 'DUMMY',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message: errorData?.message || 'Failed to delete store',
                    error: errorData
                },
                { status: response.status }
            );
        }

        return NextResponse.json({ message: 'Store deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    }
}
