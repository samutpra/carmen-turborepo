import { NextResponse } from "next/server";
import { mockClusters } from "../mock-data";

export const dynamic = 'force-dynamic'
export async function GET() {
    return NextResponse.json(mockClusters);
}   