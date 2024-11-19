"use client";
import { APIError, DepartmentSchema, DepartmentType, PaginationType, ParamsType, PayloaDepartmentType } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

export const fetchDepartment = async (
    accessToken: string,
    params: ParamsType = {}
): Promise<{ departments: DepartmentType[]; pagination: PaginationType }> => {
    if (!accessToken) {
        throw new Error('Access token is required');
    }

    const query = new URLSearchParams({
        page: params.page?.toString() || '1',
        perpage: params.perpage?.toString() || '10',
    });

    try {
        const response = await fetch(`/api/configuration/department?${query}`, {
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
                `Failed to fetch departments: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        const departmentsResult = data.data.map((unit: unknown) =>
            DepartmentSchema.parse(unit)
        );

        return {
            departments: departmentsResult,
            pagination: data.pagination,
        };
    } catch (error) {
        console.error('Fetch Departments Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new Error('Invalid department data received from server');
        }
        throw new Error('Failed to fetch departments');
    }
};

export const createDepartment = async (
    accessToken: string,
    payload: PayloaDepartmentType
): Promise<DepartmentType> => {
    try {
        const response = await fetch('/api/configuration/department', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to create department: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        return DepartmentSchema.parse(data.data);
    } catch (error) {
        console.error('Create Department Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new Error('Invalid department data received from server');
        }
        throw new Error('Failed to create department');
    }
};

export const updateDepartment = async (
    accessToken: string,
    id: string,
    payload: PayloaDepartmentType
): Promise<DepartmentType> => {
    try {

        const response = await fetch(`/api/configuration/department/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to update department: ${response.status} ${response.statusText}`
            );
        }
        const data = await response.json();
        return DepartmentSchema.parse(data.data);
    } catch (error) {
        console.error('Update Department Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof z.ZodError) {
            throw new Error('Invalid department data received from server');
        }
        throw new Error('Failed to update department');
    }
};

export const deleteDepartment = async (
    accessToken: string,
    id: string
): Promise<void> => {
    try {
        const response = await fetch(`/api/configuration/department/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'x-tenant-id': 'DUMMY',
            },
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to delete department: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error('Delete Department Error:', error);
        if (error instanceof APIError) {
            throw error;
        }
        throw new Error('Failed to delete department');
    }
};

export const useDepartments = (token: string) => {
    const [search, setSearch] = useState('');
    const [departments, setDepartments] = useState<DepartmentType[]>([]);
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
            const { departments: fetchedDepartments, pagination: fetchedPagination } =
                await fetchDepartment(token, {
                    page: pagination.page,
                    perpage: pagination.perPage,
                    search,
                });

            setDepartments(fetchedDepartments);
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
        departments,
        setDepartments,
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