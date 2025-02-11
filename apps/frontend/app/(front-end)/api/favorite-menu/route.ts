import { FavMenuItem } from "@/dtos/favorite-menu.dto";
import { my_approvals, purchase_requests } from "@/paraglide/messages";
import { NextResponse } from "next/server";
const favoriteMenu: FavMenuItem[] = [
    {
        title: `${my_approvals()}`,
        path: "/procurement/my-approvals",
        visible: true,
        enabled: true,
    },
    {
        title: `${purchase_requests()}`,
        path: "/procurement/purchase-requests",
        visible: true,
        enabled: true,
    },

];
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