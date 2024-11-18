"use client";
import { useRouter } from '@/lib/i18n';
import { AuthContextType, AuthenticatedRequestOptions, AuthState } from '@/lib/types';
import { fetchWithToken, isTokenExpired, isTokenExpiringSoon, refreshAccessToken } from '@/lib/util/auth';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data'
} as const;


type AuthError = {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
};

const TOKEN_EXPIRY_THRESHOLD = 5 * 60 * 1000; // 5 นาทีก่อนหมดอายุ

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // Initialize state
    const [authState, setAuthState] = useState<AuthState>(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
                return storedUser ? JSON.parse(storedUser) : { user: null, refresh_token: '' };
            } catch (error) {
                console.error('Error loading auth state:', error);
                return { user: null, refresh_token: '' };
            }
        }
        return { user: null, refresh_token: '', access_token: null };
    });

    const [accessToken, setAccessToken] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        }
        return null;
    });

    const updateAccessToken = useCallback((token: string) => {
        setAccessToken(token);
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }, []);

    // Auto refresh token
    const handleTokenRefresh = useCallback(async () => {
        if (!authState.refresh_token) return;

        try {
            setIsLoading(true);
            const tokens = await refreshAccessToken(authState.refresh_token);
            updateAccessToken(tokens.access_token);
            setAuthState(prev => ({
                ...prev,
                refresh_token: tokens.refresh_token
            }));
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
        } catch (error) {
            console.error('Token refresh error:', error);
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    }, [authState.refresh_token, updateAccessToken]);

    const handleError = (error: unknown): AuthError => {
        if (error instanceof Response) {
            return {
                code: 'API_ERROR',
                message: `API Error: ${error.status}`,
                details: error
            };
        }

        if (error instanceof Error) {
            return {
                code: 'AUTH_ERROR',
                message: error.message,
                details: error
            };
        }

        return {
            code: 'UNKNOWN_ERROR',
            message: 'An unexpected error occurred',
            details: error
        };
    };

    // Token check effect
    useEffect(() => {
        let refreshTimer: NodeJS.Timeout;

        const checkToken = async () => {
            if (accessToken) {
                if (isTokenExpired(accessToken)) {
                    await handleTokenRefresh();
                } else if (isTokenExpiringSoon(accessToken, TOKEN_EXPIRY_THRESHOLD)) {
                    handleTokenRefresh();
                }
            }
        };

        checkToken();
        // eslint-disable-next-line prefer-const
        refreshTimer = setInterval(checkToken, TOKEN_EXPIRY_THRESHOLD / 2);

        return () => {
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
        };
    }, [accessToken, handleTokenRefresh]);

    // Auth handlers
    const handleLogin = async (data: AuthState, token: string) => {
        try {
            setIsLoading(true);

            if (!token || isTokenExpired(token)) {
                throw new Error('Invalid or expired token');
            }

            setAuthState(data);
            updateAccessToken(token);

            localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
        } catch (error) {
            const authError = handleError(error);
            throw authError;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = useCallback(() => {
        try {
            setAuthState({ user: null, refresh_token: '' });
            setAccessToken(null);
            Object.values(STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });

            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [router]);

    // API request with token
    const authenticatedRequest = useCallback(async <T,>(
        url: string,
        options: AuthenticatedRequestOptions = {}
    ): Promise<T> => {
        if (!accessToken) {
            throw new Error('No access token available');
        }

        try {
            const response = await fetchWithToken(url, options, accessToken, updateAccessToken);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data as T;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }, [accessToken, updateAccessToken]);

    const value: AuthContextType = {
        ...authState,
        isAuthenticated: !!authState.user,
        accessToken,
        isLoading,
        handleLogin,
        handleLogout,
        authenticatedRequest,
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