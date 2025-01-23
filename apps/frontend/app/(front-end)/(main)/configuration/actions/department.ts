import { DepartmentCreateModel } from '@/dtos/department.dto';
import { formType } from '@/types/form_type';

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
			console.log('response', response);
			throw new Error('Failed to fetch departments');
		}
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching departments:', error);
		throw error;
	}
};

export const deleteDepartment = async (
	id: string,
	token: string,
	tenantId: string
) => {
	try {
		const response = await fetch(`/api/configuration/department/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
			},
		});
		if (!response.ok) {
			throw new Error('Failed to delete department');
		}
		return response;
	} catch (error) {
		console.error('Error deleting department:', error);
		throw error;
	}
};

export const submitDepartment = async (
	data: DepartmentCreateModel,
	mode: formType,
	token: string,
	tenantId: string,
	id: string
) => {
	const url =
		mode === formType.ADD
			? '/api/configuration/department'
			: `/api/configuration/department/${id}`;

	const method = mode === formType.ADD ? 'POST' : 'PATCH';

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
	const returnData = mode === formType.ADD ? result : { id: id };
	return returnData;
};
