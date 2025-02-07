'use client';

import { useAuth } from '@/app/context/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import { Button } from '@/components/ui/button';
import UnitDialog from './UnitDialog';
import { deleteUnit, fetchUnits } from '../actions/unit';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import * as m from '@/paraglide/messages.js';
import { statusOptions } from '@/lib/statusOptions';
import { FileDown, Printer } from 'lucide-react';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import { UnitCreateModel } from '@/dtos/unit.dto';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import SortComponent from '@/components/ui-custom/SortComponent';

enum UnitField {
	Name = 'name',
	Description = 'description',
	Status = 'is_active',
}

const sortFields: FieldConfig<UnitCreateModel>[] = [
	{
		key: UnitField.Name,
		label: `${m.unit_name_label()}`,
		className: 'w-24',
	},
	{
		key: UnitField.Status,
		label: `${m.status_text()}`,
		type: 'badge',
		className: 'w-24',
	},
];

const unitFields: FieldConfig<UnitCreateModel>[] = [
	...sortFields,
	{
		key: UnitField.Description,
		label: `${m.unit_des_label()}`
	},
];
const UnitList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [units, setUnits] = useState<UnitCreateModel[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');
	const [sort, setSort] = useURL('sort');

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchUnits(token, tenantId, { search, status, page, sort });
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

	const title = `${m.unit()}`;

	const actionButtons = (
		<div
			className="action-btn-container"
			data-id="unit-list-action-btn-container"
		>
			<UnitDialog
				mode={formType.ADD}
				onSuccess={handleSuccess}
				data-id="unit-list-unit-dialog"
			/>
			<Button
				variant="outline"
				className="group"
				size={'sm'}
				data-id="unit-list-export-button"
			>
				<FileDown className="h-4 w-4" data-id="unit-list-export-button-icon" />
				{m.export_text()}
			</Button>
			<Button variant="outline" size={'sm'} data-id="unit-list-print-button">
				<Printer className="h-4 w-4" data-id="unit-list-print-button-icon" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container" data-id="unit-list-filter-container">
			<SearchForm
				onSearch={setSearch}
				defaultValue={search}
				placeholder={m.placeholder_search_unit()}
				data-id="unit-list-search-form"
			/>
			<div className="all-center gap-2">
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
					data-id="unit-list-status-search-dropdown"
				/>
				<SortComponent
					fieldConfigs={
						[
							{ key: "name", label: `${m.unit_name_label()}` }
						]
					}
					sort={sort}
					setSort={setSort} />
			</div>
		</div>
	);

	const content = (
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
	);

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
			data-id="unit-list-data-display-template"
		/>
	);
};

export default UnitList;
