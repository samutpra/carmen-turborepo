import React from 'react';
import { Button } from '@/components/ui/button';

type SummaryCardProps = {
	title: string;
	count: number;
	icon?: React.ReactNode;
	onAddData: () => void;
};

const SummaryCard = ({ title, count, icon, onAddData }: SummaryCardProps) => {
	return (
		<div className="p-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
			<div>
				<div className="flex w-full gap-2 items-center">
					{icon && <div className="text-gray-500">{icon}</div>}
					<div className="w-full">
						<div className="flex items-center justify-between">
							<h3 className="text-lg">{title}</h3>
							<Button size={'sm'} onClick={onAddData}>
								Add
							</Button>
						</div>
						<p className="text-2xl font-semibold text-gray-700">{count}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryCard;
