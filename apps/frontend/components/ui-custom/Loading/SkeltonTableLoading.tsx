import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonTableLoading = () => {
    return (
        <div className="border border-gray-200 rounded-md">
            {Array.from({ length: 10 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex justify-between px-2 py-4 border-b border-gray-200">
                    <Skeleton className="h-4 w-full" />
                </div>
            ))}
        </div>
    );
};

export default SkeletonTableLoading;
