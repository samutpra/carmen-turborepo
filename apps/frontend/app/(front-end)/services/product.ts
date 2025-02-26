import { fetchData } from '@/app/(front-end)/services/client';
import { toastError } from '@/components/ui-custom/Toast';
import { API_URL } from '@/lib/util/api';

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

export const getLocations = async (
	id: string,
	token: string,
	tenantId: string
) => {
	try {
		const response = await fetchData(
			`/api/product-management/products/location/${id}`,
			token,
			tenantId
		);
		return response.data.data;
	} catch (err) {
		console.error('Error fetching location:', err);
		toastError({ message: 'Failed to fetch location data' });
	}
};

export const fetchLocationList = async (token: string, tenantId: string) => {
	try {
		const perpage = 99;
		const url = `/api/configuration/locations?perpage=${perpage}`;
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
			throw new Error('Failed to fetch delivery points');
		}

		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching delivery points:', error);
		throw error;
	}
};

export const getProductGroup = async (
	token: string,
	tenantId: string,
	id: string
) => {
	try {
		const api_url = `/api/product-management/category/select-item-group/${id}`;
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(api_url, options);
		return response.json();
	} catch (error) {
		console.error('Error fetching getProductGroup:', error);
		throw error;
	}
};

export const fetchProductItemGroup = async (
	id: string,
	token: string,
	tenantId: string
) => {
	const url = `${API_URL}/v1/product-item-group/${id}`;
	return fetchData(url, token, tenantId);
};

export const fetchProductSubcategory = async (
	id: string,
	token: string,
	tenantId: string
) => {
	const url = `${API_URL}/v1/product-sub-category/${id}`;
	return fetchData(url, token, tenantId);
};

export const fetchProductCategory = async (
	id: string,
	token: string,
	tenantId: string
) => {
	const url = `${API_URL}/v1/product-category/${id}`;
	return fetchData(url, token, tenantId);
};
