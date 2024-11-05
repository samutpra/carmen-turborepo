import { NextResponse } from 'next/server'

const API_URL = 'http://localhost:4000/api/v1/currencies';

export async function GET() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(API_URL, options);

    console.log('response',response);
    

    if (!response.ok) {
        throw new Error(`Failed to fetch curency: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ data });
}
