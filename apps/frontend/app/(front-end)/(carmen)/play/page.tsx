import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const PlayPage = () => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-4 p-6">
			<Skeleton className="h-[80vh] w-full rounded-xl" />
			<Skeleton className="h-[80vh] w-full rounded-xl" />
			<Skeleton className="h-[80vh] w-full rounded-xl" />
		</div>
	)
};

export default PlayPage;
