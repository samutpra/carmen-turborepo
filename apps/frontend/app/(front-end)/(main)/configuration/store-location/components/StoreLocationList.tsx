'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useCallback } from 'react';
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate';
import StoreLocationDialog from './StoreLocationDialog';
import {
	deleteStoreLocation,
	fetchStoreLocations,
} from '../../actions/store_location';
import { toastError, toastSuccess } from '@/components/ui-custom/Toast';
import { formType } from '@/types/form_type';
import SearchForm from '@/components/ui-custom/SearchForm';
import { useURL } from '@/hooks/useURL';
import { statusOptions } from '@/lib/statusOptions';
import * as m from '@/paraglide/messages.js';
import { FileDown, Printer } from 'lucide-react';
import StatusSearchDropdown from '@/components/ui-custom/StatusSearchDropdown';
import { FieldConfig, SortQuery } from '@/lib/util/uiConfig';
import ErrorCard from '@/components/ui-custom/error/ErrorCard';
import { LocationCreateModel } from '@/dtos/location.dto';
import SortComponent from '@/components/ui-custom/SortComponent';
import StoreLocationDisplay from './StoreLocationDisplay';

export enum StoreLocationField {
	Name = 'name',
	LocationType = 'location_type',
	DeliveryPointID = 'delivery_point_id',
	Description = 'description',
	isActive = 'is_active',
}

const sortFields: FieldConfig<LocationCreateModel>[] = [
	{
		key: StoreLocationField.Name,
		label: m.store_location_name_label(),
		className: 'w-24',
	},
	{
		key: StoreLocationField.Description,
		label: m.description(),
		className: 'w-40',
	},
	{
		key: StoreLocationField.LocationType,
		label: m.location_type_label(),
		className: 'w-10'
	},
	{
		key: StoreLocationField.isActive,
		label: m.status_text(),
		type: 'badge',
		className: 'w-10',
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
	const [sort, setSort] = useURL('sort');

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
				sort
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
	}, [token, tenantId, search, status, page, sort]);

	const handlePageChange = (newPage: number) => {
		const numericTotalPages = Number(pages);
		if (newPage < 1 || newPage > numericTotalPages) return;
		setPage(newPage.toString());
	};

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
				<SortComponent
					fieldConfigs={sortFields}
					sort={sort}
					setSort={setSort}
					data-id="store-location-sort-component"
				/>
			</div>
		</div>
	);

	const content = (
		<StoreLocationDisplay
			locations={storeLocations}
			fields={sortFields}
			page={+page}
			totalPage={+pages}
			handlePageChange={handlePageChange}
			sort={sort}
			onSortChange={(newSort: SortQuery) => {
				setSort(newSort);
			}}
			isLoading={isLoading}
			handleDelete={handleDelete}
			data-id="product-list-product-display"
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
			data-id="store-location-data-display-template"
		/>
	);
};

export default StoreLocationList;
