import { favoriteMenu } from "@/dtos/favorite-menu.dto";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            data: favoriteMenu,
        });
    } catch (error) {
        console.error('Error fetching cuisine types:', error);
        return NextResponse.json(
            {
                success: false,
                data: [],
                message: 'Failed to fetch recipes',
            },
            { status: 500 }
        );
    }
}