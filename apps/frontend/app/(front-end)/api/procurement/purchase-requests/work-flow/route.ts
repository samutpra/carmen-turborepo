import { NextResponse } from 'next/server';
import { workFlowData } from '../../mock_data';

export const GET = async () => {
    try {
        return NextResponse.json({
            data: workFlowData
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Failed to fetch',
                error:
                    error instanceof Error ? error.message : 'Unknown error occurred',
            },
            { status: 500 }
        );
    }
};