import { NextRequest, NextResponse } from 'next/server';

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

        const apiUrl = 'http://localhost:4000/api/v1';
        const fullUrl = `${apiUrl}/currencies/${params.id}`;

        const response = await fetch(fullUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(data),
        });


        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message: errorData?.message || 'Failed to update currency',
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

        console.log('token adasdad', token);


        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 402 }
            );
        }

        const apiUrl = 'http://localhost:4000/api/v1';
        const fullUrl = `${apiUrl}/currencies/${params.id}`;


        const response = await fetch(fullUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
        });

        console.log('resss', response);


        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return NextResponse.json(
                {
                    message: errorData?.message || 'Failed to delete currency',
                    error: errorData
                },
                { status: response.status }
            );
        }

        return NextResponse.json({ message: 'Currency deleted successfully' }, { status: 200 });
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