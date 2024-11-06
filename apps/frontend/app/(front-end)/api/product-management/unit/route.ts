import { NextResponse } from 'next/server'
import { UnitSchema } from "@/lib/types"

const API_URL = 'http://localhost:4000/api/v1';


export async function GET(request: Request) {
    try {
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
            },
        };

        const response = await fetch(`${API_URL}/units`, options);

        if (response.status === 401) {
            return NextResponse.json(
                { error: 'Unauthorized access - Invalid or expired token' },
                { status: 401 }
            );
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch units: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({ data });
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        console.log("POST!!!");

        const body = await request.json()
        const result = UnitSchema.safeParse(body)

        console.log('before', result);

        delete result.data?.id

        console.log('after', result);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            )
        }
        return NextResponse.json({
            success: true,
            data: {
                message: 'Create Form Unit success',
                receivedData: result.data
            }
        })

    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}


export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const result = UnitSchema.safeParse(body)
        console.log('before', result);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.errors[0].message },
                { status: 400 }
            )
        }
        return NextResponse.json({
            success: true,
            data: {
                message: 'Update Form Unit success',
                receivedData: result.data
            }
        })

    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}