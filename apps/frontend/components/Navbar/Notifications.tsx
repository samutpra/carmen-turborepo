import React from 'react';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui-custom/drawer';
import { useRouter } from '@/lib/i18n';

const Notifications = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const router = useRouter();

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	const onLinkClick = () => {
		setIsOpen(false);
		router.push('/notifications');
	};

	return (
		<Drawer open={isOpen} onOpenChange={handleOpenChange} direction="right">
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hidden md:inline-flex"
					aria-label="Open notifications"
				>
					<Bell size={20} />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="fixed right-0 h-full w-[400px]">
				<DrawerHeader>
					<DrawerTitle>Notifications</DrawerTitle>
					<DrawerDescription>
						Stay updated with your latest notifications
					</DrawerDescription>
				</DrawerHeader>

				<div className="p-4">
					<p className="text-sm text-muted-foreground">No new notifications</p>
				</div>

				<DrawerFooter className="fixed bottom-0 right-0">
					<Button onClick={onLinkClick}>View all notifications</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Notifications;
