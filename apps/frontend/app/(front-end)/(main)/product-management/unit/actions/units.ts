"use client";
import { UnitSchema, UnitType } from "@/lib/types";
import { useEffect, useState } from "react";

export const fetchUnits = async (accessToken: string): Promise<UnitType[]> => {
    try {
        const response = await fetch(`/api/product-management/unit`, {
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

        const result = data.data.data
                  
        return result.map((unit: UnitType) => UnitSchema.parse(unit));
    } catch (error) {
        console.error('Fetch Units Error:', error);
        throw new Error('Failed to fetch units');
    }
};

export const useUnits = (accessToken: string) => {
    const [units, setUnits] = useState<UnitType[]>([]);
    const [unitLoading, setUnitLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const getUnits = async () => {
            setUnitLoading(true);
            setError(null);

            try {
                const result = await fetchUnits(accessToken);
                if (isMounted) {
                    setUnits(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('An error occurred while fetching units'));
                }
            } finally {
                if (isMounted) {
                    setUnitLoading(false);
                }
            }
        };

        getUnits();

        return () => {
            isMounted = false;
        };
    }, [accessToken]);

    return { units, unitLoading, error, setUnits };
};

