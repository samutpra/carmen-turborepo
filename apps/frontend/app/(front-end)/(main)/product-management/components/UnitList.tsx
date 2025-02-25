'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import UnitDialog from './UnitDialog';
import { deleteUnit, fetchUnits } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import { useURL } from '@/hooks/useURL';
import * as m from '@/paraglide/messages.js';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { SortQuery } from '@/lib/util/uiConfig';
import { UnitCreateModel } from '@/dtos/unit.dto';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { unitFields } from '@/constants/fields';
import UnitFilter from './UnitFilter';
import { unit } from '@/paraglide/messages.js';
import UnitAction from './UnitAction';
import { CommentAttachments } from './CommentAttachments ';

const UnitList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [units, setUnits] = useState<UnitCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');
	const { tenant } = useAuth();
	const tenantId = tenant?.[0]?.id || '';

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchUnits(token, tenantId, {
				search,
				status,
				page,
				sort,
			});
			setUnits(data.data);
			setPage(data.pagination.page);
			setPages(data.pagination.pages);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [token, tenantId, search, status, page, sort]);

	const handleSuccess = useCallback(
		(updatedUnit: UnitCreateModel) => {
			setUnits((prev) => {
				const unitsMap = new Map(prev.map((u) => [u.id, u]));
				unitsMap.set(updatedUnit.id, updatedUnit);
				return Array.from(unitsMap.values());
			});
		},
		[setUnits]
	);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteUnit(id, token, tenantId);
				if (res) {
					setUnits((prev) => prev.filter((u) => u.id !== id));
					toastSuccess({ message: `${m.unit_delete_success()}` });
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

	if (error) {
		return <ErrorCard message={error} data-id="unit-list-error-card" />;
	}

	return (
		<DataDisplayTemplate
			title={unit()}
			actionButtons={
				<UnitAction
					handleSuccess={handleSuccess}
					data-id="unit-list-action-button"
				/>
			}
			filters={
				<UnitFilter
					search={search}
					setSearch={setSearch}
					status={status}
					setStatus={setStatus}
					statusOpen={statusOpen}
					setStatusOpen={setStatusOpen}
					sort={sort}
					setSort={setSort}
					data-id="unit-list-filter"
				/>
			}
			content={
				<DisplayComponent<UnitCreateModel>
					items={units}
					fields={unitFields}
					idField="id"
					onSuccess={handleSuccess}
					onDelete={handleDelete}
					editComponent={({ item, onSuccess }) => (
						<UnitDialog
							mode={formType.EDIT}
							defaultValues={item}
							onSuccess={onSuccess}
						/>
					)}
					page={+page}
					totalPage={+pages}
					setPage={setPage}
					sort={sort}
					onSortChange={(newSort: SortQuery) => {
						setSort(newSort);
					}}
					isLoading={isLoading}
					data-id="unit-list-display-component"
				/>
			}
			data-id="unit-list-data-display-template"
			commentAttachments={<CommentAttachments />}
		/>
	);
};

export default UnitList;
