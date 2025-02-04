'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useCallback } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import StoreLocationDialog from './StoreLocationDialog';
import {
	deleteStoreLocation,
	fetchStoreLocations,
} from '../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
import { FileDown, Printer } from 'lucide-react';
import SortDropDown from '@/components/ui-custom/SortDropDown';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import DisplayComponent from '@/components/templates/DisplayComponent';
import { FieldConfig } from '@/lib/util/uiConfig';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { LocationCreateModel } from '@/dtos/location.dto';

enum StoreLocationField {
	Name = 'name',
	LocationType = 'location_type',
	Description = 'description',
	isActive = 'is_active',
}

const sortFields: FieldConfig<LocationCreateModel>[] = [
	{ key: StoreLocationField.Name, label: m.store_location_name_label() },
	{ key: StoreLocationField.LocationType, label: m.location_type_label() },
	{ key: StoreLocationField.isActive, label: m.status_text(), type: 'badge' },
];
const storeLocationFields: FieldConfig<LocationCreateModel>[] = [
	{
		key: StoreLocationField.Name,
		label: m.store_location_name_label(),
		className: 'w-40',
	},
	{
		key: StoreLocationField.LocationType,
		label: m.location_type_label(),
		className: 'w-32',
	},
	{
		key: StoreLocationField.isActive,
		label: m.status_text(),
		type: 'badge',
		className: 'w-24',
	},
	{
		key: StoreLocationField.Description,
		label: m.description(),
		className: 'w-40',
	},
];

const StoreLocationList = () => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const tenantId = 'DUMMY';
	const [storeLocations, setStoreLocations] = useState<LocationCreateModel[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [statusOpen, setStatusOpen] = useState(false);
	const [search, setSearch] = useURL('search');
	const [status, setStatus] = useURL('status');
	const [page, setPage] = useURL('page');
	const [pages, setPages] = useURL('pages');

	const handleSuccess = useCallback(
		(values: LocationCreateModel) => {
			setStoreLocations((prev) => {
				const mapValues = new Map(prev.map((u) => [u.id, u]));
				mapValues.set(values.id, values);
				return Array.from(mapValues.values());
			});
		},
		[setStoreLocations]
	);

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				const res = await deleteStoreLocation(id, token, tenantId);
				if (res) {
					setStoreLocations((prev) => prev.filter((p) => p.id !== id));
					toastSuccess({
						message: `${m.store_location()} deleted successfully`,
					});
				}
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === 'Unauthorized') {
						toastError({
							message: 'Your session has expired. Please login again.',
						});
					} else {
						toastError({
							message: `${m.fail_del_store()}: ${error.message}`,
						});
					}
				} else {
					toastError({
						message:
							'An unknown error occurred while deleting the store location.',
					});
				}
			}
		},
		[token, tenantId]
	);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const data = await fetchStoreLocations(token, tenantId, {
				search,
				status,
				page,
			});
			setStoreLocations(data.data);
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
	}, [token, tenantId, search, status, page]);

	const title = `${m.store_location()}`;

	const actionButtons = (
		<div className="action-btn-container">
			<StoreLocationDialog
				mode={formType.ADD}
				onSuccess={handleSuccess}
				data-id="store-location-dialog-add-button"
			/>
			<Button
				variant="outline"
				className="group"
				size={'sm'}
				data-id="store-location-export-button"
			>
				<FileDown className="h-4 w-4" data-id="store-location-export-icon" />
				{m.export_text()}
			</Button>
			<Button
				variant="outline"
				size={'sm'}
				data-id="store-location-print-button"
			>
				<Printer className="h-4 w-4" data-id="store-location-print-icon" />
				{m.print_text()}
			</Button>
		</div>
	);

	const filter = (
		<div className="filter-container" data-id="store-location-filter-container">
			<SearchForm
				onSearch={setSearch}
				defaultValue={search}
				placeholder={`${m.Search()} ${m.store_location()}...`}
				data-id="store-location-search-form"
			/>
			<div
				className="all-center gap-2"
				data-id="store-location-filter-container"
			>
				<StatusSearchDropdown
					options={statusOptions}
					value={status}
					onChange={setStatus}
					open={statusOpen}
					onOpenChange={setStatusOpen}
					data-id="store-location-status-search-dropdown"
				/>
				<SortDropDown
					fieldConfigs={sortFields}
					items={storeLocations}
					onSort={setStoreLocations}
					data-id="store-location-sort-dropdown"
				/>
			</div>
		</div>
	);

	const content = (
		<DisplayComponent<LocationCreateModel>
			items={storeLocations}
			fields={storeLocationFields}
			idField="id"
			onSuccess={handleSuccess}
			onDelete={handleDelete}
			editComponent={({ item, onSuccess }) => (
				<StoreLocationDialog
					mode={formType.EDIT}
					defaultValues={item}
					onSuccess={onSuccess}
				/>
			)}
			page={+page}
			totalPage={+pages}
			setPage={setPage}
			data-id="store-location-display-component"
		/>
	);

	if (error) {
		return <ErrorCard message={error} data-id="store-location-error-card" />;
	}

	return (
		<DataDisplayTemplate
			title={title}
			actionButtons={actionButtons}
			filters={filter}
			content={content}
			isLoading={isLoading}
			data-id="store-location-data-display-template"
		/>
	);
};

export default StoreLocationList;
