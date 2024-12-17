import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
	title: string;
	count: number;
	icon: React.ReactNode;
	onAddData: () => void;
	disabled?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
	title,
	count,
	icon,
	onAddData,
	disabled,
}) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Button
					onClick={onAddData}
					variant="ghost"
					size="icon"
					className={cn('h-8 w-8', disabled && 'cursor-not-allowed opacity-50')}
					disabled={disabled}
					aria-label={`Add new ${title}`}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						{icon}
						<span className="text-2xl font-bold">{count}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default SummaryCard;
