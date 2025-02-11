export const fetchProducts = async (
	token: string,
	tenantId: string,
	params: {
		search?: string;
		status?: string;
		page?: string;
		pages?: string;
		sort?: string;
	} = {}
) => {
	try {
		const query = new URLSearchParams();
		if (params.search) {
			query.append('search', params.search);
		}

		if (params.status) {
			query.append('status', params.status);
		}

		if (params.page) {
			query.append('page', params.page);
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
			throw new Error('Failed to fetch product');
		}
		const result = await response.json();

		return result;
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
};