'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from '@/lib/i18n';

// Define User type
interface User {
	id: string;
	email?: string;
	name?: string;
	username: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any; // for additional user properties
}

interface AuthState {
	user: User | null;
	refresh_token: string;
	access_token?: string;
}

interface AuthContextType {
	authState: AuthState;
	accessToken: string | null;
	isAuthenticated: boolean;
	handleLogin: (data: AuthState, token: string) => Promise<void>;
	handleLogout: () => Promise<void>;
	updateAccessToken: (token: string) => void;
}

const COOKIE_OPTIONS = {
	maxAge: 30 * 24 * 60 * 60, // 30 days
	secure: process.env.NODE_ENV === 'production',
	sameSite: true,
} as const;

const defaultAuthState: AuthState = {
	user: null,
	refresh_token: '',
};

const defaultAuthContext: AuthContextType = {
	authState: defaultAuthState,
	accessToken: null,
	isAuthenticated: false,
	handleLogin: async () => {},
	handleLogout: async () => {},
	updateAccessToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const clearAuth = () => {
		setAuthState(defaultAuthState);
		setAccessToken(null);
		deleteCookie('access_token');
		localStorage.removeItem('access_token');
	};

	const initializeAuth = async () => {
		try {
			const token = getCookie('access_token') as string | undefined;

			if (token) {
				setAccessToken(token);

				// Optional: Validate token and get user data
				// const userData = await validateToken(token);
				// setAuthState(prev => ({ ...prev, user: userData }));

				// Redirect logic
				if (pathname === '/sign-in' || pathname === '/') {
					await router.push('/dashboard');
				}
			} else if (pathname !== '/sign-in') {
				await router.push('/sign-in');
			}
		} catch (error) {
			console.error('Auth initialization error:', error);
			clearAuth();
		}
	};

	useEffect(() => {
		initializeAuth();
	}, [pathname]);

	useEffect(() => {
		if (pathname === '/sign-in') {
			clearAuth();
			router.push('/sign-in');
		}
	}, [pathname]);

	const handleLogin = async (data: AuthState, token: string): Promise<void> => {
		try {
			setAuthState(data);
			setAccessToken(token);
			setCookie('access_token', token, COOKIE_OPTIONS);

			const from = searchParams.get('from');
			await router.push(from || '/dashboard');
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const handleLogout = async (): Promise<void> => {
		try {
			clearAuth();
			await router.push('/sign-in');
		} catch (error) {
			console.error('Logout error:', error);
			throw error;
		}
	};

	const updateAccessToken = (token: string): void => {
		try {
			setAccessToken(token);
			setCookie('access_token', token, COOKIE_OPTIONS);
		} catch (error) {
			console.error('Token update error:', error);
			clearAuth();
		}
	};

	const value: AuthContextType = {
		authState,
		accessToken,
		isAuthenticated: !!authState.user && !!accessToken,
		// isLoading,
		handleLogin,
		handleLogout,
		updateAccessToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
