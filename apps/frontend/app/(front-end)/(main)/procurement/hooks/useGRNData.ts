import { useState, useEffect } from 'react';
import { GoodsReceiveNote } from '@/lib/types';

export const useGRNData = () => {
	const [grnData, setGrnData] = useState<GoodsReceiveNote[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchGrn = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/procurement/goods-received-note');
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch goods received notes');
			}
			setGrnData(result.data);
		} catch (error) {
			console.error('Error fetching Goods Receive Notes:', error);
			setError(
				error instanceof Error
					? error.message
					: 'Error fetching Goods Receive Notes'
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGrn();
	}, []);

	return { grnData, setGrnData, isLoading, error };
};

