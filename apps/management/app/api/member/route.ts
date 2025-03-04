import { NextResponse } from "next/server";
import { mappedUsers } from "../mock-data";

export async function GET() {
    return NextResponse.json(mappedUsers);
}


