// context/AuthContext.tsx
"use client";

import { useRouter } from '@/lib/i18n';
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthState = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	user: any | null;
	refresh_token: string;
	access_token?: string;
};

type AuthContextType = {
	authState: AuthState;
	accessToken: string | null;
	isAuthenticated: boolean;
	handleLogin: (data: AuthState, token: string) => void;
	handleLogout: () => void;
	updateAccessToken: (token: string) => void;
};

// สร้าง default value เพื่อป้องกัน undefined
const defaultAuthContext: AuthContextType = {
	authState: { user: null, refresh_token: '' },
	accessToken: null,
	isAuthenticated: false,
	handleLogin: () => { },
	handleLogout: () => { },
	updateAccessToken: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const [authState, setAuthState] = useState<AuthState>({ user: null, refresh_token: '' });
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedUser = localStorage.getItem('user_data');
			const storedToken = localStorage.getItem('access_token');
			if (storedUser) setAuthState(JSON.parse(storedUser));
			if (storedToken) setAccessToken(storedToken);
		}
	}, []);

	useEffect(() => {
		if (accessToken) {
			localStorage.setItem('access_token', accessToken);
		} else {
			localStorage.removeItem('access_token');
			router.push('/sign-in');
		}
	}, [accessToken, router]);


	useEffect(() => {
		if (authState.user) {
			localStorage.setItem('user_data', JSON.stringify(authState));
		} else {
			localStorage.removeItem('user_data');
		}
	}, [authState]);

	const handleLogin = (data: AuthState, token: string) => {
		setAuthState(data);
		setAccessToken(token);
	};

	const handleLogout = () => {
		setAuthState({ user: null, refresh_token: '' });
		setAccessToken(null);
	};

	const updateAccessToken = (token: string) => {
		setAccessToken(token);
	};

	const value = {
		authState,
		accessToken,
		isAuthenticated: !!authState.user,
		handleLogin,
		handleLogout,
		updateAccessToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// แยก hook ไปอยู่ในฟังก์ชันใหม่
export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}