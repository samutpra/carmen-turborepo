'use client';

import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
} from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
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
	isLoading: boolean;
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
	isLoading: true,
	handleLogin: async () => { },
	handleLogout: async () => { },
	updateAccessToken: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const pathname = usePathname();

	const [isLoading, setIsLoading] = useState(true);
	// Initialize authState from localStorage
	const [authState, setAuthState] = useState<AuthState>(() => {
		if (typeof window !== 'undefined') {
			const savedAuthState = localStorage.getItem('auth_state');
			return savedAuthState ? JSON.parse(savedAuthState) : defaultAuthState;
		}
		return defaultAuthState;
	});

	const [accessToken, setAccessToken] = useState<string | null>(() => {
		if (typeof window !== 'undefined') {
			return (getCookie('access_token') as string) || null;
		}
		return null;
	});

	// Update localStorage whenever authState changes
	useEffect(() => {
		if (authState !== defaultAuthState) {
			localStorage.setItem('auth_state', JSON.stringify(authState));
		}
	}, [authState]);

	const clearAuth = () => {
		setAuthState(defaultAuthState);
		setAccessToken(null);
		deleteCookie('access_token');
		localStorage.removeItem('access_token');
		localStorage.removeItem('auth_state');
	};

	const initializeAuth = async () => {
		try {
			const token = getCookie('access_token') as string | undefined;
			const savedAuthState = localStorage.getItem('auth_state');

			if (token) {
				setAccessToken(token);
				localStorage.setItem('access_token', token);

				// Restore saved auth state if available
				if (savedAuthState) {
					const parsedAuthState = JSON.parse(savedAuthState);
					setAuthState(parsedAuthState);
				}

				if (pathname === '/sign-in' || pathname === '/') {
					await router.push('/dashboard');
				}
			} else {
				clearAuth();
			}
		} catch (error) {
			console.error('Auth initialization error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Initialize on mount
	useEffect(() => {
		initializeAuth();
	}, []);

	// Handle sign-in page
	useEffect(() => {
		if (!isLoading && pathname === '/sign-in') {
			clearAuth();
		}
	}, [pathname, isLoading]);

	// Memoize the authentication status
	const isAuthenticated = useMemo(() => {
		return !!accessToken;
	}, [accessToken]);

	// Memoize handlers to prevent unnecessary re-creations
	const handlers = useMemo(
		() => ({
			handleLogin: async (data: AuthState, token: string): Promise<void> => {
				try {
					setAuthState(data);
					setAccessToken(token);
					setCookie('access_token', token, COOKIE_OPTIONS);
					setCookie('user_id', data?.user?.id)
					localStorage.setItem('access_token', token);
					localStorage.setItem('auth_state', JSON.stringify(data));
					router.push('/dashboard');
				} catch (error) {
					console.error('Login error:', error);
					throw error;
				}
			},
			handleLogout: async (): Promise<void> => {
				try {
					await router.push('/sign-in');
				} catch (error) {
					console.error('Logout error:', error);
					throw error;
				}
			},
			updateAccessToken: (token: string): void => {
				try {
					setAccessToken(token);
					setCookie('access_token', token, COOKIE_OPTIONS);
					localStorage.setItem('access_token', token);
					setAuthState((prev) => ({
						...prev,
						access_token: token,
					}));
				} catch (error) {
					console.error('Token update error:', error);
					clearAuth();
				}
			},
		}),
		[router]
	);

	// Memoize the context value
	const value = useMemo<AuthContextType>(
		() => ({
			authState,
			accessToken,
			isAuthenticated,
			isLoading,
			...handlers,
		}),
		[authState, accessToken, isAuthenticated, isLoading, handlers]
	);

	// Don't render children until initial auth check is complete
	if (isLoading) {
		return null;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
