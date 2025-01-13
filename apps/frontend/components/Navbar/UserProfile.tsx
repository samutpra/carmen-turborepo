import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/context/AuthContext';
import * as m from '@/paraglide/messages.js';
import Link from 'next/link';

const UserProfile = () => {
    const { handleLogout, authState } = useAuth();
    const firstChar = authState.user?.username?.charAt(0).toUpperCase();
    return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src="/placeholder.svg?height=32&width=32"
								alt="@johndoe"
							/>
							<AvatarFallback>{firstChar}</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{authState.user?.username}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						<Link href={'/profile'} className="flex">
							<User className="mr-2 h-4 w-4" />
							<span>{m.edit_profile()}</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Link href={'/settings'} className="flex">
							<Settings className="mr-2 h-4 w-4" />
							<span>{m.settings()}</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
						<LogOut className="mr-2 h-4 w-4" />
						<span>{m.logout()}</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
}

export default UserProfile