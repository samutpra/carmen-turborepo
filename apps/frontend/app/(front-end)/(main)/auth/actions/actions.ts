import { PayloadVerifyType } from "@/lib/types";

export const sendVerificationEmail = async (email: string) => {
    try {
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: "Register",
                email: email
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send verification email');
        }

        return data;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return {
            error: error instanceof Error ? error.message : 'Failed to send verification email'
        };
    }
};

export const submitSignup = async (payload: PayloadVerifyType) => {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (response.ok) {
            return { success: true, data: result };
        } else {
            return { success: false, message: result.message || 'Unknown error' };
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return { success: false, message: 'An error occurred while processing your request' };
    }
};

export const sendRecoverPasswordEmail = async (email: string) => {
    try {
        const response = await fetch('/api/auth/recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: "Recover Password",
                email: email
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send verification email');
        }

        return data;

    } catch (error) {
        console.error('Error sending verification email:', error);
        return {
            error: error instanceof Error ? error.message : 'Failed to send verification email'
        };
    }
};