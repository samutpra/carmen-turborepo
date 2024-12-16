"use client";

import React, { useEffect, useState } from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import { useAuth } from '@/app/context/AuthContext';
import UserProfile from './UserProfile';
import Notifications from './Notifications';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '../ui-custom/drawer';
import MenuContent from './MenuContent';

const Navbar = () => {
	const { isAuthenticated } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<header className="fixed top-0 left-0 right-0 border-b bg-background">
			<div className="px-4 py-2 sm:px-6">
				<div className="flex justify-end h-10">
					<div className="flex items-center gap-2">
						<div className="md:hidden">
							<Button
								variant="ghost"
								size="icon"
								aria-expanded={isMenuOpen}
								aria-controls="mobile-menu"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<Menu size={20} />
							</Button>
						</div>

						<div className="hidden md:flex items-center gap-2">
							<MenuContent />
						</div>
						<Notifications />
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
			{isMenuOpen && (
				<Drawer
					open={isMenuOpen}
					onOpenChange={setIsMenuOpen}
					direction="right"
				>
					<DrawerContent
						className="h-full w-full"
						aria-labelledby="drawer-title"
						aria-describedby="drawer-description"
					>
						<DrawerHeader>
							<DrawerTitle id="drawer-title">Menu</DrawerTitle>
							<DrawerDescription id="drawer-description">
								Navigation and Settings
							</DrawerDescription>
						</DrawerHeader>

						<div className="flex flex-col md:flex-row gap-4 p-4">
							<MenuContent />
						</div>

						<DrawerFooter>
							<Button onClick={() => setIsMenuOpen(false)}>Close</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			)}
		</header>
	);
};

export default Navbar