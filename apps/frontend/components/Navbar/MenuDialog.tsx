import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '../ui-custom/DialogCustom';
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
			<DialogContent className="max-h-[800px] overflow-y-auto max-w-[40vw]">
				<div className="grid grid-cols-6 gap-6">
					{menuItems.map((item, index) => {
						const IconComponent = iconMap[item.icon];
						return (
							<div key={index} className="relative">
								<Link href={item.path}>
									<Card className="aspect-square flex flex-col items-center justify-center hover:bg-slate-50 relative">
										<div className="absolute top-[-10px] right-0 flex gap-1">
											<LockKeyhole className="w-4 h-4 text-gray-500 hover:text-gray-700" />
											<ShoppingCart className="w-4 h-4 text-gray-500 hover:text-gray-700" />
										</div>
										<CardContent className="flex flex-col items-center justify-center gap-2 p-4">
											{IconComponent && <IconComponent className="w-10 h-10" />}
										</CardContent>
									</Card>
									<p className="mt-2 font-medium text-xs text-center">
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
