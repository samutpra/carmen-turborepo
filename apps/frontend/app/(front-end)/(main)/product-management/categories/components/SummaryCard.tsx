import React from 'react';
import { Button } from '@/components/ui/button';

interface SummaryCardProps {
	title: string;
	count: number;
	icon: React.ReactNode;
	onAddData: () => void;
	disabled?: boolean;
}

const SummaryCard = ({
	title,
	count,
	icon,
	onAddData,
	disabled = false,
}: SummaryCardProps) => {
	return (
		<div className="bg-white rounded-lg shadow p-4">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center space-x-2">
					{icon}
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>
				<Button 
					size={'sm'} 
					onClick={onAddData}
					disabled={disabled}
				>
					Add
				</Button>
			</div>
			<p className="text-3xl font-bold">{count}</p>
		</div>
	);
};

export default SummaryCard;
