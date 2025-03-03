import { WfFormType } from '@/dtos/workflow.dto';

export const fetchWorkflow = async (
	token: string,
	tenantId: string,
	wfId: string
) => {
	try {
		const url = `/api/system-administration/workflow/${wfId}`;
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
			throw new Error('Failed to fetch workflow');
		}
		const data = await response.json();
		return data.data;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Failed to fetch workflow data'
		);
	}
};

export const fetchWorkflowList = async (
	token: string,
	tenantId: string,
	params: {
		search?: string;
		status?: string;
		page?: string;
		perpage?: string;
		sort?: string;
	} = {}
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

		if (params.page) {
			query.append('page', params.page);
		}

		if (params.perpage) {
			query.append('perpage', params.perpage);
		}

		if (params.sort) {
			query.append('sort', params.sort);
		}

		const url = `/api/system-administration/workflow/?${query}`;

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
			throw new Error('Failed to fetch workflows');
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching workflows:', error);
		throw error;
	}
};

export const createWorkflow = async (
	values: WfFormType,
	token: string,
	tenantId: string
): Promise<WfFormType | null> => {
	try {
		const response = await fetch(`/api/system-administration/workflow/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-tenant-id': tenantId,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			throw new Error(`Failed to create workflow`);
		}

		const result = await response.json();
		if (result.error) {
			throw new Error(result.error);
		}
		return result;
	} catch (error) {
		console.error('Error submitting vendor:', error);
		return null;
	}
};

export const deleteWorkflow = async (
	token: string,
	tenantId: string,
	id: string
) => {
	const response = await fetch(`/api/system-administration/workflow/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'x-tenant-id': tenantId,
		},
	});

	if (response.status === 401) {
		throw new Error('Unauthorized');
	}

	if (!response.ok) {
		throw new Error('Failed to delete workflow');
	}

	return response;
};
