import { API_URL } from '@/lib/util/api';
import { fetchData } from './client';

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
