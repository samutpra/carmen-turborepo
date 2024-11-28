'use client';

import {
	APIError,
	LocationSchema,
	LocationType,
	PaginationType,
	ParamsType,
	PayloadLocationType,
} from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';

export const fetchLocation = async (
	accessToken: string,
	params: ParamsType = {}
): Promise<{ stores: LocationType[]; pagination: PaginationType }> => {
	if (!accessToken) {
		throw new Error('Access token is required');
	}

	const query = new URLSearchParams({
		page: params.page?.toString() || '1',
		perpage: params.perpage?.toString() || '10',
	});

	try {
		const response = await fetch(`/api/configuration/locations?${query}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
				'x-tenant-id': 'DUMMY',
			},
		});

		if (!response.ok) {
			throw new APIError(
				response.status,
				`Failed to fetch stores: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();

		const storesResult = data.data.map((unit: unknown) =>
			LocationSchema.parse(unit)
		);

		return {
			stores: storesResult,
			pagination: data.pagination,
		};
	} catch (error) {
		console.error('Fetch Stores Error:', error);
		if (error instanceof APIError) {
			throw error;
		}
		if (error instanceof z.ZodError) {
			throw new Error('Invalid store data received from server');
		}
		throw new Error('Failed to fetch stores');
	}
};

export const updateLocation = async (
	accessToken: string,
	id: string,
	data: LocationType
) => {
	if (!accessToken) {
		throw new Error('Access token is required');
	}
	try {
		const response = await fetch(`/api/configuration/locations/${id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'x-tenant-id': 'DUMMY',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new APIError(
				response.status,
				`Failed to update store: ${response.status} ${response.statusText}`
			);
		}
		return data;
	} catch (error) {
		console.error('Update Store Error Details:', {
			error,
			message: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
		});

		if (error instanceof APIError) {
			throw error;
		}
		if (error instanceof z.ZodError) {
			console.error('Zod validation error:', error.errors);
			throw new Error('Invalid store data received from server');
		}

		throw new Error(
			error instanceof Error ? error.message : 'Failed to update store'
		);
	}
};

export const createLocation = async (
	accessToken: string,
	data: PayloadLocationType
) => {
	try {
		const response = await fetch(`/api/configuration/locations`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to create store');
		}

		const idReturn = await response.json();

		return {
			id: idReturn,
			...data,
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to create store: ${error.message}`);
		}
		throw new Error('Failed to create store: Unknown error occurred');
	}
};

export const useLocations = (token: string) => {
	const [search, setSearch] = useState('');
	const [locations, setLocations] = useState<LocationType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
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
			const { stores: fetchedStores, pagination: fetchedPagination } =
				await fetchLocation(token, {
					page: pagination.page,
					perpage: pagination.perPage,
					search,
				});

			setLocations(fetchedStores);
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
		locations,
		setLocations,
		loading,
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

export const deleteLocation = async (
	accessToken: string,
	id: string
): Promise<void> => {
	if (!accessToken) {
		throw new Error('Access token is required');
	}

	try {
		const response = await fetch(`/api/configuration/locations/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
				'x-tenant-id': 'DUMMY',
			},
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw new APIError(
				response.status,
				errorData?.message ||
					`Failed to delete store: ${response.status} ${response.statusText}`
			);
		}
	} catch (error) {
		console.error('Delete Store Error:', error);
		if (error instanceof APIError) {
			throw error;
		}
		throw new Error('Failed to delete store');
	}
};
