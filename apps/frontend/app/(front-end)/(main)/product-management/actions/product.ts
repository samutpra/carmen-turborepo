export const fetchProducts = async (
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

        const url = `/api/product-management/products?${query}`;

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
            throw new Error('Failed to fetch store locations');
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching store locations:', error);
        throw error;
    }
};