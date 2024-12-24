import { DepartmentType } from "@carmensoftware/shared-types/src/department";
import { APIError } from "@carmensoftware/shared-types/src/pagination";

export const fetchDepartments = async (
    token: string,
    tenantId: string,
    params: { search?: string; status?: string } = {}
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

        const url = `/api/configuration/department?${query}`;

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
                `Failed to fetch departments: ${response.status} ${response.statusText}`
            );
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const deleteDepartment = async (id: string, token: string, tenantId: string) => {
    try {
        const response = await fetch(`/api/configuration/department/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-tenant-id': tenantId,
            },
        });
        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to delete department: ${response.status} ${response.statusText}`
            );
        }
        return response;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
};

export const submitDepartment = async (
    data: DepartmentType,
    mode: 'create' | 'update',
    token: string,
    tenantId: string,
    id: string
) => {
    const url =
        mode === 'create'
            ? '/api/configuration/department'
            : `/api/configuration/department/${id}`;

    const method = mode === 'create' ? 'POST' : 'PATCH';

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
    const returnData = mode === 'create' ? result : { id: id };
    return returnData;
}