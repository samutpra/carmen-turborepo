import React from 'react'
import { Link } from '@/lib/i18n';
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from '../ui/avatar';

interface Props {
	isExpanded: boolean;
	isPinned: boolean;
	togglePin: () => void;
}

const SidebarLogo: React.FC<Props> = ({
	isExpanded,
	isPinned,
	togglePin
}) => {
	return (
		<div
			className="px-3 pt-4 w-full flex items-center justify-between overflow-hidden whitespace-nowrap"
			data-id="sidebar-logo-container"
		>
			<Link href="/" className="all-center" data-id="sidebar-logo-link">
				{isExpanded ? (
					<div className="ml-2 " data-id="sidebar-logo-text-container">
						<span
							className="text-2xl font-bold block tracking-wide"
							data-id="sidebar-logo-text"
						>
							CARMEN
						</span>
						<span
							className="text-sm block text-gray-500 dark:text-gray-200 tracking-wide "
							data-id="sidebar-logo-text-sub"
						>
							Hospitality Supply Chain
						</span>
					</div>
				) : (
					<Avatar data-id="sidebar-logo-avatar">
						<AvatarImage
							src="/images/carmen_pic.png"
							alt="@shadcn"
							className="h-10 w-10"
							data-id="sidebar-logo-avatar-image"
						/>
					</Avatar>
				)}
			</Link>
			{isExpanded && (
				<Button
					variant="ghost"
					size="icon"
					onClick={togglePin}
					data-id="sidebar-logo-pin-button"
				>
					<Pin
						className={cn('h-5 w-5', isPinned && 'text-blue-500')}
						data-id="sidebar-logo-pin-icon"
					/>
				</Button>
			)}
		</div>
	);
}

export default SidebarLogo