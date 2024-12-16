"use client";

import React from 'react'
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { SwitchTheme } from './SwitchTheme';
import { useAuth } from '@/app/context/AuthContext';
import { TenantList } from './TenantList';
import LanguageSwitcher from './LanguageSwitcher';
import UserProfile from './UserProfile';
import MenuDialog from './MenuDialog';
import Notifications from './Notifications';

const Navbar = () => {
	const { isAuthenticated } = useAuth();

	return (
		<header className="fixed top-0 left-0 right-0 border-b bg-background">
			<div className="px-4 py-2 sm:px-6">
				<div className="flex justify-end h-10">
					<div className="flex items-center space-x-2 sm:space-x-4">
						<MenuDialog />
						<TenantList />
						<Notifications />
						<LanguageSwitcher />
						<SwitchTheme />
						{isAuthenticated ? (
							<UserProfile />
						) : (
							<Button variant="ghost" asChild>
								<Link href="/sign-in">
									<User />
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar