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