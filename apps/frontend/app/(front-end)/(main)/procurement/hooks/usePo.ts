import { useState, useEffect } from 'react';
import { PurchaseOrderType } from '@/lib/types';

export const usePOderData = () => {
	const [poData, setPoData] = useState<PurchaseOrderType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPo = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/procurement/purchase-orders');
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch purchase orders');
			}
			setPoData(result.data);
		} catch (error) {
			console.error('Error fetching Purchase Orders:', error);
			setError(
				error instanceof Error
					? error.message
					: 'Error fetching Purchase Orders'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPo();
	}, []);

	return { poData, setPoData, isLoading, error };
};
