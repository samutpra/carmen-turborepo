import { formType } from "@/types/form_type";
import { CurrencyType } from "@carmensoftware/shared-types";
import { APIError } from "@carmensoftware/shared-types/src/pagination";

export const fetchCurrencies = async (
    token: string,
    tenantId: string,
    params: {
        search?: string;
        status?: string,
        page?: string,
        perpage?: string,
        sort?: string
    } = {}
) => {
    try {
        if (!token) {
            throw new Error('Access token is required');
        }

        const query = new URLSearchParams();

        if (params.search) {
            query.append('search', params.search);
        }

        if (params.status) {
            query.append('filter[is_active:bool]', params.status);
        }

        if (params.page) {
            query.append('page', params.page);
        }

        if (params.perpage) {
            query.append('perpage', params.perpage);
        }

        if (params.sort) {
            query.append('sort', params.sort);
        }

        const url = `/api/configuration/currency?${query}`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to fetch currencies: ${response.status} ${response.statusText}`
            );
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
    }
};


export const deleteCurrency = async (id: string, token: string, tenantId: string) => {
    const response = await fetch(`/api/configuration/currency/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': tenantId,
        },
    });

    if (response.status === 401) {
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        throw new Error('Failed to delete currency');
    }

    return response;
};

export const submitCurrency = async (data: CurrencyType, mode: formType, token: string, tenantId: string, defaultValues?: CurrencyType) => {
    const url =
        mode === formType.ADD
            ? '/api/configuration/currency'
            : `/api/configuration/currency/${defaultValues?.id}`;

    const method = mode === formType.ADD ? 'POST' : 'PATCH';

    const response = await fetch(url, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': tenantId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to ${mode} Currency`);
    }

    const result = await response.json();
    return result;
};


export const fetchSystemCurrencies = async (
    token: string,
    tenantId: string,
    page: number,
    perpage: number,
    search: string,
    sort: string
) => {
    const url = `/api/system/system-currency-iso?page=${page}&perpage=${perpage}&search=${search}&sort=${sort}`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'x-tenant-id': tenantId,
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new APIError(response.status, 'Failed to fetch currencies');
    }
    return await response.json();
};