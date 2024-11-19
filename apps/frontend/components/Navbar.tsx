"use client";

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/languageSwitcher';
import { TenantList } from '@/components/tenantList';
import { useRouter } from '@/lib/i18n';
import { SwitchTheme } from './SwitchTheme';
import { useAuth } from '@/app/context/AuthContext';
import * as m from '@/paraglide/messages.js';

const Navbar = () => {
    const router = useRouter();
    const { handleLogout, isAuthenticated, authState } = useAuth();

    const handleEditProfile = () => {
        router.push('/edit-profile');
    };

    const onSignIn = () => {
        router.push('/sign-in')
    }

    const firstChar = authState.user?.username?.charAt(0).toUpperCase();

    return (
        <header className='fixed top-0 left-0 right-0 border-b bg-background'>
            <div className='px-4 py-2 sm:px-6'>
                <div className='flex justify-end h-10'>
                    <div className='flex items-center space-x-2 sm:space-x-4'>
                        <TenantList />
                        <Button variant='ghost' size='icon' className='hidden md:inline-flex '>
                            <Bell size={20} />
                        </Button>
                        <LanguageSwitcher />
                        <SwitchTheme />
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                                        <Avatar className='h-8 w-8'>
                                            <AvatarImage src='/placeholder.svg?height=32&width=32' alt='@johndoe' />
                                            <AvatarFallback>{firstChar}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56' align='end' forceMount>
                                    <DropdownMenuLabel className='font-normal'>
                                        <div className='flex flex-col space-y-1'>
                                            <p className='text-sm font-medium leading-none'>{authState.user?.username}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer' onSelect={handleEditProfile}>
                                        <User className='mr-2 h-4 w-4' />
                                        <span>{m.edit_profile()}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <Settings className='mr-2 h-4 w-4' />
                                        <span>{m.settings()}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
                                        <LogOut className='mr-2 h-4 w-4' />
                                        <span>{m.logout()}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" onClick={onSignIn}>
                                <User />
                            </Button>
                        )}

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar