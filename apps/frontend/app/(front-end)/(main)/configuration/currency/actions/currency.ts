"use client";

import { CurrencySchema, CurrencyType, PaginationType } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

interface ParamsType {
    page?: number;
    perpage?: number;
    search?: string;
}

class APIError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export const fetchCurrency = async (
    accessToken: string,
    params: ParamsType = {}
): Promise<{ currencies: CurrencyType[]; pagination: PaginationType }> => {

    if (!accessToken) {
        throw new Error('Access token is required');
    }

    const query = new URLSearchParams({
        page: params.page?.toString() || '1',
        perpage: params.perpage?.toString() || '10',
        search: params.search || '',
    });

    try {
        const response = await fetch(`/api/configuration/currency?${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to fetch currencies: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        const currenciesResult = data.data.map((unit: unknown) =>
            CurrencySchema.parse(unit)
        );

        return {
            currencies: currenciesResult,
            pagination: data.pagination,
        };
    } catch (error) {
        console.error('Fetch Currencies Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new Error('Invalid currency data received from server');
        }
        throw new Error('Failed to fetch currencies');
    }
};

export const updateCurrency = async (
    accessToken: string,
    id: string,
    data: CurrencyType
) => {

    if (!accessToken) {
        throw new Error('Access token is required');
    }
    try {
        const response = await fetch(`/api/configuration/currency/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to update currency: ${response.status} ${response.statusText}`
            );
        }
        return data;
    } catch (error) {
        console.error('Update Currency Error Details:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            console.error('Zod validation error:', error.errors);
            throw new Error('Invalid currency data received from server');
        }

        throw new Error(error instanceof Error ? error.message : 'Failed to update currency');
    }
};


export const createCurrency = async (
    accessToken: string,
    data: CurrencyType
) => {

    try {
        const response = await fetch(`/api/configuration/currency`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create currency');
        }

        const idReturn = await response.json();

        return {
            id: idReturn,
            ...data
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create currency: ${error.message}`);
        }
        throw new Error('Failed to create currency: Unknown error occurred');
    }
};

export const useCurrencies = (token: string) => {

    const [search, setSearch] = useState('');
    const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
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
            const { currencies: fetchedCurrencies, pagination: fetchedPagination } =
                await fetchCurrency(token, {
                    page: pagination.page,
                    perpage: pagination.perPage,
                    search,
                });

            setCurrencies(fetchedCurrencies);
            setPagination(fetchedPagination);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
            setShouldFetch(false);
        }
    }, [token, pagination.page, pagination.perPage, search, shouldFetch]);

    const goToPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, page }));
    }, []);

    const nextPage = useCallback(() => {
        setPagination(prev => ({
            ...prev,
            page: Math.min((prev.page ?? 1) + 1, prev.pages ?? 1),
        }));
    }, []);

    const previousPage = useCallback(() => {
        setPagination(prev => ({
            ...prev,
            page: Math.max((prev.page ?? 1) - 1, 1),
        }));
    }, []);

    const setPerPage = useCallback((perPage: number) => {
        setPagination(prev => ({
            ...prev,
            perPage,
            page: 1,
        }));
    }, []);

    const handleSearch = (value: string, shouldSearch: boolean = false) => {
        setSearch(value);
        if (shouldSearch) {
            setPagination(prev => ({ ...prev, page: 1 }));
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
        currencies,
        setCurrencies,
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

export const deleteCurrency = async (
    accessToken: string,
    id: string
): Promise<void> => {
    if (!accessToken) {
        throw new Error('Access token is required');
    }

    try {
        const response = await fetch(`/api/configuration/currency/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new APIError(
                response.status,
                errorData?.message || `Failed to delete currency: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error('Delete Currency Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        throw new Error('Failed to delete currency');
    }
};