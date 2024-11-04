"use client";
import { UnitSchema, UnitType } from "@/lib/types";
import { useEffect, useState } from "react";

const API_URL = 'http://localhost:4000/api/v1';
const TENANT_ID = 'DUMMY';

export const fetchUnits = async (accessToken: string): Promise<UnitType[]> => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'x-tenant-id': TENANT_ID,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${API_URL}/units`, options);

    if (!response.ok) {
        throw new Error(`Failed to fetch units: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((unit: UnitType) => UnitSchema.parse(unit));
};

export const useUnits = (accessToken: string) => {
    const [units, setUnits] = useState<UnitType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const getUnits = async () => {
            setIsLoading(true);
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
                    setIsLoading(false);
                }
            }
        };

        getUnits();

        return () => {
            isMounted = false;
        };
    }, [accessToken]);

    return { units, isLoading, error };
};

