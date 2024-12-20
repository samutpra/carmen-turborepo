import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeltonLoad = () => {
	return (
		<div className="border border-gray-200 rounded-md">
			<div className="px-4 py-3 border-b border-gray-200">
				<Skeleton className="h-4 w-full" />
			</div>

			<div className="block md:hidden px-4 py-3">
				<div className="grid grid-cols-1 gap-4">
					{Array.from({ length: 6 }).map((_, rowIndex) => (
						<Skeleton key={rowIndex} className="h-[125px] w-full rounded-xl" />
					))}
				</div>
			</div>

			<div className="hidden md:block divide-y divide-gray-200">
				{Array.from({ length: 8 }).map((_, rowIndex) => (
					<div key={rowIndex} className="px-4 py-3 grid grid-cols-4 gap-4">
						{Array.from({ length: 4 }).map((_, colIndex) => (
							<Skeleton key={colIndex} className="h-4 w-full" />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default SkeltonLoad;
