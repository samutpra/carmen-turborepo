import { NextResponse } from 'next/server'
import { UnitSchema } from "@/lib/types"

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