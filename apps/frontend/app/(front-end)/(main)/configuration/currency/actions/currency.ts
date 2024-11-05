"use client";
import { CurrencySchema, CurrencyType } from "@/lib/types";
import { useEffect, useState } from "react";

export const fetchCurrency = async (accessToken: string) : Promise<CurrencyType[]>=> {
    try {
        const response = await fetch(`/api/configuration/currency`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch units: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const result = data.data        
        return result.map((unit: CurrencyType) => CurrencySchema.parse(unit));
    } catch (error) {
        console.error('Fetch Units Error:', error);
        throw new Error('Failed to fetch units');
    }
};


export const useCurrencys = (accessToken: string) => {
    const [currencys, setCurrencys] = useState<CurrencyType[]>([]);
    const [currencyLoading, setCurrencyLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const getUnits = async () => {
            setCurrencyLoading(true);
            setError(null);

            try {
                const result = await fetchCurrency(accessToken);
                if (isMounted) {
                    setCurrencys(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('An error occurred while fetching units'));
                }
            } finally {
                if (isMounted) {
                    setCurrencyLoading(false);
                }
            }
        };

        getUnits();

        return () => {
            isMounted = false;
        };
    }, [accessToken]);

    return { currencys, currencyLoading, error, setCurrencys };
};