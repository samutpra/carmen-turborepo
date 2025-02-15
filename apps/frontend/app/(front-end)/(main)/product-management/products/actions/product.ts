import { fetchData } from '@/app/(front-end)/services/client';

export const fetchProduct = async (
	productId: string,
	token: string,
	tenantId: string
) => {
	const API_URL = `/api/product-management/products/${productId}`;

	try {
		const response = await fetchData(API_URL, token, tenantId);
		return {
			data: response.data,
			status: 200
		};
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to fetch product data');
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

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching delivery points:', error);
		throw error;
	}
};

export const fetchOrderUnits = async (
	token: string,
	tenantId: string,
	id: string
) => {
	try {
		const url = `/api/product-management/products/order-unit/${id}`;
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
			throw new Error('Failed to fetch order units');
		}
		const data = await response.json();
		return data.orders;
	} catch (error) {
		console.error('Error fetching order units:', error);
		throw error;
	}
};
