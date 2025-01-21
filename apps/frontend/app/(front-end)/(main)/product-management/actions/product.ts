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
			query.append('filter[is_active:bool]', params.status);
		}

		if (params.page) {
			query.append('page', params.page);
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

		console.log('response >>>', response);

		if (!response.ok) {
			throw new Error('Failed to fetch store locations');
		}
		const result = await response.json();
		console.log('result', result);
		return result.data;
	} catch (error) {
		console.error('Error fetching store locations:', error);
		throw error;
	}
};