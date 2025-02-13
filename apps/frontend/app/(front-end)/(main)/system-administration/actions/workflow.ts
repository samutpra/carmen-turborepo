import { sampleWorkflows } from '../workflow-management/data/mockData';

export const fetchWorkflows = async (
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

		const workflows = sampleWorkflows.map((workflow) => ({
			id: workflow.id,
			name: workflow.name,
			type: workflow.type,
			is_active: workflow.is_active || true,
			lastModified: new Date().toISOString(),
		}));

		//TODO: mockdata
		return {
			data: workflows,
			pagination: { total: 10, page: 1, perpage: 10, pages: 1 },
		};

		// const url = `/system-api/system/workflow/?${query}`;

		// const options = {
		// 	method: 'GET',
		// 	headers: {
		// 		Authorization: `Bearer ${token}`,
		// 		'x-tenant-id': tenantId,
		// 		'Content-Type': 'application/json',
		// 	},
		// };

		// const response = await fetch(url, options);

		// if (!response.ok) {
		// 	throw new Error('Failed to fetch workflows');
		// }

		// const result = await response.json();
		// return result;
	} catch (error) {
		console.error('Error fetching workflows:', error);
		throw error;
	}
};

export const deleteWorkflow = async (
	id: string,
	token: string,
	tenantId: string
) => {
	const response = await fetch(`/system-api/system/workflow/${id}`, {
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
