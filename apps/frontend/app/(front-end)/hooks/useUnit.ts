import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { UnitCreateModel } from '@/dtos/unit.dto';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { deleteUnit, fetchUnits } from '@/app/(front-end)/services/unit';
import { unit_delete_success } from '@/paraglide/messages.js';
interface UseUnitProps {
	search?: string;
	status?: string;
	page?: string;
	sort?: string;
}

export const useUnit = ({ search, status, page, sort }: UseUnitProps) => {
	const { accessToken, tenant } = useAuth();
	const token = accessToken || '';
	const tenantId = tenant?.[0]?.id || '';

	const [units, setUnits] = useState<UnitCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchData = useCallback(async () => {
		if (!token || !tenantId) return;

		try {
			setIsLoading(true);
			const data = await fetchUnits(token, tenantId, {
				search,
				status,
				page,
				sort,
			});
			setUnits(data.data);
			setCurrentPage(Number(data.pagination.page));
			setTotalPages(Number(data.pagination.pages));
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	}, [token, tenantId, search, status, page, sort]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSuccess = useCallback((updatedUnit: UnitCreateModel) => {
		setUnits((prev) => {
			const unitsMap = new Map(prev.map((u) => [u.id, u]));
			unitsMap.set(updatedUnit.id, updatedUnit);
			return Array.from(unitsMap.values());
		});
	}, []);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteUnit(id, token, tenantId);
				if (res) {
					setUnits((prev) => prev.filter((u) => u.id !== id));
					toastSuccess({ message: unit_delete_success() });
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({
							message: 'Your session has expired. Please login again.',
						});
					} else {
						toastError({ message: `Failed to delete unit: ${error.message}` });
					}
				} else {
					toastError({
						message: 'An unknown error occurred while deleting the unit.',
					});
				}
			}
		},
		[token, tenantId]
	);

	const refreshData = useCallback(() => {
		fetchData();
	}, [fetchData]);

	return {
		units,
		isLoading,
		error,
		totalPages,
		currentPage,
		handleSuccess,
		handleDelete,
		refreshData,
	};
};
