import { toastError } from "@/components/ui-custom/Toast";
import { AuthState, SignInResponse, SignInType } from "@/lib/types";

export const signInAction = async (
	data: SignInType
): Promise<SignInResponse> => {
	const response = await fetch(`api/auth/sign-in`, {
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
};

type LoginHandler = (data: AuthState, token: string) => void;

export const processLogin = async (
	result: SignInResponse,
	loginHandler: LoginHandler
) => {
	await loginHandler(
		{
			user: {
				id: result.id,
				username: result.username,
			},
			refresh_token: result.refresh_token,
			access_token: result.access_token,
			tenant: result.tenant,
		},
		result.access_token
	);
};

export const handleSignInException = (error: unknown): void => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toastError({ message: errorMessage });
};