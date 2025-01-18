import { SignInResponse, SignInType } from "@/lib/types";

export const signInAction = async (data: SignInType): Promise<SignInResponse> => {
    const response = await fetch(`api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign in failed');
    }

    return response.json();
}