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

const Navbar = () => {
    const router = useRouter();

    const handleEditProfile = () => {
        console.log('Navigating to edit profile');
        router.push('/edit-profile');
    };

    const onSignIn = () => {
        router.push('/auth')
    }

    return (
        <header className='fixed top-0 left-0 right-0 z-40 shadow-sm border-[var(--border)]'>
            <div className='px-4 py-2 sm:px-6'>
                <div className='flex justify-end h-10'>
                    <div className='flex items-center space-x-2 sm:space-x-4'>
                        <TenantList />
                        <Button variant='ghost' size='icon' className='hidden md:inline-flex '>
                            <Bell size={20} />
                        </Button>
                        <LanguageSwitcher />
                        <SwitchTheme />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src='/placeholder.svg?height=32&width=32' alt='@johndoe' />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56' align='end' forceMount>
                                <DropdownMenuLabel className='font-normal'>
                                    <div className='flex flex-col space-y-1'>
                                        <p className='text-sm font-medium leading-none'>John Doe</p>
                                        <p className='text-xs leading-none text-muted-foreground'>john@example.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={handleEditProfile}>
                                    <User className='mr-2 h-4 w-4' />
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className='mr-2 h-4 w-4' />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" onClick={onSignIn}>
                            <User />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar