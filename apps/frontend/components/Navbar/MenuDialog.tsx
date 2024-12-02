import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { LayoutPanelLeft } from 'lucide-react';
import { menuItems } from '@/lib/util/menuItems';
import { Link } from '@/lib/i18n';
import { Card, CardContent } from '../ui/card';

const MenuDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'ghost'}>
					<LayoutPanelLeft />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[600px] overflow-y-auto">
				<div className="grid grid-cols-4 gap-4">
					{menuItems.map((item, index) => (
						<Link key={index} href={item.path}>
							<Card className="aspect-square flex items-center justify-center">
								<CardContent className="flex items-center justify-center text-center">
									<p className="font-medium text-xs">{item.title}</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MenuDialog;
