import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from 'resend';
import { nanoid } from 'nanoid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {

        const { subject, email } = await request.json();

        const token = nanoid();

        // ส่งไปที่ nest

        // /register/sendMail

        const { data, error } = await resend.emails.send({
            from: 'test@mail.semapru.com',
            to: email,
            subject: subject,
            react: EmailTemplate({ email: email, token: token }),
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