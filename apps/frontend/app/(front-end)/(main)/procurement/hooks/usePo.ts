import { useState, useEffect } from 'react';
import { PurchaseOrderType } from '@/lib/types';

export const usePOderData = () => {
	const [poData, setPoData] = useState<PurchaseOrderType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPo = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/procurement/purchase-orders', {
				headers: {
					Accept: 'application/json',
				},
			});

			// Check if response is JSON
			const contentType = response.headers.get('content-type');
			if (!contentType?.includes('application/json')) {
				throw new Error('Invalid response format from server');
			}

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch purchase orders');
			}

			if (!Array.isArray(result.data)) {
				throw new Error('Invalid data format received');
			}

			setPoData(result.data);
			setError(null);
		} catch (error) {
			console.error('Error fetching Purchase Orders:', error);
			setError(
				error instanceof Error
					? error.message
					: 'Error fetching Purchase Orders'
			);
			setPoData([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPo();
	}, []);

	return { poData, setPoData, isLoading, error };
};
