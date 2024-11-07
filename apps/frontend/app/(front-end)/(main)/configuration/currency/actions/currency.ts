"use client";

import { CurrencySchema, CurrencyType } from "@/lib/types";
import { useEffect, useState } from "react";

export const fetchCurrency = async (
    accessToken: string,
    params: { page?: number; perpage?: number; search?: string } = {}
): Promise<CurrencyType[]> => {
    try {
        const query = new URLSearchParams({
            page: params.page?.toString() || '1',
            perpage: params.perpage?.toString() || '10',
            search: params.search || '',
        });

        const url = `/api/configuration/currency?${query.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch currencies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const result = data.data;

        return result.map((unit: CurrencyType) => CurrencySchema.parse(unit));
    } catch (error) {
        console.error('Fetch Currencies Error:', error);
        throw new Error('Failed to fetch currencies');
    }
};

export const useCurrencys = (
    accessToken: string,
    params: { page?: number; perpage?: number; search?: string } = {}
) => {
    const [currencys, setCurrencys] = useState<CurrencyType[]>([]);
    const [currencyLoading, setCurrencyLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!accessToken) {
            console.warn("Access token is missing");
            return;
        }

        let isMounted = true;

        const getCurrencies = async () => {
            setCurrencyLoading(true);
            setError(null);

            try {
                const result = await fetchCurrency(accessToken, params);
                if (isMounted) {
                    setCurrencys(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('An error occurred while fetching currencies'));
                }
            } finally {
                if (isMounted) {
                    setCurrencyLoading(false);
                }
            }
        };

        getCurrencies();

        return () => {
            isMounted = false;
        };
    }, [accessToken, params.page, params.perpage, params.search]);

    return { currencys, currencyLoading, error, setCurrencys };
};
