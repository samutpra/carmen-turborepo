import { SignInSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = SignInSchema.safeParse(body);

        if (!result.success) {
            console.log("Validation error:", result.error);
            return NextResponse.json(
                { error: "Invalid input", details: result.error.issues },
                { status: 400 }
            );
        }
        const { username, password } = result.data;

        const response = await fetch('http://localhost:4000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || 'Authentication failed' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Error processing signin:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}