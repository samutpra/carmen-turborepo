'use client';

import { PrList, PaginationType } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

interface ParamsType {
	page?: number;
	perpage?: number;
	search?: string;
}

class APIError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'APIError';
	}
}

export const fetchPr = async (
	accessToken: string,
	params: ParamsType = {}
): Promise<{ prList: PrList[]; pagination: PaginationType }> => {
	if (!accessToken) {
		throw new Error('Access token is required');
	}

	const query = new URLSearchParams({
		page: params.page?.toString() || '1',
		perpage: params.perpage?.toString() || '10',
		search: params.search || '',
	});

	try {
		const response = await fetch(
			`/api/procurement/purchase-requests?${query}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
					'x-tenant-id': 'DUMMY',
				},
			}
		);

		if (!response.ok) {
			throw new APIError(
				response.status,
				`Failed to fetch purchase-requests: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const prsResult = data.map((item: PrList) => item);

		return {
			prList: prsResult,
			pagination: params,
		};
	} catch (error) {
		console.error('Fetch purchase-requests Error:', error);
		if (error instanceof APIError) {
			throw error;
		}
		if (error instanceof z.ZodError) {
			throw new Error('Invalid currency data received from server');
		}
		throw new Error('Failed to fetch purchase-requests');
	}
};

export const usePurchaseRequests = (token: string) => {
	const [search, setSearch] = useState('');
	const [prList, setPrList] = useState<PrList[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [pagination, setPagination] = useState<PaginationType>({
		total: 0,
		page: 1,
		perPage: 10,
		pages: 1,
	});
	const [shouldFetch, setShouldFetch] = useState(true);

	if (!token) {
		console.log('not have token');
	}

	const fetchData = useCallback(async () => {
		if (!token || !shouldFetch) {
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const { prList: fetchedPrList, pagination: fetchedPagination } =
				await fetchPr(token, {
					page: pagination.page,
					perpage: pagination.perPage,
					search,
				});

			setPrList(fetchedPrList);
			setPagination(fetchedPagination);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error('An unknown error occurred')
			);
		} finally {
			setLoading(false);
			setShouldFetch(false);
		}
	}, [token, pagination.page, pagination.perPage, search, shouldFetch]);

	const goToPage = useCallback((page: number) => {
		setPagination((prev) => ({ ...prev, page }));
	}, []);

	const nextPage = useCallback(() => {
		setPagination((prev) => ({
			...prev,
			page: Math.min((prev.page ?? 1) + 1, prev.pages ?? 1),
		}));
	}, []);

	const previousPage = useCallback(() => {
		setPagination((prev) => ({
			...prev,
			page: Math.max((prev.page ?? 1) - 1, 1),
		}));
	}, []);

	const setPerPage = useCallback((perPage: number) => {
		setPagination((prev) => ({
			...prev,
			perPage,
			page: 1,
		}));
	}, []);

	const handleSearch = (value: string, shouldSearch: boolean = false) => {
		setSearch(value);
		if (shouldSearch) {
			setPagination((prev) => ({ ...prev, page: 1 }));
			setShouldFetch(true);
		}
	};

	useEffect(() => {
		let isMounted = true;

		const fetchWithMount = async () => {
			if (isMounted && shouldFetch) {
				await fetchData();
			}
		};

		fetchWithMount();

		return () => {
			isMounted = false;
		};
	}, [fetchData]);

	return {
		prList,
		setPrList,
		isLoading,
		error,
		pagination,
		search,
		handleSearch,
		goToPage,
		nextPage,
		previousPage,
		setPerPage,
		fetchData,
	};
};
