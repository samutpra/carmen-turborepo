import { useState, useEffect } from 'react';
import { PrType } from '@/lib/types';

export const usePr = () => {
    const [prList, setPrList] = useState<PrType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPrList = async () => {
        setIsLoading(true);
        try {

            const response = await fetch('/api/procurement/purchase-requests', {
                headers: {
                    Accept: 'application/json',
                },
            });

            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                throw new Error('Invalid response format from server');
            }


            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch purchase requests');
            }
            setPrList(result.data);
        } catch (error) {
            console.error('Error fetching Purchase Requests:', error);
            setError(
                error instanceof Error
                    ? error.message
                    : 'Error fetching Purchase Requests'
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPrList();
    }, []);

    return { prList, setPrList, isLoading, error };

}