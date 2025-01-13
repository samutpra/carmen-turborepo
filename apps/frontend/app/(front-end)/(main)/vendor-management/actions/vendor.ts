import { formType } from "@/types/form_type";
import { vendor_type } from "@carmensoftware/shared-types";

export const fetchAllVendors = async (
    token: string,
    tenantId: string,
    params: { search?: string; status?: string } = {}
) => {
    try {
        const query = new URLSearchParams();

        if (params.search) {
            query.append('search', params.search);
        }

        if (params.status) {
            query.append('filter[is_active:bool]', params.status);
        }

        const url = `/api/vendor-management/vendor?${query}`;

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
            throw new Error('Failed to fetch vendors');
        }
        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error('Error fetching vendors:', error);
        throw error;
    }
};


export const fetchVendor = async (id: string, token: string, tenantId: string) => {
    try {
        const URL = `/api/vendor-management/vendor/${id}`;
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 401) {
            return { error: 'Unauthorized access - Invalid or expired token' };
        }
        if (!response.ok) {
            throw new Error(
                `Failed to fetch vendor: ${response.status} ${response.statusText}`
            );
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: 'An unexpected error occurred' };
    }
}

export const handleSubmit = async (
    values: vendor_type,
    token: string,
    tenantId: string,
    mode: formType
): Promise<vendor_type | null> => {
    try {
        const url = values?.id
            ? `/api/vendor-management/vendor/${values.id}`
            : '/api/vendor-management/vendor';

        const method = mode === formType.ADD ? 'POST' : 'PATCH'
            ;
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`Failed to ${mode} vendor`);
        }

        const result = await response.json();
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    } catch (error) {
        console.error('Error submitting vendor:', error);
        return null;
    }
};



export const handleDelete = async (id: string, token: string, tenantId: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/vendor-management/vendor/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete vendor');
        }

        return true;
    } catch (err) {
        console.error('Error deleting vendor:', err);
        return false;
    }
}