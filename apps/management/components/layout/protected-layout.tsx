'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { MainNav } from '@/components/navigation/main-nav';

type ProtectedLayoutProps = {
    children: ReactNode;
    requireRoles?: string[]; // Optional specific role requirements
};

// Access Denied Alert Component
const AccessDeniedAlert = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
            {/* Backdrop with blur effect */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"></div>

            {/* Alert card */}
            <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 z-10 relative shadow-2xl border border-red-800/30 animate-scaleIn">
                <div className="flex items-center text-red-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-lg font-semibold">Access Denied</h3>
                </div>
                <p className="text-white mb-6">You don&apos;t have permission to access this page.</p>
                <button
                    onClick={onClose}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export const ProtectedLayout = ({
    children,
    requireRoles,
}: ProtectedLayoutProps) => {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();
    const [showAccessDenied, setShowAccessDenied] = useState(false);

    useEffect(() => {
        // If not loading and not authenticated, redirect to login
        if (!loading && !isAuthenticated) {
            router.replace('/auth');
            return;
        }

        // If roles are required, check if user has one of them
        if (
            !loading &&
            isAuthenticated &&
            requireRoles &&
            requireRoles.length > 0 &&
            user &&
            !requireRoles.includes(user.role_user)
        ) {
            // User doesn't have required role, show access denied alert
            setShowAccessDenied(true);
        }
    }, [isAuthenticated, loading, router, requireRoles, user]);

    const handleAccessDeniedClose = () => {
        setShowAccessDenied(false);
        router.back();
    };

    // Show loading state or nothing while checking authentication
    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Get role-specific colors for the header
    const getRoleColors = () => {
        if (!user) return { bg: 'bg-zinc-800', text: 'text-white' };

        switch (user.role_user) {
            case 'is_cluster':
                return { bg: 'bg-blue-900', text: 'text-blue-100' };
            case 'is_business_unit':
                return { bg: 'bg-green-900', text: 'text-green-100' };
            case 'is_platform':
                return { bg: 'bg-purple-900', text: 'text-purple-100' };
            default:
                return { bg: 'bg-zinc-800', text: 'text-white' };
        }
    };

    const { bg, text } = getRoleColors();

    return (
        <div className="min-h-screen bg-zinc-900">
            {/* Access Denied Alert */}
            {showAccessDenied && <AccessDeniedAlert onClose={handleAccessDeniedClose} />}

            {/* Main content with conditional blur */}
            <div className={`transition-all duration-300 ${showAccessDenied ? 'blur-md filter brightness-50' : ''}`}>
                {/* Header with Navigation */}
                <header className={`${bg} ${text} py-4 px-6 shadow-md`}>
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold mr-8">Carmen Platform</h1>
                            <MainNav />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">{user?.name}</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}; 