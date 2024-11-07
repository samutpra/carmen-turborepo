"use client";

import { CurrencySchema, CurrencyType, PaginationType } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

interface FetchParams {
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
    params: FetchParams = {}
): Promise<{ currencies: CurrencyType[]; pagination: PaginationType }> => {

    if (!accessToken) {
        throw new Error('Access token is required');
    }

    const query = new URLSearchParams({
        page: params.page?.toString() || '1',
        perpage: params.perpage?.toString() || '1',
        search: params.search || '',
    });

    try {
        const response = await fetch(`/api/configuration/currency?${query}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
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
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new Error('Invalid currency data received from server');
        }
        console.error('Fetch Currencies Error:', error);
        throw new Error('Failed to fetch currencies');
    }
};

export const useCurrencies = (
    accessToken: string,
    params: FetchParams = {}
) => {

    const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [search, setSearch] = useState<string>(params.search || '');
    const [pagination, setPagination] = useState<PaginationType>({
        total: 0,
        page: params.page || 1,
        perPage: params.perpage || 1,
        pages: 1,

    });

    const fetchData = useCallback(async () => {

        if (!accessToken) {
            setError(new Error('Access token is required'));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { currencies: fetchedCurrencies, pagination: fetchedPagination } =

                await fetchCurrency(accessToken, {
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
        }
    }, [accessToken, pagination.page, pagination.perPage, search]);

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

    const handleSearch = useCallback((searchTerm: string) => {
        setSearch(searchTerm);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchWithMount = async () => {
            if (isMounted) {
                await fetchData();
            }
        };

        fetchWithMount();

        return () => {
            isMounted = false;
        };
    }, [fetchData]);

    return {
        // Data
        currencies,
        loading,
        error,
        pagination,
        search,

        // Setters
        setCurrencies,
        setPagination,

        // Pagination handlers
        goToPage,
        nextPage,
        previousPage,
        setPerPage,

        // Search handler
        handleSearch,

        // Refresh data
        refetch: fetchData,
    };
};