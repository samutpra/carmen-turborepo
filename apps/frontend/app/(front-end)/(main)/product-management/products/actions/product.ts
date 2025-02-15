import { fetchData } from '@/app/(front-end)/services/client';
import { ProductModel } from '@/dtos/product.dto';

export const fetchProduct = async (
	params: { id: string },
	token: string,
	tenantId: string,
	setProduct: (data: ProductModel) => void,
	setProductLoading: (loading: boolean) => void,
	toastError: (config: { message: string }) => void
) => {
	const API_URL = `/api/product-management/products/${params.id}`;
	setProductLoading(true);

	try {
		const data = await fetchData(API_URL, token, tenantId);
		setProduct(data.data);
	} catch (err: unknown) {
		console.log('error: ', err);
		toastError({ message: 'Failed to fetch product data' });
	} finally {
		setProductLoading(false);
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
