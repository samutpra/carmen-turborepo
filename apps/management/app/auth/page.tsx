'use client';

import { useState } from 'react';
import Link from 'next/link';

const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('login');

        // Implement login logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-between p-8 max-w-screen-lg mx-auto">
            {/* Left Section */}
            <div className="text-white space-y-4">
                <h1 className="text-5xl font-bold">Carmen Platform</h1>
            </div>

            {/* Right Section - Login Form */}
            <div className="bg-[#18181b]/70 backdrop-blur-sm rounded-3xl p-8 w-[480px] text-white">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold">Login</h2>
                        <p className="text-gray-400">Welcome to Carmen Platform</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-[#27272a] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-[#27272a] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
                        >
                            Login
                        </button>

                        <div className="text-center">
                            <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white">
                                Forgot password ?
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#18181b] text-gray-400">Or</span>
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-400">
                            Don&apos;t have an account ?{" "}
                            <Link href="/signup" className="text-white hover:underline">
                                Signup
                            </Link>
                        </div>
                    </form>

                    <div className="flex justify-center space-x-6 text-sm text-gray-400">
                        <Link href="/terms" className="hover:text-white">
                            Terms & Conditions
                        </Link>
                        <Link href="/support" className="hover:text-white">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;