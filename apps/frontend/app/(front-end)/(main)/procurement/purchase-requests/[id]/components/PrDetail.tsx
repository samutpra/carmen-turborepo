'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { PrType } from '@/lib/types';
import React, { useEffect, useState } from 'react'

interface Props {
    id: string
}

const PrDetail = ({ id }: Props) => {
    const [prDetail, setPrDetail] = useState<PrType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrDetail = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`/api/procurement/purchase-requests/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch PR detail: ${response.statusText}`);
                }

                const data = await response.json();
                setPrDetail(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching PR detail');
                console.error('Error fetching PR detail:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPrDetail();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (!prDetail) {
        return (
            <Alert>
                <AlertDescription>No purchase request found</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className='p-6'>
            {/* You can add your PR detail display UI here */}
            <pre className="whitespace-pre-wrap">
                {JSON.stringify(prDetail, null, 2)}
            </pre>
        </div>
    )
}

export default PrDetail;