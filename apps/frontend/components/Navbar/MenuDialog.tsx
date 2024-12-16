import React from 'react';

import { Button } from '../ui/button';
import {
	LayoutPanelLeft,
	LayoutDashboard,
	ShoppingCart,
	Package,
	Users,
	MonitorCog,
	Store,
	CalendarClock,
	Factory,
	BarChart2,
	DollarSign,
	Settings,
	HelpCircle,
	LockKeyhole,
} from 'lucide-react';
import { menuItems } from '@/lib/util/menuItems';
import { Link } from '@/lib/i18n';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogTrigger } from '../ui-custom/dialog';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } =
	{
		LayoutDashboard,
		ShoppingCart,
		Package,
		Users,
		MonitorCog,
		Store,
		CalendarClock,
		Factory,
		BarChart2,
		DollarSign,
		Settings,
		HelpCircle,
	};

const MenuDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'ghost'}>
					<LayoutPanelLeft />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[800px] overflow-y-auto w-full md:w-2/3 p-4">
				<div className="grid grid-cols-3 md:grid-cols-6 gap-6 w-full">
					{menuItems.map((item, index) => {
						const IconComponent = iconMap[item.icon];
						return (
							<div key={index} className="relative">
								<Link href={item.path}>
									<Card className="aspect-square flex flex-col items-center justify-center hover:bg-slate-50 relative">
										<div className="absolute top-0 right-1 flex gap-1">
											<LockKeyhole className="w-2 md:w-4 h-2 md:h-4 text-gray-500 hover:text-gray-700" />
											<ShoppingCart className="w-2 md:w-4 h-2 md:h-4 text-gray-500 hover:text-gray-700" />
										</div>
										<CardContent className="flex flex-col items-center justify-center gap-2 p-4">
											{IconComponent && (
												<IconComponent className="w-8 md:w-10 h-8 md:h-10" />
											)}
										</CardContent>
									</Card>
									<p className="mt-2 font-medium text-xs text-center text-ellipsis overflow-clip">
										{item.title}
									</p>
								</Link>
							</div>
						);
					})}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MenuDialog;
