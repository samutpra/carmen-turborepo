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