"use client";
import { useRouter } from '@/lib/i18n';
import { AuthContextType, AuthState } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN = 'access_token';
const USER_DATA = 'user_data';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const router = useRouter();

    const [authState, setAuthState] = useState<AuthState>(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem(USER_DATA);
            return storedUser ? JSON.parse(storedUser) : { user: null, refresh_token: '' };
        }
        return { user: null, refresh_token: '' };
    });

    const [accessToken, setAccessToken] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(ACCESS_TOKEN);
        }
        return null;
    });

    useEffect(() => {
        if (accessToken !== null) {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
        } else {
            localStorage.removeItem(ACCESS_TOKEN);
            router.push('/sign-in')
        }
    }, [accessToken]);

    useEffect(() => {
        if (authState.user) {
            localStorage.setItem(USER_DATA, JSON.stringify(authState));
        } else {
            localStorage.removeItem(USER_DATA);
        }
    }, [authState]);

    const handleLogin = (data: AuthState, token: string) => {
        setAuthState(data);
        setAccessToken(token);
        localStorage.setItem(USER_DATA, JSON.stringify(data));
        localStorage.setItem(ACCESS_TOKEN, token);
    };

    const handleLogout = () => {
        setAuthState({ user: null, refresh_token: '', access_token: '' });
        setAccessToken(null);
        localStorage.removeItem(USER_DATA);
        localStorage.removeItem(ACCESS_TOKEN);
    };

    const updateAccessToken = (token: string) => {
        setAccessToken(token);
    };

    const value = {
        ...authState,
        isAuthenticated: !!authState.user,
        accessToken,
        handleLogin,
        handleLogout,
        updateAccessToken,
        authState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
