import EmailPasswordRecovery from "@/components/EmailPasswordRecovery";
import { API_URL } from "@/lib/util/api";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function GET() {
    return NextResponse.json({
        message: 'hello world!'
    });
}


export async function POST(request: NextRequest) {
    try {

        const { subject, email } = await request.json();

        const response = await fetch(API_URL + '/auth/forgotpassword/email-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const resultToken = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: resultToken.error || 'email token failed' },
                { status: response.status }
            );
        }

        const token = resultToken.data

        const { data, error } = await resend.emails.send({
            from: 'test@mail.semapru.com',
            to: email,
            subject: subject,
            react: EmailPasswordRecovery({ email: email, token: token }),
        });

        if (error) {
            return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}