import { NextRequest, NextResponse } from 'next/server';
import { prData } from '../../mock_data';
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // const token = request.headers.get('Authorization')?.replace('Bearer ', '');
        const { id } = params;
        const pr = prData.find((pr) => pr.id === id);

        if (!pr) {
            return NextResponse.json(
                {
                    message: 'Purchase request not found',
                },
                { status: 404 }
            );
        }
        return NextResponse.json({ data: pr });
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error ? error.message : 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error : undefined,
            },
            { status: 500 }
        );
    }
}