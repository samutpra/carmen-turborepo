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
        return data;
    } catch (error) {
        console.error('Unexpected error:', error);
        return { error: 'An unexpected error occurred' };
    }
}